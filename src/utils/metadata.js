import exifr from 'exifr';

export async function extractMetadata(source) {
  try {
    const exif = await exifr.parse(source);
    return {
      timestamp: exif?.DateTimeOriginal || new Date(),
      location: exif?.GPSLatitude && exif?.GPSLongitude ? {
        latitude: exif.GPSLatitude,
        longitude: exif.GPSLongitude
      } : null,
      deviceOrientation: {
        alpha: window.orientation || 0,
        beta: null,
        gamma: null
      }
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return {
      timestamp: new Date(),
      location: null,
      deviceOrientation: null
    };
  }
}
