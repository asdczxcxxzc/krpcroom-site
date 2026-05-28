const { Client } = require('ssh2');
const SftpClient = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs');

const SERVER = {
  host: '111.90.143.158',
  port: 22,
  username: 'root',
  password: 'eFS79Vvdm4LWA622tl',
};

const LOCAL_DIR = __dirname;
const REMOTE_DIR = '/var/www/krpcroom';

const SKIP = new Set([
  'node_modules', '.next', 'deploy.js', '.git',
  'package-lock.json', '.DS_Store',
]);

function runSSH(commands) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let output = '';
    conn.on('ready', () => {
      const cmd = commands.join(' && ');
      console.log(`\n$ ${cmd.slice(0, 100)}...`);
      conn.exec(cmd, { pty: true }, (err, stream) => {
        if (err) return reject(err);
        stream.on('data', (d) => { process.stdout.write(d); output += d; });
        stream.stderr.on('data', (d) => { process.stderr.write(d); });
        stream.on('close', (code) => {
          conn.end();
          if (code !== 0) reject(new Error(`Exit code ${code}`));
          else resolve(output);
        });
      });
    });
    conn.on('error', reject);
    conn.connect({ ...SERVER, readyTimeout: 30000, hostVerifier: () => true });
  });
}

async function uploadDir(sftp, localDir, remoteDir) {
  await sftp.mkdir(remoteDir, true).catch(() => {});
  const entries = fs.readdirSync(localDir);
  for (const entry of entries) {
    if (SKIP.has(entry)) continue;
    const localPath = path.join(localDir, entry);
    const remotePath = remoteDir + '/' + entry;
    const stat = fs.statSync(localPath);
    if (stat.isDirectory()) {
      await uploadDir(sftp, localPath, remotePath);
    } else {
      process.stdout.write(`  Uploading ${remotePath}\n`);
      await sftp.put(localPath, remotePath);
    }
  }
}

async function main() {
  console.log('=== Step 1: Server Setup ===');
  await runSSH([
    'export DEBIAN_FRONTEND=noninteractive',
    'apt-get update -y',
    'apt-get install -y curl',
    'curl -fsSL https://deb.nodesource.com/setup_20.x | bash -',
    'apt-get install -y nodejs',
    'npm install -g pm2',
    'apt-get install -y nginx',
    `mkdir -p ${REMOTE_DIR}`,
  ]);

  console.log('\n=== Step 2: Upload Files ===');
  const sftp = new SftpClient();
  await sftp.connect({ ...SERVER, readyTimeout: 30000 });
  await uploadDir(sftp, LOCAL_DIR, REMOTE_DIR);
  await sftp.end();

  console.log('\n=== Step 3: Install & Build ===');
  await runSSH([
    `cd ${REMOTE_DIR}`,
    'npm install',
    'npm run build',
  ]);

  console.log('\n=== Step 4: Start with PM2 ===');
  await runSSH([
    `cd ${REMOTE_DIR}`,
    'pm2 delete krpcroom 2>/dev/null || true',
    'pm2 start npm --name krpcroom -- start',
    'pm2 save',
    'pm2 startup systemd -u root --hp /root | tail -1 | bash',
  ]);

  console.log('\n=== Step 5: Configure Nginx ===');
  const nginxConf = `server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`;

  await runSSH([
    `cat > /etc/nginx/sites-available/krpcroom << 'NGINX_EOF'\n${nginxConf}\nNGINX_EOF`,
    'ln -sf /etc/nginx/sites-available/krpcroom /etc/nginx/sites-enabled/',
    'rm -f /etc/nginx/sites-enabled/default',
    'nginx -t',
    'systemctl reload nginx',
  ]);

  console.log('\n=== Done! ===');
  console.log(`Site is live at: http://111.90.143.158`);
}

main().catch((err) => {
  console.error('Deploy failed:', err.message);
  process.exit(1);
});
