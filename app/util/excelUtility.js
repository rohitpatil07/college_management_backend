const createWorksheetCols = (student_data) => {
  let columns = [];
  for (let info in student_data) {
    columns.push(info);
  }

  let worksheet_cols = [];

  columns.forEach((column) => {
    let colwidth = 14;
    if (column == 'email' || column == 'rait_email') {
      colwidth = 30;
    }

    const header = {
      header: column,
      key: column,
      width: colwidth,
    };

    worksheet_cols.push(header);
  });

  return worksheet_cols;
};

const removeNesting = (students) => {
  let allstudents = [];

  students.forEach((student) => {
    let student_data = {};
    for (const col in student) {
      if (isObject(student[col]) == true) {
        for (const attr in student[col]) {
          student_data[attr] = student[col][attr];
        }
      } else {
        student_data[col] = student[col];
      }
    }

    allstudents.push(student_data);
  });

  return allstudents;
};

const isObject = function (a) {
  return !!a && a.constructor === Object;
};

export default { createWorksheetCols, removeNesting };
