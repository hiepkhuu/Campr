const router = require('express').Router();


//to test your routes
router.post ('/test', function(req, res){
  res.json({requestBody: req.body})
})




// TEST FOR COOKIE SUCCEESS!!GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));



module.exports = router;


//test fetch request to the browser
// fetch('api/test', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': ``
//   },
//   body: JSON.stringify({hello: 'world'})
// }).then(res => res.json()).then(data => console.log(data))
