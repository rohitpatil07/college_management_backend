import filterService from '../../services/LMSServices/filterService.js';

const getAdminData = async (req, res) => {
  try {
    const data = await filterService.getAdminData(req.params.email);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getAllFaculty = async (req, res) => {
  try {
    const data = await filterService.getAllFaculty();
    res.status(200).json(data);
  } catch (error) {
    res.status(422).json(error);
  }
};

// const getAllFacSubs = async (req, res) => {
//   try {
//     const data = await filterService.getAllFacSubs(req.body.subjects);
//     res.json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

const getAllSubject = async (req, res) => {
  try {
    const data = await filterService.getAllSubject();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getAssignBySub = async (req, res) => {
  try {
    const data = await filterService.getAssignBySub(parseInt(req.params.subid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getAssforFacbyID = async (req, res) => {
  try {
    const data = await filterService.getAssforFacbyID(parseInt(req.params.assign_id));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getAssforStubyID = async (req, res) => {
  try {
    const data = await filterService.getAssforStubyID(parseInt(req.params.assign_id), req.params.roll_no);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getAttendanceBySubId = async (req, res) => {
  try {
    const data = await filterService.getAttBySubId(parseInt(req.params.subject_id));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getFacAtt = async (req, res) => {
  try {
    const data = await filterService.getFacAtt(req.body.subject_id, req.body.date);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getDILOs = async (req, res) => {
  try {
    const data = await filterService.getDILOs(
      parseInt(req.params.batch),
      req.params.dept,
      parseInt(req.params.sem)
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getDILOform = async (req, res) => {
    try {
      const form = await filterService.getDILOformbyID(parseInt(req.params.form_id));
      console.log(form)
      const obj = JSON.parse(form.DILO)
      for (let i=0; i < obj.length; i++){
        let lock = Object.keys(obj[i])
        let subject= await filterService.getSubjectbyMultipleID(obj[i][lock])
        obj[i][lock]=subject
      }
      form.DILO = obj
      res.json(form);
    } catch (error) {
      res.json(error);
    }
};  

const getFacultySubjects = async (req, res) => {
  try {
    const { email } = req.body;
    const subjects = await filterService.getFacultySubjects(email);
    return res.json(subjects);
  } catch (error) {
    res.json(error);
  }
};

const getFacultybyDept = async (req, res) => {
  try {
    const data = await filterService.getFacultybyDept(req.params.dept);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getFacultybyMail = async (req, res) => {
  try {
    const data = await filterService.getFacultybyMail(req.params.mail);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getForumByModuleId = async (req, res) => {
  try {
    const data = await filterService.getForumByModuleId(parseInt(req.params.moduleid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getForumById = async (req, res) => {
  try {
    const data = await filterService.getForumById(parseInt(req.params.forumid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getModulebyID = async (req, res) => {
  try {
    const data = await filterService.getOneModbyID(
      parseInt(req.params.moduleid),
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getModulebySubject = async (req, res) => {
  try {
    const data = await filterService.getModbySub(parseInt(req.params.subid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getStuAtt = async (req, res) => {
  try {
    const data = await filterService.getStuAtt(req.body.subject_id, req.body.roll_no)
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getStudentsbyBatch = async (req, res) => {
  try {
    const data = await filterService.getStudentsbyBatch(req.params.dept,req.params.div,parseInt(req.params.batch),parseInt(req.params.sem));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getStudentsbySubID = async (req, res) => {
  try {
    const data = await filterService.getStudentsbySubID(parseInt(req.params.subid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getSubbyDept = async (req, res) => {
  try {
    const data = await filterService.getSubbyDept(
      parseInt(req.params.batch),
      req.params.dept,
      parseInt(req.params.sem)
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getSubmissionsforStu = async (req, res) => {
  try {
    const data = await filterService.getSubmissionsforStu(req.params.roll_no);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getSubforFaculty = async (req, res) => {
  try {
    const data = await filterService.getSubforFaculty(req.body.email,req.body.batch,req.body.semester);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

const getSubjectbyID = async (req, res) => {
  try {
    const data = await filterService.getSubjectbyID(parseInt(req.params.subid));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getSubjectofStudent = async (req, res) => {
  try {
    let IDLO = []
    const enrolled_data = await filterService.getSubjectofStudent(req.body.roll_no);
    enrolled_data.map(subject => {
      if(subject.type=='ILO'||subject.type=='DLO'){
        IDLO.push(subject.subject_id)
      }
    })
    console.log(IDLO,"IDLO");
      const form = await filterService.getDILOform(
        parseInt(req.body.batch),
        req.body.department,
        parseInt(req.body.semester)
      );
      let obj = JSON.parse(form[0].DILO)
      console.log(obj,"obj");
      if(obj.length==IDLO.length){
        return res.json(enrolled_data)
      }
      let form_data = []
      for (let i=0; i < obj.length; i++){
        let lock = Object.keys(obj[i])
        console.log(obj[i][lock],"obj[i][lock]");
        if(obj[i][lock].some(element => IDLO.includes(element))){
          continue;
        }
        else{
          let subject= await filterService.getSubjectbyMultipleID(obj[i][lock])
          obj[i][lock]=subject
          form_data.push(obj[i])
        }
      }
      let data = {enrolled_data,form_data}
      res.json(data);
    } catch (error) {
    res.json(error);
  }
};

// const getTopComments = async (req, res) => {
//   try {
//     const data = await filterService.getTopComments(parseInt(req.params.forumid));
//     res.json(data);
//   } catch (error) {
//     res.json(error);
//   }
// }

const getReadMatByModuleId = async (req, res) => {
  try {
    const data = await filterService.getReadingMaterialByModuleId(
      parseInt(req.params.moduleid),
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getReplies = async (req, res) => {
  try {
    const data = await filterService.getReplies(parseInt(req.params.message_id));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAdminData,
  getAllFaculty,
  getAllSubject,
  getAssignBySub,
  getAssforFacbyID,
  getAssforStubyID,
  getAttendanceBySubId,
  getFacAtt,
  getDILOs,
  getDILOform,
  getFacultySubjects,
  getFacultybyDept,
  getFacultybyMail,
  getForumByModuleId,
  getForumById,
  getModulebyID,
  getModulebySubject,
  getStuAtt,
  getStudentsbyBatch,
  getStudentsbySubID,
  getSubbyDept,
  getSubmissionsforStu,
  getSubforFaculty,
  getSubjectbyID,
  getSubjectofStudent,
//  getTopComments,
  getReadMatByModuleId,
  getReplies,
};
