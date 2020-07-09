const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
//notice promotion router has no ; so it is the obejct or .all .get .post .put .delete method below it
promotionRouter.route('/') //this router will be mounted in index.js
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})

.get((req,res,next) =>{
    res.end('Will send all the promotions to you');
} )

.post((req,res,next) => {
    res.end('Will add the promotion: '+ req.body.name + ' with details: '+ req.body.description);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on promotions ');
})
.delete((req,res,next) =>{
    res.end('Deleting all the promotions'); //dangerous operation
} );

promotionRouter.route('/:promotionId')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})
.get((req,res,next) =>{
    res.end('Will send the promotion: ' +req.params.promotionId +' to you');
} )

.post((req,res,next) => {
    res.end('POST operation not supported on /promotions/:'+req.params.promotionId);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Updating the promotion: '+req.params.promotionId+'\n Will update the promotion: '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) =>{
    res.end('Deleting the promotion: '+req.params.promotionId); //dangerous operation
} );


module.exports =  promotionRouter;