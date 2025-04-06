import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { supabase } from '../lib/supabase';
import { AlertTriangle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { initializeFaceDetection } from '../lib/faceDetection';
import { useAuthStore } from '../store/authStore';

export const BehaviorTracking: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [headDownCount, setHeadDownCount] = useState(0);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [behaviors, setBehaviors] = useState<{
    timestamp: Date;
    type: string;
    description: string;
  }[]>([]);
  const user = useAuthStore((state) => state.user);
  const trackingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const success = await initializeFaceDetection();
      if (success) {
        setIsModelLoaded(true);
        Swal.fire({
          icon: 'success',
          title: 'Ready',
          text: 'Behavior tracking system initialized',
          timer: 1500,
          showConfirmButton: false
        });
      }
    };

    loadModels();
    return () => {
      if (trackingInterval.current) {
        clearInterval(trackingInterval.current);
      }
      setIsTracking(false);
    };
  }, []);

  const startTracking = () => {
    setIsTracking(true);
    setSessionStart(new Date());
    setHeadDownCount(0);
    setBehaviors([]);

    // Start periodic behavior tracking
    trackingInterval.current = setInterval(async () => {
      if (!webcamRef.current?.video || !canvasRef.current || !isModelLoaded) return;

      try {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.3 })
        ).withFaceLandmarks(true);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        if (resizedDetections.length > 0) {
          const detection = resizedDetections[0];
          
          // Draw face box
          const drawBox = new faceapi.draw.DrawBox(detection.detection.box, {
            boxColor: '#22c55e',
            lineWidth: 2
          });
          drawBox.draw(canvas);

          // Get face landmarks
          const landmarks = detection.landmarks;
          const nose = landmarks.getNose()[0];
          const leftEye = landmarks.getLeftEye()[0];
          const rightEye = landmarks.getRightEye()[0];

          // Calculate head tilt
          const eyeLine = Math.atan2(
            rightEye.y - leftEye.y,
            rightEye.x - leftEye.x
          );
          const headTilt = Math.abs(eyeLine * (180 / Math.PI));

          // Check if head is down (when tilt is significant)
          if (headTilt > 30) {
            setHeadDownCount(prev => prev + 1);
            
            const newBehavior = {
              timestamp: new Date(),
              type: 'head_down',
              description: 'Head down detected',
            };
            
            setBehaviors(prev => [...prev, newBehavior]);

            if (headDownCount >= 1) {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Head down detected. Please maintain proper posture.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error tracking behavior:', error);
      }
    }, 1000); // Check every second
  };

  const stopTracking = async () => {
    setIsTracking(false);
    if (trackingInterval.current) {
      clearInterval(trackingInterval.current);
      trackingInterval.current = null;
    }

    // Clear the canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    if (!sessionStart || !user) return;

    try {
      const sessionEnd = new Date();
      
      await supabase.from('behavior_tracking').insert([
        {
          student_id: user.id,
          session_start: sessionStart.toISOString(),
          session_end: sessionEnd.toISOString(),
          head_down_count: headDownCount,
          behaviors: behaviors,
        },
      ]);

      Swal.fire({
        icon: 'success',
        title: 'Session Completed',
        text: `Tracked ${behaviors.length} behaviors with ${headDownCount} head down instances`,
      });
    } catch (error) {
      console.error('Error saving behavior data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save behavior tracking data',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Behavior Tracking
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
              onClick={isTracking ? stopTracking : startTracking}
              disabled={!isModelLoaded}
              className={`
                inline-flex items-center px-4 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white
                ${!isModelLoaded
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isTracking
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              `}
            >
              {!isModelLoaded ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Initializing...
                </>
              ) : isTracking ? (
                'Stop Tracking'
              ) : (
                'Start Tracking'
              )}
            </button>
          </div>

          {isTracking && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Tracking in progress
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Head down instances: {headDownCount}</p>
                    {headDownCount >= 2 && (
                      <p className="mt-1 text-red-600">
                        Warning: Multiple head down instances detected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {behaviors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Session Behavior Log
              </h3>
              <div className="bg-gray-50 rounded-md p-4">
                <ul className="space-y-2">
                  {behaviors.map((behavior, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {behavior.timestamp.toLocaleTimeString()}: {behavior.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};