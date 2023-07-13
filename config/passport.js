import passport from "passport";
import localStrategy from "./strategies/local.strategy.js";

export default function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    localStrategy();

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}