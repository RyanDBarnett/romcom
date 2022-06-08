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

// State variables

var savedCovers = [];
var currentCover;

// Initialization

setCurrentCover(createCover());
updateDOMCover();

// Event listeners

homeBtn.addEventListener('click', viewHome);
randomCoverBtn.addEventListener('click', createRandomCover);
savedCoversBtn.addEventListener('click', viewSavedCovers);
makeNewCoverBtn.addEventListener('click', viewForm);
// Event Listener functions

function viewHome() {
  hide(homeBtn);
  hide(formView);
  hide(savedView);

  randomCoverBtn.classList.remove('hidden');
  saveCoverBtn.classList.remove('hidden');
  homeView.classList.remove('hidden');
}

function createRandomCover() {
  saveCover(currentCover);
  setCurrentCover(createCover());
  updateDOMCover();
}

function viewForm() {
  hide(homeView);
  hide(randomCoverBtn);
  hide(saveCoverBtn);

  homeBtn.classList.remove('hidden');
  formView.classList.remove('hidden');
}

function viewSavedCovers() {
  hide(homeView);
  hide(randomCoverBtn);
  hide(saveCoverBtn);

  savedView.classList.remove('hidden');
  homeBtn.classList.remove('hidden');
}

// Helper functions

function createCover() {
  var coverImgSrc = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var descriptor1 = descriptors[getRandomIndex(descriptors)];
  var descriptor2 = descriptors[getRandomIndex(descriptors)];
  return new Cover(coverImgSrc, title, descriptor1, descriptor2);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function saveCover(cover) {
  savedCovers.push(cover)
}

function setCurrentCover(cover) {
  currentCover = cover;
}

// DOM functions

function hide(element) {
  element.classList.add('hidden');
}

function updateDOMCover() {
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}
