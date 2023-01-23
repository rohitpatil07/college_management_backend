import downloadService from '../../services/LMSServices/downloadService.js';
import fs from 'fs';

const downloadMaterial = async (req, res) => {
  try {
    const file_data = await downloadService.getReadMatById(
      parseInt(req.params.reading_material_id),
    );
    const l = await downFunc(file_data , req, res);
    console.log(l)
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

const downloadSubmission = async (req, res) => {
  try {
    const file_data = await downloadService.getSubmissionById(
      parseInt(req.params.assignment_id),
      req.params.roll_no
    );
    await downFunc(file_data);
  } catch (error) {
    return error;
  }
}

const downFunc = async (fileData, req, res) => {
  try{
    let buff = Buffer.from(fileData['file'], 'base64');
    const filePath = `${fileData['file_name']}.${fileData['file_type']}`;
    await fs.promises.writeFile(filePath, buff);
    res.download(filePath, fileData['file_name'], function (err) {
      if (err) {
        return res.status(500).json({error: "Internal Server Error"});
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"});
  }
}

export default {
  downloadMaterial,
  downloadSubmission,
};
