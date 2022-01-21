EXAMPLE:

const PTBEngine = require('PTBEngine');
const Book = require('./source/Book');
const mongoClient = PTBEngine.engine.mongoClient;

mongoClient.init({
    hostname: '127.0.0.1',
    port: 27017,
    dbName: 'MyBooks',
    user: 'root',
    password: 'password'
},(error)=>{
    console.log(error);
},()=>{

    /*let book = new Book(
        "SimpleBook",
        "simpleBook",
        "Simple book description",
        "short description",
        10,
        ["научная фантастика","космос"],
        ["+","+"],
        ["-","-"],
        "http://fsfasasf",
        "http://fasfasfasfsafwfwf2452424",
        "http://sf.png",
        "http://2v42.png"
    );
    
    book.insertBook(book,(result)=>{
        console.log(`Book insert: ${result}`)
    });*/

    /*Book.getBookByName("SimpleBook",(book)=>{
        console.log(`book: ${book._name} rating: ${book._rating}`);
        book._rating = 9;
        Book.updateBook(book,(result)=>{
            Book.getBookByName("SimpleBook",(newBook)=>{
                console.log(`book: ${book._name} rating: ${book._rating}`);
            })
        });
    });*/

    //Book.deleteBookByName("SimpleBook");

})
