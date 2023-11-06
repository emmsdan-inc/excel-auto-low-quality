const fs = require('fs/promises')
const fs2 = require('fs')
const { csvConverter } = require('./utils').modules
async function getAttendance(week) {

    const directory = `./files/attendance/${week}/`
    const files = await fs.readdir(directory);
    const attendances = {};
    for (let file of files) {
        if (!file.startsWith('.') && file.startsWith('copy')) {
            const path = directory + file
            const attendanceCsvList = fs2.readFileSync(path, 'utf-8')
            const list = attendanceCsvList.split('\n')
            const attendanceList = csvConverter(list, '\t', '3. In-Meeting Activities', "")
            if (!attendanceCsvList) continue;
            console.log({attendanceCsvList, path});
            const [day] = (attendanceList[0]['First Join (UTC)'] || attendanceList[0]?.Timestamp || attendanceList[0]?.['Join Time'])?.split?.(',')
            const date = day.replaceAll('/', '-')
            attendances[date] = attendances[date] ?? {}
            for (let attendance of attendanceList) {
             let name = attendance['Full Name']?.replace?.(/\s+/g, ' ').trim();
             name = name ?? attendance.Name.replace(/\s+/g, ' ').trim();
                attendances[date][name] = { ...attendance, date, 'Full Name': name }}
            
        }
    }
    return attendances
}
exports.modules = getAttendance