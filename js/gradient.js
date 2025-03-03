const preview = document.getElementById('preview');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color1Hex = document.getElementById('color1-hex');
const color2Hex = document.getElementById('color2-hex');
const angle = document.getElementById('angle');
const angleNumber = document.getElementById('angle-number');
const direction = document.getElementById('direction');
const type = document.getElementById('type');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');
const presetList = document.getElementById('preset-list');
const randomBtn = document.getElementById('random-btn');
const reverseBtn = document.getElementById('reverse-btn');
const toast = document.getElementById('toast');

const presets = [
    { colors: ['#ff9a9e', '#fad0c4'], angle: 90, type: 'linear' },
    { colors: ['#a18cd1', '#fbc2eb'], angle: 45, type: 'linear' },
    { colors: ['#fad0c4', '#ffd1ff'], angle: 180, type: 'linear' },
    { colors: ['#84fab0', '#8fd3f4'], angle: 225, type: 'linear' },
    { colors: ['#ffecd2', '#fcb69f'], angle: 135, type: 'linear' },
    { colors: ['#fbc2eb', '#a6c1ee'], angle: 90, type: 'linear' },
    { colors: ['#f6d365', '#fda085'], angle: 45, type: 'linear' },
    { colors: ['#ffafbd', '#ffc3a0'], angle: 180, type: 'linear' },
    { colors: ['#2193b0', '#6dd5ed'], angle: 225, type: 'linear' },
    { colors: ['#cc2b5e', '#753a88'], angle: 135, type: 'linear' },
];

function updateGradient() {
    const col1 = color1.value;
    const col2 = color2.value;
    const ang = angle.value;
    const typ = type.value;

    let gradient;
    if (typ === 'linear') {
        gradient = `linear-gradient(${ang}deg, ${col1}, ${col2})`;
    } else {
        gradient = `radial-gradient(${col1}, ${col2})`;
    }

    preview.style.background = gradient;
    cssCode.value = `background: ${gradient};`;
    color1Hex.value = col1.toUpperCase();
    color2Hex.value = col2.toUpperCase();
}

function toggleControls() {
    const isLinear = type.value === 'linear';
    direction.disabled = !isLinear;
    angle.disabled = !isLinear;
    angleNumber.disabled = !isLinear;
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

color1.addEventListener('input', updateGradient);
color2.addEventListener('input', updateGradient);
color1Hex.addEventListener('input', () => {
    const hex = color1Hex.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        color1.value = hex;
        updateGradient();
    }
});
color2Hex.addEventListener('input', () => {
    const hex = color2Hex.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        color2.value = hex;
        updateGradient();
    }
});
angle.addEventListener('input', () => {
    angleNumber.value = angle.value;
    direction.value = 'custom';
    updateGradient();
});
angleNumber.addEventListener('input', () => {
    angle.value = angleNumber.value;
    direction.value = 'custom';
    updateGradient();
});
direction.addEventListener('change', () => {
    if (direction.value !== 'custom') {
        angle.value = direction.value;
        angleNumber.value = direction.value;
        updateGradient();
    }
});
type.addEventListener('change', () => {
    updateGradient();
    toggleControls();
});

copyBtn.addEventListener('click', () => {
    cssCode.select();
    document.execCommand('copy');
    showToast();
});

randomBtn.addEventListener('click', () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    color1.value = randomColor();
    color2.value = randomColor();
    angle.value = Math.floor(Math.random() * 361);
    angleNumber.value = angle.value;
    direction.value = 'custom';
    const types = ['linear', 'radial'];
    type.value = types[Math.floor(Math.random() * types.length)];
    updateGradient();
    toggleControls();
});

reverseBtn.addEventListener('click', () => {
    const temp = color1.value;
    color1.value = color2.value;
    color2.value = temp;
    updateGradient();
});

presets.forEach(preset => {
    const div = document.createElement('div');
    div.classList.add('preset');
    let gradient;
    if (preset.type === 'linear') {
        gradient = `linear-gradient(${preset.angle}deg, ${preset.colors[0]}, ${preset.colors[1]})`;
    } else {
        gradient = `radial-gradient(${preset.colors[0]}, ${preset.colors[1]})`;
    }
    div.style.background = gradient;
    div.addEventListener('click', () => {
        color1.value = preset.colors[0];
        color2.value = preset.colors[1];
        angle.value = preset.angle;
        angleNumber.value = preset.angle;
        type.value = preset.type;
        direction.value = 'custom';
        updateGradient();
        toggleControls();
    });
    presetList.appendChild(div);
});

// Initial setup
angleNumber.value = angle.value;
updateGradient();
toggleControls();