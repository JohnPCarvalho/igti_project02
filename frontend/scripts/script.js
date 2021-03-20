let arrayOfUsers = [];
let filtered = [];
let secretMessage = 'Fleetwood Mac are the best';

let userInput = document.querySelector("#userInput");

let panelFilter = document.querySelector("#panelFilter");
let panelStatistics = document.querySelector("#panelStatistics");

async function fetchUsers () {
  let resource = await fetch("http://localhost:3001/users");
  let users = await resource.json();
  arrayOfUsers = users.map(user => 
      ({
        name: user.name.first + ' ' + user.name.last,
        picture: user.picture.thumbnail,
        dob: user.dob.date,
        age: user.dob.age
      })
    );
    return arrayOfUsers;
}

function search (name) {
  filtered = arrayOfUsers.filter((user) => {
    return user.name.toLowerCase().includes(name.toLowerCase());
  });
}

function clearInput () {
  userInput.value = '';
}

function renderPanels() { 
  if (userInput.value !== '') {
    panelFilter.innerText = 'Oia so';
    panelStatistics.innerText = 'Oia so';
    panelFilter.innerHTML = renderFilteredUsers();
    //renderizar as infos de painel x estatistica
  }
  else {
    //zerar as infos dos paineis - it is already done.
    panelFilter.innerText = 'Nenhum conteudo a ser exibido';
    panelStatistics.innerText = 'Nada a ser exibido';
  }
}

function renderFilteredUsers() {
  return (
  `
  <div>
    <h1>Yahoooooo ${secretMessage}</h1>
  </div>
  `
  );
}

window.addEventListener('load', () => {
  fetchUsers();
  userInput.focus();

  userInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      console.log('Enter');
      search(userInput.value);
      console.log(filtered);
      renderPanels();
      clearInput();
    }
    else {
      console.log('else aqui');
    }
  });

});
