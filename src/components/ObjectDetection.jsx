import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { FilesetResolver, ObjectDetector } from '@mediapipe/tasks-vision';

class ObjectDetection {
  static model = null;
  static mediaPipeDetector = null;

  static async initialize() {
    // Load COCO-SSD model
    this.model = await cocoSsd.load();
    
    // Initialize MediaPipe detector
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    this.mediaPipeDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite"
      },
      scoreThreshold: 0.5,
      maxResults: 5
    });
  }

  static async detectObjects(imageElement) {
    if (!this.model) await this.initialize();
    
    // Run both models for better coverage
    const [cocoResults, mediaPipeResults] = await Promise.all([
      this.model.detect(imageElement),
      this.mediaPipeDetector.detect(imageElement)
    ]);

    return [...cocoResults, ...mediaPipeResults];
  }

  static async searchObjects(query, mediaItems) {
    const results = [];

    for (const item of mediaItems) {
      const img = new Image();
      img.src = item.src;
      await img.decode();

      const detections = await this.detectObjects(img);
      const matches = detections.filter(detection => 
        detection.class.toLowerCase().includes(query.toLowerCase())
      );

      if (matches.length > 0) {
        results.push({
          mediaItem: item,
          matches,
          timestamp: item.timestamp,
          metadata: item.metadata
        });
      }
    }

    return results;
  }
}

export default ObjectDetection;
