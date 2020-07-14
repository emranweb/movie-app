

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
document.addEventListener("click", closeDowndown);


// close the dropdown then click outsisde the movie list
function closeDowndown(event){
    if (!suggetion.contains(event.target)) {
        suggetion.classList.remove("active")
    }
}



let intervalId;
function inputSearch(event) {


    if (intervalId) {
        clearTimeout(intervalId);
    }

    //dropdown class active;
    suggetion.classList.add("active"); 

    //store in setup timeout 
    intervalId = setTimeout(() => {
        const movies = fetchData(event.target.value);

        //empty the old search data
        suggetion.innerHTML = "";

        movies.then(data => {
            if (data.length) {
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
            } else {
                return;
            }
        })



    }, 1000)

}