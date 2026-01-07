const input = document.getElementById('copyInput');
const button = document.getElementById('copyBtn');
const status = document.getElementById('status');

button.onclick = () => {
  if (!input.value.trim()) {
    status.textContent = "⚠ Nothing to copy";
    status.style.color = "#fbbf24";
    return;
  }

  navigator.clipboard.writeText(input.value).then(() => {
    status.textContent = "✓ Copied to clipboard";
    status.style.color = "#4ade80";

    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  });
};
