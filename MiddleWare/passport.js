const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const localStrategy = require('passport-local').Strategy
const {ExtractJwt} = require('passport-jwt')
const {JWT_Secret} = require('../Config')
const User = require('../Models/User')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey:JWT_Secret
}, async (payload, done)=>{
    try {
        // check token, find user
        const user = await User.findById(payload.sub)
        if(!user) done(null, false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new localStrategy({
    usernameField:'email'
},
async (email, password, done) => {
   try {
    const user = await User.findOne({email})

    if(!user) return done(null, false)

    // so sanh password nhap vao vs password ben CSDL
    const isCorrectPassword = await user.isValidPassword(password)

    if(!isCorrectPassword) return done(null, false)
    done(null, user)
   } catch (error) {
       done(error, false)
   }
}))




