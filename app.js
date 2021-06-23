const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var path = require('path');
const { getMaxListeners } = require('process');
var home = path.join(__dirname, '/pages/home/');
var signin = path.join(__dirname, '/pages/signin/');
var store = path.join(__dirname, '/pages/store/');

///////////////////////////////////////
//////////////HOME PAGE///////////////
/////////////////////////////////////

app.get('/', function (req, res) {
  res.sendFile(path.join(home, 'index.html'));
});

app.get('/pages/home/style.css', function (req, res) {
  res.sendFile(path.join(home, 'style.css'));
});

app.get('/pages/home/script.js', function (req, res) {
  res.sendFile(path.join(home, 'script.js'));
});

///////////////////////////////////////
///////////SIGN IN PAGE///////////////
/////////////////////////////////////

app.get('/signin', function (req, res) {
  res.sendFile(path.join(signin, 'index.html'));
});

app.get('/pages/signin/style.css', function (req, res) {
  res.sendFile(path.join(signin, 'style.css'));
});

app.get('/pages/signin/script.js', function (req, res) {
  res.sendFile(path.join(signin, 'script.js'));
});

///////////////////////////////////////
///////////STORE PAGE/////////////////
/////////////////////////////////////

app.get('/store', function (req, res) {
  res.sendFile(path.join(store, 'index.html'));
});

app.get('/pages/store/style.css', function (req, res) {
  res.sendFile(path.join(store, 'style.css'));
});

app.get('/pages/store/script.js', function (req, res) {
  res.sendFile(path.join(store, 'script.js'));
});

///////////////////////////////////////
///////////ALL USERS//////////////////
/////////////////////////////////////

var users = [];
var allTicketContent = [];
var userLoggedIn;

///////////////////////////////////////
///////////LOGIN DATA/////////////////
/////////////////////////////////////

app.post('/login', (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  const newIdToken = req.cookies[`newIdToken${user}`];

  users.map((userLogin) => {
    console.log(userLogin);
    if (userLogin.user === user && userLogin.password === password && userLogin.newIdToken === (newIdToken)) {
      console.log("entrou");
      userLoggedIn = user;
      res.send('/store');
      console.log(user, password);
      console.log(userLogin.newIdToken)
    } else { console.log("Usuário ou senha inválida"); }
  })
})

///////////////////////////////////////
///////////SIGNIN DATA////////////////
/////////////////////////////////////

app.post('/signinuser', (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;
  const confirmepassword = req.body.confirmepassword;
  const newIdToken = `7573756172696f${(new Date()).getTime()}:${user}`

  if (password === confirmepassword) {
    res.cookie(`newIdToken${user}`, newIdToken, { maxAge: 900000, httpOnly: true });
    let newUser = {
      'user': user,
      'email': email,
      'password': password,
      'newIdToken': newIdToken
    }
    users.push(newUser);
    res.send('/');
    console.log(newIdToken);
    console.log(users);
  } else { console.log("Senhas diferentes") }

  console.log(user, email, password);
});

app.post('/ticket', function (req, res) {
  const ticketContent = req.body.ticketContent;
  const newIdToken = req.cookies[`newIdToken${userLoggedIn}`];
  const newIdTokenName = newIdToken.split(":").pop()
  const ticketContainer = {
    asking: userLoggedIn,
    user: newIdTokenName,
    content: ticketContent
  };

  allTicketContent.push(ticketContainer);

  console.log(allTicketContent);

  res.send(allTicketContent);
})

app.get('/name', function (req, res) {
  res.send(userLoggedIn);
});

app.get('/ticket', function (req, res) {
  res.send(allTicketContent);
});

app.listen(80);