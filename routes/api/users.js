const { authJwt } = require("../../middleware");
const controller = require("../../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const config = require('config')
// const jwt = require('jsonwebtoken')
// const auth = require('../../middleware/auth')
// const User = require('../../schema/User');

// //@route   POST api/users
// //@desc    register new user
// //@access  Public
// router.post('/', (req, res) => {
//     const {username, password,projects } = req.body;
//     console.log(req.body)
//     if ( !username || !password){
//         return res.status(400).json({msg:'Please enter all fields'})
//     }
//     const newUser = new User({ 
//         username, 
//         password,
//         projects
        
//     })
//     bcrypt.genSalt(10,(err,salt) =>{
//         bcrypt.hash(newUser.password, salt, (err,hash) => {
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save()
//             .then(user =>{
//                 jwt.sign(
//                     { id:user.id,username:user.username,projects:user.projects},
//                     config.get('jwtSecret'),
//                     { expiresIn: 43200},
//                     (err,token) => {
//                         if (err) throw err;
//                         res.json({
//                             token,
//                             user: {
//                                 id: user.id,
//                                 username: user.username,
//                                 projects:user.projects,
                                
//                             }
//                         })
//                     }
                
                    
//                 )

                
//             })
//         })
//     })
// })

// module.exports = router;