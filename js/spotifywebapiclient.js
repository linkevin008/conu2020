let albumresponse;

// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'BQCwwSCEXykTwCke4rRboVeEbwNr5A_6ES2mYiX7AmEf4ab0df3XbhVpGPk7MbLHqfnnR9BhWmAxP_jRDG4zw5m_1ibK1xi9ZdlC-fREcrh8qYBhPNBFrEVtfKu7Q6oS3OEqySagliR5T0cI0t5JTSYkHLmuro9b7tEv';
//     const player = new Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); }
//     });
//
//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });
//
//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });
//
//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//     });
//
//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//     });
//
//     // Connect to the player!
//     player.connect();
// };


// find template and compile it
// var templateSource = document.getElementById('results-template').innerHTML,
//     template = Handlebars.compile(templateSource),
//     resultsPlaceholder = document.getElementById('results'),
//     playingCssClass = 'playing',
//     audioObject = null;
// console.log('hellllllllllllllllllllllllllllllllllllo2');

var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};

var searchTracks = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        headers: {
            'Authorization': 'Bearer BQDQMgfVnKlWhMF1BLxangN95nOKrWS2tK8oJ4ouhFlH1kYtP4FU1soufu4OiGvTkcEaJI4SQ768uPso6RuTCgN6dWoYKLAnmk5dVqrkVhHYO4eDx8Egizo79L9qxRh7M_8wMR_7bxrS_ZUGLrbVXCJN0AB4RJd3QVXD'
        },
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response);
            // console.log('bruuuuuuh ' + template(response))
            // var res = resultsPlaceholder.innerHTML.replace("background","height:503;width:503;max-height:40%;max-width:40%;background")
            // document.write(res)
            // let re = new RegExp("background-image(.*?)[^\"]*")
            // var ting = re.exec(resultsPlaceholder.innerHTML)
            //console.log(resultsPlaceholder.innerHTML)
            //console.log(ting[0])
            //console.log(response)
            albumresponse = [];
            response.tracks.items.forEach(element => {
                albumresponse.push([element.album.images[1], element.href, element.id, element.name])
            });
            displaysongs("albums");
        }
    });
};


function displaysongs (div){

    console.log("passed");
    var mydiv = document.getElementById(div);
    while(mydiv.hasChildNodes()){
        mydiv.removeChild(mydiv.firstChild);
    }
    console.log('mydiv:   ' + mydiv);
    let divs;
    let counter = 0;
    albumresponse.forEach(element => {
        divs = document.createElement('div');
        divs.setAttribute('class','albumimage');
        img = document.createElement('img');
        text = document.createElement('p');
        node = document.createTextNode(element[3]);
        text.appendChild(node);
        img.setAttribute('src', element[0].url);
        img.setAttribute('class','image');
        divs.appendChild(img);
        divs.appendChild(text);
        divs.addEventListener('click',function (){
            console.log(element)
            //do whatever send to backend
        });



        mydiv.appendChild(divs);
        if (counter == 7) {
            return;
        }
    });



}



document.getElementById('container_searchlogo').addEventListener('click', function (e) {
    e.preventDefault();
    searchTracks(document.getElementById('searchbar').value);
}, false);