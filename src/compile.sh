#!/bin/sh
cd $(dirname "$0");
BASEDIR=$(pwd);

cd $BASEDIR;

echo -e "\nCompiling scss to dist/css...\n";
sass --update --force --scss scss/:dist/css/ --style compressed

echo -e "\nInstalling node modules\n";
npm install

echo -e "\nBuilding React app...\n";
npm run build

echo -e "/nFinished\n";
