#!/bin/bash
# Remove certbot redirect, let Cloudflare handle HTTPS
cat > /etc/nginx/sites-available/krpcroom << 'NGINXEOF'
server {
    listen 80;
    server_name mypcbang.com www.mypcbang.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINXEOF

nginx -t && systemctl reload nginx
echo "Done!"
