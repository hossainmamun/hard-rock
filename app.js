

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
    const searchField = document.getElementById("search-field").value;
    document.getElementById("search-field").value = '';
    fetch(`https://api.lyrics.ovh/suggest/:${searchField}`)
        .then(response => response.json())
        .then(data => {
            displaySong(data.data);
        })
        .catch(error => lyricsError("something went wrong to failed data!!! try again!"));
})

const displaySong = songList => {
    console.log(songList);
    const displaySong = document.getElementById("song-List");
    displaySong.innerHTML = '';
    for (let i = 0; i < songList.length; i++) {
        const song = songList[i];
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success rounded-0">Get Lyrics</button>
            </div>
        `
        displaySong.appendChild(songDiv); getLyrics
    }
}

const getLyrics = (lyrics, title) => {
    const url = `https://api.lyrics.ovh/v1/${lyrics}/${title}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            showLyrics(data.lyrics);
        })
        .catch(error => lyricsError("sorry something went to wrong"));
}

const showLyrics = lyric => {
    const lyricsContainer = document.getElementById("lyrics-container");
    // lyricsContainer.innerText = '';
    lyricsContainer.innerText = lyric;
}

// function for lyrics error handling...
const lyricsError = error => {
    const lyricsContainer = document.getElementById("lyrics-container");
    lyricsContainer.style.textAlign = "center";
    lyricsContainer.style.marginBottom = "30px"
    lyricsContainer.innerHTML = `
        <h3>${error}</h3>
    `;
}
