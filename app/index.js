const exp = require('express');
	path = require('path'),
	stylus = require('stylus'),
	nib = require('nib'),
	app = exp(),

	arr = ['first', 'second', 'third', 'fourth'];


function compileCss(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}


/******************************************************/

app.set('port', process.env.PORT || 3000);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/view"));

app.use(stylus.middleware(
  { 
  	src: __dirname + '/public', 
  	compile: compileCss
  }
));
app.use(exp.static(__dirname + '/public'))


/******************************************************/

app.get('/', (req, res) => {
	res.type('text/html');
	res.render("base", {
        randomPoints: arr
    });
});

app.get('/about', (req, res) => {
	res.type('text/plain');
	res.send('About');
});

app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 — Not found');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 — Internal server error');
});


/******************************************************/

app.listen(app.get('port'), () => {
	console.log('Started at http://localhost:' + app.get('port'));
});

