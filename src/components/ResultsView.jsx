export default function ResultsView({ results }) {
  if (results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div className="results-view">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <img src={result.mediaItem.src} alt="Result" />
          <div className="matches">
            {result.matches.map((match, i) => (
              <div key={i} className="match">
                <p>Found: {match.class}</p>
                <p>Confidence: {(match.score * 100).toFixed(2)}%</p>
                {result.mediaItem.metadata.location && (
                  <p>
                    Location: {result.mediaItem.metadata.location.latitude},
                    {result.mediaItem.metadata.location.longitude}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
