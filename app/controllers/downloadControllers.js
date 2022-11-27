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

export default { downloadExcel, downloadCSV };
