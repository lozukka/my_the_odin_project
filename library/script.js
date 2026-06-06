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
