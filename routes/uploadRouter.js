const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer'); 
const cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename:(req, file, cb) => {
        cb(null, file.originalname);
    }
});


const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'),false)
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter:imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());
//notice dish router has no ; so it is the obejct or .all .get .post .put .delete method below it

uploadRouter.route('/')//only post operations will be allowed
.options(cors.corsWithOptions,(req, res)=> {res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('Get operation not supported on Image upload ');
})

.post(cors.corsWithOptions,authenticate.verifyUser, upload.single('imageFile'), (req, res,) => {
 res.statusCode = 403;
 res.setHeader('Content-Type', 'application/json');
 res.json(req.file);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on Image upload ');
})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on Image uupload ');
})



module.exports= uploadRouter;