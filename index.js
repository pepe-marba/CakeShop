const express = require('express')
const mongoose = require('mongoose')

const app = express();

//Connecting to DB
mongoose.connect('mongodb://localhost:27017/CakeShop',{
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
.then(()=> {
    console.log('Connected to db')
})
.catch((error) => {
    console.log(error);
})

const Cake = require('./model/models')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//List all documents (Cakes)
app.get('/cakes', (req, res) => {
    Cake.find({}).then(function(cakes){
        res.json(cakes);
    })
})

//Get one document (Cake) by Id
app.get('/cakes/:name', (req, res) => {
    var filter = {name: req.params.name};
    Cake.find(filter, (err, cake) =>{
            res.json(cake)
           }).catch((err) => {
            console.log(err)
        })
})

//Create a document (Cake)
app.post('/cakes', (req, res) => {
    name = req.body.name,
    price = req.body.price,
    flavors = req.body.flavors

    var filter= {name : req.body.name};
    Cake.countDocuments(filter, function(err, total){
        
        if(total >= 1){
            res.send("The cake name must be unique");
            return("The cake name must be unique");
        }else{
            
            let newCake = new Cake({
                name: name,
                price: price,
                flavors: flavors
            })
        
            newCake.save().then((cake) => {
                res.json(cake)
            }).catch((err) => {
                console.log(err)
            })
        }

    })
})

//Delete one document (Cake) from DB
app.delete('/cakes/:name', (req, res) => {
    var filter = { name: req.params.name };
    Cake.findOneAndDelete(filter, function(err, result){
        if(err) console.log(err);
        if(result === null){
            res.send("The cake wasn't found");
            return ("The cake wasn't found");
        }
        console.log("The cake record was removed from the DB");
        res.send("The cake record was removed from the DB");
    })
})

//Update one document (Cake) from DB
app.put('/cakes', (req, res) => {
    Cake.updateOne({name: req.body.name}, {name: req.body.name, price: req.body.price, flavors: req.body.flavors}, function(err, result){
        if(err){
            console.log(err);
        }else{
            if(result.n > 0){
                res.send("The cake was updated.");
            }else{
                res.send("The cake wasn't found.");
            }
            
        }
    })
})

app.listen(3002, ()=> {
    console.log('Server listening on port: 3002');
});