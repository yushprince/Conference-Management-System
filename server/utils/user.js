import prisma from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const findUser = async ({ email, username }) => {
 return await prisma.user.findFirst({
   where: {
     OR: [
       { email: email },
       { username: username }
     ]
   }
 });
};

const forgetPassword = async ({ email, encryptedPassword }) => {

 return await prisma.user.update({
   where: {
     email
   },
   data: {
     password: encryptedPassword
   }
 })
}

const login = async ({ email, password }) => {

 console.log(email)
 const findEmail = await prisma.user.findFirst({
   where: {
     email
   }
 });
console.log(findEmail)
 if (!findEmail) {
   throw new Error("Email Not found")
 }

 let comparedPass = bcrypt.compareSync(password, findEmail.password)

 if (!comparedPass) {
   throw new Error("Password is wrong.")
 }

 return findEmail;

}

const register = async ({ data }) => {
 return await prisma.user.create({
   data
 })

}

export default {
  register,
  login,
  forgetPassword,
  findUser
}