import Weather from './Weather';

export default function Country({ country }) {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital} <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}> {language.name} </li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="200" height="200" />
      { country ? <Weather capital={country.capital}/> : null}
    </div>
  );
}
