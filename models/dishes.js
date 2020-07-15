const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating:{
        type: Number,
        min:1,
        max:5,
        default: 5
    },
    comment:{
        type: String,
        default: ''
    },
    author:{
        type:String,
        default: 'anonymous'
    }
}, {
    timestamps:true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required:true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        defalut : ''
    },
    price : {
        type: Currency,
        required : true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },

    commments: [commentSchema]
},  
{
        timestamps: true
});

// module name = mongoose.model('modle_name',dishSchema_it_has_used);
// here modle_name 'Dish' automatically pluralize to Dishes  
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;