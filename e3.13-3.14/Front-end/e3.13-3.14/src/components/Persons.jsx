const Persons = ({ persons, deletePerson }) => {

    return (
        <>
        {persons.map((p) => <p key={p.id}>{p.name} - <b>{p.number}</b> <button onClick={() => deletePerson(p)}>delete</button> </p>)}
        </>
    )
}

export default Persons