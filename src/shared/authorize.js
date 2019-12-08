const jwt = require('jsonwebtoken');

class AuthorizeClass {
  constructor() {
    this.secret = 'h@1IO+MorJ9!-$e)rEt';
    this.duration = '12h';
  }
  sign(data = {}, callback) {
    jwt.sign({
        'authentication': true,
        'data': data
      },
      this.secret,
      {expiresIn: this.duration},
      (err, token) => {
        if(err) {
          callback({"code": 403, "data": err});
        } else if(token) {
          callback({"code": 202, "data": "Bearer " + token});
        }
    });
  }
  verifyToken(req, res, next) {
    let authToken = req.headers['authorization'];
    if(typeof authToken !== 'undefined') {
      authToken = authToken.split(' ')[1];
      jwt.verify(authToken, 'h@1IO+MorJ9!-$e)rEt', (err, value) => {
        if(err) {
          res.locals.authenticated = false;
          res.status(401)
            .json({"code": 401, "type": "string", "data": "Unauthorized access."});
          next();
        } else if(value) {
          res.locals.authenticated = true;
          res.locals.uid = value.data.uid;
          next();
        }
      });
    } else {
      res.locals.authenticated = false;
      res.status(401)
        .json({"code": 401, "type": "string", "data": "Unauthorized access."});
      next();
    }
  }
}

const Authorize = new AuthorizeClass();
module.exports = Authorize;
