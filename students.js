const fs = require('fs')
const { csvConverter } = require('./utils').modules

const studenstCsV = fs.readFileSync('./files/students.csv', 'utf-8')
const list = studenstCsV.split('\n').slice(1);
exports.modules = csvConverter(list, '\t', '3. In-Meeting Activities', "")