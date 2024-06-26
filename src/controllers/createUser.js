import { Router } from "express"
import userModel from "../models/userModel.js";
import { send, setErrRes } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();
import uploads from "../middlewares/uploads.js";
import multer from "multer";


const profileUpload = uploads('Profiles').single("profile")
router.post("/", async (req, res) => {
    try {

        profileUpload(req,res,async(err)=>{
            if(err instanceof multer.MulterError){
            return send(res, setErrRes(RESPONSE.MULTER_ERROR,err.message))
            }else if(!req.file){
            return send(res, setErrRes(RESPONSE.REQUIRED, "Profile Picture"))
            }else{

            

        
        const { name, email, phone } = req.body;
        console.log(req.file);

        if (!name || name == undefined) {
            return send(res, setErrRes(RESPONSE.REQUIRED, "Name"))
        }
        if (!email || email == undefined) {
            return send(res, setErrRes(RESPONSE.REQUIRED, "Email"))
        }
        if (!phone || phone == undefined) {
            return send(res, setErrRes(RESPONSE.REQUIRED, "Phone Number"))
        }

        const emailPattern = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        if (!emailPattern) {
            return send(res, setErrRes(RESPONSE.PATTERN, "Email"))
        }
        const phonePattern = String(phone).match(/^\+\d{10,15}$/)
        if (!phonePattern) {
            return send(res, setErrRes(RESPONSE.PATTERN, "Phone"))
        }
        const isEmailExist = await userModel.findOne({
            email: email
        })
        if (isEmailExist) {
            return send(res, setErrRes(RESPONSE.EXIST, "Email"))
        }
        const isphoneExist = await userModel.findOne({
            phone: phone
        })
        if (isphoneExist) {
            return send(res, setErrRes(RESPONSE.EXIST, "Phone Number"))
        }
        await userModel.create({
            name: name,
            email: email,
            phone: phone,
            profile:req.file.filename
        })
        // return res.status(200).send("User created!!!!")
        return send(res, RESPONSE.SUCCESS)
    }
    })
    } catch (error) {
        console.log(error.message);
        return send(res, RESPONSE.FAIL)
    }
})

export default router;