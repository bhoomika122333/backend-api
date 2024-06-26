import { Router } from "express"
import userModel from "../models/userModel.js";
import { send, setErrRes } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();
import constants from "../config/constants.js"

router.get("/", async (req, res) => {
    try {
        //   let userData=await userModel.find();

        // userData=userData.map((item)=>({
        //     id:item._id,
        //     name:item.name,
        //     email:item.email,
        //     phone:item.phone

        // }))
        let { userId } = req.query
        let query = {}
        //only wll visible the active value in user interface
        query.isactive=constants.STATE.ACTIVE;
        if (userId) query.$expr = { $eq: ["$_id", { $toObjectId: userId }] }


        //search functionality
        query.$and = [                                                   //and or
            { name: {$regex: req.query.name, $options: "i"}},
            { email:{$regex:req.query.email,}}
        ]

        const page=req.query.page ||1;
        const limit=5
        
        let userData = await userModel.aggregate([
        {
            $match: query
        },
        {
            $limit:limit,
        },
        {
            //sorting the created account 
            $sort: { createdAt: -1 }
        },
        {
            $skip:(page-1)* limit,
        },
        {
            $project:{__v:0,updatedAt:0,createdAt:0}
        }])
        userData=userData.map((ele)=>{
            return {...ele,profile:`/uploads/Profiles/  `+ele.profile}
        })
        return send(res, RESPONSE.SUCCESS, userData)
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.FAIL)
    }
})

export default router;