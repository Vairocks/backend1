const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
//notice leader router has no ; so it is the obejct or .all .get .post .put .delete method below it
leaderRouter.route('/') //this router will be mounted in index.js
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})

.get((req,res,next) =>{
    res.end('Will send all the leaders to you');
} )

.post((req,res,next) => {
    res.end('Will add the leader: '+ req.body.name + ' with details: '+ req.body.description);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on leaders ');
})
.delete((req,res,next) =>{
    res.end('Deleting all the leaders'); //dangerous operation
} );

leaderRouter.route('/:leaderId')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Contnet-Type','text/html');
    next(); //pass on modiied req and res to next function below it i.e app.get below
})
.get((req,res,next) =>{
    res.end('Will send the leader: ' +req.params.leaderId +' to you');
} )

.post((req,res,next) => {
    res.end('POST operation not supported on /leaders/:'+req.params.leaderId);
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Updating the leader: '+req.params.leaderId+'\n Will update the leader: '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) =>{
    res.end('Deleting the leader: '+req.params.leaderId); //dangerous operation
} );


module.exports =  leaderRouter;