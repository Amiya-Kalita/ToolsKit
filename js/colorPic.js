const colorWheel = document.getElementById('colorWheel');
        const colorPreview = document.getElementById('colorPreview');
        const hexCode = document.getElementById('hexCode');
        const rgbCode = document.getElementById('rgbCode');
        const copyHex = document.getElementById('copyHex');
        const copyRgb = document.getElementById('copyRgb');

        let selectedColor = null;

        colorWheel.addEventListener('click', function(event) {
            const rect = colorWheel.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const angle = Math.atan2(y - 50, x - 50);
            const hue = (angle / (2 * Math.PI) + 1) * 360;
            const saturation = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2) / 50 * 100;
            const lightness = 50; // Fixed lightness for simplicity

            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            selectedColor = color;
            updateColorDisplay();
        });

        function updateColorDisplay() {
            if (selectedColor) {
                colorPreview.style.backgroundColor = selectedColor;
                const rgb = getRGB(selectedColor);
                hexCode.value = rgbToHex(rgb.r, rgb.g, rgb.b);
                rgbCode.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            }
        }

        copyHex.addEventListener('click', function() {
            hexCode.select();
            document.execCommand('copy');
            alert('Hex code copied to clipboard!');
        });

        copyRgb.addEventListener('click', function() {
            rgbCode.select();
            document.execCommand('copy');
            alert('RGB code copied to clipboard!');
        });

        function getRGB(color) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            return { r: data[0], g: data[1], b: data[2] };
        }

        function rgbToHex(r, g, b) {
            return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
        }