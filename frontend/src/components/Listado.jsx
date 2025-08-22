import Borrar from "../components/Borrar";

function Listado({ persons,setPersons, newFiltro }) {

  return (
    <div>
      <ul>
        {persons.map((elemento) => {
          if (elemento.name.includes(newFiltro) || newFiltro == "") {
             console.log(elemento)
           return (
  <li key={elemento.name}>
    {elemento.name} - {elemento.number} - {elemento.address}
    <Borrar id={elemento.id} name={elemento.name} persons={persons} setPersons={setPersons}></Borrar>
  </li>
            );
          }
        })}
      </ul>
     </div>
   ); 
}

export default Listado;
