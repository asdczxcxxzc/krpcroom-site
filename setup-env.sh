#!/bin/bash
echo "NEXT_PUBLIC_SITE_URL=https://mypcbang.com" > /var/www/krpcroom/.env.local
cd /var/www/krpcroom && npm run build && pm2 restart krpcroom
echo "Done!"
