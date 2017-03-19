const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('inferenciador',['reglas']);

const app = express();


const port = 5000;

// Middleware
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.static('src/views'));

//Code in case of using Jade-Pug
// app.set('views','./src/views');
// app.set('view engine','pug')
// Routing
// app.get('/', function(req, res) {
//     res.render('index');
// });

//Home
app.get('/',(req,res,next)=>{
	res.send(console.log('use  /api/rules'));
});

//Fetch rules
app.get('/api/rules',(req,res,next)=>{
	db.reglas.find((err,docs)=>{
		if(err){
			res.send(err)
		}
		console.log('Rules found...');
		res.json(docs);
	});
});
//Fetch single rule
app.get('/api/rules/:id',(req,res,next)=>{
	db.reglas.findOne({_id: mongojs.ObjectId(req.params.id)},(err,doc)=>{
		if(err){
			res.send(err)
		}
		console.log('Rule found...');
		res.json(doc);
	});
});

//Add rule
app.post('/api/rules',(req,res,next)=>{
	db.reglas.insert(req.body,(err,doc)=>{
		if(err){
			res.send(err)
		}
		console.log('Adding rule...');
		res.json(doc);
	});
});
//Update/put rule
app.put('/api/rules/:id',(req,res,next)=>{
	db.reglas.findAndModify({query:{_id:mongojs.ObjectId(req.params.id)},
		update:{
			$set:{
				name:req.body.name,
				condition:req.body.condition
			}},
			new: true}, (err,doc)=>{
		if(err){
			res.send(err);
		}
		console.log('Updating Rule...');
		res.json(doc);
	});
});
//Delete rule
app.delete('api/rules/id:',(req,res,next)=>{
	db.reglas.remove({_id:mongojs.ObjectId(req.params.id)},(err,doc)=>{
		if(err){
			res.send(err);
		}
		console.log('Removing Rule...');
		res.json(doc);
	});
})



// Port 5000
app.listen(port, function(err) {
    console.log('server started on port: '+port);
});
 