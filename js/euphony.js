/* MACROS */
//Macro for getelementbyid
function gebid(string){ return document.getElementById(string); }
let token = 'BQD_qjzLPgRJNmdCJk8uOor2IGYmOC4x6OLdZ0hzoCjybb1anwor8CS3GCm8yYql9LYsZRbclbNZf5c9QZZMDwfoQpbdxd0ClRNHHI0qqM0YzZxxoXRnHy7PRnVTIvnms2ZWC03MIwBBxuxAXr0xvcMs9KqFuFd320eFGeOP4a1ai4N_ER9UozbjXpCeeqU0I59Pa5eZ0zkmnMLCZVVQSO7AY47oZH2RJ8inrD6rxLFwS5Y3UZIBSc4xFDP0g2ElQyulwglt_wnuvKo';
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

let currson;
function setcurrson(song) {
    currson = song;
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
    if(c_sidebar.className==='container_sidebar'){
        setClass(c_main, 'container_mainhidden');
        setClass(c_sidebar, 'container_sidebarhidden');
        setClass(c_menu, 'container_menubuttonhidden');

    }
    else{
        setClass(c_main, 'container_mainvisible');
        setClass(c_sidebar, 'container_sidebar');
        setClass(c_menu, '');
    }


}

