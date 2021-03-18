let arrayOfUsers = [];
let filtered = [];

let panelFilter = document.querySelector("#panelFilter");

let panelStatistics = document.querySelector("#panelStatistics");


let userInput = document.querySelector("#userInput");

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

function render() { 
  if (userInput.value === '') {
    let emptyBox;
    if (emptyBox === null) {
      emptyBox = document.createElement('h1');
      emptyBox.innerText = 'No filtered users.'
      panelFilter.appendChild(emptyBox);
    } else {
      panelFilter.prepend(emptyBox);
    }
  } else {
    let fullBox = document.createElement('h2')
    fullBox.innerText = 'there are filtered users.'
    panelFilter.appendChild(fullBox);
  }
}

window.addEventListener('load', () => {
  fetchUsers();
  userInput.focus();

  render();

  userInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      console.log('Enter');
      search(userInput.value);
      render();
      clearInput();
    }
    else {
      console.log('else aqui');
    }
  })
});
