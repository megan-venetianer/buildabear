var closet = document.querySelector('.saved-outfit');
var outfitName = document.querySelector('input');
var saveButton = document.querySelector('#save-button');
var garmentSection = document.querySelector('.garment-option-container');
var allGarments = [];
var backgroundsSection = document.querySelector('.backgrounds');
var id = Date.now(id);
var outfit = new Outfit(id);
var hats = ['top-hat', 'sun-hat', 'hair-bow', 'crown', 'helmet'];
var clothes = ['dress', 'vest'];
var accessories = ['necklace', 'bowtie', 'watch', 'sunnies'];
saveButton.addEventListener('click', saveOutfit);
garmentSection.addEventListener('click', indicateButtonsAndDress);
outfitName.addEventListener('keyup', validateInput);
closet.addEventListener('click', removeSavedOutfitCard);
// window.addEventListener('load', pageLoadHandler);

window.onload = function() {
  var savedGarments = window.localStorage.getItem("savedOutfits");
  if(localStorage.length > 0) {
  allGarments = allGarments.concat(JSON.parse(savedGarments));
} else {
  allGarments = [];
}
}

// function uploadGarments() {
//   var savedGarments = window.localStorage.getItem("savedOutfits");
//   allGarments = allGarments.concat(JSON.parse(savedGarments));
// }


  // refreshSavedCards(allGarments[0].title);


function refreshSavedCards(title) {
  closet.insertAdjacentHTML('afterbegin', `
    <div class="saved-outfit-card">
      <p>${title}</p>
      <img class="close" src="./assets/close.svg" alt="close-icon">
    </div>
  `);
}

function indicateButtonsAndDress() {
  runOutfitConditional(event.target.classList[1]);
  indicateActivateButton(event);
}

function runOutfitConditional(classOfButton) {
  if (event.target.classList.contains(classOfButton)) {
    addGarments(event);
    disableUnselectedButtons(`.${classOfButton}`);
    updateObjectGarments(classOfButton);
    outfit.addGarment(`${event.target.dataset.id}`);
  }
}

function removeGarmentFromBear(garmentItem) {
  let garment = document.querySelectorAll(garmentItem);
  for (var i = 0; i < garment.length; i++) {
    garment[i].classList.add('hidden');
  }
}

function updateObjectGarments() {
  var garmentToRemoveFromObject;
  if (event.target.classList.contains('hats-btn')) {
    garmentToRemoveFromObject = hats;
    outfit.removeGarment(garmentToRemoveFromObject);
  } else if (event.target.classList.contains('clothes-btn')) {
    garmentToRemoveFromObject = clothes;
    outfit.removeGarment(garmentToRemoveFromObject);
  } else if (event.target.classList.contains('accessories-btn')) {
    garmentToRemoveFromObject = accessories;
    outfit.removeGarment(garmentToRemoveFromObject);
  }
}

function addGarments(event) {
  // debugger
  let garment = document.querySelector(`#${event.target.dataset.id}`);
  var garmentsToDelete = `.${garment.classList[0]}`;
  if (event.target.classList.contains('selected-button') && event.target.classList.contains('unselected-button')) {
    garment.classList.remove('hidden');
  } else if (event.target.classList.contains('selected-button')) {
    garment.classList.add('hidden');
    // disableUnselectedButtons();
    event.target.classList.replace('selected-button','unselected-button');
    event.target.classList.remove('selected-button');
  } else if (event.target.innerText === event.target.innerText) {
    removeGarmentFromBear(garmentsToDelete);
    garment.classList.remove('hidden');
  }
}

//This function tests to see if there is anything in the input field
function validateInput() {
  if (outfitName.value === '' || outfitName.value === 'Name this Outfit') {
    saveButton.disabled = true;
  } else { saveButton.disabled = false;
  }
}

function saveOutfit() {

  var form = document.querySelector('form');
  event.preventDefault();
  closet.insertAdjacentHTML('afterbegin', `
    <div class="saved-outfit-card">
      <p>${outfitName.value}</p>
      <img class="close" src="./assets/close.svg" alt="close-icon">
    </div>
  `);
  saveButton.disabled = true;
  outfit.title = outfitName.value;
  allGarments.push(outfit);
  clearOutfits();
  disableUnselectedButtons('.button');
  form.reset();
  window.localStorage.setItem("savedOutfits", JSON.stringify(allGarments));
  outfit = new Outfit(Date.now());
}

// uploadGarments();

function clearOutfits() {
  let garments = document.querySelectorAll('.garment-image');
  for (var i = 0; i < garments.length; i++) {
    garments[i].classList.add('hidden');
  }
}

function disableUnselectedButtons(button) {
  var disabledButton = document.querySelectorAll(button);
  for (var i = 0; i < disabledButton.length; i++) {
    disabledButton[i].classList.remove('selected-button');
  }
}

function indicateActivateButton(event) {
  if (event.target.classList.contains('selected-button')) {
    event.target.classList.remove('selected-button')
  } else if (event.target.classList.contains('button')) {
    event.target.classList.toggle('selected-button');
  }
}


function removeSavedOutfitCard(event) {
  if (event.target.classList.contains('close')) {
    event.target.closest('.saved-outfit-card').remove();
  }
}
