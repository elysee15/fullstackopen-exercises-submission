
const PersonForm = ({addPerson, newName, newNumber ,handleNoteChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          <h3>add a new</h3>
          name: <input value={newName} onChange={handleNoteChange}/> <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;