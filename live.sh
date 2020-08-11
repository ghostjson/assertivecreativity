ng build --prod

aws s3 sync dist/acreativity/ s3://assertivecreativity-frontend/

xdg-open http://assertivecreativity-frontend.s3-website.us-east-2.amazonaws.com/