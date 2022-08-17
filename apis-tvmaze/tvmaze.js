/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const shows = [];
  const missingImageDefault = "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300"

  let queriedShows = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  for (let queriedShow of queriedShows.data) {
    let showObj = {};
    showObj.id = queriedShow.show.id;
    showObj.name = queriedShow.show.name;
    showObj.summary = queriedShow.show.summary;
    showObj.image = queriedShow.show.image ? queriedShow.show.image.original : missingImageDefault;
    shows.push(showObj);
  }
  return shows;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <img class="card-img-top" src=${show.image}>
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button id="show-episodes-button">Show Episodes</button>
           </div>
         </div>
       </div>
      `);
    $showsList.append($item);
  }
}

/** Populate episodes list:
 *     - given list of episodes, add shows to DOM
 */
function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  for (let episode of episodes) {
    let $item = $(
      `<li>${episode.name} (season ${episode.season}, episode ${episode.number})</li>`
    );
    $episodesList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Handles episode query and showcasing episodes for a show
 *    - reveals episodes area
 *    - get list of episodes for requested show
 */

$(".row").on("click", "#show-episodes-button", async function(e) {
  let $showId = $(e.target).parent().parent()[0].dataset.showId;
  let episodeList = await getEpisodes($showId);
  populateEpisodes(episodeList);
})

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const episodeInfoArray= [];
  
  let showEpisodes = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  for (let showEpisode of showEpisodes.data) {
    let episode = {};
    episode.id = showEpisode.id;
    episode.name = showEpisode.name;
    episode.season = showEpisode.season;
    episode.number = showEpisode.number;
    episodeInfoArray.push(episode);
  }
  $("#episodes-area").show();
  return episodeInfoArray;
}
