import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { extractMetadata } from '../utils/metadata';

export default function MediaCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const metadata = await extractMetadata(imageSrc);
    onCapture({
      type: 'image',
      src: imageSrc,
      timestamp: Date.now(),
      metadata
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const metadata = await extractMetadata(file);
    const src = URL.createObjectURL(file);
    onCapture({
      type: file.type.includes('video') ? 'video' : 'image',
      src,
      timestamp: Date.now(),
      metadata
    });
  };

  return (
    <div className="media-capture">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'environment'
        }}
      />
      <div className="controls">
        <button onClick={captureImage}>Capture Photo</button>
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}
