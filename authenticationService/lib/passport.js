const fs = require("fs");
const path = require("path");
const UserCredentials = require("../database/models/UserCredentials");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const pathToKey = path.join(__dirname, "../config/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserCredentials.findOne({ _id: jwt_payload.sub }, (err, user) => {
        if (err) {
          return done(err, false, { error: err });
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { error: "User is not registered" });
        }
      });
    })
  );
};
