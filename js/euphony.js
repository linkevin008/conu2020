/* MACROS */
//Macro for getelementbyid
function gebid(string){ return document.getElementById(string); }
let token = 'BQCHyLmQJUGKv0eOXdnThNDB00h9d_0B0SfssOS17aYOuTPyMx4jGBjks2wFtuwDoK2HMXfEhped2uTuPoZ524zVEoF8RVK_GCFc1hGV1OMUHh1CQliVeaX6TYHRYElkd98BnxNpvymztDcNg_SX-lT2ZkqwrMpRIDSnbq5gLuZoOXRDL7yEREKkJyvx9DwCAxWC5PJP5k-bWAxemmmTTH1c1Ymi029r-V95HOltXTgBrj5hrzbwojbkciyO8zTwF1eH40mJ_Es4Os4';
function setClass(obj, objclass){
    obj.setAttribute('class', objclass);
}


//Making menu button clickable
$(document).ready(function(){
    $('#nav-icon3').click(function(){
        $(this).toggleClass('open');
    });
});


//Adding EventListeners for the buttons
Array.from(document.getElementsByClassName('playicon')).forEach(element => {
    let divname = element.id;
    console.log(divname);
    element.addEventListener('click', function () {
        eval(element.id+'()');
    });

});

document.getElementById('pause').addEventListener('click', pause);

let currson;
function setcurrson(song) {
    currson = song;
}

//Function to change the mount kimbie thing
function changeplayerinfo(element){
    let track = document.getElementById('track');
    let artist = document.getElementById('artist');
    let artwork = document.getElementById('artwork');
    track.innerHTML = element[3];
    artist.innerHTML = element[2];
    artwork.setAttribute('src',element[0].url);
}


//Adding listener for menu button
gebid('container_menubutton').addEventListener('click', showHideSidebar);


function printMe() {
    console.log("print");
}

//Media control functions
function skipback() {
    printMe();
}

function rewind() {
    printMe();

}

function play() {
    console.log('hi'+currson)
    //printMe();
    var playsong = function (query) {
        let id = query.split(":");
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/play',
            type: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
              "uris": [`spotify:track:`+id[2]]
            })
          });
        }   

    
        var getdev = function () {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/devices',
                type: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + token
                },
                success:function (response) {
                    console.log(response)
                }
              });
            }  

    playsong(currson);
    //getdev();
    document.getElementById('play').setAttribute('class','playiconhidden');
    document.getElementById('pause').setAttribute('class','playicon');

}

function pause() {
    console.log('here')
    var pausesong = function () {
        let id = query.split(":");
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/pause',
            type: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            // dataType: "json",
            // contentType: "application/json",
            // data: JSON.stringify({
            //   "uris": [`spotify:track:`+id[2]]
            // })
          });
        }  
        pausesong()
}

function forward() {
    printMe();

}

function end() {
    printMe();

}

//Function that hides/shows sidebar
function showHideSidebar() {
    let c_sidebar = gebid('container_sidebar');
    let c_main = gebid('container_main');
    let c_menu =  gebid('container_menubutton');
    let spotlog = gebid('spotifylogo');
    let soundlogo = gebid('soundcloudlogo');
    if(c_sidebar.className==='container_sidebar'){
        setClass(c_main, 'container_mainhidden');
        setClass(c_sidebar, 'container_sidebarhidden');
        setClass(c_menu, 'container_menubuttonhidden');
        setClass(spotlog, 'logodivhidden');
        setClass(soundlogo, 'logodivhidden');

    }
    else {
        setClass(c_main, 'container_mainvisible');
        setClass(c_sidebar, 'container_sidebar');
        setClass(c_menu, '');
        setClass(spotlog, 'logodiv');
        setClass(soundlogo, 'logodiv');
    }
}

function streamersLogoEventListener(){
    console.log("james");
    let spotlog = gebid('spotifylogo');
    let soundlogo = gebid('soundcloudlogo');
    let applelogo = gebid('applemusiclogo');
    spotlog.addEventListener('click', function () {
        if(spotlog.className==="logodiv"){ this.setAttribute('class', 'logodivselected'); }
        else { spotlog.setAttribute('class', 'logodiv');}
    });
    soundlogo.addEventListener('click', function () {
        if(soundlogo.className==="logodiv"){ this.setAttribute('class', 'logodivselected'); }
        else { soundlogo.setAttribute('class', 'logodiv');}
    });
    applelogo.addEventListener('click', function () {
        if(soundlogo.className==="logodiv"){ this.setAttribute('class', 'logodivselected'); }
        else { soundlogo.setAttribute('class', 'logodiv');}
    });
}

streamersLogoEventListener();
