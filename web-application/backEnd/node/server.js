const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const user = "MongoDBWeb2013";
const password = "28574139";
const url = `mongodb://${user}:${password}@172.20.0.54:27017/?authMechanism=DEFAULT&authSource=${user}`;
const dbName = user;
const client = new MongoClient(url);
const app = express();
const body_parser = require('body-parser');
const port = 3000;


app.use(body_parser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "origin, X-Requested-With,content-type,accept");
    next();
})


// get data from collection
app.get('/getPeople/added', (req, res) => {
    client.connect(function (err) {
        
        assert.equal(null, err);
        const db = client.db(dbName);

        let people = db.collection('personages');

        people.find({}).toArray(function (err, docs) {

            assert.equal(err, null);
            res.send(docs);

        })

    })

})

app.get('/getPeople/deleted', (req, res) => {
    client.connect(function (err) {
        
        assert.equal(null, err);
        const db = client.db(dbName);

        let people = db.collection('personages');

        people.find({}).toArray(function (err, docs) {

            assert.equal(err, null);
            res.send(docs);

        })

    })


})




// send data 
app.post('/getPeople/added', (req, res) => {
    client.connect(function (err) {
        assert.equal(null, err);
        let newPersonage = req.body;
        console.log(newPersonage);
        const db = client.db(dbName);
        let people = db.collection("personages");
        console.log(newPersonage);
        people.insertOne(newPersonage, function (err, r) {   
            
            
        });

    })
    
})

// delete data
app.post('/getPeople/deleted', (req, res) => {
    client.connect(function (err) {
        assert.equal(null, err);
        let newPersonage = req.body;
        console.log(newPersonage);
        const db = client.db(dbName);
        let people = db.collection("personages");
        console.log(newPersonage);
        people.deleteOne(newPersonage, function (err, r) {  
        });

    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));