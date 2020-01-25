//Making menu button clickable
$(document).ready(function(){
    $('#nav-icon3').click(function(){
        $(this).toggleClass('open');
    });
});


var msecsPerUpdate = 1000 / 60; // 60fps
var progress = $('progress');
var duration = 5;  //seconds
var interval = progress.attr('max') / (duration * 1000 / msecsPerUpdate);

function play() {
    progress.val(progress.val() + interval);
    if (progress.val() + interval < progress.attr('max')) {
        setTimeout(play, msecsPerUpdate);
        $('i.icon-play').removeClass('icon-play').addClass('icon-pause');
    } else {
        progress.val(progress.attr('max'));
        $('i.icon-pause').removeClass('icon-pause').addClass('icon-play');
    }
}

// Animate player on dom ready

$('.icon-play').click(function (e) {
    e.preventDefault();
    play();
});

$('.icon-pause').click(function () {
    $('progress[value]').stop();
});

// Set progress bar to 0
$('.icon-previous, .icon-first').click(function () {
    $('progress').attr("value", "0");
});

// Highlight controls on click
$('ul.controls li i').click(function () {
    if ($(this).hasClass('green')) {
        $(this).removeClass('green');
    }
    else {
        $(this).addClass('green');
    }
});
