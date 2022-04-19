"use strict";

const cardColumns = document.querySelectorAll(".col-6");
const inputAddTitle = document.querySelector("#input-add-title");
const inputAddNote = document.querySelector("#input-add-note");
const btnAddNote = document.querySelector("#btn-add-note");
const btnCloseAddNote = document.querySelector("#btn-close-add-note");
const inputEditTitle = document.querySelector("#input-edit-title");
const inputEditNote = document.querySelector("#input-edit-note");
const btnEditNote = document.querySelector("#btn-edit-note");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const btnCloseEditNote = document.querySelector("#btn-close-edit-note");
const modalTitleDeleteAll = document.querySelector("#modal-title-delete-all");
const btnsAnswer = document.querySelector(".btns-answer");
const btnCloseDeleteAll = document.querySelector("#btn-close-delete-all");

const checkCardColumns = () =>
  cardColumns[0].childElementCount <= cardColumns[1].childElementCount
    ? cardColumns[0]
    : cardColumns[1];

function createCard(title, note) {
  const card = `
<div class="card bg-dark rounded shadow mb-4">
  <div
    class="card-header bg-dark d-flex align-items-center border-0"
  >
    <h6 class="card-title m-0 p-0">${title}</h6>
    <div class="dropdown ms-auto">
      <i
        class="fa fa-ellipsis-v delete-note pointer p-2"
        data-bs-toggle="dropdown"
      ></i>
      <ul
        class="dropdown-menu dropdown-menu-dark rounded shadow"
      >
        <a href="#" class="dropdown-item">
          <span><i class="fa fa-trash"></i></span>
          <span>Delete</span>
        </a>
      </ul>
    </div>
  </div>
  <div class="card-body py-0">
    <p class="card-text m-0 p-0">${note}</p>
  </div>
  <div
    class="card-footer bg-dark d-flex align-items-center border-0"
  >
    <button
      type="button"
      class="btn btn-primary btn-edit shadow rounded-circle ms-auto"
      data-bs-toggle="modal"
      data-bs-target="#modal-edit-note"
    >
      <i class="fa fa-pencil fa-xs"></i>
    </button>
  </div>
</div>
  `;
  checkCardColumns().insertAdjacentHTML("afterbegin", card);
}

const checkInputs = (inputs) => {
  for (const input of inputs) {
    if (input.value === "") return true;
  }
};

const clearInputs = (inputs) => {
  for (const input of inputs) input.value = "";
};

btnAddNote.addEventListener("click", function () {
  if (checkInputs([inputAddTitle, inputAddNote]))
    alert("The title and the note cannot be empty!");
  else {
    createCard(inputAddTitle.value, inputAddNote.value);
    clearInputs([inputAddTitle, inputAddNote]);
    btnCloseAddNote.click();
  }
});

inputAddNote.addEventListener("keydown", function (e) {
  if (e.key === "Enter") e.preventDefault();
});

let card, cardTitle, cardText, cardDelete;

const deleteCard = (card) => card.remove();

document.addEventListener("click", function (e) {
  if (e.target.closest(".card")) {
    card = e.target.closest(".card");

    [cardTitle, cardText, cardDelete] = [
      card.children[0].firstElementChild,
      card.children[1].firstElementChild,
      card.children[0].lastElementChild.children[1].firstElementChild,
    ];

    [inputEditTitle.value, inputEditNote.value] = [
      cardTitle.textContent,
      cardText.textContent,
    ];

    cardDelete.addEventListener("click", function () {
      deleteCard(card);
    });
  }
});

btnEditNote.addEventListener("click", function () {
  if (checkInputs([inputEditTitle, inputEditNote]))
    alert("The title and note cannot be empty!");
  else {
    if (
      inputEditTitle.value === cardTitle.textContent &&
      inputEditNote.value === cardText.textContent
    )
      alert("The title and the note are not the same");
    else {
      [cardTitle.textContent, cardText.textContent] = [
        inputEditTitle.value,
        inputEditNote.value,
      ];
      btnCloseEditNote.click();
    }
  }
});

inputEditNote.addEventListener("keydown", function (e) {
  if (e.key === "Enter") e.preventDefault();
});

const checkDeleteAllBtns = () => {
  for (const columns of cardColumns) {
    if (columns.childElementCount > 0) return true;
  }
};

btnDeleteAll.addEventListener("click", function () {
  if (checkDeleteAllBtns()) {
    modalTitleDeleteAll.textContent = "Do you want to delete all notes?";
    btnsAnswer.classList.remove("d-none");
    btnCloseDeleteAll.classList.add("d-none");
  } else {
    modalTitleDeleteAll.textContent = "There is nothing to show here.";
    btnsAnswer.classList.add("d-none");
    btnCloseDeleteAll.classList.remove("d-none");
  }
});

for (let i = 0; i < btnsAnswer.childElementCount; i++) {
  btnsAnswer.children[1].addEventListener("click", function () {
    for (let i = 0; i < cardColumns.length; i++) {
      while (cardColumns[i].childElementCount > 0) {
        for (const cards of cardColumns[i].children) {
          cards.remove();
        }
      }
    }
    btnCloseDeleteAll.click();
  });
}
