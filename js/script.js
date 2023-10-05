const DATA_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
var DATA;
var currentMovie;

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const movieTitle = document.getElementById("movieTitle");
const movieOverview = document.getElementById("movieOverview");
const movieGenres = document.getElementById("movieGenres");
const movieYear = document.getElementById("movieYear");
const movieRuntime = document.getElementById("movieRuntime");
const movieBudget = document.getElementById("movieBudget");
const movieRevenue = document.getElementById("movieRevenue");

const list = document.getElementById("list");

document.addEventListener("DOMContentLoaded", event => {
    getJson();
});

searchButton.addEventListener("click", event => {
    if(searchInput.value != "") {
        const search = searchInput.value.toLowerCase();
        const filteredSearch = DATA.filter((element) => element.title.toLowerCase().includes(search.toLowerCase()) || element.tagline.toLowerCase().includes(search.toLowerCase()) || element.overview.toLowerCase().includes(search.toLowerCase()));

        showMovies(filteredSearch);
    }
});

async function getJson () {
    let response = await fetch(DATA_URL);
    let json = await response.json();

    DATA = json;
}

function showMovies (moviesArray) {
    list.innerHTML = "";
    currentMovie = moviesArray;

    for (let i = 0; i < moviesArray.length; i++) {
        list.innerHTML += `<li class="list-group-item bg-dark" onclick="showMovieData(${i})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="d-flex">
          <div class="col-10">
            <p class="text-light fw-bold m-0">${moviesArray[i].title}</p>
          </div>
          <div>
            ${getStars((moviesArray[i].vote_average / 10) * 5)}
          </div>
        </div>
        <p class="text-muted m-0">${moviesArray[i].tagline}</p>
      </li>`;
    }
}

function showMovieData (movieIndex) {
    var movie = currentMovie[movieIndex];

    movieTitle.innerHTML = movie.title;
    movieOverview.innerHTML = movie.overview;

    movieGenres.innerHTML = "";

    movie.genres.forEach(genre => {
        movieGenres.innerHTML += genre.name + " - ";
    });

    movieYear.innerHTML = "Year: " + movie.release_date.slice(0,4);
    movieRuntime.innerHTML = "Runtime: " + movie.runtime + " mins";
    movieBudget.innerHTML = "Budget: $" + movie.budget;
    movieRevenue.innerHTML = "Revenue: $" + movie.revenue;
}

function getStars (rating) {
    let stars = "";
    const maxStars = 5;
    const yellowStar = '<span class="fa fa-star checked"></span>';
    const blackStar = '<span class="fa fa-star unchecked"></span>';

    for (let i = 0; i < maxStars; i++) {
        if (i < rating) {
            stars += yellowStar;
        } else {
            stars += blackStar;
        }
    }
    return stars;
}