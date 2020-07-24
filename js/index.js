let autoCompleteConfig = {
    renderOption: (movie) => {
        let image = movie.Poster === "N/A" ? "https://dummyimage.com/80x114/000/eb2828&text=No+Image" : movie.Poster

        return `<img class="poster"src="${image}"alt="">
        <div class="suggetion-info">
        <h4 class="title"> ${movie.Title}</h4>
        <span class="year">Year: ${movie.Year}</span>
        </div>`;
    },
    OptionTitle(movie) {
        return movie.Title;
    },
    //async data fetch from server
    async fetchData(input) {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "be668231",
                s: input
            }
        })

        //check the empty response
        if (response.data.Error) {
            return [];
        }

        //return the search data
        return response.data.Search;
    }
}



// auto complete search opttion
createAutoComplete({
    ...autoCompleteConfig,
    element: document.querySelector(".left-search-wrapper"),

    onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector(".movie-details-left"), "left")
    }
})

// auto complete search opttion
createAutoComplete({
    ...autoCompleteConfig,
    element: document.querySelector(".right-search-wrapper"),
    onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector(".movie-details-right"), "right")
    }

})


let leftItems ;
let rightItems;

// single movie select option
async function onMovieSelect(movie, element, side) {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "be668231",
            i: movie.imdbID
        }
    })

    //check the empty response
    if (response.data.Error) {
        console.log("no data Found")
    }

    if(side==="left"){
        leftItems = response.data;
    }else{
        rightItems = response.data;
    }

    if(leftItems && rightItems){
        runCompare();
    }

    element.innerHTML = movieTemplate(response.data)

}

function runCompare(){
    console.log("comparison start")
}



function movieTemplate(movie) {
    return `
<div class="card">
  <img src="${movie.Poster}" class="card-img-top" alt="">
  <div class="card-body">
  <h5 class="card-title">${movie.Title}</h5>
  <p class="card-text">${movie.Plot}</p>
  </div>
</div>

<div class="card">
  <div class="card-body">
  <h5 class="card-title">Awards</h5>
  <p class="card-text">${movie.Awards}</p>
  </div>
</div>

<div class="card">
  <div class="card-body">
  <h5 class="card-title">Box Office</h5>
  <p class="card-text">${movie.BoxOffice}</p>
  </div>
</div>
<div class="card">
  <div class="card-body">
  <h5 class="card-title">Meta Score</h5>
  <p class="card-text">${movie.Metascore}</p>
  </div>
</div>

  `
}