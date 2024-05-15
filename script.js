const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
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

        console.log('Eyes detected')
    });
    if (!detections.length) {
        console.log('No eyes detected')
    }
}, 500);
}