const fetchUsers = async () => {
  let resource = await fetch("http://localhost:3001/users");
  let users = await resource.json();
  return users;
}

let userInput = document.querySelector("#userInput");
let form = document.querySelector("form");

function mapUsers (usersList)  {
  return usersList.map(user => 
    ({
      name: user.name.first,
      picture: user.picture.thumbnail,
      dob: user.dob.date,
      email: user.email
    })
  )
}

const filterUsers = (usersList) => {
  console.log(usersList);

  let filteredList = usersList.filter((names) => {
    return names.name.first.charAt(0) == 'A';
  });
  console.log(filteredList);
}

window.addEventListener('load', async () => {
  
  let usersList = await fetchUsers();
  let mappedUsers = mapUsers(usersList);
  console.log(mappedUsers);

  
});