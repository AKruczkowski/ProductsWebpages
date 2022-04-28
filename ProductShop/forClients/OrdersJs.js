
//////////////////////////////////////////////
//          Initial parameters              //
//////////////////////////////////////////////

const uri = "http://localhost:50586/api/Order";
var temp = 0;

//////////////////////////////////////////////
function GetOrdData() //async     // Get Orders
{
    fetch("http://localhost:50586/api/Order/GetOrders", { //await
      method:'GET',
  mode: 'cors',
  dataType: 'json',
  headers :
  {'Content-type' : 'application/json'}
   })
   .then(response => {return response.json()})
   //.then(data => {console.log(data);return data})
  .then(data => {console.log(data);BindOrderToTable(data)})
  .catch((error)=> console.error(error))
  }

  function BindOrderToTable(data)     // Display Orders
  {
    console.log(data);
  
     for(var i =0; i < data.length;i++)
     {
        var tablerow = "<tr>"
               +  "<td>" + data[i].Order_ID +"</td>"
               +"<td>"+data[i].Address+"</td>"
               +"<td>"+ "<button id = '" + data[i].Order_ID + "' onclick = 'ShowHideEdit(id)'> Edit order"
              //  +
              //  "<button id = '" + data[i].Order_ID + "' onclick = 'deleteItem(id)'> Delete"+"</td>"
               +"</td>"
              // +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'updateItem(id)'> Edit" +"</td>"
              + "</tr>";
              
              $("#tbnbody").append(tablerow);         
     }
  }

//////////////////////////////////////////////

function ShowHideN()  //shows new form for the new order
{
  var x = document.getElementById("formNewOrder");
  if(x.style.display === "none")
  {
    x.style.display = "block";

  } else
  {
    x.style.display = "none"
  }

}
function ShowHideEdit(id)  //shows new form for the new order
{
  var x = document.getElementById("formEditOrder");
  if(x.style.display === "none")
  {
    x.style.display = "block";

        fetch("http://localhost:50586/api/Order/GetOrderDetails/" + id, { //await
        method:'GET',
      mode: 'cors',
      dataType: 'json',
      headers :
      {'Content-type' : 'application/json'}
      })
      .then(response => {return response.json()})
      //.then(data => {console.log(data);return data})
      .then(data => {console.log(data);displayCurrentOrder(data)})
      .catch((error)=> console.error(error))
  } else
  {
    x.style.display = "none";
  }

  temp = id;
}
//////////////////////////////////////////////
function displayCurrentOrder(data) 
{
  for(var i =0; i < data.length;i++)
  {
     var tablerow = "<tr>"
            +  "<td>" + data[i].Product_ID +"</td>"
            +"<td>"+  "<input type='text' id='add-quantity' placeholder='"+data[i].Quantity+"'>"+ "</input>" +"</td>"
            + "<td>"+ data[i].Price+"</td>"
            //+"<td>"+ "<button id = '" + data[i].Price + "' onclick = 'ShowHideEdit(id)'> Edit order"
           //  +
           //  "<button id = '" + data[i].Order_ID + "' onclick = 'deleteItem(id)'> Delete"+"</td>"
            +"</td>"
           + "</tr>";
           
           $("#edittbbody").append(tablerow);  
          // window.location.reload();
  }
}
//////////////////////////////////////////////
function CollectAllDetails()
{
  var table = document.getElementById("currentOrder");
  var data = [];
  for(var i =1;i<table.rows.length; i ++)
  {
    var tableRow = table.rows[i];
    var rowData = [];
    for(var j =0;j<tableRow.cells.length;j++)
    {rowData.push(tableRow.cells[j].innerHTML);}
    data.push(rowData);
    console.log(rowData);
  }
 // table = $('#Orders').tableToJSON();

}
//////////////////////////////////////////////
 function GetProdData() //async   // get products and put them in the list
 {
   //let response =
     fetch("http://localhost:50586/api/Products", { //await
       method:'GET',
   mode: 'cors',
   dataType: 'json',
   headers :
   {'Content-type' : 'application/json'}
    })
    .then(response => {return response.json()})
    //.then(data => {console.log(data);return data})
   .then(data => {console.log(data);createProductList(data)})
   .catch((error)=> console.error(error))
 }

 function createProductList(data)
 {
    var x = document.getElementById("prodList");
    for(var i =0; i < data.length;i++)
    {
      var option = document.createElement("option");
      option.id = data[i].Product_ID;
      option.text = data[i].Name;
      x.add(option);
    }
 }
