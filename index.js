const express = require("express");
const app = express()
const path = require("path")
const multer = require("multer")
app.set("views", path .join( __dirname , "views"))
app.set("view engine", "ejs");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {



        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\.[^/.]+$/," ") + '_' + Date.now() + path.extname(file.originalname))
    }

})
// destination:"uploads"


let maxsize = 3 * 1000 * 1000
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxsize
    },
    fileFilter: function (req, file, cb) {
        let fileTypes = /jpeg|jpg|png/;
        let mimetype = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        if (mimetype && extname) {
            return cb(null, true)

        }
        cb("Error:File upload Only Support The Following Filetype:" + fileTypes)
    }
}).single('mypic');

app.get("/", (req, res) => {
    res.render("signup")

})

app.post("/upload",(req,res,next)=>{
upload(req,res ,function(err)
{
    if(err)
    {
        res.send(err)
    }
    else{
        res.send("success ,image Uploads")
    }
}

)
})
app.listen(8080, () => {
    console.log("Sever Is Running");
})