let productNameInputElement = document.getElementById("product-name");
let remainingCharsElement = document.getElementById("remaining-chars");

let maxChars = productNameInputElement.maxLength;

function updateRemainingChars() {
  let enteredText = event.target.value;
  let enteredTextLength = enteredText.length;

  let remainingChars = maxChars - enteredTextLength;

  if (remainingChars <= 10) {
    remainingCharsElement.style.color = "red";
    productNameInputElement.style.borderColor = "red";
  } else if (remainingChars <= 20) {
    remainingCharsElement.style.color = "orange";
    productNameInputElement.style.borderColor = "orange";
  } else {
    remainingCharsElement.style.color = "black";
    productNameInputElement.style.borderColor = "black";
  }

  remainingCharsElement.textContent = remainingChars;
}

const spanElement = document.getElementById("remaining-chars");

productNameInputElement.addEventListener("input", updateRemainingChars);
