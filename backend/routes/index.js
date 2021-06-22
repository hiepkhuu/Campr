const express = require('express');
const router = express.Router();
const csrf = require('csurf');// not sur eif we need this for csrfToken
const csrfProtection = csrf({cookie: true})

/** CONNECT ROUTERS TO THIS FILE */
const apiRouter = require('./api');

router.use('/api', apiRouter);



// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

//GET /api/csrf/restore
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore',csrfProtection, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}



//GET /HELLO/WORLD TEST ROUTE(BELOW)
router.get('/', csrfProtection, function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());//, req.csrfToken() - commented out as it broke the code
  res.send('Hello World!');
});

module.exports = router;
