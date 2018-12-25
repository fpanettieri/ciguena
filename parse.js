'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const logger = require('./logger');

const log = new logger(`[ciguena/parse]`);
const output_dir = './out';


// const results = [];
log.info("BEGIN");

function mkdir(dir) {
  if (!fs.existsSync(dir)){
    log.log('creating dir:', dir);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    log.log('dir already exists:', dir);
  }
}

mkdir(output_dir);

fs.createReadStream('gpsfarma.csv')
  .pipe(csv())
  .on('data', (data) => {
    // results.push(data);

    let dir = data['Productos-Href'];
    dir = dir.replace('https://www.gpsfarma.com/', '');
    dir = dir.replace(/(\.html)$/, '');
    dir = dir.replace(/\/$/, '');
    dir = dir.replace(/-/g, '_');
    mkdir(dir);


    // create folder
    // download image
  })
  .on('end', () => {
    log.info("END");
  });
