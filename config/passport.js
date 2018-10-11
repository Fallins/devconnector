const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const secretOrKey = require('../config/keys').secretOrKey

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
}

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user) // first parameter is error
                }

                return done(null, false)
            })
            .catch(err => console.log(err))
    }))
}