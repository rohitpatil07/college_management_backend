import downloadService from '../services/downloadService.js';
import fs from 'fs';

const downloadExcel = async (req, res) => {
  try {
    const { select_fields, queries } = req.body;
    const filename = await downloadService.downloadExcel(
      select_fields,
      queries,
    );
    res.download(filename, { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync(filename);
    });
  } catch (error) {
    res.json(error);
  }
};

const downloadCSV = async (req, res) => {
  try {
    const { select_fields, queries } = req.body;
    const filename = await downloadService.downloadCSV(select_fields, queries);
    res.download(filename, { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync(filename);
    });
  } catch (error) {
    res.json(error);
  }
};

const resumeDownload = async (req, res) => {
  try {
    const rollno = String(req.params.roll_no);
    const filename = await downloadService.resumeDownload(rollno);
    res.download(filename, { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync(filename);
    });
  } catch (error) {
    res.json(error);
  }
};

const zipDownload = async (req, res) => {
  try {
    const students = req.body.data;
    const filename = await downloadService.zipDownload(students);
    res.download(filename, { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync(filename);
      var CleanDir = fs.readdirSync('./Zip');
      for (var v = 0; v < CleanDir.length; v++) {
        fs.unlinkSync(`./Zip/` + CleanDir[v]);
      }
    });
  } catch (error) {
    res.json(error);
  }
};

export default { downloadExcel, downloadCSV, resumeDownload, zipDownload };
