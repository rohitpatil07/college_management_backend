import filterService from './filterService.js';
import exceljs from 'exceljs';
import excelUtility from '../util/excelUtility.js';
import pdf from 'pdf-creator-node';
import fs from 'fs';
import AdmZip from 'adm-zip';
var html = fs.readFileSync(process.cwd() + '/app/util/resume.html', 'utf8');
import imageService from '../services/imageService.js';


const downloadExcel = async (select_fields, queries) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('student_data');

    let students = await filterService.getDashboard(select_fields, queries);

    students = excelUtility.removeNesting(students);

    worksheet.columns = excelUtility.createWorksheetCols(students[0]);

    students.forEach((student) => {
      worksheet.addRow(student);
    });

    const filename = 'studentdata' + excelUtility.makeid(10) + '.xlsx';

    await workbook.xlsx.writeFile(filename);
    return filename;
  } catch (error) {
    return error;
  }
};

const downloadCSV = async (select_fields, queries) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('student_data');

    let students = await filterService.getDashboard(select_fields, queries);

    students = excelUtility.removeNesting(students);

    worksheet.columns = excelUtility.createWorksheetCols(students[0]);

    students.forEach((student) => {
      worksheet.addRow(student);
    });

    const filename = 'studentdata' + excelUtility.makeid(10) + '.csv';

    await workbook.csv.writeFile(filename);
    return filename;
  } catch (error) {
    return error;
  }
};

const resumeDownload = async (rollno) => {
  try {
    const bitmap = fs.readFileSync(process.cwd() + '/app/util/rait2.jpg');
    const logo = bitmap.toString('base64');
    const bitmap2 = fs.readFileSync(
      process.cwd() + '/app/util/rait_background.jpg',
    );
    const background = bitmap2.toString('base64');
    let student = await filterService.getStudent(rollno);
    const pro = await imageService.downloadProfileImage(rollno); 
    const pfp = pro['photo'];
    let x = [student];
    var options = {
      format: 'A4',
      orientation: 'portrait',
      border: '0mm',
    };
    var document = {
      html: html,
      data: {
        users: x,
        logo: logo,
        pfp: pfp,
        background: background,
      },
      path: `./${rollno}_resume.pdf`,
      type: '',
    };
    await pdf
      .create(document, options)
      .then((res) => {})
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      if (fs.existsSync(`./${rollno}_resume.pdf`)) {
        fs.unlinkSync(`./${rollno}_resume.pdf`, function (err) {
          if (err) throw err;
        });
      }
    }, 2000);
  } catch (error) {
    return error;
  }
};

const zipDownload = async (students) => {
  try {
    const bitmap = fs.readFileSync(process.cwd() + '/app/util/rait2.jpg');
    const logo = bitmap.toString('base64');
    const bitmap2 = fs.readFileSync(
      process.cwd() + '/app/util/rait_background.jpg',
    );
    const background = bitmap2.toString('base64');
    for (let i = 0; i < students.length; i++) {
      let student = await filterService.getStudent(students[i]);
      const pro = await imageService.downloadProfileImage(students[i]); 
    const pfp = pro['photo'];
      let x = [student];
      var options = {
        format: 'A4',
        orientation: 'portrait',
        border: '0mm',
      };
      var document = {
        html: html,
        data: {
          users: x,
          logo: logo,
          pfp: pfp,
          background: background,
        },
        path: `./Zip/${students[i]}_resume.pdf`,
        type: '',
      };
      await pdf
        .create(document, options)
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });
    }
    const zip = new AdmZip();
    setTimeout(() => {
      var uploadDir = fs.readdirSync('./Zip');
      for (var v = 0; v < uploadDir.length; v++) {
        zip.addLocalFile(`./Zip/` + uploadDir[v]);
      }
      const data = zip.toBuffer();
      zip.writeZip('./export.zip');
    }, 300);
    setTimeout(() => {
      if (fs.existsSync(`./export.zip`)) {
        fs.unlinkSync(`./export.zip`, function (err) {
          if (err) throw err;
        });
      }
      var CleanDir = fs.readdirSync('./Zip');
      for (var v = 0; v < CleanDir.length; v++) {
        fs.unlinkSync(`./Zip/`+ CleanDir[v]);
      }
    }, 2500);
  } catch (error) {
    return error;
  }
};

export default { downloadExcel, downloadCSV, resumeDownload, zipDownload };
