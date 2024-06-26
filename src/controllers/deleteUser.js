import { Router } from "express"
import userModel from "../models/userModel.js";
import { send, setErrRes } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
import constants from "../config/constants.js";
const router = Router();

router.delete("/", async (req, res) => {
    try {
        let { userId } = req.query
        // await userModel.deleteOne({_id:userId})
        await userModel.updateOne(
            { _id: userId },
              { $set: { isactive: constants.STATE.INACTIVE } })

        return send(res, RESPONSE.SUCCESS)

    } catch (error) {
        return send(res, RESPONSE.FAIL)
    }
})
export default router;