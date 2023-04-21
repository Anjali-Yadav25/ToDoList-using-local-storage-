let item = document.querySelector("#inp");
let todoList = document.querySelector("#to-do-list");
let press = -1;
let idx = -1;
showlist();

item.addEventListener(
  "keyup",
  function(event){
    if(event.key == "Enter"){
      let userData = this.value;
      let storageItem = getStorage();
      if(userData.trim() != "")
      {
        if (press != -1)
        {
          let temp = storageItem[idx].complete
          let obj = {
          data : userData ,
          complete : temp
        };
          console.log("yes");
          press = -1;
          storageItem[idx] = obj;
          console.log(obj);
          idx = -1;
        }
        else
        {
          let obj = {
          data : userData ,
          complete : false
        };
          console.log("no");
          storageItem.push(obj);
        }
        localStorage.setItem("localItem", JSON.stringify(storageItem));
      }
      else
      {
        alert("Please enter Valid Data !!!!!");
      }
      showlist();
    }
  }
);

function getStorage(){
  let storageItem = localStorage.getItem("localItem");
  if (storageItem == null){
    return [];
  }
  else{
    storageItem = JSON.parse(storageItem);
    return storageItem;
  }
}

function showlist(){
  let storageItem = getStorage();
  let output ="";
  storageItem.forEach((ele, index) => {
    console.log(ele.data);
    console.log(ele.complete);
    console.log(index);
    if (ele.complete)
    {
      output += `
      <li class="list-group-item d-flex">
      <div class="txt" id="done">${ele.data}</div>
      <div id="btns">
      <input checked type="checkbox" id="check" onclick="checkItem(${index})">
      <button id="edit" onclick="editItem(${index})">edit</button>
      <button id="del" onclick="deletItem(${index})">X</button>
      </div><hr>
      </li>
      `;
    }
    else{
      output += `
      <li class="list-group-item d-flex">
      <div class="txt">${ele.data}</div>
      <div id="btns">
      <input type="checkbox" id="check" onclick="checkItem(${index})">
      <button id="edit" onclick="editItem(${index})">edit</button>
      <button id="del" onclick="deletItem(${index})">X</button>
      </div><hr>
      </li>
      `;
    }
  });
  todoList.innerHTML = output;
  item.value = "";
}

function editItem(index){
  let storageItem = getStorage();
  item.value = storageItem[index].data;
  item.focus();
  press = 1;
  idx = index;
}

function deletItem(index){
  let storageItem = getStorage();
  storageItem.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(storageItem));
  showlist();
}

function checkItem(index){
  console.log("hii");
  let storageItem = getStorage();
  if(storageItem[index].complete){
    console.log("false");
    storageItem[index].complete = false;
    
  }
  else{
    console.log("true");
    storageItem[index].complete = true;
    
  }
  localStorage.setItem("localItem", JSON.stringify(storageItem));
  showlist();
}

