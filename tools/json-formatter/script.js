const input = document.getElementById("jsonInput");
const lines = document.getElementById("lines");
const highlighted = document.getElementById("highlighted");
const tree = document.getElementById("tree");
const message = document.getElementById("message");
const confidenceEl = document.getElementById("confidence");

let lastOriginalJSON = "";

input.addEventListener("input", updateLines);
input.addEventListener("paste", () => setTimeout(formatJSON, 50));

function updateLines() {
    const count = input.value.split("\n").length;
    lines.innerHTML = Array.from({ length: count }, (_, i) => i + 1).join("<br>");
}

function syntaxHighlight(json) {
    return json
        .replace(/"(.*?)":/g, '<span class="key">"$1"</span>:')
        .replace(/"(.*?)"/g, '<span class="string">"$1"</span>')
        .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>')
        .replace(/\b(null)\b/g, '<span class="null">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
}

function highlightErrorPosition(text, error) {
    const match = error.message.match(/position (\d+)/);
    if (!match) return;
    const pos = Number(match[1]);
    input.focus();
    input.setSelectionRange(pos, pos + 1);
}

function formatJSON() {
    try {
        const obj = JSON.parse(input.value);
        const pretty = JSON.stringify(obj, null, 4);
        input.value = pretty;
        highlighted.innerHTML = syntaxHighlight(pretty);
        message.textContent = "Valid JSON formatted.";
        message.className = "message success";
        updateLines();
    } catch (e) {
        highlightErrorPosition(input.value, e);
        message.textContent = e.message;
        message.className = "message error";
    }
}

function minifyJSON() {
    try {
        const obj = JSON.parse(input.value);
        input.value = JSON.stringify(obj);
        highlighted.textContent = "";
        message.textContent = "JSON minified.";
        message.className = "message success";
        updateLines();
    } catch (e) {
        message.textContent = e.message;
        message.className = "message error";
    }
}

function autoFixJSON() {
    let text = input.value;
    lastOriginalJSON = text;
    const fixes = [];

    if (/\/\/|\/\*/.test(text)) {
        text = text.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
        fixes.push("Removed comments");
    }

    if (/'/.test(text)) {
        text = text.replace(/'([^']*)'/g, '"$1"');
        fixes.push("Converted single quotes");
    }

    if (/([{,]\s*)([a-zA-Z0-9_]+)\s*:/.test(text)) {
        text = text.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
        fixes.push("Quoted object keys");
    }

    if (/,\s*([}\]])/.test(text)) {
        text = text.replace(/,\s*([}\]])/g, '$1');
        fixes.push("Removed trailing commas");
    }

    try {
        const obj = JSON.parse(text);
        const pretty = JSON.stringify(obj, null, 4);
        input.value = pretty;
        highlighted.innerHTML = syntaxHighlight(pretty);
        renderTree();

        document.getElementById("diffBefore").textContent = lastOriginalJSON;
        document.getElementById("diffAfter").textContent = pretty;

        const confidence = Math.min(fixes.length * 25, 100);
        confidenceEl.textContent = "Fix confidence: " + confidence + "%";

        message.textContent = "Auto-fix applied: " + fixes.join(", ");
        message.className = "message success";
        updateLines();
    } catch (e) {
        message.textContent = "Unable to auto-fix: " + e.message;
        message.className = "message error";
    }
}

function undoFix() {
    if (!lastOriginalJSON) return;
    input.value = lastOriginalJSON;
    highlighted.textContent = "";
    tree.innerHTML = "";
    confidenceEl.textContent = "";
    message.textContent = "Auto-fix undone.";
    message.className = "message success";
    updateLines();
}

function renderTree() {
    try {
        tree.innerHTML = "";
        const obj = JSON.parse(input.value);
        tree.appendChild(buildTree(obj));
    } catch {}
}

function buildTree(obj) {
    const details = document.createElement("details");
    details.open = true;
    const summary = document.createElement("summary");
    summary.textContent = Array.isArray(obj) ? "Array" : "Object";
    details.appendChild(summary);

    for (let key in obj) {
        const div = document.createElement("div");
        if (typeof obj[key] === "object" && obj[key] !== null) {
            div.innerHTML = `<strong>${key}:</strong>`;
            div.appendChild(buildTree(obj[key]));
        } else {
            div.innerHTML = `<strong>${key}:</strong> ${obj[key]}`;
        }
        details.appendChild(div);
    }
    return details;
}

function toggleDiff() {
    const diff = document.getElementById("diff");
    diff.style.display = diff.style.display === "grid" ? "none" : "grid";
}

function copyJSON() {
    navigator.clipboard.writeText(input.value);
    message.textContent = "Copied to clipboard.";
    message.className = "message success";
}

function downloadJSON() {
    const blob = new Blob([input.value], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
}

function toggleTheme() {
    document.body.classList.toggle("light");
}
