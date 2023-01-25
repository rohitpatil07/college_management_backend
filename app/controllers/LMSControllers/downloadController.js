import downloadService from '../../services/LMSServices/downloadService.js';
import fs from 'fs';
import AdmZip from 'adm-zip';

const downloadAssignment = async (req, res) => {
  try {
    const file_data = await downloadService.getAssignmentById(
      parseInt(req.params.assignment_id),
    );
    await downFunc(file_data, req, res);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
}

const downloadMaterial = async (req, res) => {
  try {
    const file_data = await downloadService.getReadMatById(
      parseInt(req.params.reading_material_id),
    );
    await downFunc(file_data , req, res);
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
    await downFunc(file_data, req, res);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
}

const downloadZip = async (req, res) => {
  try {
    const file_data = await downloadService.getAllSubmissions(parseInt(req.params.assignment_id));
    const zip = new AdmZip();
    file_data.forEach((file) => {
      const buff = Buffer.from(file.file, 'base64');
      zip.addFile(`${file.file_name}.${file.file_type}`, buff);
    });
    const zipFile = zip.toBuffer();
    const fileName = `assignment_${req.params.assignment_id}.zip`;
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': zipFile.length
    });
    res.send(zipFile);
    if(fs.existsSync(fileName)){
      await fs.promises.unlink(fileName);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
  downloadAssignment,
  downloadMaterial,
  downloadSubmission,
  downloadZip,
};
