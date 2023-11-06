const fs = require('fs')

const csvConverter = (rows, separator = ',', stopWord = '', filteredWords=undefined) => {
    const headers = rows.shift().split(separator);
    const convertedData = [];
  
    for (const row of rows) {
      if (row.includes(stopWord)) {
        break;
      }
      if (filteredWords !== undefined ) {
        if (!filteredWords && row === filteredWords || filteredWords && row.includes(filteredWords)) {
          continue
        }
      }
  
      const newObj = {};
      const rowValues = row.split(separator);
      headers.forEach((header, ind) => {
        newObj[header?.trim()] = rowValues[ind]?.trim();
      });
  
      convertedData.push(newObj);
    }
  
    return convertedData;
  };

  const writeToFile = (item, filename='./files/attendance.csv', createFolder) => {
    const path = filename.split('/')
    path.pop()
    const folderExist = fs.existsSync(path.join('/'), 'utf-8');
    console.log({path, folderExist});
    if (!folderExist) {
      fs.mkdirSync(path.join('/'));
    }
    return fs.appendFileSync(filename, item, 'utf-8')
  }
  // attendanceList.forEach((attendance) => {
  //   const email = attendance.Email;
  //   if (attendanceTracking[email]) {
  //     daysOfWeekCSV.forEach((day) => {
  //       attendanceTracking[email][day] += 1;
  //       attendanceTracking[email].actual += 1;
  //     });
  //     attendanceTracking[email].Total += 1;
  //   }
  //   csv.push(`${email}\t${attendanceTracking[email]?.actual??0}`)
  // });
  exports.modules = {
    csvConverter,
    writeToFile
  }