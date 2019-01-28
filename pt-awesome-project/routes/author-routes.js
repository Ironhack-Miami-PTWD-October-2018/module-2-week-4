const express = require('express');

const router = express.Router();

// .get() => to display the form to create a new author
router.get('/authors/new', (req, res, next) => {
// make sure to see all the folders that are inside the views
// in res.render() we don't use '/' 🚨 before we put the the path to the hbs file we want to render
  res.render('author-views/new-author')
})

// .post() to send the data user put in the form to the database
{/* <form action="/authors/create" method="post"> */}
router.post('/authors/create', (req, res, next) => {
  console.log("data that user put in the form: ", req.body)
})












module.exports = router;
