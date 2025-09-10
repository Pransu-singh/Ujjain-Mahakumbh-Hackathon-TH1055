import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

const DENSITY_THRESHOLD = 80;
const MAX_CAPACITY = 30;

const gates = [
  {
    name: 'Webcam',
    icon: <VideoCameraIcon className="h-5 w-5 inline mr-1" />,
    type: 'webcam',
  },
  {
    name: 'Gate A',
    icon: <VideoCameraIcon className="h-5 w-5 inline mr-1" />,
    type: 'video',
    videoUrl: '/crowd_gate_a.mp4', // Local file in public/
  },
  {
    name: 'Gate C',
    icon: <VideoCameraIcon className="h-5 w-5 inline mr-1" />,
    type: 'video',
    videoUrl: '/crowd_gate_c.mp4', // Local file in public/
  },
];
const LiveFeeds: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedGate, setSelectedGate] = useState(gates[0]);
  const [peopleCount, setPeopleCount] = useState(0);
  const [density, setDensity] = useState(0);
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(true);

  // Detection for webcam
  useEffect(() => {
    if (selectedGate.type !== 'webcam') return;
    let model: cocoSsd.ObjectDetection | null = null;
    let interval: NodeJS.Timeout;

    cocoSsd.load().then((loadedModel) => {
      model = loadedModel;
      setLoading(false);

      interval = setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video &&
          (webcamRef.current.video as HTMLVideoElement).readyState === 4 &&
          model
        ) {
          const video = webcamRef.current.video as HTMLVideoElement;
          const predictions = await model.detect(video);
          const people = predictions.filter((pred) => pred.class === 'person');
          setPeopleCount(people.length);
          const dens = Math.floor((people.length / MAX_CAPACITY) * 100);
          setDensity(dens);
          setAlert(dens > DENSITY_THRESHOLD ? 'High crowd density detected! 🚨' : '');
        }
      }, 2000);
    });

    return () => {
      if (interval) clearInterval(interval);
      setLoading(true);
      setPeopleCount(0);
      setDensity(0);
      setAlert('');
    };
  }, [selectedGate]);

  // Detection for video feeds
  useEffect(() => {
    if (selectedGate.type !== 'video') return;
    let model: cocoSsd.ObjectDetection | null = null;
    let interval: NodeJS.Timeout;
    setLoading(true);

    cocoSsd.load().then((loadedModel) => {
      model = loadedModel;
      setLoading(false);

      interval = setInterval(async () => {
        if (
          videoRef.current &&
          videoRef.current.readyState === 4 &&
          model
        ) {
          const predictions = await model.detect(videoRef.current);
          const people = predictions.filter((pred) => pred.class === 'person');
          setPeopleCount(people.length);
          const dens = Math.floor((people.length / MAX_CAPACITY) * 100);
          setDensity(dens);
          setAlert(dens > DENSITY_THRESHOLD ? 'High crowd density detected! 🚨' : '');
        }
      }, 2000);
    });

    return () => {
      if (interval) clearInterval(interval);
      setLoading(true);
      setPeopleCount(0);
      setDensity(0);
      setAlert('');
    };
  }, [selectedGate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live Feeds (Webcam & Gates Crowd Detection)</h2>
      <div className="flex space-x-2 mb-4">
        {gates.map((gate) => (
          <button
            key={gate.name}
            className={`px-4 py-2 rounded-md flex items-center ${
              selectedGate.name === gate.name
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedGate(gate)}
          >
            {gate.icon}
            {gate.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          {selectedGate.type === 'webcam' ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded w-full max-w-md"
              videoConstraints={{
                width: 400,
                height: 300,
                facingMode: "user"
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={selectedGate.videoUrl}
              controls
              autoPlay
              loop
              muted
              crossOrigin="anonymous"
              className="rounded w-full max-w-md"
              width={400}
              height={300}
            />
          )}
          <div className="mt-4 w-full">
            {loading ? (
              <div className="text-blue-600 font-semibold">Loading AI model...</div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold">People Detected:</span>
                  <span>{peopleCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Density:</span>
                  <span>{density}%</span>
                </div>
                {alert && (
                  <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-center font-bold animate-pulse">
                    {alert}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Select "Webcam" for real-time detection using your camera.</li>
            <li>Select a gate to view a sample crowd video and real detection.</li>
            <li>People count and density are detected using AI (Coco SSD model) for both webcam and videos.</li>
            <li>Alerts will appear if density exceeds {DENSITY_THRESHOLD}%.</li>
            <li>Detection works best with clear, well-lit videos showing people.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveFeeds;