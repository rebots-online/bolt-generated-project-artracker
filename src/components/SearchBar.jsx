export default function SearchBar({ onSearch, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type="text"
        name="query"
        placeholder="Search for objects..."
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
