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

const getFacAtt = async (subject_id,date) => {
  try {
    let start_date = new Date(date).toISOString();
    let end_date = new Date(date);
    end_date.setHours(28,89,59,999);
    end_date = end_date.toISOString();
    console.log(start_date,end_date)
    const attendence = await prisma.attendance.findMany({
      where: {
        subject_id: subject_id,
        date: {gte: start_date, lte: end_date}
      },
    });
    let present=JSON.parse(attendence[0].present);
    let absent=JSON.parse(attendence[0].absent);
    console.log(attendence[0].present,present)
    const presenties = await prisma.students.findMany({
      where: {
        roll_no: { in: present },
      },
      select:{
        roll_no:true,
        first_name:true,
        last_name:true,
        division:true,
      }
    })
    const absenties = await prisma.students.findMany({
      where: {
        roll_no: { in: absent },
      },
      select:{
        roll_no:true,
        first_name:true,
        last_name:true,
        division:true,
      }
    })

    let students={date,subject_id,presenties,absenties}
    return students;
  } catch (error) {
    console.log(error)
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
      include:{
        students:{
          select:{
            first_name:true,
            last_name:true
          }
        }
      }
    });
    return forum;
  } catch (error) {
    return error;
  }
}

const getForumById = async (forum_id) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: {
        forum_id: forum_id
      },
      include:{
        forum_messages:{
          where:{
            reply_to: 0,
          },
          orderBy:{
            votes: "desc"
          }
        },
        students:{
          select:{
            first_name:true,
            last_name:true
          }
        }
      }
    });
    forum.forum_messages.map((message)=>{message.upvotes=(JSON.parse(message.upvotes));message.downvotes=(JSON.parse(message.downvotes))})
    return forum;
  } catch (error) {
    console.log(error)
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

const getStuAtt = async (subject_id,roll_no) => {
  try {
    const present = await prisma.attendance.findMany({
      where: {
        subject_id: subject_id,
        present: {contains: roll_no}
      },
      select:{
        date:true,
      }
    });
    const absent = await prisma.attendance.findMany({
      where: {
        subject_id: subject_id,
        absent: {contains: roll_no}
      },
      select:{
        date:true,
      }
    })
    const attendence = {present,absent}
    return attendence;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const getStudentsbyBatch = async (department,division,batch,semester) => {
  try{
    const students = await prisma.students.findMany({
      where: {
        department: department,
        division: { contains: division },
        batch: batch,
        semester: semester
      },
      select:{
        roll_no:true,
        first_name:true,
        last_name:true,
        email:true,
        gender:true,
        phone_number:true,
        division:true,
      }
    })
    return students;
  } catch (error) {
    console.log(error)
    return error;
  }
}

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
      select:{
        roll_no:true,
        first_name:true,
        last_name:true,
        email:true,
        gender:true,
        phone_number:true,
        division:true,
      }
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

const getSubforFaculty = async (email,batch,semester) => {
  try{
    const subjects = await prisma.subjects.findMany({
      where: {
        email: email,
        batch: batch,
        semester: semester,
      },
    });
    return subjects;    
  } catch(error){
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
            designation:true,
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

// const getTopComments = async (forum_id) => {
//   try {
//     const comments = await prisma.forum_messages.findMany({
//       where: {
//         forum_id: forum_id,
//         reply_to: 0,
//       }
//     });
//     return comments;
//   } catch (error) {
//     return error;
//   }
// } 

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

const getReplies = async (message_id) => {
  try {
    const replies = await prisma.forum_messages.findMany({
      where: {
        reply_to: message_id,
      },
      orderBy:{
        upvotes: "desc"
      }
    });
    return replies;
  } catch (error) {
    return error;
  }
}

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
  getFacAtt,
  getDILOs,
  getDILOform,
  getDILOformbyID,
  getFacultySubjects,
  getFacultybyDept,
  getFacultybyMail,
  getForumByModuleId,
  getForumById,
  getModbySub,
  getOneModbyID,
  getStuAtt,
  getStudentsbyBatch,
  getStudentsbySubID,
  getSubbyDept,
  getSubmissionsforStu,
  getSubforFaculty,
  getSubjectbyID,
  getSubjectbyMultipleID,
  getSubjectofStudent,
//  getTopComments,
  getReadingMaterialByModuleId,
  getReplies,
};
