let arrayOfUsers = [];
let filtered = [];

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

function render() { 
}

window.addEventListener('load', () => {
  fetchUsers();
  userInput.focus();

  render();

  userInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      console.log('Enter');
      search(userInput.value);
      console.log(filtered);
      clearInput();
    }
    else {
      console.log('else aqui');
    }
  });


});
