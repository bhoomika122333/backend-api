const send=(res,responseData,Data={})=>{
    const {code,message}=responseData
    res.status(200)
    return res.send({
        responseCode:code,
        responseMessage:message,
        responseData:Data
    })
}

const setErrRes=(res,parameter)=>{
    return{
        code:res.code,
        message:`${parameter} ${res.message}`
    }
}
export {send,setErrRes}