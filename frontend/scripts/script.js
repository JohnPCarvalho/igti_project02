let arrayOfUsers = [];
let filtered = [];
let numberOfUsers = 3;

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
        gender: user.gender,
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
    panelStatistics.innerHTML = renderFilteredStatistics();
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
    <h1 class="font-sans text-4xl">${filtered.length} usuario(s) encontrado(s)</h1>
    <ul>
      ${filtered.map((user) => {
        return (
          `
            <li> 
              <img class="rounded-full inline-block" src="${user.picture}"> ${user.name}, ${user.age} anos
            </li>
          `
        )
      }).join('')}
    </ul>
  </div>
  `
  )
}

function doReduce(filteredArray) {
  return filteredArray.reduce()
}

function renderFilteredStatistics () {
  return (
    `
    <div>
      <h1 class="font-sans text-4xl">Estatisticas</h1>
      <ul>
        <li>Sexo Masculino: ${filtered.filter(user => user.gender == 'male').length} </li>
        <li>Sexo Feminino: ${filtered.filter(user => user.gender == 'female').length} </li>
        <li>Soma das idades: ${doReduce(filtered)} </li>
        <li>Media das idades:  </li>
      </ul>
    </div>
    `
  )
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
