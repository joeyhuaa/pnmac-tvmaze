import {useState, useEffect} from 'react';
import './App.css';

function App() {
  let [shows, setShows] = useState([])
  let [query, setQuery] = useState('')
  let [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

  let fetchApi = async () => {
    let response = await fetch('https://api.tvmaze.com/search/shows?q=walking')
    let data = await response.json()
    setShows(data)
  }

  let search = () => {
    if (query.length > 0) {
      // take query and find matches in shows (name of show)
      // pull the shows the match the query
      let matches = shows.filter(show => show.show.name.toLowerCase().includes(query.toLowerCase()))
      // set them in state
      setSearchResults(matches)
    }
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
          <button onClick={search}>Search</button>
        </div>

        <div id='search-results'>
          {searchResults.map(s => (
            // name, img, link (embed in name)
            <div className='show-card'>
              <img src={s.show.image.medium}></img>
              <div style={{display:'block', marginLeft:'30px'}}>
                <a href={s.show.url} target="_blank"><h4 className='show-title'>{s.show.name}</h4></a>
                <div className='show-summary' dangerouslySetInnerHTML={{ __html: s.show.summary }} />
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
