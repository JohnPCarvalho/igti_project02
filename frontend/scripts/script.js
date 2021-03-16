const fetchUsers = async () => {
  let resource = await fetch("http://localhost:3001/users");
  let users = await resource.json();
  return users;
}

window.addEventListener('load', async () => {
  activateInput();
  let usersList = await fetchUsers();

  activateInput();
  filterUsers(usersList);
});

let userInput = document.querySelector("#userInput");
let form = document.querySelector("form");

const filterUsers = (list) => {
  console.log(list);

  //function filterName(arrayList) {
 //   return arrayList.name.first.charAt(0) == 'B';
 // }

  let filteredList = list.filter((names) => {
    return names.name.first.charAt(0) == 'A';
  });
  console.log(filteredList);
}

const activateInput = () => {
  userInput.addEventListener('input',  () => {
    console.log('logou');
  });
}

