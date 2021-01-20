ng build --prod --outputHashing=all

aws s3 sync dist/acreativity/ s3://assertivecreativity/

xdg-open http://assertivecreativity.s3-website.us-east-2.amazonaws.com/