import axios from "axios"

const Persons = ({ persons }) => 
    <>
        {persons.map((p) => <p key={p.id}>{p.name} - <b>{p.number}</b> <button onClick={() => {
            if(window.confirm(`Delete ${p.name} ?`)) {
                axios.delete(`http://localhost:3004/persons/${p.id}`)
            }
        }}>delete</button> </p>)}
    </>

export default Persons