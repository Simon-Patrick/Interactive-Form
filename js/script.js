let jobTitle = document.getElementById('title');
let tShirtColors = document.getElementById('color').options;
let design = document.getElementById('design');
let newOption = document.createElement('option');
let activities = document.querySelector('.activities');
let totalCost = 0;
let paymentOptions = document.getElementById('payment');
let registerButton = document.querySelector('button[type="submit"]');

/* On DOM load I am setting the default options required on the page */
document.addEventListener('DOMContentLoaded', () => {
  var name = document.getElementById('name');
  name.focus();
  hideOrShowOtherRole('hide');
  hideTShirtOptions();
  let color = document.getElementById('color');
  newOption.value = 'nodesign';
  newOption.innerText = "Please select a T-shirt theme";
  color.insertBefore(newOption, color.firstChild);
  newOption.selected = 'selected';
  setDefaultPayment();
  document.getElementById('paypal').classList.add('hide');
  document.getElementById('bitcoin').classList.add('hide');
})


function hideOrShowOtherRole(action) {
  let otherRole = document.getElementById('other-title');
  if(action === 'hide') {
    otherRole.classList.add('hide');
  } else {
    otherRole.classList.remove('hide');
  }
}

function hideTShirtOptions(action) {
  for(let i = 0; i < tShirtColors.length; i++) {
    tShirtColors[i].classList.add('hide');
  }
  if(action === 'reset') {
    newOption.selected = 'selected';
  }
}

function setDefaultPayment() {
  for(let i = 0; i < paymentOptions.length; i++) {
    if(paymentOptions[i].value === 'credit card') {
      paymentOptions[i].selected = 'selected';
    } else if(paymentOptions[i].value === 'select method') {
      paymentOptions[i].classList.add('hide');
    }
  }
}

/* Wehen job title changes this function will hide or show
the other role input field depending on if other is selected */
jobTitle.addEventListener('change', (e) => {
  if(e.target.value === 'other') {
    hideOrShowOtherRole('');
  } else {
    hideOrShowOtherRole('hide');
  }
})

/* Set an array with the lists that belong to each other. When a design is changed
update the list to show only the tshirts that correspond to the design. Make sure the
first one in the array is selected as default */
design.addEventListener('change', (e) => {
  let jsPunsShirts = ['cornflowerblue', 'darkslategrey', 'gold'];
  let heartJsShirts = ['tomato', 'steelblue', 'dimgrey'];

  if (e.target.value !== 'Select Theme') {
    hideTShirtOptions('reset');
    for(var i = 0; i < tShirtColors.length; i++) {
      if(e.target.value === 'js puns' && (jsPunsShirts.includes(tShirtColors[i].value))) {
        tShirtColors[i].classList.toggle('hide');
        if(tShirtColors[i].value === jsPunsShirts[0]) {
          tShirtColors[i].selected = 'selected';
        }
      } else if (e.target.value === 'heart js' && (heartJsShirts.includes(tShirtColors[i].value))) {
        tShirtColors[i].classList.toggle('hide');
        if(tShirtColors[i].value === heartJsShirts[0]) {
          tShirtColors[i].selected = 'selected';
        }
      }
    }
  } else {
      hideTShirtOptions('reset');
  }
})

/* Check for activities being selected and updating the total cost based
the activity being selected. If an activity is deselected then remove the
cost from the total */
activities.addEventListener('change', (e) => {
  let total = document.getElementById('total')
  if(e.target.checked) {
    checkActivityConflicts(e.target, 'checked');
    totalCost += parseInt(e.target.dataset.cost)
    if(totalCost > 0) {
      total.classList.remove('hide');
      total.innerHTML = 'Total: $' + parseFloat(totalCost).toFixed(2);
    }
  } else if (!e.target.checked) {
    checkActivityConflicts(e.target, 'unchecked');
    totalCost -= parseInt(e.target.dataset.cost)
    total.innerHTML = 'Total: $' + parseFloat(totalCost).toFixed(2);
    if(totalCost === 0) {
      total.classList.add('hide');
    }
  }
})

