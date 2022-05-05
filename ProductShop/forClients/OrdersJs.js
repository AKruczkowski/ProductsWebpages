
//////////////////////////////////////////////
//          Initial parameters              //
//////////////////////////////////////////////

const uri = "http://localhost:50586/api/Order";
var temp = 0;
var nrofProd = 1;
const delay =ms => new Promise(res => setTimeout(res,ms));
//////////////////////////////////////////////
function GetOrdData() //async     // Get Orders
{
  $("#Orders tr").remove();  
    fetch(uri + "/GetOrders", { //await
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
               +   "<button id = '" + data[i].Order_ID + "' onclick = 'ShowAddressEdit(id)'> Edit address"
               +"<button id = '" + data[i].Order_ID + "' onclick = 'deleteItem(id)'> Delete"                //changed here!
               +"</td>"
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
  x.reset();
  if(x.style.display === "none")
  {
    x.style.display = "block";                                                                          //  HERE

        fetch(uri +"/GetOrderDetails/" + id, { //await
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
  $("#edittbbody tr").remove();  
  for(var i =0; i < data.length;i++)
  {
     var tablerow = "<tr>"
            +  "<td>" + data[i].Product_ID +"</td>"
            +"<td contenteditable>" + data[i].Quantity +"</td>"
            + "<td>"+ data[i].Price +"</td>"
            +"<td>"+ "<button id = '" + data[i].OrderDetail_ID+ "' type='button' onclick = 'DeleteDetail(id)'> Remove" + "</td>"
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
  for(var i =0; i<table.rows[0].cells.length-1;i++)
    {
      headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }
  for(var i=1; i < table.rows.length; i ++)
  {
      var tableRow = table.rows[i];
      var rowData = {};
      //console.log(tableRow.cells.length);
      for(var j =0;j<tableRow.cells.length-1;j++) //-1
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

  fetch(uri + "/EditOrder/"+temp,{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'},
    body: JSON.stringify(newItem)
  })
  .then(response => response.json()) 
  .then(reloadDiv())
 // .then(window.location.reload()) // window.location.reload()
  .catch(error => console.error('Unable to create order', error));
}

//////////////////////////////////////////////
 function GetProdData() //async   // get products and put them into the list
 {
   //let response =
     fetch("http://localhost:50586/api/Products/GetProducts", { //await
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
  //debugger
  fetch(uri+'/DeleteOrders/' +id,{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'}
  })
  .then(GetProdData())
  //.then(reloadDiv())
  .catch(error => console.error('Unable to delete item', error))
  .then(window.onerror = reloadPg());
  // .then(  delay(2500),
  // GetProdData(),
  // reloadDiv());

  // delay(2500);
  // GetProdData();
  // reloadDiv();
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

  fetch(uri + "/AddOrder",{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'},
    body: JSON.stringify(newItem)
  })
  .then(response => response.json())
  .then(window.location.reload())
  //.then($("#ordInfo").load(window.location.href+"#ordInfo"))  // window.location.reload()
  .catch(error => console.error('Unable to create order', error));

   delay(500);
  GetOrdData();

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
    fetch(uri + "/EditOrderNew/"+temp,{
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
  fetch(uri+"/AddOrderDetail/"+temp,{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'},
    body: JSON.stringify(newItem)
  })
  .then(response => response.json())
  .then(reloadDiv())   // window.location.reload()
  .catch(error => console.error('Unable to create order', error))
  .then(window.onerror = reloadDiv());

  
}

function reloadDiv()
{
  $("#formEditOrder").load(window.location.href+"#formEditOrder") 
}

function reloadPg()
{
  location.reload();
}


function DeleteDetail(id)
{
  fetch(uri+'/DeleteOrderDetail/' +id,{
    method:"POST",
    mode: 'cors',
    dataType: 'json',
    headers :
    {'Content-type' : 'application/json'}
  })
 // .then(GetProdData())
 // .then(reloadDiv())
  .catch(error => console.error('Unable to delete item', error))
  //.then(window.onerror = reloadDiv())
  .then(window.onerror = reloadPg());
}

function getDetails()
{
  // fetch(uri +"/GetOrderDetails/" + id, { //await
  //   method:'GET',
  // mode: 'cors',
  // dataType: 'json',
  // headers :
  // {'Content-type' : 'application/json'}
  // })
  // .then(response => {return response.json()})
  // //.then(data => {console.log(data);return data})
  // .then(data => {console.log(data);displayCurrentOrder(data)})
  // .catch((error)=> console.error(error))
}
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
