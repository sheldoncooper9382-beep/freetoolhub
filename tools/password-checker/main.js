const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const showPasswordCheckbox = document.getElementById("showPassword");

const criteria = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  symbol: document.getElementById("symbol")
};

function checkStrength() {
  const password = passwordInput.value;
  let score = 0;

  // Check criteria
  if(password.length >= 8){ score++; criteria.length.classList.add("valid"); } else { criteria.length.classList.remove("valid"); }
  if(/[A-Z]/.test(password)){ score++; criteria.uppercase.classList.add("valid"); } else { criteria.uppercase.classList.remove("valid"); }
  if(/[a-z]/.test(password)){ score++; criteria.lowercase.classList.add("valid"); } else { criteria.lowercase.classList.remove("valid"); }
  if(/[0-9]/.test(password)){ score++; criteria.number.classList.add("valid"); } else { criteria.number.classList.remove("valid"); }
  if(/[\W_]/.test(password)){ score++; criteria.symbol.classList.add("valid"); } else { criteria.symbol.classList.remove("valid"); }

  // Update strength bar
  const percent = (score / 5) * 100;
  strengthBar.style.width = percent + "%";

  if(percent <= 40) strengthBar.style.background = "#f87171"; // weak red
  else if(percent <= 80) strengthBar.style.background = "#facc15"; // medium yellow
  else strengthBar.style.background = "#4ade80"; // strong green
}

function togglePassword() {
  passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
}

function copyPassword() {
  passwordInput.select();
  document.execCommand("copy");
}

checkStrength();
