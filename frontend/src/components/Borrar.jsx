import agenda from "../services/agenda";

function Borrar({ id,name, persons,setPersons }) {


  // Funciones auxiliares

  function eliminar() {
    if(confirm(`desea eliminar el contacto ${name}`))
    agenda.eliminar(id).then((respuesta) => {
      // Actualizamos estado
      if(respuesta.status == 200) alert('Se ha eliminado correctamente')
     
      setPersons(persons.filter((p) => p.id !== id));
    
    });
  }
  console.log(id);

  // Elemento
  return <button onClick={eliminar}>Eliminar</button>;
}

export default Borrar;
