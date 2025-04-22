class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'read' : 'not read yet'} (ID: ${this.id})`;
  }
}

const myLibrary = [];
const outputDiv = document.getElementById('output');

// Add some initial dummy books
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 224, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Dune", "Frank Herbert", 604, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);

function updateOutput(message, isListItem = false) {
  if (isListItem) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    outputDiv.appendChild(listItem);
  } else {
    outputDiv.textContent += message + '\n';
  }
}

function clearOutput() {
  outputDiv.innerHTML = ''; // Use innerHTML to clear existing elements
}

function addNewBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');
  const isReadInput = document.getElementById('isRead');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = parseInt(pagesInput.value);
  const isRead = isReadInput.checked;

  if (title && author && !isNaN(pages)) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    updateOutput(`Book "${newBook.title}" added with ID: ${newBook.id}`);

    // Clear input fields
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    isReadInput.checked = false;
  } else {
    updateOutput('Please fill in all book details correctly.');
  }
}

function getBookById() {
  const bookIdInput = document.getElementById('getBookId');
  const bookId = bookIdInput.value.trim();

  if (bookId) {
    const foundBook = myLibrary.find(book => book.id === bookId);
    clearOutput();
    if (foundBook) {
      updateOutput(`Found Book:\n${foundBook.info()}`);
    } else {
      updateOutput(`Book with ID "${bookId}" not found.`);
    }
    bookIdInput.value = '';
  } else {
    updateOutput('Please enter a Book ID to retrieve.');
  }
}

function showAllBooks() {
  clearOutput();
  if (myLibrary.length === 0) {
    updateOutput('The library is empty.');
    return;
  }

  const sortedLibrary = [...myLibrary].sort((a, b) => a.title.localeCompare(b.title));
  const bookList = document.createElement('ul'); // Create an unordered list
  sortedLibrary.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = book.info();
    bookList.appendChild(listItem);
  });
  outputDiv.appendChild(bookList); // Append the entire list to the output div
}

function deleteBookById() {
  const deleteBookIdInput = document.getElementById('deleteBookId');
  const bookIdToDelete = deleteBookIdInput.value.trim();

  if (bookIdToDelete) {
    const initialLength = myLibrary.length;
    myLibrary = myLibrary.filter(book => book.id !== bookIdToDelete);
    clearOutput();
    if (myLibrary.length < initialLength) {
      updateOutput(`Book with ID "${bookIdToDelete}" deleted.`);
    } else {
      updateOutput(`Book with ID "${bookIdToDelete}" not found.`);
    }
    deleteBookIdInput.value = '';
  } else {
    updateOutput('Please enter a Book ID to delete.');
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}