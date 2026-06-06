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
  updateTable();
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

function updateTable() {
  myLibraryTable.innerHTML = "";

  const tableHeading = document.createElement("tr");
  tableHeading.innerHTML = `
    <th>Name:</th>
          <th>Author:</th>
          <th>Pages:</th>
          <th>Read:</th>
          <th>Delete:</th>
    `;
  myLibraryTable.appendChild(tableHeading);

  myLibrary.forEach((book) => {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("data-id", book.id);

    tableRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><button onclick ="removeBook('${book.id}')">Remove</button></td>
        `;

    myLibraryTable.appendChild(tableRow);
  });
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  updateTable();
}
