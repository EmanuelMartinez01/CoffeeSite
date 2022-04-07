//Listado de usuarios
const tabla = document.querySelector('#lista-usuarios tbody');

function cargarUsuarios(){
  fetch('usuarios.json')
    .then(res => res.json())
    .then(usuarios => {
      usuarios.forEach(usuario => {
          const row = document.createElement('tr');
          row.innerHTML += `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.comentario}</td>
            <td>${usuario.puntaje}</td>
          `;
          tabla.appendChild(row);
      });
    })
    .catch(error => console.log('Ha ocurrido un error: ' + error.message));
}

cargarUsuarios();