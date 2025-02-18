const app = require('express')();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const upload = multer({dest: "userImages/"});

const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(cors());

//HOSTING PAGES

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/part', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'part.html'));
});

//HOSTING IMAGES

//GET INFO

app.get('/info:part', (req, res) => {
  const part = req.params.part;

  const db = new sqlite3.Database("database.db");
  db.serialize(() => {
    db.get('SELECT ID, TYPE FROM ITEMS WHERE ID = ?', [part], (err, row) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (row) {
        console.log(`ID: ${row.ID}, TYPE: ${row.TYPE}`);
        res.json(row);
      } else {
        res.status(404).send('Item not found');
      }
      db.close();
    });
  });
});

app.get('/create', (req, res) => {
  const { name, brand, description, type, colour, size = '', rating, price = null,} = req.body;
  
  // const name = req.body.name || null;
  // const brand = req.body.brand || null;
  // const description = req.body.description || null;
  // const type = req.body.type || null;
  // const colour = req.body.colour || null;
  // const size = req.body.size || null;
  // const rating = req.body.rating || null;
  // const price = req.body.price || null;
  const db = new sqlite3.Database("database.db");
  db.serialize(() => {
    db.run('INSERT INTO ITEMS (NAME, BRAND, DESCRIPTION, TYPE, COLOUR, SIZE, RATING, PRICE) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, brand, description, type, colour, size, rating, price], function(err) {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.json({id: this.lastID});
    });
  });
});

app.listen(3000);
console.log('listening at port 3000!');
