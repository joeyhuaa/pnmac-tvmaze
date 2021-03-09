import {useState, useEffect} from 'react';
import './App.css';

function App() {
  let [query, setQuery] = useState('')
  let [searchResults, setSearchResults] = useState([])
  let [justFetched, setJustFetched] = useState(false)

  useEffect(() => {
    if (query.length > 0) setJustFetched(true)
  }, [searchResults])

  useEffect(() => {
    if (justFetched) setJustFetched(false)
  }, [query])

  let fetchApi = async () => {
    let response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    let data = await response.json()
    setSearchResults(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          display:'flex', 
          justifyContent:'space-between', 
          width:'470px',
          marginTop:'50px'
        }}>
          <label>Find your favorite shows!</label>
          <input
            id='text-input'
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={fetchApi}>Search</button>
        </div>

        <div id='search-results'>
          {searchResults.length > 0 &&
            searchResults.map(s => (
              // name, img, link (embed in name)
              <div className='show-card'>
                <img src={s.show.image ? s.show.image.medium : null} alt={s.show.name}></img>
                <div style={{display:'block', marginLeft:'30px'}}>
                  <a href={s.show.url} target="_blank"><h4 className='show-title'>{s.show.name}</h4></a>
                  <div className='show-summary' dangerouslySetInnerHTML={{ __html: s.show.summary }} />
                </div>
              </div>
            ))
          }
          {searchResults.length === 0 && justFetched &&
            <h4>No results found :/</h4>
          } 
        </div>
      </header>
    </div>
  );
}

export default App;
