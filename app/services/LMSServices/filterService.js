import prisma from '../../config/prisma.js';

const getAdminData = async (email) => {
  try {
    console.log(email);
    let admine = await prisma.lms_admin.findUnique({
      where: {
        email: email,
      },
      include: {
        forms: true,
      }
    });
    let { password, ...admin } = admine;
    return admin;
  } catch (error) {
    return error;
  }
}

const getAllFaculty = async () => {
  try {
    const faculty = await prisma.faculty.findMany();
    return faculty;
  } catch (error) {
    return error;
  }
};

const getAllSubject = async () => {
  try {
    const subjects = await prisma.subjects.findMany();
    return subjects;
  } catch (error) {
    return error;
  }
};


const getAssignBySub = async (subject_id) => {
  try {
    const assign = await prisma.assignment.findMany({
      where: {
        subject_id: subject_id
      }
    });
    const assignment = []
    assign.map(A=>(assignment.push(exclude(A, ['file']))));
    return assignment;
  } catch (error) {
    return error;
  }
}

const getAssforFacbyID = async (assignment_id) => {
  try {
    const assi = await prisma.assignment.findUnique({
      where: {
        assignment_id: assignment_id
      },
      include: {
        student_submissions: true,
      }
    });
    const assign = []
    const assignment = exclude(assi, ['file']);
    assignment.student_submissions.map(A=>(assign.push(exclude(A, ['file']))))
    assignment.student_submissions=assign;
    return assignment;
  } catch (error) {
    return error;
  }
}

const getAssforStubyID = async (assignment_id,roll_no) => {
  try {
    const assi = await prisma.assignment.findUnique({
      where: {
        assignment_id: assignment_id
      },
      include: {
        student_submissions: {
          where:{
            roll_no: roll_no
          }
        },
      }
    });
    const assign = []
    const assignment = exclude(assi, ['file']);
    assignment.student_submissions = exclude(assignment.student_submissions[0], ['file'])
    return assignment;
  } catch (error) {
    return error;
  }
}

const getDILOs = async (batch, department, semester) => {
  try {
    const DLO = await prisma.subjects.findMany({
      where: {
        department: department,
        batch: batch,
        semester: semester,
        type: "DLO"
      },
    });
    const ILO = await prisma.subjects.findMany({
      where: {
        batch: batch,
        semester: semester,
        type: "ILO"
      },
    });
    const subjects = {
      DLO:DLO,
      ILO:ILO
    }
    return subjects;
  } catch (error) {
    return error;
  }
};

const getDILOform = async (batch, department, semester) => {
  try {
    const form = await prisma.forms.findMany({
      where:{
        department: department,
        batch: batch,
        semester: semester
      }
    });
    return form;
  } catch (error) {
    return error;
  }
};

const getDILOformbyID = async (form_id) => {
  try {
    const form = await prisma.forms.findUnique({
      where:{
        form_id: form_id
      }
    });
    return form;
  } catch (error) {
    return error;
  }
}

const getFacultySubjects = async (email) => {
  try {
    const { subjects } = await prisma.Faculty.findUnique({
      select: {
        subjects: true,
      },
      where: {
        email: email,
      },
    });
    return subjects;
  } catch (error) {
    return error;
  }
};

const getFacultybyDept = async (department) => {
  try {
    const faculty = await prisma.faculty.findMany({
      where: {
        department: department,
      },
    });
    return faculty;
  } catch (error) {
    return error;
  }
};

const getFacultybyMail = async (mail) => {
  try {
    const faculty = await prisma.faculty.findMany({
      where: {
        email: mail,
      },
    });
    return faculty;
  } catch (error) {
    return error;
  }
};

const getForumByModuleId = async (module_id) => {
  try {
    const forum = await prisma.forum.findMany({
      where: {
        module_id: module_id
      },
    });
    return forum[0];
  } catch (error) {
    return error;
  }
}

const getModbySub = async (subject_id) => {
  try {
    const modules = await prisma.modules.findMany({
      where: {
        subject_id: subject_id,
      },
    });
    return modules;
  } catch (error) {
    return error;
  }
};

const getOneModbyID = async (module_id) => {
  try {
    const modules = await prisma.modules.findUnique({
      where: {
        module_id: module_id,
      },
    });
    return modules;
  } catch (error) {
    return error;
  }
};

const getStudentsbySubID = async (subject_id) => {
  try {
    const students = await prisma.students.findMany({
      where: {
        subjects: {
          some: {
            subject_id: subject_id,
          },
        },
      },
    });
    return students;
  } catch (error) {
    return error;
  }
}

const getSubbyDept = async (batch, department, semester) => {
  try {
    const subjects = await prisma.subjects.findMany({
      where: {
        department: department,
        batch: batch,
        semester: semester
      },
    });
    return subjects;
  } catch (error) {
    return error;
  }
};

const getSubmissionsforStu = async (roll_no) => {
  try {
    const submissions = await prisma.assignment_submissions.findMany({
      where: {
        roll_no: roll_no
      },
    });
    return submissions;
  } catch (error) {
    return error;
  }
}

const getSubjectbyID = async (subject_id) => {
  try {
    const subjects = await prisma.subjects.findUnique({
      where: {
        subject_id: subject_id,
      },
      include:{
        faculty:{
          select:{
            first_name:true,
            middle_name:true,
            last_name:true,
            email:true,
            phone_number:true,
            gender:true,
            //designation:true,
          }
        }
      }
    });
    return subjects;
  } catch (error) {
    return error;
  }
};

const getSubjectbyMultipleID = async (subject_id) => {
  try {
    const subjects = await prisma.subjects.findMany({
      where: {
        subject_id: {in: subject_id},
      },
    });
    return subjects;
  } catch (error) {
    return error;
  }
};

const getSubjectofStudent = async (roll_no) => {
  try {
    const {subjects} = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      select:{
        subjects:{
          select:{
            subject:true
          }
        }
      }
    });
    let finalsubject = [];
    subjects.map(subject=>{finalsubject.push(subject.subject)})
    return finalsubject;
  } catch (error) {
    return error;
  }
};

const getReadingMaterialByModuleId = async (module_id) => {
  try {
    const readmat = await prisma.reading_material.findMany({
      where: {
        module_id: module_id,
      },
      select: {
        reading_material_id: true,
        file_name: true,
        file_type: true,
      },
    });
    return readmat;
  } catch (error) {
    return error;
  }
};

function exclude(A, keys) {
  for (let key of keys) {
    console.log(A)
    delete A[key]
  }
  return A
}

export default {
  getAdminData,
  getAllFaculty,
  getAllSubject,
  getAssignBySub,
  getAssforFacbyID,
  getAssforStubyID,
  getDILOs,
  getDILOform,
  getDILOformbyID,
  getFacultySubjects,
  getFacultybyDept,
  getFacultybyMail,
  getForumByModuleId,
  getModbySub,
  getOneModbyID,
  getStudentsbySubID,
  getSubbyDept,
  getSubmissionsforStu,
  getSubjectbyID,
  getSubjectbyMultipleID,
  getSubjectofStudent,
  getReadingMaterialByModuleId,
};
