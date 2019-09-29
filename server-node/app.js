let cookieParser = require('cookie-parser');
let csrf = require('csurf');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let CryptoJS = require("crypto-js");
let crypto = require('crypto');
let cryptedPass = require('./config');
let io = socketIO(server);

let port = process.env.PORT || 3000;

let csrfProtection = csrf({
  cookie: true
});

let token;
let ServerCookieXsrf;

crypto.randomBytes(48, function (err, buffer) {
  token = buffer.toString('hex');
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', csrfProtection, function (req, res) {
  ServerCookieXsrf = req.csrfToken();
  res.json({
    'XSRFTOKEN': req.csrfToken()
  });
});

app.post('/api/login', (req, res) => {

  if (req.headers.authorization) {

    if (req.headers.authorization == ServerCookieXsrf) {

      let email = req.body.params.updates[0].value;
      let password = req.body.params.updates[1].value;

      let Emaildecrypted = CryptoJS.AES.decrypt(email, cryptedPass.secretKey).toString(CryptoJS.enc.Utf8);
      let Passwordecrypted = CryptoJS.AES.decrypt(password, cryptedPass.secretKey).toString(CryptoJS.enc.Utf8);

      if (Emaildecrypted == cryptedPass.fakeEmail && Passwordecrypted == cryptedPass.fakepass) {
        res.json({
          AccessToken: token
        });
      } else {
        res.status(401).send();
      }
    }else{
      res.status(401).send();
    }
  }
});

app.listen(3000, () => console.log(`Server started on port 3000`));
