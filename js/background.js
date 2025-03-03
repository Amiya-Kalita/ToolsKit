 // API Configuration
 const API_KEY = 'jWmQ9P9qmUCEqQmsg2d2AxuK';
 const API_URL = 'https://api.remove.bg/v1.0/removebg';

 // DOM Elements
 const elements = {
     dropZone: document.getElementById('dropZone'),
     fileInput: document.getElementById('fileInput'),
     previewContainer: document.getElementById('previewContainer'),
     previewImage: document.getElementById('previewImage'),
     loading: document.getElementById('loading'),
     resultSection: document.getElementById('resultSection'),
     resultImage: document.getElementById('resultImage'),
     downloadBtn: document.getElementById('downloadBtn'),
     toast: document.getElementById('toast')
 };

 // Toast Notification System
 function showToast(message, duration = 3000) {
     elements.toast.textContent = message;
     elements.toast.style.display = 'block';
     setTimeout(() => {
         elements.toast.style.display = 'none';
     }, duration);
 }

 // Handle File Processing
 async function processImage(file) {
     const formData = new FormData();
     formData.append('image_file', file);
     formData.append('size', 'auto');

     try {
         elements.loading.style.display = 'block';
         elements.previewContainer.style.display = 'none';
         elements.resultSection.style.display = 'none';

         const response = await fetch(API_URL, {
             method: 'POST',
             headers: { 'X-Api-Key': API_KEY },
             body: formData
         });

         if (!response.ok) throw new Error(`API Error: ${response.status}`);
         
         const blob = await response.blob();
         const resultUrl = URL.createObjectURL(blob);
         
         // Display Result
         elements.resultImage.src = resultUrl;
         elements.resultSection.style.display = 'block';
         elements.downloadBtn.style.display = 'inline-flex';
         
         // Configure Download
         elements.downloadBtn.onclick = () => {
             const a = document.createElement('a');
             a.href = resultUrl;
             a.download = `bg-removed-${Date.now()}.png`;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             showToast('🎉 Download started!');
         };

         showToast('✅ Background removed successfully!');

     } catch (error) {
         showToast(`❌ Error: ${error.message}`);
     } finally {
         elements.loading.style.display = 'none';
         URL.revokeObjectURL(resultUrl); // Clean up memory
     }
 }

 // Handle File Validation and Preview
 function handleFile(file) {
     if (!file.type.startsWith('image/')) {
         showToast('⚠️ Please upload a valid image file');
         return;
     }

     // Show Preview
     const reader = new FileReader();
     reader.onload = (e) => {
         elements.previewImage.src = e.target.result;
         elements.previewContainer.style.display = 'flex';
     };
     reader.readAsDataURL(file);

     processImage(file);
 }

 // Event Handlers
 elements.fileInput.addEventListener('change', (e) => {
     if (e.target.files[0]) handleFile(e.target.files[0]);
 });

 elements.dropZone.addEventListener('dragover', (e) => {
     e.preventDefault();
     elements.dropZone.classList.add('dragover');
 });

 elements.dropZone.addEventListener('dragleave', () => {
     elements.dropZone.classList.remove('dragover');
 });

 elements.dropZone.addEventListener('drop', (e) => {
     e.preventDefault();
     elements.dropZone.classList.remove('dragover');
     if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
 });

 // Click to Upload
 elements.dropZone.addEventListener('click', () => {
     elements.fileInput.click();
 });

 // Initialization Check
 document.addEventListener('DOMContentLoaded', () => {
     if (!elements.fileInput) showToast('⚠️ System initialization error');
 });