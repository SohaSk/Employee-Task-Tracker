const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const sql = fs.readFileSync(path.join(__dirname, '..', 'migrations', '001-create-tables.sql'), 'utf8');
const dbPath = path.join(__dirname, '..', '..', process.env.DB_STORAGE || 'database.sqlite');

const db = new sqlite3.Database(dbPath);
db.exec(sql, (err) => {
  if (err) {
    console.error('Migration failed:', err);
  } else {
    console.log('Migration ran successfully.');
  }
  db.close();
});
