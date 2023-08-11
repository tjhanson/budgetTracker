const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const config = require('config')
// const jwt = require('jsonwebtoken')
// const auth = require('../../middleware/auth')

// const User = require('../../schema/User');

// //@route   POST api/auth
// //@desc    authenticate user
// //@access  Public
// router.post('/', (req, res) => {
//     const {username, password } = req.body;
//     if (!username || !password){
//         return res.status(400).json({msg:'Please enter all fields'})
//     }

//     User.findOne({ username }).then(user => {
//         if(!user) return res.status(400).json({msg: "user does not exist"})
    

//         bcrypt.compare(password, user.password)
//         .then(isMatch => {
//             if(!isMatch) return res.status(400).json({msg:"invalid credentials"})

//             jwt.sign(
//                 { id:user.id,username:user.username,projects: user.projects},
//                 config.get('jwtSecret'),
//                 { expiresIn: 36000},
//                 (err,token) => {
//                     if (err) throw err;
//                     res.json({
//                         token,
//                         user: {
//                            _id: user.id,
//                             name:user.name,
//                             username: user.username,
//                             projects:user.projects
                            
//                         }
//                     })
//                 }
            
//             )
//         })
//     })
// })
// //@route   GET api/auth/user
// //@desc    get user data
// //@access  Private
// router.get('/user',auth,(req,res) =>{
//     console.log(req.user)  
//     User.findById(req.user.id)
//     .select('-password')
//     .then(user => res.json(user))
// })



// module.exports = router;