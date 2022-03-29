#!/bin/bash
sudo apt-get update
sudo apt-get install -y nginx openssl
sudo apt-get groupinstall "Development Tools"

sudo mkdir -p /opt/hsfs
sudo chmod -R 777 /opt/hsfs
# sudo mkdir -p /etc/nginx/sites-enabled
# sudo mkdir -p /etc/nginx/sites-available

git pull origin master

./deploy.sh
# sudo apt install build-essential checkinstall libssl-dev
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash

sudo apt-get install python3-devel

# Install necessities
sudo pip3 install wheel
sudo pip3 install flask
sudo pip3 install uwsgi

uwsgi --ini an.ini -d /opt/hsfs/uwsgi.log

sudo cp default.conf /etc/nginx/sites-available/default.conf
sudo ln -fs /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf
sudo systemctl restart nginx
