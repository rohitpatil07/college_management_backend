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
    await downloadService.resumeDownload(rollno);
    setTimeout(()=>{
      res.download(`${rollno}_resume.pdf`);
    },500);
  } catch (error) {
    res.json(error);
  }
};

const zipDownload = async (req, res) => {
  try {
    const students = req.body.data;
    await downloadService.zipDownload(students);
    setTimeout(()=>{
    res.download('export.zip');
    },1500);
  } catch (error) {
    res.json(error);
  }
}

export default { downloadExcel, downloadCSV, resumeDownload, zipDownload };
