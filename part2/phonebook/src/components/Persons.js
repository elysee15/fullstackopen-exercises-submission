
const Persons = ({personsFiltered, handleDelete}) => {


    return (
        <ul>
            {
            personsFiltered ?
            personsFiltered.map((person, index) => {
                    if (person.name && person.number) {
                        return (
                            <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button> </li>

                        )
                    }
                }
            ) : <li>No data</li>
            }
      </ul>
    )
}

export default Persons;