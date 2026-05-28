#!/bin/bash
cat > /etc/nginx/sites-available/krpcroom << 'NGINXEOF'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINXEOF
ln -sf /etc/nginx/sites-available/krpcroom /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash
echo "Done! Site is live at http://111.90.143.158"
