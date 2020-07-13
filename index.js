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





const searchBox = document.querySelector(".search-box");
const suggetion = document.querySelector(".movie-suggetion-list");


searchBox.addEventListener("input", inputSearch);



let intervalId;

function inputSearch(event) {
    //clear the setTimeout 
    if (intervalId) {
        clearTimeout(intervalId);
    }
    //store in setup timeout 
    intervalId = setTimeout(() => {
        const movies = fetchData(event.target.value);

        //empty the old search data
        suggetion.innerHTML = "";

        movies.then(data => {
           // let movieList = data.slice(0,5);
            for (let movie of data) {
                const ancher = document.createElement("a");
                ancher.classList.add("item");
                ancher.setAttribute("herf", "#");

                ancher.innerHTML =
                `<img class="poster"src="${movie.Poster}"alt="">
                <div class="suggetion-info">
                  <h4 class="title"> ${movie.Title}</h4>
                  <span class="year">Year: ${movie.Year}</span>
                </div>`

                suggetion.appendChild(ancher)
            }
        })



    }, 1000)

}