//////////////////////////////////////////////




 function deleteItem(id)
{
  fetch(uri+'/DeleteOrder/' +id,{
    method:"DELETE",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'}
  })
  //.then( window.location.reload())
  .catch(error => console.error('Unable to delete item', error));
}
//////////////////////////////////////////////
function CreateNewOrder()
{
  //debugger;
  var x = document.getElementById("prodList");
  var n = parseInt(x.options[x.selectedIndex].id);
  
  const addQuantityTextbox = $('#add-quantity');
  const addAddressTextbox = $('#add-address');
      const newItem ={
      // Product_ID: x.option[x.selectedIntex].value,
        Address:addAddressTextbox.val(),
        OrdernDetails:[{Product_ID:n,Quantity:addQuantityTextbox.val()}]
      };

  fetch("http://localhost:50586/api/Order/AddOrder",{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'},
    body: JSON.stringify(newItem)
  })
  .then(response => response.json())   // window.location.reload()
  .catch(error => console.error('Unable to create order', error));
}
//  function BindDataToTable(data)
// {
//   console.log(data);

//    for(var i =0; i < data.length;i++)
//    {
//       var tablerow = "<tr>"
//              +  "<td>" + data[i].Name +"</td>"
//              +"<td>"+data[i].Price+"</td>"
//              +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'ShowHideNew(id)'> Add to order"+"</td>"
//             // +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'updateItem(id)'> Edit" +"</td>"
//             + "</tr>";
            
//             $("#tblbody").append(tablerow);         
//    }
// }




















/////////////////////////////////////////////////////////////////////////////////
  function ShowHideNew(id)
{
      // var x = document.getElementById("formNewOrder");
      // if(x.style.display === "none")
      // {
      //   x.style.display = "block";

      // } else
      // {
      //  // x.style.display = "none"
      // }
    var data = fetch("http://localhost:50586/api/Products/" + id, { //await
      method:'GET',
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'}
    })
    .then(response => {return response.json()})
    //.then(data => {console.log(data);return data})
    .then(data => {console.log(data);ShowProd(data)})
      .catch((error)=> console.error(error));
      //console.log(id);
      temp = id;
      //console.log(temp);
}
/////////////////////////////////////////////////////////////////////////////////////


function ShowProd(data)
{
      var tablerow = "<tr>"
      +  "<td>" + data.Name +"</td>"
      +  "<td>" +"<button id = '" + data.Product_ID + "' onclick = 'buyItem(id)'> Buy" +"</td>"
      "</tr>";
      $("#tablewithp").append(tablerow);  
}

  function buyItem()
  {
    const addQuantityTextbox = $('#add-quantity');
    const newItem ={
      Product_ID:temp,
      Address:"Random",
      Quantity: addQuantityTextbox.val(),
    };

    fetch(uri,{
      method:"POST",
      mode: 'cors',
      dataType: 'json',
      headers :
      {'Content-type' : 'application/json'},
      body: JSON.stringify(newItem)
    })
    .then(response => response.json())   // window.location.reload()
    .catch(error => console.error('Unable to create order', error));
  }



function showDetais(id)
{
  fetch("http://localhost:50586/api/Order/" + id, { //await
  method:'GET',
mode: 'cors',
dataType: 'json',
headers :
{'Content-type' : 'application/json'}
})
.then(response => {return response.json()})
//.then(data => {console.log(data);return data})
.then(data => {console.log(data);DetailsinTable(data)})
.catch((error)=> console.error(error))
}

function DetailsinTable(data)
{

  var tablerow = "<tr>"
   +  "<td>" + data.Name +"</td>"
   +  "<td>" + data.Product_ID +"</td>"
   + "<td>" + data.Quantity +"</td>"
   +  "<td>" + data.Price +"</td>"
  "</tr>";
  $("#tablewithp").append(tablerow);  
}


//            <input type="submit" value="Sumbit">