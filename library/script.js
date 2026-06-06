let myLibrary = [];
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("new-book");
const myLibraryTable = document.getElementById("my-library-table");

addBtn.addEventListener("click", (e) => {
  form.classList.remove("hidden");
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(myLibrary);
}

form.addEventListener("submit", (e) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  addBookToLibrary(title, author, pages, read);
  form.classList.add("hidden");
  form.reset();
});
