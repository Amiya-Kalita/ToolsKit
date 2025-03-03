const dropZone = document.getElementById('dropZone');
const imageUpload = document.getElementById('imageUpload');
const convertButton = document.getElementById('convertButton');
const previewImage = document.getElementById('previewImage');
const fileInfo = document.getElementById('fileInfo');
const loading = document.querySelector('.loading');
const btnText = document.querySelector('.btn-text');

// Drag and drop handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

imageUpload.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    fileInfo.textContent = `${file.name} (${(file.size/1024/1024).toFixed(2)}MB)`;
    previewImage.style.display = 'block';
    previewImage.src = URL.createObjectURL(file);
}

convertButton.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    const format = document.getElementById('formatSelect').value;

    if (!file) {
        alert('Please select an image first');
        return;
    }

    try {
        convertButton.disabled = true;
        btnText.style.opacity = '0';
        loading.style.display = 'block';

        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);

        const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
        const dataUrl = canvas.toDataURL(mimeType, 0.9);

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = dataUrl;
        downloadLink.download = `converted.${format}`;
        downloadLink.style.display = 'flex';
        downloadLink.style.alignItems = 'center';
        downloadLink.style.justifyContent = 'center';
    } catch (error) {
        alert('Error converting image: ' + error.message);
    } finally {
        convertButton.disabled = false;
        btnText.style.opacity = '1';
        loading.style.display = 'none';
    }
});

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}