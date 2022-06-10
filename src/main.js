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
saveCoverBtn.addEventListener('click', saveCurrentCover);
savedCoversBtn.addEventListener('click', viewSavedCovers);
makeNewCoverBtn.addEventListener('click', viewForm);
createNewBookBtn.addEventListener('click', createNewBook);
savedView.addEventListener('click', deleteSavedCover);

// Event Listener functions

function viewHome() {
  showHomeBtnHideOthers(false);
  changeView(homeView);
}

function createRandomCover() {
  setCurrentCover(createCover(getRandomCoverData()));
  updateDOMCover();
}

function saveCurrentCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    addMiniCoverToDOM();
  }
}

function viewSavedCovers() {
  showHomeBtnHideOthers(true);
  changeView(savedView);
}

function viewForm() {
  showHomeBtnHideOthers(true);
  changeView(formView);
}

function createNewBook(event) {
  var userInput = getNewBookInput();
  saveUserInput(userInput);
  setCurrentCover(createCover(userInput));
  updateDOMCover();
  changeView(homeView);
  event.preventDefault();
}

function deleteSavedCover(e) {
  if (event.target.parentNode.className === 'mini-cover') {
    console.log('test')
  }
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

function saveUserInput(newBook) {
  [covers, titles, descriptors, descriptors].forEach((rawArray, i) => {
    rawArray.push(newBook[i]);
  })
}

function setCurrentCover(cover) {
  currentCover = cover;
}

// DOM functions

function addMiniCoverToDOM() {
  var savedCoversSection = document.querySelector('.saved-covers-section');
  var miniCover = document.createElement('div');

  miniCover.classList.add('mini-cover');
  miniCover.dataset.key = currentCover.id;
  miniCover.innerHTML = `
    <img class="cover-image" src=${currentCover.cover}>
    <h2 class="cover-title">${currentCover.title}</h2>
    <h3 class="tagline">A tale of <span class="tagline-1">${currentCover.tagline1}</span> and <span class="tagline-2">${currentCover.tagline2}</span></h3>
    <img class="price-tag" src="./assets/price.png">
    <img class="overlay" src="./assets/overlay.png">
  `

  savedCoversSection.append(miniCover);
}

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
