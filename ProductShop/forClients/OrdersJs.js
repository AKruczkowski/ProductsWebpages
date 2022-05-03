
//////////////////////////////////////////////
//          Initial parameters              //
//////////////////////////////////////////////

const uri = "http://localhost:50586/api/Order";
var temp = 0;
var nrofProd = 1;
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
              // +"</td>"
               //+"<td>"
               +   "<button id = '" + data[i].Order_ID + "' onclick = 'ShowAddressEdit(id)'> Edit address" +"</td>"
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
  //var n = document.getElementById("numberOfProd");
  const n = $("numberOfProd");
  nrofProd = n.val();

  
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
            +"<td contenteditable>" + data[i].Quantity +"</td>"
            + "<td>"+ data[i].Price +"</td>"
            //+"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = ''> Edit" + "</td>"
           //  +
           //  "<button id = '" + data[i].Order_ID + "' onclick = 'deleteItem(id)'> Delete"+"</td>"
                     +//"<td>"+  "<input type='text' id='" + data[i].Product_ID +"' placeholder='"+data[i].Quantity+"'>"+ "</input>" +"</td>"   
           + "</tr>";
           
           $("#edittbbody").append(tablerow);  
          // window.location.reload();
  }
}
//////////////////////////////////////////////
function CollectAllDetails() //collects all details in given order and pushes them into a table
{
  var table = document.getElementById("currentOrder");
  var ndata = [];

  var headers = [];
  for(var i =0; i<table.rows[0].cells.length;i++)
    {
      headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }
  for(var i=1; i < table.rows.length; i ++)
  {
      var tableRow = table.rows[i];
      var rowData = {};
      //console.log(tableRow.cells.length);
      for(var j =0;j<tableRow.cells.length;j++)
      {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
        console.log(rowData);
      }
    ndata.push(rowData);
   // console.log("Done");
  }
fetchEditedOrder(ndata);
console.log("point");
}

function fetchEditedOrder(ndata) //fetch data from CollectAllDetails table
{
  const newItem = {
    OrdernDetails:ndata
  }

  fetch("http://localhost:50586/api/Order/EditOrder/"+temp,{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'},
    body: JSON.stringify(newItem)
  })
  .then(response => response.json()) 
  .then(window.location.reload()) // window.location.reload()
  .catch(error => console.error('Unable to create order', error));
}

//////////////////////////////////////////////
 function GetProdData() //async   // get products and put them into the list
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
   .then(data => {console.log(data);createProductList(data); LoadProdToList(data)}) //createInputList(data)
   .catch((error)=> console.error(error))
 }

 function createProductList(data) //creates drop down list of product
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

function createInputList(data)
{
  var ord = document.getElementById("forManyOrderDet");
    for(var i =0;j<nrofProd;i++)
    {
      var tablerow = "<tr>"
      + "<td>" + "<select name = 'products' id = 'prodList'>" + "</td>"
      +  "<td contenteditable>" + 0 +"</td>"
      +"<td contenteditable>"+ 0 +"</td>"
      //+"<td>"+ "<button id = '" + data[i].Order_ID + "' onclick = 'ShowHideEdit(id)'> Edit order"
     //  +
     //  "<button id = '" + data[i].Order_ID + "' onclick = 'deleteItem(id)'> Delete"+"</td>"
      +"</td>"
     // +"<td>"+ "<button id = '" + data[i].Product_ID + "' onclick = 'updateItem(id)'> Edit" +"</td>"
     + "</tr>";


   }
     $("#newInputTable").append(tablerow);    

     var x = document.getElementById("prodList");
     for(var j =0; j < data.length;j++)
     {
       var option = document.createElement("option");
       option.id = data[j].Product_ID;
       option.text = data[j].Name;
       x.add(option);
     } 
}

function ShowAddressEdit(id)
  {
    temp = id;
    var x = document.getElementById("AddressCh");
    if(x.style.display === "none")
    {
      x.style.display = "block";
  
    } else
    {
      x.style.display = "none"
    }
  }

  function fetchEditedAddress()
  {
    debugger;
    // addAddressTextbox = $('#add-address');
    const addAddressTextbox = document.getElementById("addressChange");
    const newItem = {
      Order_ID:temp,
      Address:addAddressTextbox.value
    }
    //console.log(addAddressTextbox.val());
    console.log(addAddressTextbox.value);
    fetch("http://localhost:50586/api/Order/EditOrderNew/"+temp,{
      method:"POST",
      mode: 'cors',
      dataType: 'json',
      headers :
      {'Content-type' : 'application/json'},
      body: JSON.stringify(newItem)
    })
    .then(response => response.json()) 
   // .then(window.location.reload()) // window.location.reload()
    .catch(error => console.error('Unable to create order', error));
  }

function newProductForm()
{
  var x = document.getElementById("RandomName");
  if(x.style.display === "none")
  {
    x.style.display = "block";

  } else
  {
    x.style.display = "none"
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// function LoadProductsForNewDetail()
// {

//   fetch("http://localhost:50586/api/Products", { //await
//   method:'GET',
// mode: 'cors',
// dataType: 'json',
// headers :
// {'Content-type' : 'application/json'}
// })
// .then(response => {return response.json()})
// //.then(data => {console.log(data);return data})
// .then(data => LoadProdToList(data) ) //createInputList(data)
// .catch((error)=> console.error(error)) 
// }

function LoadProdToList(data)
{
  var x = document.getElementById("prodListN");
  for(var i =0; i < data.length;i++)
  {
    var option = document.createElement("option");
    option.id = data[i].Product_ID;
    option.text = data[i].Name;
    x.add(option);
  }
}

function fetchDetail()
{

  var x = document.getElementById("prodListN");
  var n = parseInt(x.options[x.selectedIndex].id);
  
  const addQuantityTextbox = $('#add-quantityN');

      const newItem ={
     Product_ID:n,
     Quantity:addQuantityTextbox.val()
      };
if(temp != 0 && temp != null)
  fetch("http://localhost:50586/api/Order/AddOrderDetail/"+temp,{
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
















/////////////////////////////////////////////////////////////////////////////////
//   function ShowHideNew(id)
// {
//       // var x = document.getElementById("formNewOrder");
//       // if(x.style.display === "none")
//       // {
//       //   x.style.display = "block";

//       // } else
//       // {
//       //  // x.style.display = "none"
//       // }
//     var data = fetch("http://localhost:50586/api/Products/" + id, { //await
//       method:'GET',
//     mode: 'cors',
//     dataType: 'json',
//     headers :
//     {'Content-type' : 'application/json'}
//     })
//     .then(response => {return response.json()})
//     //.then(data => {console.log(data);return data})
//     .then(data => {console.log(data);ShowProd(data)})
//       .catch((error)=> console.error(error));
//       //console.log(id);
//       temp = id;
//       //console.log(temp);
// }
/////////////////////////////////////////////////////////////////////////////////////
