<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gradient Text Generator</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <h1>Gradient Text Generator</h1>

  <!-- Glassmorphic Preview -->
  <div class="preview-panel">
    <h2 id="previewText">Your Text Here</h2>
  </div>

  <!-- Controls -->
  <div class="controls">
    <label>Enter Text</label>
    <input type="text" id="textInput" value="Hello World!">

    <label>Choose Preset</label>
    <select id="presetSelect">
      <option value="linear-gradient(90deg,#ff6ec4,#7873f5)">Pink Purple</option>
      <option value="linear-gradient(90deg,#4ade80,#22d3ee)">Green Blue</option>
      <option value="linear-gradient(90deg,#facc15,#f97316)">Yellow Orange</option>
      <option value="linear-gradient(90deg,#f43f5e,#8b5cf6)">Red Violet</option>
    </select>

    <label>Custom Gradient Start</label>
    <input type="color" id="color1" value="#ff6ec4">
    <label>Custom Gradient End</label>
    <input type="color" id="color2" value="#7873f5">

    <label>Font Size</label>
    <input type="number" id="fontSize" value="48" min="20" max="200">

    <button id="applyBtn">Apply Gradient</button>
    <button id="downloadBtn">Download as PNG</button>
  </div>
</div>

<script src="main.js"></script>
</body>
</html>
