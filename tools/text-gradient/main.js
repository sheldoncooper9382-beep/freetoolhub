<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gradient Text Generator</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientShift 5s ease infinite;
            background-size: 300% 300%;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .app-container {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        @media (min-width: 768px) {
            .app-container {
                flex-direction: row;
            }
        }

        .preview-panel {
            flex: 1;
            min-height: 300px;
            background: rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(15px);
            border-radius: 20px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .preview-text {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            max-width: 100%;
            word-break: break-word;
            transition: all 0.3s ease;
        }

        .controls-panel {
            flex: 1;
            background: rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(15px);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow-y: auto;
            max-height: 70vh;
        }

        .control-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #e0e0e0;
        }

        input, select {
            width: 100%;
            padding: 12px 15px;
            border-radius: 12px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }

        input:focus, select:focus {
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 0 2px rgba(78, 205, 196, 0.5);
        }

        .color-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 10px;
        }

        .color-picker {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .color-picker input[type="color"] {
            width: 50px;
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            border: none;
        }

        .preset-gradients {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }

        .gradient-preset {
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
            border: 2px solid transparent;
        }

        .gradient-preset:hover {
            transform: scale(1.05);
            opacity: 0.9;
        }

        .gradient-preset.active {
            border: 2px solid #fff;
            transform: scale(1.05);
        }

        .toggle-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }

        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.2);
            transition: .4s;
            border-radius: 24px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background: #4ecdc4;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
        }

        button {
            padding: 14px 20px;
            border: none;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .generate-btn {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
        }

        .download-btn {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .range-container {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .range-container input {
            flex: 1;
        }

        .range-value {
            min-width: 40px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 5px 10px;
            border-radius: 8px;
        }

        .custom-gradient-controls {
            margin-top: 15px;
        }

        .add-color-btn {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 8px 15px;
            margin-top: 10px;
            font-size: 0.9rem;
        }

        .remove-color {
            background: rgba(255, 107, 107, 0.2);
            color: #ff6b6b;
            border: 1px solid rgba(255, 107, 107, 0.3);
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            cursor: pointer;
            margin-left: 5px;
        }

        .color-picker-group {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Gradient Text Generator</h1>
            <p>Create stunning gradient text effects with this powerful tool</p>
        </header>

        <div class="app-container">
            <div class="preview-panel">
                <div id="previewText" class="preview-text">Your Text Here</div>
            </div>

            <div class="controls-panel">
                <div class="control-group">
                    <label for="textInput">Your Text</label>
                    <input type="text" id="textInput" value="Your Text Here" placeholder="Enter your text...">
                </div>

                <div class="control-group">
                    <label for="fontSelect">Font Family</label>
                    <select id="fontSelect">
                        <option value="'Poppins', sans-serif">Poppins</option>
                        <option value="'Montserrat', sans-serif">Montserrat</option>
                        <option value="'Open Sans', sans-serif">Open Sans</option>
                        <option value="'Arial', sans-serif">Arial</option>
                        <option value="'Georgia', serif">Georgia</option>
                    </select>
                </div>

                <div class="control-group">
                    <label for="fontSize">Font Size: <span id="fontSizeValue">48</span>px</label>
                    <div class="range-container">
                        <input type="range" id="fontSize" min="20" max="100" value="48">
                        <span class="range-value" id="fontSizeDisplay">48</span>
                    </div>
                </div>

                <div class="control-group">
                    <label>Preset Gradients</label>
                    <div class="preset-gradients">
                        <div class="gradient-preset active" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);" data-gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #667eea, #764ba2);" data-gradient="linear-gradient(45deg, #667eea, #764ba2)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #f093fb, #f5576c);" data-gradient="linear-gradient(45deg, #f093fb, #f5576c)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #4facfe, #00f2fe);" data-gradient="linear-gradient(45deg, #4facfe, #00f2fe)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #43e97b, #38f9d7);" data-gradient="linear-gradient(45deg, #43e97b, #38f9d7)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #fa709a, #fee140);" data-gradient="linear-gradient(45deg, #fa709a, #fee140)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #a8edea, #fed6e3);" data-gradient="linear-gradient(45deg, #a8edea, #fed6e3)"></div>
                        <div class="gradient-preset" style="background: linear-gradient(45deg, #ff5858, #f09819);" data-gradient="linear-gradient(45deg, #ff5858, #f09819)"></div>
                    </div>
                </div>

                <div class="control-group">
                    <label>Custom Gradient</label>
                    <div class="custom-gradient-controls">
                        <div class="color-controls" id="customColors">
                            <div class="color-picker-group">
                                <div class="color-picker">
                                    <input type="color" value="#ff6b6b">
                                </div>
                                <div class="remove-color">×</div>
                            </div>
                            <div class="color-picker-group">
                                <div class="color-picker">
                                    <input type="color" value="#4ecdc4">
                                </div>
                                <div class="remove-color">×</div>
                            </div>
                        </div>
                        <button class="add-color-btn" id="addColorBtn">+ Add Color</button>
                    </div>
                </div>

                <div class="control-group">
                    <label>Animated Gradient</label>
                    <div class="toggle-container">
                        <span>Off</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="animateToggle">
                            <span class="slider"></span>
                        </label>
                        <span>On</span>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="generate-btn" id="generateBtn">
                        <span>Update Preview</span>
                    </button>
                    <button class="download-btn" id="downloadBtn">
                        <span>Download PNG</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const previewText = document.getElementById('previewText');
            const textInput = document.getElementById('textInput');
            const fontSelect = document.getElementById('fontSelect');
            const fontSize = document.getElementById('fontSize');
            const fontSizeValue = document.getElementById('fontSizeValue');
            const fontSizeDisplay = document.getElementById('fontSizeDisplay');
            const presetGradients = document.querySelectorAll('.gradient-preset');
            const customColors = document.getElementById('customColors');
            const addColorBtn = document.getElementById('addColorBtn');
            const animateToggle = document.getElementById('animateToggle');
            const generateBtn = document.getElementById('generateBtn');
            const downloadBtn = document.getElementById('downloadBtn');

            // State
            let currentGradient = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            let isAnimated = false;

            // Initialize
            updatePreview();

            // Event Listeners
            textInput.addEventListener('input', updatePreview);
            fontSelect.addEventListener('change', updatePreview);
            fontSize.addEventListener('input', function() {
                fontSizeValue.textContent = this.value;
                fontSizeDisplay.textContent = this.value;
                updatePreview();
            });

            presetGradients.forEach(preset => {
                preset.addEventListener('click', function() {
                    currentGradient = this.getAttribute('data-gradient');
                    presetGradients.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    updatePreview();
                });
            });

            animateToggle.addEventListener('change', function() {
                isAnimated = this.checked;
                updatePreview();
            });

            generateBtn.addEventListener('click', updatePreview);

            addColorBtn.addEventListener('click', function() {
                const colorPickerGroup = document.createElement('div');
                colorPickerGroup.className = 'color-picker-group';
                colorPickerGroup.innerHTML = `
                    <div class="color-picker">
                        <input type="color" value="#${Math.floor(Math.random()*16777215).toString(16)}">
                    

                    
×

                `;
                customColors.appendChild(colorPickerGroup);

                // Add event to remove button
                colorPickerGroup.querySelector('.remove-color').addEventListener('click', function() {
                    customColors.removeChild(colorPickerGroup);
                    updateCustomGradient();
                });

                // Add event to new color picker
                colorPickerGroup.querySelector('input[type="color"]').addEventListener('input', updateCustomGradient);
                
                updateCustomGradient();
            });

            // Add event listeners to initial remove buttons
            document.querySelectorAll('.remove-color').forEach(btn => {
                btn.addEventListener('click', function() {
                    const group = this.parentElement;
                    if (customColors.children.length > 1) {
                        customColors.removeChild(group);
                        updateCustomGradient();
                    }
                });
            });

            // Add event listeners to initial color pickers
            document.querySelectorAll('#customColors input[type="color"]').forEach(input => {
                input.addEventListener('input', updateCustomGradient);
            });

            // Functions
            function updateCustomGradient() {
                const colors = Array.from(customColors.querySelectorAll('input[type="color"]')).map(input => input.value);
                if (colors.length >= 2) {
                    currentGradient = `linear-gradient(45deg, ${colors.join(', ')})`;
                    // Remove active class from presets
                    presetGradients.forEach(p => p.classList.remove('active'));
                }
                updatePreview();
            }

            function updatePreview() {
                const text = textInput.value || 'Your Text Here';
                const font = fontSelect.value;
                const size = fontSize.value + 'px';
                
                previewText.textContent = text;
                previewText.style.fontFamily = font;
                previewText.style.fontSize = size;
                
                if (isAnimated) {
                    previewText.style.background = currentGradient;
                    previewText.style.backgroundSize = '200% 200%';
                    previewText.style.animation = 'gradientShift 3s ease infinite';
                    previewText.style.webkitBackgroundClip = 'text';
                    previewText.style.backgroundClip = 'text';
                    previewText.style.color = 'transparent';
                } else {
                    previewText.style.background = currentGradient;
                    previewText.style.backgroundClip = 'text';
                    previewText.style.webkitBackgroundClip = 'text';
                    previewText.style.color = 'transparent';
                    previewText.style.animation = 'none';
                }
            }

            function downloadImage() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas dimensions
                canvas.width = 800;
                canvas.height = 300;
                
                // Set background
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                currentGradient.replace('linear-gradient(45deg, ', '').replace(')', '').split(', ').forEach((color, index, arr) => {
                    gradient.addColorStop(index / (arr.length - 1), color.trim());
                });
                
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Set text properties
                ctx.font = `${fontSize.value * 2}px ${fontSelect.value.replace(/['"]/g, '')}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Apply gradient to text
                ctx.fillStyle = gradient;
                ctx.fillText(textInput.value || 'Your Text Here', canvas.width / 2, canvas.height / 2);
                
                // Create download link
                const link = document.createElement('a');
                link.download = 'gradient-text.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }

            downloadBtn.addEventListener('click', downloadImage);

            // Add animation keyframes to document
            const style = document.createElement('style');
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        });
    </script>
</body>
</html>
