import passport from "passport";
import { Strategy } from "passport-local";
import User from "../../models/userModel.js"


export default function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        (async function validateUser() {
            try {
                var user = await User.findOne({ email, password });

                if (user) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        })();
    }))
}