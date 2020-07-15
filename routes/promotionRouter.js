const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promos = require('../models/promotions');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
//notice promotion router has no ; so it is the obejct or .all .get .post .put .delete method below it
promotionRouter.route('/') //this router will be mounted in index.js

.get((req,res,next) =>{
    Promos.find({})
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        },(err) => next(err))
        .catch((err) => next(err));
    
} )

.post((req,res,next) => {
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

.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on promotions ');
})
.delete((req,res,next) =>{
    Promos.remove({})
        .then((resp) =>{
            res.statusCode =200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },(err) => next(err))
        .catch((err) => next(err));   
} );

promotionRouter.route('/:promotionId')

.get((req,res,next) =>{
    Promos.findById(req.params.promotionId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err) => next(err))
    .catch((err) => next(err));

} )

.post((req,res,next) => {
    res.end('POST operation not supported on /promotions/:'+req.params.promotionId);
})

.put((req,res,next) => {
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
.delete((req,res,next) =>{
    Promos.findByIdAndRemove(req.params.promotionId)
    .then((resp) =>{
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));   

} );



module.exports =  promotionRouter;