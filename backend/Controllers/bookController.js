const Book = require('../models/Book');
const BorrowedBook = require('../models/BorrowedBook');
const Student = require('../models/Student');

// Controller to add a new book
exports.addBook = async (req, res) => {
    const { title, author, category, pages, image } = req.body;
    const isBorrowed=false;

    try {
        const newBook = new Book({ title, author, category, pages, image ,isBorrowed });
        const book = await newBook.save();
        res.status(201).json(book);
    } catch (error) {
        if (error.code === 11000) { // 11000 is the code for duplicate key error in MongoDB
            res.status(400).json({ message: 'Book with this title and author already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Controller to get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to borrow a book
exports.borrowBook = async (req, res) => {
    const { title, author, email, enrollmentNumber } = req.body;

    try {
        // Check if the book exists
        const book = await Book.findOne({ title, author });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

       
        // Check if the book is already borrowed
        const isBorrowed = await BorrowedBook.findOne({ bookTitle: title, bookAuthor: author });
        if (isBorrowed) {
            return res.status(400).json({ message: 'This book is already borrowed' });
        }

        // Check if the student exists
        const student = await Student.findOne({ email, enrollmentNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
       

        // Create a new borrowed book entry
        const borrowedBook = new BorrowedBook({
            bookTitle: book.title,
            bookAuthor: book.author,
            borrowedBy: { email, enrollmentNumber , name: `${student.firstName} ${student.lastName}` }
        });

        book.isBorrowed = true;
        await book.save();
        // Save the borrowed book entry and remove the book from the available list
        await borrowedBook.save();
        // await Book.findByIdAndRemove(book._id);

       console.log(book);
        res.status(201).json({
            message: 'Book borrowed successfully',
            borrowedBook: {
                ...borrowedBook.toObject(),
                borrowedBy: {
                    email,
                    enrollmentNumber,
                    name: `${student.firstName} ${student.lastName}` // Include student's name in response
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBook.find();

        // Iterate over the borrowed books to check the borrowing duration
        const borrowedBooksWithWarnings = await Promise.all(borrowedBooks.map(async (borrowedBook) => {
            const borrowedDate = new Date(borrowedBook.borrowedAt);
            const currentDate = new Date();
            const timeDiff = currentDate - borrowedDate;
            const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const warning = dayDiff > 7 ? 'Warning: Book borrowed for more than a week' : '';

            // Find the student details
            const student = await Student.findOne({
                email: borrowedBook.borrowedBy.email,
                enrollmentNumber: borrowedBook.borrowedBy.enrollmentNumber
            });

            return {
                ...borrowedBook.toObject(),
                studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
                warning
            };
        }));


        res.status(200).json(borrowedBooksWithWarnings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
