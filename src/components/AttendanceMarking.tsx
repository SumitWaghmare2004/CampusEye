import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import Swal from 'sweetalert2';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import { initializeFaceDetection } from '../lib/faceDetection';
import { useAuthStore } from '../store/authStore';

export const AttendanceMarking: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const user = useAuthStore((state) => state.user);
  const detectionInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const success = await initializeFaceDetection();
      if (success) {
        setIsModelLoaded(true);
        Swal.fire({
          icon: 'success',
          title: 'Ready',
          text: 'Face detection system initialized',
          timer: 1500,
          showConfirmButton: false
        });
      }
    };

    loadModels();
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
      setIsDetecting(false);
    };
  }, []);

  const markAttendance = async () => {
    if (!user || isProcessing) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('attendance')
        .insert([
          {
            student_id: user.id,
            date: new Date().toISOString().split('T')[0],
            status: 'present',
          },
        ]);

      if (error) throw error;

      Swal.fire({
        icon: 'success',
        title: 'Attendance Marked Successfully!',
        text: 'Your attendance has been recorded for today.',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });

      // Stop detection after successful attendance
      handleStopDetection();
    } catch (error) {
      console.error('Error marking attendance:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to mark attendance. Please try again.',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartDetection = () => {
    setIsDetecting(true);
    
    // Start periodic face detection
    detectionInterval.current = setInterval(async () => {
      if (!webcamRef.current?.video || !canvasRef.current || !isModelLoaded) return;

      try {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.3 })
        );

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        
        if (resizedDetections.length > 0) {
          // Draw face detection box
          resizedDetections.forEach(detection => {
            const drawBox = new faceapi.draw.DrawBox(detection.box, {
              boxColor: '#22c55e',
              lineWidth: 2
            });
            drawBox.draw(canvas);
          });

          // Mark attendance if face is detected
          markAttendance();
        }
      } catch (error) {
        console.error('Error in face detection:', error);
      }
    }, 1000); // Check every second
  };

  const handleStopDetection = () => {
    setIsDetecting(false);
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = null;
    }

    // Clear the canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Mark Attendance
        </h2>
        
        <div className="space-y-4">
          <div className="relative w-full max-w-md mx-auto">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-lg"
              mirrored={false}
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user"
              }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-10"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={isDetecting ? handleStopDetection : handleStartDetection}
              disabled={!isModelLoaded || isProcessing}
              className={`
                inline-flex items-center px-4 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white
                ${!isModelLoaded || isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDetecting
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              `}
            >
              {!isModelLoaded ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Initializing...
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : isDetecting ? (
                'Stop Camera'
              ) : (
                'Start Camera'
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Simply position yourself in front of the camera. Your attendance will be marked automatically when your face is detected.
          </p>
        </div>
      </div>
    </div>
  );
};