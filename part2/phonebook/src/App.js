import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/PersonsService";
import personsService from "./services/PersonsService";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([{ name: "", number: "", id: null }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function fetchPersons() {
      return personService.getPerson().then((initialPersons) => {
        setPersons(persons.concat(initialPersons));
      });
    }

    fetchPersons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNoteChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDelete = (e) => {
    if (window.confirm(`would you like to delete ${e.name}`)) {
      personsService.deletePerson(e.id).catch((error) => {
        setErrorMessage(`Person ${e.name} was deleted from server`);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
      setPersons(persons.filter((person) => person.id !== e.id));
    }
  };

  const personsFiltered = searchInput
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();
    const isInclude = persons.map((person) => person.name).includes(newName);
    const newPerson = { 
      name: newName, 
      number: newNumber 
    };

    if (!isInclude) {
      personsService
        .createPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`Added ${person.name}`);
          setTimeout(() => setSuccessMessage(``), 2000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the phone number with a new one`
        )
      ) {
        const getPersonByName = persons.filter(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        if (getPersonByName.length === 1) {
          const { name, id } = getPersonByName[0];
          personsService
            .updatePerson(id, newPerson)
            .then((response) => {
              setPersons(
                persons.map((person) => (person.id !== id ? person : response))
              );
              setSuccessMessage(`Added ${name}`);
              setNewName('');
              setNewNumber('');
              setTimeout(() => setSuccessMessage(``), 2000);
            })
            .catch((error) => {
              setErrorMessage(error.response.data.error);
              setTimeout(() => {
                setErrorMessage("");
              }, 2000);
            });
        }
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
      <Filter
        searchInput={searchInput}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNoteChange={handleNoteChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsFiltered={personsFiltered}
        setPersons={setPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
