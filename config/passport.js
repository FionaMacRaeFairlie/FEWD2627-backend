import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "../config/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToKey = join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        console.log(jwt_payload);
        const user = await db.findOne({ _id: jwt_payload.sub });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
