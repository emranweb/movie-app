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




createAutoComplete({
    element: document.querySelector(".search-wrapper")
})





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