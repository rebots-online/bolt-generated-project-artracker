import { useState, useRef } from 'react';
import MediaCapture from './components/MediaCapture';
import ObjectDetection from './components/ObjectDetection';
import SearchBar from './components/SearchBar';
import ResultsView from './components/ResultsView';

function App() {
  const [mediaItems, setMediaItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleMediaCapture = (newMedia) => {
    setMediaItems(prev => [...prev, newMedia]);
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    const results = await ObjectDetection.searchObjects(query, mediaItems);
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="app">
      <h1>Object Locator</h1>
      <MediaCapture onCapture={handleMediaCapture} />
      <SearchBar onSearch={handleSearch} disabled={isSearching} />
      <ResultsView results={searchResults} />
    </div>
  );
}

export default App;
