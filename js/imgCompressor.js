document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000); // Notification disappears after 3 seconds
    }
});

document.getElementById('compressButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload an image first.');
        return;
    }

    const sizeInput = document.getElementById('sizeInput').value;
    const maxSize = sizeInput * 1024; // Convert KB to bytes

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const width = img.width;
            const height = img.height;

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.7; // Adjust quality as needed
            let dataUrl = canvas.toDataURL('image/jpeg', quality);
            let size = dataUrl.length * 0.75; // Approximate size in bytes

            while (size > maxSize && quality > 0.1) {
                quality -= 0.1;
                dataUrl = canvas.toDataURL('image/jpeg', quality);
                size = dataUrl.length * 0.75;
            }

            const link = document.getElementById('downloadLink');
            link.href = dataUrl;
            link.download = 'compressed_image.jpg';
            link.style.display = 'inline-block';
            link.click();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});