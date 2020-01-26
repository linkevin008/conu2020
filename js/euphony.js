/* MACROS */
//Macro for getelementbyid
function gebid(string){ return document.getElementById(string); }

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
    printMe();

}

function pause() {
    printMe();

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
    let spotlog = gebid('spotlogo');
    let soundlogo = gebid('soundlogo');
    if(c_sidebar.className==='container_sidebar'){
        setClass(c_main, 'container_mainhidden');
        setClass(c_sidebar, 'container_sidebarhidden');
        setClass(c_menu, 'container_menubuttonhidden');
        setClass(spotlog, 'platformlogohidden');
        setClass(soundlogo, 'platformlogohidden');

    }
    else{
        setClass(c_main, 'container_mainvisible');
        setClass(c_sidebar, 'container_sidebar');
        setClass(c_menu, '');
        setClass(spotlog, 'platformlogo');
        setClass(soundlogo, 'platformlogo');
    }


}

