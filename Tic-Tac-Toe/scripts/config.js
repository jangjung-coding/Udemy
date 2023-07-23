function openPlayerConfig(event) {
  editedPlyaer = +event.target.dataset.playerid; // 문자열에 + 연산자를 사용하면 숫자로 변환된다.
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trim();

  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid player name!";
    return;
  }

  const updatePlayerDataElement = document.getElementById(
    "player-" + editedPlyaer + "-data"
  );
  updatePlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlyaer - 1].name = enteredPlayername;

  closePlayerConfig();
}
