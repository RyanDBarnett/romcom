// DOM elements variables

var homeView = document.querySelector('.home-view');
var formView = document.querySelector('.form-view');
var savedView = document.querySelector('.saved-view');

var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');
var homeBtn = document.querySelector('.home-button');
var randomCoverBtn = document.querySelector('.random-cover-button');
var saveCoverBtn = document.querySelector('.save-cover-button');
var savedCoversBtn = document.querySelector('.view-saved-button');
var makeNewCoverBtn = document.querySelector('.make-new-button');
var createNewBookBtn = document.querySelector('.create-new-book-button');

// State variables

var savedCovers = [];
var currentCover;

// Initialization

setCurrentCover(createCover(getRandomCoverData()));
updateDOMCover();

// Event listeners

homeBtn.addEventListener('click', viewHome);
randomCoverBtn.addEventListener('click', createRandomCover);
savedCoversBtn.addEventListener('click', viewSavedCovers);
makeNewCoverBtn.addEventListener('click', viewForm);
createNewBookBtn.addEventListener('click', createNewBook);

// Event Listener functions

function createNewBook(event) {
  var userInput = getNewBookInput();

  saveUserInput(userInput);

  event.preventDefault();
}

function viewHome() {
  showHomeBtnHideOthers(false);

  changeView(homeView);
}

function createRandomCover() {
  saveCover(currentCover);
  setCurrentCover(createCover(getRandomCoverData()));
  updateDOMCover();
}

function viewForm() {
  showHomeBtnHideOthers(true);

  changeView(formView);
}

function viewSavedCovers() {
  showHomeBtnHideOthers(true);

  changeView(savedView);
}

// Helper functions

function createCover(coverData) {
  return new Cover(...coverData);
}

function getRandomCoverData() {
  return [covers, titles, descriptors, descriptors].map(array => array[getRandomIndex(array)]);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function saveCover(cover) {
  savedCovers.push(cover);
}

function saveUserInput(newBook) {
  [covers, titles, descriptors, descriptors].forEach((rawArray, i) => {
    rawArray.push(newBook[i]);
  })
}

function setCurrentCover(cover) {
  currentCover = cover;
}

// DOM functions

function changeView(viewToDisplay) {
  hideViews();
  show(viewToDisplay);
}

function hideViews() {
  [homeView, formView, savedView].forEach(view => hide(view));
}

function hide(element) {
  element.classList.add('hidden');
}

function getNewBookInput() {
  var formClasses = ['.user-cover', '.user-title', '.user-desc1', '.user-desc2'];
  return formClasses.map(c => document.querySelector(c).value);
}

function show(element) {
  element.classList.remove('hidden');
}

function showHomeBtnHideOthers(showHome) {
  if (showHome) {
    hide(randomCoverBtn);
    hide(saveCoverBtn);
    show(homeBtn);
  } else {
    hide(homeBtn);
    show(randomCoverBtn);
    show(saveCoverBtn);
  }
}

function updateDOMCover() {
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}
