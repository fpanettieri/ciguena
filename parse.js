'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const logger = require('./logger');

const log = new logger(`[ciguena/parse]`);
const output_dir = './out';


// const results = [];
log.info("BEGIN");

function mkdir(dir) {
  if (!fs.existsSync(output_dir)){
    log.log('creating folder:', dir);
    fs.mkdirSync(dir);
  } else {
    log.log('folder already exists:', dir);
  }
}

mkdir(output_dir);

return;

fs.createReadStream('gpsfarma.csv')
  .pipe(csv())
  .on('data', (data) => {
    // results.push(data);


    // create folder
    // download image
  })
  .on('end', () => {
    log.info("END");
  });
