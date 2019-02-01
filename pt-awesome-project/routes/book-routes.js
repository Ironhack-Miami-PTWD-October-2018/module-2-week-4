const express = require('express');
const router  = express.Router();

const Book = require('../models/book-model');
const Author = require('../models/author-model');

// get() => to display the form to create a new book
router.get('/create', (req, res, next) => {
  Author.find()
  .then(theAuthors => {
    res.render('books-views/new-book', { authorsFromDB: theAuthors });
  })
  .catch(err => console.log('Error while displaying a form to create a new book: ', err));
})


// create a book
// <form action="/books/create" method="post">
// we don't have to type '/books' here because it's already pre-filled for us through the thing in app.js
router.post('/create', (req, res, next) => {
  // console.log('The data from the form: ', req.body);

  Book.create({
    // left side are the keys of Book model : right side are the names we gave in our form in the 'name = _______'
    title: req.body.theTitle,
    description: req.body.theDescription,
    author: req.body.theAuthor,
    rating: req.body.theRating,
    image_url: req.body.theImage
  })
  .then( newBook => {
    // console.log("New book created: ", newBook);
    res.redirect('/books');
  } )
  .catch( err => console.log("Error while creating a new book: ", err) );
})

// get all the books from the DB
//  '/' => here means: localhost:3000/books because we have it pre-fixed in the app.js
router.get('/', (req, res, next) => {
  Book.find()
  .then( allBooks => {
    res.render('books-views/books', { booksFromDB: allBooks });
  })
  .catch( err => console.log("Error while getting all the books: ", err) );
})


// delete the book route: <form action="/books/{{book._id}}" method="post">
router.post('/:theBookId', (req, res, next) => {
  Book.findByIdAndRemove(req.params.theBookId)
  .then(theBook => {
    // console.log("deleted book is: ", theBook)
    res.redirect('/books');
  })
  .catch( err => console.log("Error while deleting the book: ", err) );

})



// get the details of a book from the DB
// http://localhost:3000/books/5c52542abbd9c887b58e24a7 <== this 'id' will change dynamically when we click on each book
// router.get('/books/:bookId') => '/books' is pre-filled and ':bookId' is just a placeholder, can be any word
router.get('/:bookId', (req, res, next) => {
  const theBookId = req.params.bookId;
  //.populate('author') => we are saying: give me all the details related to the 'author' field in the book 
  // (there's only author id there so what it does is-finds the rest of information related to that author based on the id)
  Book.findById(theBookId).populate('author')
  .then(theBook => { 
    // console.log("The requested book is: ", theBook);
    res.render('books-views/book-details', { book: theBook });
  })
  .catch( err => console.log("Error while getting the details of a book: ", err) );
})



module.exports = router;
