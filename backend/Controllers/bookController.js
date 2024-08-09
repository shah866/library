const Book = require('../models/Book');
const BorrowedBook = require('../models/BorrowedBook');
const Student = require('../models/Student');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const crypto = require('crypto');
const { endianness } = require('os');

// Controller to add a new book
exports.addBook = async (req, res) => {
    const { title, author, category, isbn, copies, pages, image,price } = req.body;

    try {
        const newBook = new Book({ title, author, category, isbn, copies, pages, image,price, isBorrowed: false });
        const book = await newBook.save();
        res.status(201).json(book);
    } catch (error) {
        if (error.code === 11000) { // 11000 is the code for duplicate key error in MongoDB
            res.status(400).json({ message: 'Book with this ISBN already exists' });
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



// Borrow a book with balance check


exports.borrowBook = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.copies <= 0) {
            return res.status(400).json({ message: 'No copies left' });
        }

        const rentalPrice = book.price;

        if (user.accountBalance < rentalPrice) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const borrowedBook = new BorrowedBook({
            bookTitle: book.title,
            bookAuthor: book.author,
            borrowedBy: userId,
            transactionStatus: 'pending' // Add this field to indicate pending confirmation
        });

        await borrowedBook.save();

        // Generate a unique token for the confirmation link
        const token = crypto.randomBytes(32).toString('hex');
        borrowedBook.confirmationToken = token;
        await borrowedBook.save();

        // Send email to admin for confirmation
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const confirmationUrl = `http://localhost:3000/confirm-borrow/${token}`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'shahdqattoush@gmail.com', // Replace with the admin's email
            subject: 'Book Borrowing Request',
            html: ` <p>User ${user.firstName} has requested to borrow the book titled "${book.title} </p>".<p> Please confirm the transaction by clicking the following link:</p><a href="${confirmationUrl}">Confirm Transaction </a>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Borrowing request sent for admin confirmation', transactionStatus: 'pending' });
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
            const user = await User.findOne({
                _id: borrowedBook.borrowedBy,
            });

            return {
                ...borrowedBook.toObject(),
                userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
                warning
            };
        }));


        res.status(200).json(borrowedBooksWithWarnings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.confirmBorrow = async (req, res) => {
    const { token } = req.params;
         console.log(token);

    try {
        const borrowedBook = await BorrowedBook.findOne({ confirmationToken: token });
        console.log(borrowedBook);
        const book = await Book.findOne({ title: borrowedBook.bookTitle, author: borrowedBook.bookAuthor });
         console.log(book);
        if (!borrowedBook || !book) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const userId = borrowedBook.borrowedBy;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.accountBalance < book.price) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        user.accountBalance -= book.price;
        book.copies--;
        await user.save();
        await book.save();
        borrowedBook.transactionStatus = 'confirmed';
       borrowedBook.confirmationToken = undefined; // Clear the token after confirmation
        await borrowedBook.save();
        console.log('Transaction confirmed and balance updated');
        res.status(200).json({ message: 'Transaction confirmed and balance updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getConfirmedBorrowedBooks = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch confirmed borrowed books for the user
        const borrowedBooks = await BorrowedBook.find({
            borrowedBy: new String(userId) ,
            transactionStatus: 'confirmed'
        });
        console.log("borrowedBooks"+borrowedBooks)
        if (borrowedBooks.length === 0) {
            return res.status(200).json({ message: 'No confirmed borrowed books found' });
        }

        const borrowedBooksWithWarnings = await Promise.all(borrowedBooks.map(async (borrowedBook) => {
            const borrowedDate = new Date(borrowedBook.borrowedAt);
            const currentDate = new Date();
            const timeDiff = currentDate - borrowedDate;
            const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const warning = dayDiff > 7 ? 'Warning: Book borrowed for more than a week' : '';
          

            return {
                ...borrowedBook.toObject(),
             
                warning
            };
        }));
      
        res.status(200).json(borrowedBooksWithWarnings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUnconfirmedBorrowedBooks = async (req, res) => {
    const userId = req.params.userId;
console.log(userId);
    try {
        // Fetch unconfirmed borrowed books for the user
        const borrowedBooks = await BorrowedBook.find({
            borrowedBy: new String(userId),
            transactionStatus: 'pending'
        });
        console.log("borrowedBooks"+borrowedBooks)

        if (borrowedBooks.length === 0) {
            return res.status(200).json({ message: 'No unconfirmed borrowed books found' });
        }

        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


