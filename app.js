const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const mongojs = require('mongojs');
const db = mongojs('inferenciador',['reglas']);




const port = 5000;

// Middleware
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.static('src/views'));

//Socket.io code test
// app.use(express.static(path.join(__dirname,'public')));

// io.on('connection',socket=>{
// 	console.log('new connection made');

// 	socket.emit('message-from-server',{
// 		greeting:'Hello from Server'
// 	});
// 	socket.on('message-from-client',msg=>{
// 		console.log(msg);
// 	});
// });

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
		console.log('Deleting Rule...');
		res.json(doc);
	});
})



// Port 5000
app.listen(port, function(err) {
    console.log('server started on port: '+port);
});
 