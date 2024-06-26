import { Router } from "express"
import userModel from "../models/userModel.js";
import { send, setErrRes } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();

router.put("/", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        let updates = {};
        let {userId}=req.query
        //email update
        if (name || name !== undefined) updates.name = name

        if (email || email != undefined) {
            const isEmailExist=await userModel.findOne({
                email:email
            })
            if(isEmailExist){
                return send(res,setErrRes(RESPONSE.EXIST,"Email"))
            }
            const emailPattern = String(email).match(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            );
            if (!emailPattern) {
                return send(res, setErrRes(RESPONSE.PATTERN, "Email"));
            } else {
                updates.email = email
            }
            

        }
        //phone number update
        if(phone||!phone==undefined){
            const isphoneExist=await userModel.findOne({
                phone:phone
            })
            if(isphoneExist){
                return send(res,setErrRes(RESPONSE.EXIST,"Phone Number"))
            }
            const phonePattern=String(phone).match(/^\+\d{10,15}$/)
        if(!phonePattern){
            return send(res,setErrRes(RESPONSE.PATTERN,"Phone"))
        }else{
            updates.phone=phone
        }
        }
        await userModel.updateMany({ _id:userId  }, [
            { $set: updates }
        ])
            return send(res,RESPONSE.SUCCESS)
    } catch (error) {
        return send(res, RESPONSE.FAIL)

    }
})

export default router;