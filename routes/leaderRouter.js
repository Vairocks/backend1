const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
const cors = require('./cors');



//notice leader router has no ; so it is the obejct or .all .get .post .put .delete method below it
leaderRouter.route('/') //this router will be mounted in index.js
.options(cors.corsWithOptions,(req, res)=> {res.sendStatus(200);})
.get(cors.cors,(req,res,next) =>{
    Leaders.find(req.query)
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        },(err) => next(err))
        .catch((err) => next(err));
    
} )
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    console.log("Here I am",req.body);
    Leaders.create(req.body)
        .then((leader) => {
            console.log("Leader created:", leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        },(err) => next(err))
        .catch((err) => next(err));    
})


.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on leaders ');
})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    Leaders.remove({})
        .then((resp) =>{
            res.statusCode =200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err));   
} );


leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req, res)=> {res.sendStatus(200);})
.get(cors.cors,(req,res,next) =>{
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err));

} )


.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.end('POST operation not supported on /leaders/:'+req.params.leaderId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new: true})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err));

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) =>{
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));   

} );

module.exports =  leaderRouter;