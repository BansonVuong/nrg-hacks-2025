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

app.get('/info/:part', (req, res) => {
  const part = req.params.part;

  const db = new sqlite3.Database("database.db");
  db.serialize(() => {
    db.get('SELECT ID, TYPE, NAME, DESCRIPTION, MATERIAL, PRICE, RATING, QUANTITY, PRICE_PER_SWITCH, SWITCH_TYPE, BRAND, SIZE, PCB_INCLUDED, HOTSWAPPABLE FROM ITEMS WHERE ID = ?', [part], (err, row) => {
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

// app.get('/create', (req, res) => {
//   const { name, price, brand, description = '', rating = null, type = '' } = req.query;

//   const db = new sqlite3.Database("database.db");
//   db.serialize(() => {
//     db.run(
//       'INSERT INTO ITEMS (NAME, BRAND, DESCRIPTION, TYPE, PRICE, RATING) VALUES (?, ?, ?, ?, ?, ?)',
//       [name, brand, description, type, price, rating],
//       function (err) {
//         if (err) {
//           res.status(500).send(err.message);
//           return;
//         }
//         console.log(`A row has been inserted with rowid ${this.lastID}`);
//         res.json({ id: this.lastID });
//         db.close();
//       }
//     );
//   });
// });

app.listen(3000);
console.log('listening at port 3000!');
