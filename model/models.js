const mongoose = require('mongoose');
const cakeSchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    price:{
        type: mongoose.Decimal128,
        required: false
    },
    flavors:{
        type: [String],
        required: false
    }
})

const Cake = mongoose.model('Cake',cakeSchema)

module.exports = Cake