const emojiGrid = document.getElementById("emojiGrid");
const selectedEmoji = document.getElementById("selectedEmoji");
const search = document.getElementById("search");

const emojis = [
"😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
"😍","😘","😗","😙","😚","😋","😜","😝","😛","🤑",
"🤗","🤔","🤐","😐","😑","😶","🙄","😏","😣","😥",
"😮","🤯","😯","😪","😫","😴","😌","😛","😜","😝",
"🤤","😒","😓","😔","😕","🙃","🫠","😲","☹️","🙁",
"😖","😞","😟","😤","😢","😭","😦","😧","😨","😩",
"🤬","😡","😠","🤡","👻","💀","☠️","👽","🤖","🎃",
"😺","😸","😹","😻","😼","😽","🙀","😿","😾","🐶",
"🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁"
];

function renderEmojis(filter = "") {
  emojiGrid.innerHTML = "";
  emojis
    .filter(e => e.includes(filter))
    .forEach(emoji => {
      const span = document.createElement("span");
      span.className = "emoji";
      span.textContent = emoji;
      span.onclick = () => {
        selectedEmoji.textContent = emoji;
      };
      emojiGrid.appendChild(span);
    });
}

function copyEmoji() {
  navigator.clipboard.writeText(selectedEmoji.textContent);
}

search.addEventListener("input", () => {
  renderEmojis(search.value);
});

renderEmojis();