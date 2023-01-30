import prisma from '../../config/prisma.js';
import exceljs from 'exceljs';

const createExcel = async (att,sub) => {
    try {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('student_attendance');

        const Sheetcolumns=[
            {header:'Firstname',key:'Firstname',width:30},
            {header:'Lastname',key:'lastname',width:30},
            {header:'Roll_no',key:'Roll_no',width:20}
        ];
        let uniqueDates = [...new Set(att.map(item => item.date))];
        uniqueDates.forEach((date)=>{
            Sheetcolumns.push({header:date,key:date,width:20});
        })
        worksheet.columns = Sheetcolumns;
        for (let i = 0; i < sub.length; i++) {
            const row = [];
            const student = sub[i];
            row.push(student.roll_no, student.first_name, student.last_name);
          
            for (let j = 0; j < att.length; j++) {
              const attendance = att[j];
              const present = JSON.parse(attendance.present);
              if (present.indexOf(student.roll_no) !== -1) {
                row.push('P');
              } else {
                row.push('A');
              }
            }
            worksheet.addRow(row);

        }
        const filename = `attendance${att[0].subject_id}.xlsx`;
        await workbook.xlsx.writeFile(filename)
            .then(function() {
              console.log("Excel file created successfully!");
        });
         return filename;
    } catch (error) {
        return error;
    }
}

const getAllSubmissions=async(assignment_id)=>{
    try{
        const download_file = await prisma.assignment_submissions.findMany({
            where:{
                assignment_id: assignment_id
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

const getAssignmentById=async(assignment_id)=>{
    try{
        const download_file = await prisma.assignment.findUnique({
            where:{
                assignment_id: assignment_id
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

const getReadMatById=async(reading_material_id)=>{
    try{
        const download_file = await prisma.reading_material.findUnique({
            where:{
                reading_material_id: reading_material_id
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

const getSubmissionById=async(assignment_id,roll_no)=>{
    console.log(assignment_id,roll_no)
    try{
        const download_file = await prisma.assignment_submissions.findUnique({
            where:{
                roll_no_assignment_id:{
                    roll_no,
                    assignment_id
                }
            },
            select:{
                file_name: true,
                file: true,
                file_type: true
            }
        })
        return download_file;
    }
    catch(error){
        return error;
    }
}

export default{
    createExcel,
    getAllSubmissions,
    getAssignmentById,
    getReadMatById,
    getSubmissionById,
}