/* Check for activity conflicts when an activity is selected. If their is 
a conflict then grey out the conflicting activity */
function checkActivityConflicts(element, action) {
  let inputElements = activities.getElementsByTagName("label");
  if(element.name === 'js-frameworks' && action === 'checked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'express') {
        inputElements[i].children[0].disabled = true;
        inputElements[i].classList.add('unavailable');
      }
    }
  } else if (element.name === 'js-frameworks' && action === 'unchecked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'express') {
        inputElements[i].children[0].disabled = false;
        inputElements[i].classList.remove('unavailable');
      }
    }
  }
  if(element.name === 'express' && action === 'checked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'js-frameworks') {
        inputElements[i].children[0].disabled = true;
        inputElements[i].classList.add('unavailable');
      }
    }
  } else if (element.name === 'express' && action === 'unchecked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'js-frameworks') {
        inputElements[i].children[0].disabled = false;
        inputElements[i].classList.remove('unavailable');
      }
    }
  }
  if(element.name === 'js-libs' && action === 'checked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'node') {
        inputElements[i].children[0].disabled = true;
        inputElements[i].classList.add('unavailable');
      }
    }
  } else if (element.name === 'js-libs' && action === 'unchecked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'node') {
        inputElements[i].children[0].disabled = false;
        inputElements[i].classList.remove('unavailable');
      }
    }
  }
  if(element.name === 'node' && action === 'checked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'js-libs') {
        inputElements[i].children[0].disabled = true;
        inputElements[i].classList.add('unavailable');
      }
    }
  } else if (element.name === 'node' && action === 'unchecked') {
    for(let i = 0; i < inputElements.length; i++) {
      if(inputElements[i].children[0].name === 'js-libs') {
        inputElements[i].children[0].disabled = false;
        inputElements[i].classList.remove('unavailable');
      }
    }
  }
}

/* Check which payment option is selected and hide the others */
paymentOptions.addEventListener('change', (e) => {
  if(e.target.value === 'credit card') {
    document.getElementById('credit-card').classList.toggle('hide');
    document.getElementById('paypal').classList.add('hide');
    document.getElementById('bitcoin').classList.add('hide');
  } else if(e.target.value === 'paypal') {
    document.getElementById('credit-card').classList.add('hide');
    document.getElementById('paypal').classList.toggle('hide');
    document.getElementById('bitcoin').classList.add('hide');
  } else if(e.target.value === 'bitcoin') {
    document.getElementById('credit-card').classList.add('hide');
    document.getElementById('paypal').classList.add('hide');
    document.getElementById('bitcoin').classList.toggle('hide');
  }
})

/* When submit button is clicked will run validation on the 
inidividual elements that require it. Will show the error messages if 
validation fails. Stored the validations in their own functions */
registerButton.addEventListener('click', (e) => {
  e.preventDefault();
  validateName();
  validateEmail();
  validateActivities();
  let paymentMethod = document.getElementById('payment').value;
  if(paymentMethod === 'credit card') {
    validateCreditCard();
  }
})

function validateName() {
  let name = document.getElementById('name');
  if(!name.value.trim()) {
    document.getElementById('name-error').classList.toggle('hide');
    name.classList.add('error-border')
  } else {
    document.getElementById('name-error').classList.add('hide');
    name.classList.remove('error-border')
  }
}

function validateEmail() {
  let email = document.getElementById('mail');
  if(!/^.+@.+\..+$/.test(email.value)) {
    document.getElementById('email-error').classList.remove('hide');
    email.classList.add('error-border')
  } else {
    document.getElementById('email-error').classList.add('hide');
    email.classList.remove('error-border')
  }
}

function validateActivities() {
  let activitiesCount = 0;
  let checkedInputs = activities.getElementsByTagName('input');
  for(let i = 0; i < checkedInputs.length; i++) {
    if(checkedInputs[i].checked === true) {
      activitiesCount += 1;
    }
  }
  if(activitiesCount === 0) {
    document.getElementById('activities-error').classList.toggle('hide');
    activities.classList.add('error-border');
  } else {
    document.getElementById('activities-error').classList.add('hide');
    activities.classList.remove('error-border');
  }
}

function validateCreditCard() {
  let cardNumber = document.getElementById('cc-num');
  let zipCode = document.getElementById('zip');
  let cvv = document.getElementById('cvv');
  if(!/^[0-9]{13,16}$/.test(cardNumber.value)) {
    document.getElementById('cardNumber-error').classList.remove('hide');
    cardNumber.classList.add('error-border');
  } else {
    document.getElementById('cardNumber-error').classList.add('hide');
    cardNumber.classList.remove('error-border');
  }
  if(!/^[0-9]{5}$/.test(zipCode.value)) {
    document.getElementById('zipCode-error').classList.remove('hide');
    zipCode.classList.add('error-border');
  } else {
    document.getElementById('zipCode-error').classList.add('hide');
    zipCode.classList.remove('error-border');
  }
  if(!/^[0-9]{3}$/.test(cvv.value)) {
    document.getElementById('cvv-error').classList.remove('hide');
    cvv.classList.add('error-border');
  } else {
    document.getElementById('cvv-error').classList.add('hide');
    cvv.classList.remove('error-border');
  }
}