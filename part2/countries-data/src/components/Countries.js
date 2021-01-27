import CountriesList from "./CountriesList";

export default function Countries({ countries, setSearchInput }) {

  const handleClick = (event) => {
    if (event) {
      setSearchInput(event)
    }
  };

  if (countries.length === 1){
    return  <CountriesList countries={countries}/>
  }
  if (countries.length > 10){
      return <p>Too many matches, specify another filter</p>
  }
  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>
            {country.name}
            &nbsp;
            <button onClick={() => handleClick(country.name)}>show</button>
          </li>
        ))}
      </ul>
    </>
  );
}
