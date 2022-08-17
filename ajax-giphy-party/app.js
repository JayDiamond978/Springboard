$("#submit-form").on("click", async function searchForGif(e) {
    e.preventDefault();
    let $gifSearched = $("#gif-query").val();
    let gifs = await giphy($gifSearched);

    let selectedGif = selectRandomGif(gifs.data.data);
    appendDom(selectedGif);
})

async function giphy(query) {
    let request = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    return request;
}

function selectRandomGif(listOfGifs) {
    let randomGif = Math.floor(Math.random() * listOfGifs.length);
    return listOfGifs[randomGif];
}

function appendDom(gif) {
    let $item = $(
        `<img src=${gif.images.original.url}>`
    );
    $(".gif-section").append($item);
}

$("#delete-gifs").on("click", function deleteGifs() {
    $(".gif-section").empty();
})