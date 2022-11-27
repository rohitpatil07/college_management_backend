// import prisma from '../config/prisma.js';
import filterService from './filterService.js';
import exceljs from 'exceljs';
import excelUtility from '../util/excelUtility.js';

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

    await workbook.xlsx.writeFile('export.xlsx');
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

    await workbook.csv.writeFile('export.csv');
  } catch (error) {
    return error;
  }
};

export default { downloadExcel, downloadCSV };
