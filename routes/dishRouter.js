const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//notice dish router has no ; so it is the obejct or .all .get .post .put .delete method below it
dishRouter.route('/') //this router will be mounted in index.js
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})

.get((req,res,next) =>{
    res.end('Will send all the dishes to you');
} )

.post((req,res,next) => {
    res.end('Will add the dish: '+ req.body.name + ' with details: '+ req.body.description);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on dishes ');
})
.delete((req,res,next) =>{
    res.end('Deleting all the dishes'); //dangerous operation
} );

dishRouter.route('/:dishId')


.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})
.get((req,res,next) =>{
    res.end('Will send the dish: ' +req.params.dishId +' to you');
} )

.post((req,res,next) => {
    res.end('POST operation not supported on /dishes/:'+req.params.dishId);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Updating the dish: '+req.params.dishId+'\n Will update the dish: '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) =>{
    res.end('Deleting the dish: '+req.params.dishId); //dangerous operation
} );


module.exports =  dishRouter;