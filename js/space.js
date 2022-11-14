const NASA = "https://images-api.nasa.gov/";

let dato = []

function showNASA(){
    let mostrar = "";
    for (let articulo of dato){ 
   mostrar += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + articulo.links[0].href + `" alt="product image" class="img-thumbnail"> </img>
                    </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4> `+ articulo.data[0].title +` </h4> 
                                    <p> `+ articulo.data[0].description +` </p> 
                                    <p> `+ articulo.data[0].date_created +` </p> 
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            `
       }
    document.getElementById("contenedor").innerHTML = mostrar;
}

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btnBuscar").addEventListener("click", function(){
         
        let finding= document.getElementById("inputBuscar").value;
        
         getJSONData(NASA + "search?q=" + finding).then(function(resultObj){
            if (resultObj.status === "ok"){
                dato = resultObj.data.collection.items;
                showNASA(dato);
            }
        });
    });  
}); 