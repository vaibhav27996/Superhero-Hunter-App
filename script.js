var showUniqueData="false";

$('#showHide').show();
$("#showHeros").hide();
$("#showHerpDetails").hide();

//check local storage if favourites exist (getItem) else (setItem)
if (localStorage.getItem("favourites")==null) {
    localStorage.setItem("favourites",JSON.stringify([]));
  }else{
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }
  
  

  function addFavourite(id) {
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem("favourites", JSON.stringify(arr));
      alert("Want to add in favourites")
    }else{
      alert(" Hero already added in favourites")
    }
  }
  
//fetch superhero data as per input text
const showCorrespondingHeros = () => {
    var getDetails="";
    $("#showHeros").show();
    $("#showHerpDetails").hide();
    $('#showHide').hide();
  
    let name = document.getElementById("getName").value;
        
        var url=`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=fbac997b631b97a0bbc8f8429d7d0f8d&hash=946e4b5a067aca0f80cc60e3cfda8036`;
      
        if(name && showUniqueData=="false"){
            
            const promise=async()=>{
                const response=await fetch(url);
                const data=await response.json();
            
                   
                    if (data.data.results) {
                      data.data.results.forEach((element) => {
                        var image=  element.thumbnail.path + "."+element.thumbnail.extension;

                      
                        getDetails +=`

                                <div class="col-4 col-sm-3 col-md-3 col-lg-3">
                                    <div class="card favourite-card" style="width: 18rem;">
                                        <div class="card-header">
                                            <img class="favourite-cardImg" onclick="showDetails(${element.id});" src='${image}' > 
                                        
                                        </div>
                
                                        <div class="card-body favourite-cardBody">
                                            <h6 class="text-dark">${element.name}</h6>
                                            <button id="${element.id}" class="btn btn-sm btn-info mt-2" onclick="addFavourite(${element.id})">Add to Favorite</button>
                                        </div>
                                    </div>
                                </div> 
                        `
                      });
                    } else {
                        getDetails += `
                      <div class="page-wrap d-flex flex-row align-items-center">
                      <div class="container">
                          <div class="row justify-content-center">
                              <div class="col-md-12 text-center">
                                  <span class="display-1 d-block">404</span>
                                  <div class="mb-4 lead">The hero you are looking for was not found.</div>
                              </div>
                          </div>
                      </div>
                  </div>
                      `;
                    }
                    document.getElementById("showHeros").innerHTML= getDetails;
    
            }
            promise();
        }
  };

  //show indiviual superhero details
  function showDetails(idnumber) {
    $("#showHeros").hide();
    $("#showHerpDetails").show();
    $('#showHide').hide();


    var personalDetails="";
    localStorage.setItem("id", idnumber);
    var superHeroId=localStorage.getItem("id");
   
    const promise=async()=>{
        const response=await fetch(`https://gateway.marvel.com/v1/public/characters?id=${superHeroId}&ts=1&apikey=fbac997b631b97a0bbc8f8429d7d0f8d&hash=946e4b5a067aca0f80cc60e3cfda8036`);
        const data=await response.json();
      
        data.data.results.forEach((element)=>{
            var image=  element.thumbnail.path + "."+element.thumbnail.extension;
            personalDetails+=`
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">

                    <div class="container personalContainer">
                        <div class="row">
                            <div class="col-12 col-sm-3 col-md-3 col-lg-3">
                                <img class="personalImage" src="${image}" />
                            </div>

                            <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                                <div class="rightside">
                                    <h5 class="heading">Name : <span class="para">${element.name}</span> </h5>
                                    <h5 class="heading">Description : <span class="para"> ${element.description} </span></h5>
                                    <h5 class="heading">Source : <a class="para" target="__blank" href="${element.resourceURI}"> ${element.resourceURI} </a> </h5>
                                    <hr style="color:white">
                                    <h5 class="heading">Comics</h5>
                                    <div>
                                        <ul>`;

                                            element.comics.items.forEach((itemName)=>{
                                                personalDetails+=`<li  class="heading">${itemName.name}</li>`  
                                            });
                                            
                                            personalDetails+=` </ul> 


                                    </div>
                                    <hr style="color:white">
                                    <h5 class="heading">Series</h5>
                                    <div>
                                        <ul>`;

                                            element.series.items.forEach((seriesName)=>{
                                                personalDetails+=`<li  class="heading">${seriesName.name}</li>`  
                                            });
                                            
                                            personalDetails+=` </ul> 
                                    </div>

                                </div>
                            <div>

                        </div>
                    </div>
                    
                </div>
           `;
        
            document.getElementById("showHerpDetails").innerHTML=personalDetails;
        })
           
            

    }
    promise();
  }


