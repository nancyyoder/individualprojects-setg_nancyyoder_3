var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

// const hostname = '127.0.0.1';
const hostname = '0.0.0.0';
const port = 3000;

var pgp = require('pg-promise')();

// const dbConfig = {
// 	host: 'db',
// 	port: 5432,
// 	database: 'saved_tracks',
// 	user: 'postgres',
// 	password: 'Rosie123'
// };

const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
	pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.render('pages/main', {
      my_title: "Main Page",
      item: '',
      error: ''
    });
})

app.get('/main', (req, res) => {
    res.render('pages/main', {
        my_title: "Main Page",
        item: '',
        error: ''
    });
})

app.get('/searches', (req, res) => {
  var query = "select * from saved_tracks"
  db.task('get-everything', task => {
		return task.batch([
			task.any(query)
		]);
	})
  .then(data => {
		res.render('pages/searches',{
				my_title: "Search History",
				data: data[0]
			})
	})
  .catch(err => {
		// display error message in case an error
			console.log('error', err);
			res.render('pages/searches',{
				my_title: "Page Title Here",
        table: '',
        data: ''
			})
	});
})

app.post('/add', function(req, res) {
  var track_name = req.body.track_name;
  var artist_name = req.body.artist_name;
  var track_type = req.body.track_type;
  var track_genre = req.body.track_genre;
  var release_date = req.body.release_date;
  console.log(track_name);
  console.log(artist_name);
  console.log(track_type);
  console.log(track_genre);
  console.log(release_date);
  var insert_statement = "insert into saved_tracks(track_name, artist_name, track_type, track_genre, release_date) values('" + track_name + "','" + artist_name + "','" + track_type + "','" + track_genre + "','" + release_date + "');";
  var query = "select * from saved_tracks"
  db.task('get-everything', task => {
		return task.batch([
      task.any(insert_statement),
			task.any(query)
		]);
	})
  .then(function (rows) {
    res.redirect('/searches');

      
      }) 
  .catch(function (err) {
    console.log('error',err);
      })
    
});

// const server = app.listen(port, hostname, () => console.log(`App running at http://${hostname}:${port}/`))
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
module.exports = server;
