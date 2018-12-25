'use strict';

const https = require('https');
const csv = require('csv-parser');
const fs = require('fs');

const logger = require('./logger');

const log = new logger(`[ciguena/parse]`);
const output_dir = './out';
const results = [];

log.info("BEGIN");

function mkdir(dir) {
  if (!fs.existsSync(dir)){
    log.log('creating dir:', dir);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    log.log('dir already exists:', dir);
  }
}

function download () {
  const data = results.pop();
  if (!data) { return; }
  log.log(`downloading ${data['Url-Imagen']}`);

  let dir = data['Productos-Href'];
  dir = dir.replace('https://www.gpsfarma.com/', '');
  dir = dir.replace(/(\.html)$/, '');
  dir = dir.replace(/\/$/, '');
  dir = dir.replace(/-/g, '_');
  mkdir(`${output_dir}/${dir}`);

  const file_name = `${output_dir}/${dir}/${data['SKU']}`;
  const file = fs.createWriteStream(file_name);

  log.log(`downloading ${data['Url-Imagen']}`);
  const request = https.get(data['Url-Imagen'], function(response) {
    response.pipe(file);
    file.on('finish', () => {
      log.log(`file downloaded: ${file_name}`);
      setTimeout(download, 50);
    });
  }).on('error', function(err) {
    log.error(`download error: ${file_name}`);
  });
}

mkdir(output_dir);
fs.createReadStream('gpsfarma.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', download);
