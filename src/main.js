// DOM elements variables

var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');
var randomCoverBtn = document.querySelector('.random-cover-button');

// State variables

var savedCovers = [];
var currentCover;

// Initialization

setCurrentCover(createCover());
updateDOMCover();

// Event listeners

randomCoverBtn.addEventListener('click', createRandomCover);

// Event Listener functions

function createRandomCover() {
  saveCover(currentCover);
  setCurrentCover(createCover());
  updateDOMCover();
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

function updateDOMCover() {
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}
