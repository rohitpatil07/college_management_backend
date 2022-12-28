const check = async (criteria, drives) => {
  const academic = criteria.academic_info;
  const offers = criteria.offers;

  const applied = criteria.applied_to_drives;

  var fields = [
    'cgpa',
    'be_percent',
    'tenth_percent',
    'twelveth_percent',
    'gap',
    'livekt',
    'deadkt',
    'gender',
    'company_name',
    'package',
  ];
  let final_drive = [];
  for (var i = 0; i < drives.length; i++) {
    var flag = true;
    for (var j = 0; j < 4; j++) {
      if (academic[fields[j]] < drives[i][fields[j]]) {
        flag = false;
        break;
      }
    }
    for (var k = 4; k < 7; k++) {
      if (academic[fields[k]] > drives[i][fields[k]]) {
        flag = false;
        break;
      }
    }
    for (var l = 0; l < offers.length; l++) {
      if (offers[l]['package'] * 1.5 >= drives[i]['package']) {
        flag = false;
      }
    }

    for (let j = 0; j < applied.length; j++) {
      if (applied[j].drive_id == drives[i].drive_id) {
        flag = false;
      }
    }

    if (flag) {
      final_drive.push(drives[i]);
    }
  }
  return final_drive;
};

export default { check };
