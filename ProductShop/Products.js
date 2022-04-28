
var data = [];
var uri = "http://localhost:50586/api/Products";
//var newID;
 function GetBindData() //async
{
  //let response =
    fetch("http://localhost:50586/api/Products", { //await
      method:'GET',
  mode: 'cors',
  dataType: 'json',
  headers :

  {'Content-type' : 'application/json',
  'Access-Control-Allow-Origin' : '*'}
   })
   .then(response => {return response.json()})
   //.then(data => {console.log(data);return data})
  .then(data => {console.log(data);BindDataToTable(data)})
  .catch((error)=> console.error(error))

}


function BindDataToTable(data)
{

  console.log(data);

   for(var i =0; i < data.length;i++)
   {
    //  let deleteButton = document.querySelector('button');
   //   deleteButton.innerText = 'Delete';
    //  deleteButton.setAttribute('onclick','deleteItem(${data[i].Product_ID}') 
    //console.log(data[i].Product_ID);
   // var n = data[i].Product_ID;
      var tablerow = "<tr>"
           + "<td>"+ data[i].Product_ID + "</td>"
             +  "<td>" + data[i].Name +"</td>"
             +"<td>"+data[i].Price+"</td>"
             +"<td>"+data[i].Width+"</td>"
             +"<td>"+data[i].Height+"</td>"
             +"<td>"+data[i].Length+"</td>"
             +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'deleteItem(id)'> Delete"+
             "<button id = '" + data[i].Product_ID + "' onclick = 'ShowHideEdit(id)'> Edit"
             +"</td>"
            // +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'updateItem(id)'> Edit" +"</td>"
            + "</tr>";
            
            $("#tblbody").append(tablerow);

            
   }
}

function deleteItem(id)
{
  fetch(uri+'/' +id,{
    method:"DELETE",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'}
  })
  .then( window.location.reload())
  .catch(error => console.error('Unable to delete item', error));
}



function addItem() {
   const addNameTextbox = $('#add-name');
   const addPriceTextbox = $('#add-price');
   const addWidthTextbox = $('#add-width');
   const addHeightTextbox = $('#add-height');
   const addLengthTextbox = $('#add-length');

   const item = {
     name: addNameTextbox.val(),
     Price: addPriceTextbox.val(),
    Width: addWidthTextbox.val(),
    Height: addHeightTextbox.val(),
    Length: addLengthTextbox.val()
   };
 
   fetch("http://localhost:50586/api/Products", {
     method: 'POST',
     mode: 'cors',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(item)
   })
     .then(response => response.json())
     .then(() => {
      //GetBindData();
       addNameTextbox.value = '';
       window.location.reload();
     })
     .catch(error => console.error('Unable to add item.', error));
 }
 

  function showID(id)
  {
   var item = id;
    $("#sh").append(item);
  }


function updateItem() //id
{
  const IDTextbox = $('#add-id')
  const addNameTextbox = $('#n-name');
  const addPriceTextbox = $('#n-price');
  const addWidthTextbox = $('#n-width');
  const addHeightTextbox = $('#n-height');
  const addLengthTextbox = $('#n-length');
  const newID = document.getElementById("add-id").getAttribute("placeholder");
  showID(newID);
  const item = {
    //Product_ID: IDTextbox.val(),
    name: addNameTextbox.val(),
    Price: addPriceTextbox.val(),
   Width: addWidthTextbox.val(),
   Height: addHeightTextbox.val(),
   Length: addLengthTextbox.val()
  };

  fetch(uri+'/' +newID,{
    method: "PUT",
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(item)
  })
  //.then()
  .then(response => response.json())
  .then(window.location.reload())
  .catch(error => console.error('Unable to update item.', error));

}

function ShowHideNew()
{
  var x = document.getElementById("formAddN");
  if(x.style.display === "none")
  {
    x.style.display = "block";

  } else
  {
    x.style.display = "none"
  }
}
function ShowHideEdit(id)
{
  var x = document.getElementById("formEdit");
  //newID = id;
  //var idcheck = document.getElementById("add-id");
  if(x.style.display === "none")
  {
    x.style.display = "block";
    $("#add-id").attr("placeholder",id);
  } else
  {
    x.style.display = "none"
  }
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  <button id="showB" type="button" onclick = "GetBindData()">Show</button>


