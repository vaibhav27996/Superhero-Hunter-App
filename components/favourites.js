var favouriteArr=JSON.parse(localStorage.getItem("favourites"));

//fetch favourite list here
function fetchFavourites(){
    let showFavourites="";
    
    for (let i = 0; i < favouriteArr.length; i++) {
        var url=`https://gateway.marvel.com/v1/public/characters?id=${favouriteArr[i]}&ts=1&apikey=fbac997b631b97a0bbc8f8429d7d0f8d&hash=946e4b5a067aca0f80cc60e3cfda8036`;
        
        const promise=async ()=>{
            const data=await fetch(url);
            const resp= await data.json();
            resp.data.results.forEach((data) => {
                var image=  data.thumbnail.path + "."+data.thumbnail.extension;

                showFavourites+=`
                <div class="col-4 col-sm-3 col-md-3 col-lg-3">
                   

                    <div class="card favourite-card" style="width: 18rem;">
                        <div class="card-header">
                            <img class="favourite-cardImg" onclick="showDetails(${data.id});" src='${image}' > 
                           
                        </div>

                        <div class="card-body favourite-cardBody">
                            <h6 class="text-dark">${data.name}</h6>
                            <button id="${data.id}" class="btn btn-sm btn-danger mt-2" onclick="removeFavourite(${data.id})">Unfavourite</button>
                        </div>
                    </div>
                </div> `
                
            });

            document.getElementById("favourites").innerHTML= showFavourites;
            
        }
        promise();
        
    }
    
}

fetchFavourites();

//remove favourite from favourites lists
function removeFavourite(id){
    var index=favouriteArr.indexOf(id);
    console.log(index);
    favouriteArr.splice(index,1);

    localStorage.setItem("favourites",JSON.stringify(favouriteArr));
    alert("Are you sure want to unfavourite");
    location.reload();

}
