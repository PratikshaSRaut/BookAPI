# BookAPI

In this Project there are several API's designed so that books can be managed.

By making request we can get data, post data, update data and delete data.

Routes are :

#Book Related routes
/books : To get all books
/book  : To post book data
/book-isbn/:isbn : Get Book For Specific ISBN 
/book-update/:isbn : To update book
/book-delete/:isbn : To delete book
/book-author-delete/:isbn/:id : Deleting Author From Book 
/book-category/:category : Get Books By Category

#Author Related routes
/authors : Get All Authors
/author  : Post new author
/author-id/:id : Get Specific author by providing id
/author-isbn/:isbn : Get author by providing isbn
/author-update/:id : Update Author
/author-delete/:id : Delete Author 
/author-book-delete/:id/:isbn : Delete Book From Author

#Publications Related routes
/publications : Get All Publications 
/publication  : Post publication
/publication-update/:id : Update publication
/publication-isbn/:isbn : Get All publications by providing isbn 
/publication-delete/:id : Delete Publication
/publication-book-delete/:id/:isbn : Delete book from publication


