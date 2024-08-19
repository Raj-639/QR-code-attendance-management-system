// QR Code Generator

let qrCodeBox = document.getElementById("qrCodeBox");
 let qrimage = document.getElementById("qrImage");
 let qrtext = document.getElementById("qrText");
 
function generateQRCode() {
  qrimage.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtext.ariaValueMax;
 


}

// QR Code Scanner
const video = document.getElementById('video');
const resultDiv = document.getElementById('result');

// Start video stream
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
      video.srcObject = stream;
      video.setAttribute('playsinline', true);
      video.play();
      requestAnimationFrame(scanQRCode);
  })
  .catch(err => {
      console.error('Error accessing webcam:', err);
  });

// Scan QR Code
function scanQRCode() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
          resultDiv.innerText = `Scanned Code: ${code.data}`;
          // Optionally, you can send the scanned data to the server here
      } else {
          resultDiv.innerText = 'No QR code detected';
      }
  }
  requestAnimationFrame(scanQRCode);
}
 