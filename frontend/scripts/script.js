let arrayOfUsers = [];

async function fetchUsers () {
  let resource = await fetch("http://localhost:3001/users");
  let users = await resource.json();
  arrayOfUsers = users.map(user => 
      ({
        name: user.name.first,
        picture: user.picture.thumbnail,
        dob: user.dob.date,
        email: user.email
      })
    );
    return arrayOfUsers;
}

function search () {
  //captures user input
  userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      console.log(arrayOfUsers);
      arrayOfUsers.filter((user) => {
        return user.name.toLowerCase().includes(event.target.value).toLowerCase();
      })
    }
  })
}

window.addEventListener('load', () => {
  
  fetchUsers();
  search();
});
