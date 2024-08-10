import prisma from "../utils/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserUtils from "../utils/user.js"
export const login = async (req, res) => {
 const { email, password } = req.body;

 try {
   let response = await UserUtils.login({ email, password });

   delete response.password;

   let data = {
     uuid: response.uuid,
     email: response.email,
   };
  
   const secretKey = process.env.SECRET_KEY;
   const token = jwt.sign(data, secretKey);

   return res.status(200).json({
     status: true,
     data: { ...response, token },
   });
 } catch (error) {
  console.log(error)
   return res.status(500).json({
     status: false,
     error: error.message,
   });
 }
};

export const forgetPassword = async (req, res) => {
 try {
   const { email, password, newPassword, type } = req.body;

   let result = await UserUtils.findUser({ email });

   if (result) {
     if (type == "forget") {
       let password = generator.generate({
         length: 5,
         numbers: true,
         uppercase: false,
         excludeSimilarCharacters: true,
       });
       console.log(password);
       let encryptedPassword = bcrypt.hashSync(password, 10);
       let response = await UserUtils.forgetPassword({
         email,
         encryptedPassword,
       });

       if (response) {
         delete response.password;
         delete response.superadmin;
       } else {
         return res.status(500).json({
           status: false,
           error: "Something went wrong",
         });
       }

       return res.status(200).json({
         status: true,
         data: password,
       });
     } else {
       let encryptedPassword = bcrypt.hashSync(newPassword, 10);
       let response = await UserUtils.forgetPassword({
         email,
         encryptedPassword,
       });
       return res.status(200).json({
         status: true,
         data: response,
       });
     }
   } else {
     return res.status(422).json({
       status: false,
       error: "Email Id is not registered",
     });
   }
 } catch (error) {
  
   return res.status(422).json({
     status: false,
     error: error.message,
   });
 }
};

export const register = async (req, res) => {
 let { name, email, password, phone } = req.body;
 let response;
 try {
   let findUser = await UserUtils.findUser({ email, name });
   if (!findUser) {
    
     let enc_password = bcrypt.hashSync(password, 10);
     let data = {
       name,
       email,
       password: enc_password,
       phone
       
     };

     response = await UserUtils.register({ data });
   } else {
     throw new Error("User Email or name Already Exist");
   }

   return res.status(200).json({
     status: true,
     data: response,
   });
 } catch (error) {
  
   return res.status(500).json({
     status: false,
     error: error.message,
   });
 }
};

export const details = async (req , res) =>{
  let uuid = req.uuid
  try{
   let details = await prisma.user.findFirst({
    where:{
     uuid
    }
   })
   res.status(200).json({
    status : "true",
    data : details
   })

  }catch (error) {
  
   return res.status(500).json({
     status: false,
     error: error.message,
   });
 }
}