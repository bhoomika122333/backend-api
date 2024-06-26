import express from "express";
import createUser from "./src/controllers/createUser.js";
import listUser from "./src/controllers/listUser.js"
import updateUser from "./src/controllers/updatUser.js"
import deleteUser from "./src/controllers/deleteUser.js"


const router=(app)=>{
    app.use(express.json());
    app.use("/api/user/create",createUser)
    app.use("/api/user/list",listUser)
    app.use("/api/user/update",updateUser)
    app.use("/api/user/delete",deleteUser)

}
export default router;