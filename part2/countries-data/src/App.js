import './App.css';
import { useState, useEffect} from 'react'
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => (console.log(error)));
  }, [])


  const handleChange = (e) => setSearchInput(e.target.value);

  const filteredCountries = searchInput ? countries.filter(countrie => {
    return countrie.name.toLowerCase().includes(searchInput.toLowerCase());
  }) : [];

  return (
    <div className="App">
      find countries <input value={searchInput} onChange={handleChange}/>
      <Countries countries={filteredCountries} setSearchInput={setSearchInput}/>
    </div>
  );
}

export default App;
