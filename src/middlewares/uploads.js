import multer from "multer";

const storage =(dest)=> multer.diskStorage({
    destination: `./public/uploads/${dest}`,
    filename: (req, file, cb) => {
        // cb(null, file.originalname)
        const uniqueFile=Date.now();
        const ext=file.originalname.substring(file.originalname.lastIndexOf("."))
        cb(null,uniqueFile +ext)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("jpeg") ||
        file.mimetype.includes("png") ||
        file.mimetype.includes("heic")) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const maxsize = 1024 * 1024 * 2

const uploads=(dest) => multer({
    storage: storage(dest),
    limits: { fileSize: maxsize },
    fileFilter: fileFilter
})

export default uploads;