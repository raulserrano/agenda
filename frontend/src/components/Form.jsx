import agenda from "../services/agenda";

function Form({ newName, newTlf, newAddress, setNewName, setNewTlf, setNewAddress, persons, setPersons }) {
  const envioFormulario = (evento) => {
    evento.preventDefault();

    if (persons.find((e) => e.name == newName)) {
      let persona = persons.find((e) => e.name == newName);
      agenda
        .update(persona.id, { ...persona, number: newTlf, address: newAddress })
        .then((respuesta) => {
          setPersons(
            persons.map((elemento) => {
              return elemento.name !== respuesta.data.name
                ? elemento
                : respuesta.data;
            })
          );
        });
    } else {
      agenda.create({ name: newName, number: newTlf, address: newAddress }).then((respuesta) => {
        setPersons(persons.concat(respuesta.data));
        setNewName("");
        setNewTlf("");
        setNewAddress("");
      });
    }
  };

  return (
    <form onSubmit={envioFormulario}>
      <div>
        name:{" "}
        <input
          id="nombre"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div>
        Tlf:{" "}
        <input
          id="tlf"
          type="text"
          value={newTlf}
          onChange={(e) => setNewTlf(e.target.value)}
          placeholder="Teléfono"
        />
      </div>
      <div>
        Dirección:{" "}
        <input
          id="address"
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Dirección"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;
