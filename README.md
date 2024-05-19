# Book Store Backend

## Overview

This is the backend implementation for a book store application, focusing on user management, book management, purchase history, and revenue tracking for authors.

## Features

- User Authentication and Authorization
- Book Management
- Purchase History Tracking
- Revenue Tracking for Authors
- Email Notifications on Sales // Updated feature list

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and add the necessary environment variables
4. Start the server: `npm start`

## API Endpoints

- **Auth**: `/api/auth`
  - `POST /register`: Register a new user
  - `POST /login`: Login a user
- **Books**: `/api/books`
  - `POST /`: Create a new book
  - `GET /`: Get all books
  - `PUT /sellCount`: Update the sell count of a book
- **Purchases**: `/api/purchases`
  - `POST /`: Create a new purchase
  - `GET /:userId`: Get purchase history for a user
- **Revenue**: `/api/revenue`
  - `POST /sendRevenueEmails`: Send revenue emails to authors

## Logic Explanation

### Sell Count Computation

The `sellCount` for each book is updated dynamically based on purchase records. Every time a purchase is made, the corresponding book's `sellCount` is incremented by the quantity purchased.

### Email Notifications on Sales // Updated section title

Email notifications are sent using the `nodemailer` package. Authors are notified via email each time a sale is made. A background job or message queue can be used to handle the sending of email notifications asynchronously.

### Database Design

- **User Schema**: Stores user information, including authentication details and role (admin, author, or retail user).
- **Book Schema**: Stores book information, including `bookId`, `title`, `description`, `price`, `authors`, and `sellCount`.
- **Purchase Schema**: Stores purchase records with details about the purchased book, user, and purchase date.
- **PurchaseIdCounter Schema**: Tracks the last used purchase ID for each month to ensure unique purchase IDs.

## License

This project is licensed under the MIT License.
