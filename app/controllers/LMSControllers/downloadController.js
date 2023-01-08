import downloadService from '../../services/LMSServices/downloadService.js'
import fs from 'fs';

const downloadMaterial = async(req,res)=>{
    try{
        const file_data = await downloadService.getReadMatById(parseInt(req.params.reading_material_id));
        let buff = Buffer.from(file_data['file'], 'base64');
    fs.writeFileSync(`${file_data['file_name']}.${file_data['file_type']}`, buff);
    res.download(`${file_data['file_name']}.${file_data['file_type']}`, { dotfiles: 'deny' }, function (err) {
      if (err) {
        return err;
      }
      fs.unlinkSync(`${file_data['file_name']}.${file_data['file_type']}`);
    });
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export default {
    downloadMaterial,
}