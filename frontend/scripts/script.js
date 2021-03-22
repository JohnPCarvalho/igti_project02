let arrayOfUsers = [];
let filtered = [];
let numberOfUsers = 3;

let userInput = document.querySelector("#userInput");
let searchButton = document.querySelector("#searchButton");

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
    panelFilter.innerHTML = renderFilteredUsers();
    panelStatistics.innerHTML = renderFilteredStatistics();
  }
  else {
    //zerar as infos dos paineis - it is already done.
    panelFilter.innerHTML = '<h1 class="font-sans text-4xl">Nenhum conteudo a ser exibido</h1>';
    panelStatistics.innerHTML = '<h1 class="font-sans text-4xl">Nenhum conteudo a ser exibido</h1>';
  }
}

function renderFilteredUsers() {
  return (
  `
  <div>
    <h1 class="font-sans text-4xl m-4">${filtered.length} usuario(s) encontrado(s)</h1>
    <ul>
      ${filtered.map((user) => {
        return (
          `
            <li class="m-4"> 
              <p><img class="rounded-full inline-block" src="${user.picture}"> ${user.name}, ${user.age} anos</p>
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
  //obj.age cria a array. Eu errava porque criava um objeto com ({})
  return filteredArray.map(obj => obj.age).reduce((result, age) => result += age )
}

function renderFilteredStatistics () {
  return (
    `
    <div>
      <h1 class="font-sans text-4xl m-4">Estatisticas</h1>
      <ul>
        <li class="ml-4">Sexo Masculino: ${filtered.filter(user => user.gender == 'male').length} </li>
        <li class="ml-4">Sexo Feminino: ${filtered.filter(user => user.gender == 'female').length} </li>
        <li class="ml-4">Soma das idades:  ${doReduce(filtered)}</li>
        <li class="ml-4">Media das idades: ${(doReduce(filtered) / filtered.length).toFixed(2)} </li>
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

  searchButton.addEventListener("click", (event) => {
    search(userInput.value);
    renderPanels();
    clearInput()
  })

});
