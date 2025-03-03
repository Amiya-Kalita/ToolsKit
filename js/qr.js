let qr = null;
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

function updateColorPreview() {
    document.querySelectorAll('.color-input').forEach((container, index) => {
        const color = index === 0 ? document.getElementById('fg-color').value 
                    : document.getElementById('bg-color').value;
        container.querySelector('.color-preview').style.background = color;
    });
}

function generateQR() {
    const content = document.getElementById('content').value;
    const fgColor = document.getElementById('fg-color').value;
    const bgColor = document.getElementById('bg-color').value;

    if (!content) {
        alert('Please enter some text or URL');
        return;
    }

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;

    // Clear previous QR code
    if (qr) {
        qr.clear();
        document.getElementById('qrcode').innerHTML = '';
    }

    // Generate new QR code
    setTimeout(() => {
        qr = new QRCode(document.getElementById('qrcode'), {
            text: content,
            width: 280,
            height: 280,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show QR code with animation
        document.getElementById('qrcode').classList.add('active');
        downloadBtn.classList.add('show');
        generateBtn.classList.remove('loading');
        generateBtn.disabled = false;
    }, 300);
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'smart-qrcode.png';
    link.href = image;
    link.click();
}

// Event listeners
document.getElementById('fg-color').addEventListener('input', () => {
    updateColorPreview();
    if (qr) generateQR();
});

document.getElementById('bg-color').addEventListener('input', () => {
    updateColorPreview();
    if (qr) generateQR();
});

// Initial color preview
updateColorPreview();