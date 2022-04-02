#!/bin/bash
sudo pkill -f uwsgi -9
sudo apt-get update
sudo apt-get install -y nginx openssl
sudo apt-get update
sudo apt-get install -y nginx openssl nodejs npm python3 python3-pip

sudo rm -r /opt/hsfs/
sudo mkdir -p /opt/hsfs
sudo chmod -R 777 /opt/hsfs

sudo rm -r /etc/nginx/sites-available/
sudo rm -r /etc/nginx/sites-enabled/
sudo mkdir -p /etc/nginx/sites-enabled
sudo mkdir -p /etc/nginx/sites-available
sudo rm /opt/hsfs/uwsgi.log

git pull origin main

./deploy.sh

# Install necessities
sudo pip3 install Werkzeug
sudo pip3 install moment
sudo pip3 install wheel
sudo pip3 install flask
sudo pip3 install uwsgi

uwsgi --ini an.ini -d /opt/hsfs/uwsgi.log

sudo cp default /etc/nginx/sites-available/default
sudo ln -fs /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
