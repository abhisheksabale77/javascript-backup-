// Custom error classes let callers identify specific failures.
// Run: node examples/03-custom-errors.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

try {
  throw new NotFoundError("User not found");
} catch (error) {
  console.log(error.name); // NotFoundError
  console.log(error.message); // User not found
  console.log(error.statusCode); // 404
  console.log(error instanceof AppError); // true
}

// Try this: add a ValidationError with status code 400.
