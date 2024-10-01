import axios from "axios"
import { useState } from "react"

const Persons = ({ persons, refreshComponent }) => {
    
    return (
        <>
        {persons.map((p) => <p key={p.id}>{p.name} - <b>{p.number}</b> <button onClick={() => {
            if(window.confirm(`Delete ${p.name} ?`)) {
                axios.delete(`http://localhost:3001/api/persons/${p.id}`)
                refreshComponent()
            } 
        }}>delete</button> </p>)}
        </>
    )
}

export default Persons