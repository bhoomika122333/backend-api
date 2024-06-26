import mongoose from "mongoose";

const getConnection=()=>{
    mongoose.connect(
    process.env.DB_URI,
    {
        dbName:"accelerlab",
    }
).then(()=>{
    console.log("DB connected!!!!");
}).catch((error)=>{
    console.log("Failed to connect DB",error);
})
}
export default getConnection;