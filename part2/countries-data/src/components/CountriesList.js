import Country from "./Country";

export default function CountriesList({ countries }) {
  return (
    <>
      {countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </>
  );
}
