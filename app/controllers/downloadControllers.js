import downloadService from '../services/downloadService.js';
import fs from 'fs';

const downloadExcel = async (req, res) => {
  try {
    const { select_fields, queries } = req.body;
    await downloadService.downloadExcel(select_fields, queries);
    res.download('export.xlsx', { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync('export.xlsx');
    });
  } catch (error) {
    res.json(error);
  }
};

const downloadCSV = async (req, res) => {
  try {
    const { select_fields, queries } = req.body;
    await downloadService.downloadCSV(select_fields, queries);
    res.download('export.csv', { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync('export.csv');
    });
  } catch (error) {
    res.json(error);
  }
};

export default { downloadExcel, downloadCSV };
