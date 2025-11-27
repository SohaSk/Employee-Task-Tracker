const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const sql = fs.readFileSync(path.join(__dirname, '..', 'seeders', 'seed-sample-data.sql'), 'utf8');
const dbPath = path.join(__dirname, '..', '..', process.env.DB_STORAGE || 'database.sqlite');

const db = new sqlite3.Database(dbPath);
db.exec(sql, (err) => {
  if (err) {
    console.error('Seeding failed:', err);
  } else {
    console.log('Seed ran successfully.');
  }
  db.close();
});
