let productNameInputElement = document.getElementById("product-name");
let remainingCharsElement = document.getElementById("remaining-chars");

let maxChars = productNameInputElement.maxLength;

function updateRemainingChars() {
  let enteredText = event.target.value;
  let enteredTextLength = enteredText.length;

  let remainingChars = maxChars - enteredTextLength;

  remainingCharsElement.textContent = remainingChars;
}

const spanElement = document.getElementById("remaining-chars");

productNameInputElement.addEventListener("input", updateRemainingChars);
