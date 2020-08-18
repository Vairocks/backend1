const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Promos = require('../models/promotions');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
const cors = require('./cors');

//notice promotion router has no ; so it is the obejct or .all .get .post .put .delete method below it
promotionRouter.route('/') //this router will be mounted in index.js
.options(cors.corsWithOptions,(req, res)=> {res.sendStatus(200);})
.get(cors.cors,(req,res,next) =>{
    Promos.find(req.query)
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        },(err) => next(err))
        .catch((err) => next(err));
    
} )

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    console.log("Here I am",req.body);
    Promos.create(req.body)
        .then((promo) => {
            console.log("Promotion created:", promo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        },(err) => next(err))
        .catch((err) => next(err));    
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on promotions ');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    Promos.remove({})
        .then((resp) =>{
            res.statusCode =200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err));   
} );

promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions,cors.corsWithOptions,(req, res)=> {res.sendStatus(200);})
.get(cors.cors, (req,res,next) =>{
    Promos.findById(req.params.promotionId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));

} )

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.end('POST operation not supported on /promotions/:'+req.params.promotionId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Promos.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {new: true})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    Promos.findByIdAndRemove(req.params.promotionId)
    .then((resp) =>{
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));   

} );



module.exports =  promotionRouter;