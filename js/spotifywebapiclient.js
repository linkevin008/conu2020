let albumresponse;
let lastsongclicked;
// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'BQAoqX1ozz9u-qGMsxJrYiFar9hAgGPrEUBKCAm1Np7u0POtbnilByDpY9CNi5vRyPY3Rk1VTV6Z4O-YOaDTV1OK3Ajd9SCqNRP4-VpcmKpdKCMqytziOHRs54ArVdMBVipX6-3SBayEA5eNef-LG87aoyMHKv51M9iC0lG9k-gH9RzKET70s85BmtlYBfCllkmPgVJdmV0Ssv6TXpPBA-pgtfeMtJhnq6GXof-vF01fkw0-5AcuL52mPzaYt9NyRfAOnjGj8G0wTiA';
//     const player = new Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); }
//     });
//     console.log('in here')
//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });

//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });

//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//     });

//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//     });

//     // Connect to the player!
//     player.connect();
// };





var searchTracks = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        headers: {
            'Authorization': 'Bearer BQC3PUjuzFiOwMCOFVNX0pum_eJO35F6I1XNhShvcJ4aJjODusq3dWTfYDYzuRi6rFZhpa57ZGFDabhytdJbtT0zRK98_q9d-mZpwMGp-iOnlsAYbrLPwfwljxtqHp_pJKw7Z5ieZLQJ-g6alprGeU7cqYAxzIz3g92b'
        },
        success: function (response) {
            // resultsPlaceholder.innerHTML = template(response);
            //resultsPlaceholder.innerHTML = template(response);
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
                //console.log(element)
                albumresponse.push([element.album.images[1], element.uri, element.id, element.name])
            });
            displaysongs("albums");
        }
    });
};


function displaysongs (div){

    //console.log("passed");
    var mydiv = document.getElementById(div);
    while(mydiv.hasChildNodes()){
        mydiv.removeChild(mydiv.firstChild);
    }
    //console.log('mydiv:   ' + mydiv);
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
            lastsongclicked = element[1];
            //console.log(lastsongclicked);
            setcurrson(lastsongclicked);
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