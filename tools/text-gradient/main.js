const textInput = document.getElementById('textInput');
const styleIdInput = document.getElementById('styleId');
const backgroundInput = document.getElementById('background');
const paddingInput = document.getElementById('padding');
const qualityInput = document.getElementById('quality');
const formatInput = document.getElementById('format');
const aspectRatioInput = document.getElementById('aspectRatio');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const previewImage = document.getElementById('previewImage');
const loading = document.getElementById('loading');

// Replace with your API key
const API_KEY = 'XMqiI8yQgNC8SHN44qv9YmVkFCpAuq3G';

// Generate image
generateBtn.addEventListener('click', async () => {
  loading.style.display = 'block';
  previewImage.style.display = 'none';

  const params = new URLSearchParams({
    text: textInput.value,
    styleId: styleIdInput.value,
    background: backgroundInput.value,
    padding: paddingInput.value,
    quality: qualityInput.value,
    format: formatInput.value,
    aspectRatio: aspectRatioInput.value,
    output: 'dataUrl'
  });

  try {
    const response = await fetch(`https://api.textstudio.com/generate?${params}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();

    if (data.success) {
      previewImage.src = data.dataUrl;
      previewImage.style.display = 'block';
    } else {
      alert('Error generating image');
    }

  } catch (err) {
    console.error(err);
    alert('Failed to generate image');
  } finally {
    loading.style.display = 'none';
  }
});

// Download image
downloadBtn.addEventListener('click', () => {
  if (!previewImage.src) return;
  const link = document.createElement('a');
  link.href = previewImage.src;
  link.download = 'textstudio-image.png';
  link.click();
});
