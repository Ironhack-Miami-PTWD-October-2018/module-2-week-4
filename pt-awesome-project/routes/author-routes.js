const express = require('express');

const router = express.Router();

// require Author model
const Author = require('../models/author-model');

// .get() => to display the form to create a new author
router.get('/authors/new', (req, res, next) => {
// make sure to see all the folders that are inside the views
// in res.render() we don't use '/' 🚨 before we put the the path to the hbs file we want to render
  res.render('author-views/new-author')
})

// .post() to send the data user put in the form to the database
{/* <form action="/authors/create" method="post"> */}
router.post('/authors/create', (req, res, next) => {
  // console.log("data that user put in the form: ", req.body);

    Author.create(req.body)
    .then(newAuthor => {
      // console.log("New author created: ", newAuthor);
      // take us to the page that already exist in our app
      // this is the URL so it HAS to start with '/'
      res.redirect('/authors');
    })
    .catch(err => console.log("Error while creating a new author: ", err));
})

// get all the authors from the database
router.get('/authors', (req, res, next) => {

  Author.find()
  .then(allAuthors => {
      res.render('author-views/authors-view', { authors: allAuthors })
  })
  .catch(err => console.log("Error while getting the authors: ", err));
})









module.exports = router;
