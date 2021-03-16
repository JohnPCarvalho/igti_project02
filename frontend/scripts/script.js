const fetchUsers = async () => {
  let resource = await fetch("http://localhost:3001/users");
  let users = await resource.json();
  return users;
}

window.addEventListener('load', async () => {
  activateInput();
  let usersList = await fetchUsers();
  console.log(usersList);
  let mappedUsers = mapUsers(usersList);
  console.log(mappedUsers);
  activateInput();
  
  //filterUsers(mappedUsers);
});

let userInput = document.querySelector("#userInput");
let form = document.querySelector("form");


const mapUsers = (usersList) => {
  return usersList.map(user => 
    ({
      name: user.name.first,
      email: user.email
    })
  )
}

const filterUsers = (usersList) => {
  console.log(usersList);

  //function filterName(arrayList) {
 //   return arrayList.name.first.charAt(0) == 'B';
 // }

  let filteredList = usersList.filter((names) => {
    return names.name.first.charAt(0) == 'A';
  });
  console.log(filteredList);
}

const activateInput = () => {
  userInput.addEventListener('input',  () => {
    console.log('logou');
  });
}

