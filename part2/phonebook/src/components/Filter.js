
const Filter = ({searchInput, handleFilterChange}) => {
    return (
        <>
            filter shown with <input value={searchInput} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter;