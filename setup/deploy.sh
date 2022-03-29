#!/bin/bash
sudo apt-get install -y nodejs npm
# git pull
cd ..
npm i
npm run build
cd setup/

sudo cp -R ../build/* /usr/share/nginx/html

