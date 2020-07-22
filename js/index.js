//async data fetch from server
async function fetchData(input) {
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


// auto complete search opttion
createAutoComplete({
    element: document.querySelector(".search-wrapper"),
    renderOption: (movie) => {
   let image = movie.Poster === "N/A" ? "https://dummyimage.com/80x114/000/eb2828&text=No+Image" : movie.Poster

   return `<img class="poster"src="${image}"alt="">
        <div class="suggetion-info">
        <h4 class="title"> ${movie.Title}</h4>
        <span class="year">Year: ${movie.Year}</span>
        </div>`;
    }
})


// single movie select option

async function onMovieSelect(movie) {
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

    console.log(response.data)
    document.querySelector(".movie-details-image").innerHTML = `<img src="${response.data.Poster}" alt="image" />`
    document.querySelector(".movie-details-title").textContent = response.data.Title;

}