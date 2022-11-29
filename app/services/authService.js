import prisma from '../config/prisma.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (mail,password,role)=>
{
    console.log(role);
    if (role=="student")
    {
        try{
            console.log(mail,password,role);
            const student = await prisma.students.findMany({
                where :{
                    email:{
                        equals:mail
                    },  
                },
                select:
                {
                    roll_no:true,
                }
            })
            console.log(student[0].roll_no)
            const hashing = await hash_password(password)
            const result = await bcrypt.compare(password,hashing)
            if (result==true)
            {
                const token = jwt.sign({email:mail},config.JWT_SECRET)
                console.log(token);
            }
            else
            {
                return "invalid password";
            }
            //console.log(await  hash(123456))
            
            return student[0];
    
        }
        catch(err){
    
            return err;
        }
    
    }
    if(role=="admin")
    {
        try{
            console.log(mail,password,role);
            const admins = await prisma.admins.findMany({
                where :{
                    email:{
                        equals:mail
                    },  
                },
                select:
                {
                    college_name:true,
                }
            })
            console.log(admins[0].college_name)
            const hashing = await hash_password(password)
            const result = await bcrypt.compare(password,hashing)
            if (result==true)
            {
                const token = jwt.sign({email:mail},config.JWT_SECRET)
                console.log(token);
            }
            else
            {
                return "invalid password";
            }
            //console.log(await  hash(123456))
            
            return admins[0];
    
        }
        catch(err){
    
            return err;
        }
    }
    if(role=="company")
    {
        try{
            console.log(mail,password,role);
            const company = await prisma.company.findMany({
                where :{
                    email:{
                        equals:mail
                    },  
                },
                select:
                {
                    company_id:true,
                }
            })
            console.log(company[0].company_id)
            const hashing = await hash_password(password)
            const result = await bcrypt.compare(password,hashing)
            if (result==true)
            {
                const token = jwt.sign({email:mail},config.JWT_SECRET)
                console.log(token);
            }
            else
            {
                return "invalid password";
            }
            //console.log(await  hash(123456))
            
            return company[0];
    
        }
        catch(err){
    
            return err;
        }
    }
    
}

const hash_password = async (password) =>
{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(String(password),salt);
    return hashed;
}




export default {login}