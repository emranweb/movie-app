function createAutoComplete({element, renderOption}) {
    element.innerHTML = `
     <div class="search-area">
     <input type="text" class="form-control search-box" placeholder="Search Your Favorite Movie">
     <div class="movie-suggetion-list active">
         <!-- fetch data goes here -->
     </div>
     </div>
    `

    const searchBox = element.querySelector(".search-box");
    const suggetion = element.querySelector(".movie-suggetion-list");

    searchBox.addEventListener("input", inputSearch);
    document.addEventListener("click", closeDowndown);


    // close the dropdown then click outsisde the movie list
    function closeDowndown(event) {
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

                        ancher.innerHTML = renderOption(movie);
         

                        //add click event listener to the ancher
                        ancher.addEventListener("click", function (event) {
                            //dropdown class active;
                            suggetion.classList.remove("active");
                            searchBox.value = movie.Title;
                            //single movie clicck
                            onMovieSelect(movie);
                            event.preventDefault();
                        })

                        suggetion.appendChild(ancher)
                    }
                } else {
                    return;
                }
            })


        }, 1000)

    }
}