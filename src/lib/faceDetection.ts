import * as faceapi from 'face-api.js';
import Swal from 'sweetalert2';

let isInitialized = false;
let isInitializing = false;
let initPromise: Promise<boolean> | null = null;

export const initializeFaceDetection = async () => {
  if (isInitialized) return true;
  if (isInitializing && initPromise) return initPromise;

  isInitializing = true;
  initPromise = new Promise(async (resolve) => {
    try {
      // Use a more reliable CDN for the models
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
      
      // Load only the models we need
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      ]);
      
      isInitialized = true;
      isInitializing = false;
      resolve(true);
    } catch (error) {
      console.error('Error initializing face detection:', error);
      isInitializing = false;
      resolve(false);
    }
  });

  return initPromise;
};

export const detectFaces = async (input: HTMLVideoElement | HTMLImageElement) => {
  if (!isInitialized) {
    throw new Error('Face detection not initialized');
  }

  const options = new faceapi.TinyFaceDetectorOptions({ 
    inputSize: 224,
    scoreThreshold: 0.3
  });

  return faceapi.detectAllFaces(input, options)
    .withFaceLandmarks(true);
};

export const showInitializationError = () => {
  Swal.fire({
    icon: 'error',
    title: 'Initialization Error',
    text: 'Failed to initialize face detection. Please check your internet connection and refresh the page.',
    confirmButtonText: 'Retry',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};

export const showInitializationSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Ready',
    text: 'Face detection system initialized',
    timer: 1500,
    showConfirmButton: false
  });
};