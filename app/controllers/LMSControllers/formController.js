import subjectService from '../../services/LMSServices/subjectService.js';
import facultyService from '../../services/LMSServices/facultyService.js';

const upsertFaculty = async (req,res) =>{
  try{
    const data = await facultyService.upsertFaculty(req.body.faculty)
    res.json(data)
  } catch (error){
    console.log(error)
    return res.json(error);
  }
}

const upsertModule = async (req,res) =>{
  try{
    const data = await subjectService.upsertModule(req.body.module)
    res.json(data)
  } catch (error){
    console.log(error)
    return res.json(error);
  }
}

const upsertReadingMaterial = async (req,res) =>{
  try{
    const data = await subjectService.upsertReadingMaterial(req.body.reading)
    res.json(data)
  } catch (error){
    console.log(error)
    return res.json(error);
  }
}

const upsertSubject = async (req,res) =>{
  try{
    const data = await subjectService.upsertSubject(req.body.subject)
    res.json(data)
  } catch (error){
    console.log(error)
    return res.json(error);
  }
}

// const  = async (req,res) =>{
//   try{
//     const data = await subjectService.
//     res.json(data)
//   } catch (error){
//     console.log(error)
//     return res.json(error);
//   }
// }

export default { 
  upsertFaculty,
  upsertModule,
  upsertReadingMaterial,
  upsertSubject,
};
