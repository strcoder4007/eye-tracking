const video = document.getElementById('video')

// set abosolute path to models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
  faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),  
  faceapi.nets.faceExpressionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia({ video: {} }, stream => video.srcObject = stream, err => console.error(err))
}

video.addEventListener('play', () => {
  detectScreenAttention(video)
})

async function detectScreenAttention(videoElement) {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    detections.forEach(detection => {
        let leftEye = detection.landmarks.getLeftEye()
        let rightEye = detection.landmarks.getRightEye()

        document.getElementById('result').innerHTML = 'Eyes detected'
        // turn body background success green
        document.body.style.backgroundColor = '#5cb85c'
    });
    if (!detections.length) {
        document.getElementById('result').innerHTML = 'No eyes detected'
        document.body.style.backgroundColor = '#5c0512'
    }
  }, 10)
}