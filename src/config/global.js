const RESPONSE = {
    SUCCESS: {
        code: 200,
        message: "Everything is working"
    },
    FAIL: {
        code: 500,
        message: "something went wrong"
    },
    REQUIRED: {
        code: 500,
        message: "is required "
    },
    PATTERN: {
        code: 202,
        message: "is invalid "
    },
    EXIST: {
        code: 203,
        message: "is exist"
    },
    MULTER_ERROR:{
        code:204,
        message:""
    }
}
export default RESPONSE;