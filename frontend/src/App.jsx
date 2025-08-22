import { useState,useEffect } from "react";
import Form from './components/Form'
import Listado from './components/Listado'
import agenda from "./services/agenda";
import './App.css';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newTlf, setNewTlf] = useState("");
  const [newFiltro, setNewFiltro] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    
    agenda.getAll()
      .then(response => {
        setPersons(response.data)
      })
  
  },[])



  return (
  <div>
    <input
      id="filtro"
      type="text"
      placeholder="Filtra por nombre..."
      value={newFiltro}
      onChange={(e) => setNewFiltro(e.target.value)}
    />

    <h2>Phonebook</h2>
    <Form
      newName={newName}
      newTlf={newTlf}
      newAddress={newAddress}
      setNewName={setNewName}
      setNewTlf={setNewTlf}
      setNewAddress={setNewAddress}
      persons={persons}
      setPersons={setPersons}
    />

    <h2>Numbers</h2>
    <Listado persons={persons} setPersons={setPersons} newFiltro={newFiltro} />
  </div>
  );
};

export default App;
