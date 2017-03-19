var express = require('express');

var app = express();


var port = 5000;

// Middleware
app.use(express.static('public'));
app.use(express.static('src/views'));
// app.set('views','./src/views');
// app.set('view engine','pug')


// Routing
// app.get('/', function(req, res) {
//     res.render('index');
// });
app.get('/',function(req,res){
	res.send('hello world')
})

// Port 5000
app.listen(port, function(err) {
    console.log('running on port'+port);
});
 