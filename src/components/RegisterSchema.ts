import * as z from "zod"

export const schema= z.object({
  name:z.string().nonempty("Name Is Required")
    .min(3,"Minimum Characters is 3")
    .max(15 , "Maximum Characters is 15"),
  email:z.string().nonempty("Email Is Required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "A valid email has text before @, a domain after it, and an extension of at least two letters."),
  password:z.string().nonempty("Password Is Required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"A valid password must be at least 8 characters long and include uppercase and lowercase letters, plus at least one of numbers and one of special character."),
  rePassword:z.string().nonempty("RePassword Is Required"),
  phone:z.string().nonempty("Phone Is Required").regex(/^01[0125][0-9]{8}$/ , "Invalid phone number. It must start with 010, 011, 012, or 015 and contain 11 digits.")
}).refine((data)=> data.password === data.rePassword , {path : ["rePassword"] , message:"Password and RePassword do not match"} )