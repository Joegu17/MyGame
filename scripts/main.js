// JavaScript Document

var w = window.innerWidth,
    h = window.innerHeight;
var fw = h/10*215/67,
    fh = h/10;
var bergw = h*0.7/430*768,
    bergh = h*0.7;
var turmw = h*0.5/555*73,
    turmh = h*0.5;
var ballonw = h*0.6/328*225,
    ballonh = h*0.6;
var startButtonw = w/5,
    startButtonh = h/5;
var iconw = h*0.15,
    iconh = h*0.15;
var speed = 100,
    yFlugzeug = h - 0.12*h,
    realFlugzeugCoords = h/2-fh/2,
    facFlugzeug = 100/yFlugzeug,
    flugzeugDist = 0,
    flugzeugMax = (h - 0.16*h) / 2,
    hindernisSpeed = 0.01,
    hindernisMove = 0,
    stillTouching = 0,
    onSpeed = 0;
var ursprung = h*11/25,
    fac = 100/ursprung;

var score = 0;

var fpsw = 0;

var fAPosition = 1,
    fAPos = 0;

var lastFrameTimeMs = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000/60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    lastHindernis = 0,
    hindernisTime = 2000,
    hindernisTyp = 0;

var s = document.getElementById('startButton'),
    f = document.getElementById('choosePlane'),
    op = document.getElementById('options'),
    up = document.getElementById('up'),
    down = document.getElementById('down'),
    back1 = document.getElementById('back1'),
    mu = document.getElementById('musicIcon'),
    so = document.getElementById('soundIcon'),
    plane = document.getElementById('flugzeug'),
    flyUp = document.getElementById('flyUp'),
    flyDown = document.getElementById('flyDown');

$('#startBild').css({width: w+'px', height: h+'px'});
$('#startButton').css({width: startButtonw+'px', height: startButtonh+'px', left: (w/2 - startButtonw/2)+'px', top: (h/2 - startButtonh/2)+'px', 'font-size': h*0.15+'px'});
$('#options').css({width: iconw+'px', height: iconh+'px', right: w/100+'px', bottom: w/100+'px'});
$('#choosePlane').css({width: iconw+'px', height: iconh+'px', left: w/100+'px', bottom: w/100+'px'});

$('#flugzeugAuswahl').css({width: w+'px', height: h+'px'});
$('#up').css({width: iconw+'px', height: iconh+'px', right: w/100+'px', top: w/100+'px'});
$('#down').css({width: iconw+'px', height: iconh+'px', right: w/100+'px', bottom: w/100+'px'});
$('#back1').css({width: iconw+'px', height: iconh+'px', left: w/100+'px', bottom: w/100+'px'});
$('#flugzeug1').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2-fh+'px'});
$('#flugzeug2').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+2*fh+'px'});
$('#flugzeug3').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+5*fh+'px'});
$('#flugzeug4').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+8*fh+'px'});
$('#flugzeug5').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+11*fh+'px'});
$('#flugzeug6').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+14*fh+'px'});
$('#flugzeug7').css({width: fw*2+'px', height: fh*2+'px', left: w/2-fw+'px', top: h/2+17*fh+'px'});

$('#hintergrund').css({width: w+'px', height: h+'px'});
$('#flyUp').css({width: w+'px', height: h/2+'px', top: '0px'});
$('#flyDown').css({width: w+'px', height: h/2+'px', top: h/2+'px'});
$('#flugzeug').css({width: fw+'px', height: fh+'px', top: realFlugzeugCoords+'px'});
//$('#flugzeug').css('background-image', 'url(flugzeug1.png)');
$('#berg').css({width: bergw+'px', height: bergh+'px'});
$('#turm').css({width: turmw+'px', height: turmh+'px'});
$('#ballon').css({width: ballonw+'px', height: ballonh+'px'});
$('#score').css({'font-size': h/10+'px'});

$('#optionen').css({width: w+'px', height: h+'px'});
$('#back2').css({width: iconw+'px', height: iconh+'px', left: w/100+'px', bottom: w/100+'px'});
$('#musicText').css({width: w/5+'px', height: h/10+'px', left: w/10*3+'px', top: h/10*3+'px'});
$('#musicIcon').css({width: w/10+'px', height: h/10+'px', left: w/10*6+'px', top: h/10*3+'px'});
$('#soundText').css({width: w/5+'px', height: h/10+'px', left: w/10*3+'px', top: h/10*5+'px'});
$('#soundIcon').css({width: w/10+'px', height: h/10+'px', left: w/10*6+'px', top: h/10*5+'px'});

$('#test1').css({'font-size': h/20+'px'});
$('#test2').css({'font-size': h/20+'px'});
$('#test3').css({'font-size': h/20+'px'});
$('#test4').css({'font-size': h/20+'px'});

/*-------------------------------------------------------------------------------*/

function hindernisLoop(typ) {
    
    var newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
        
    window.setTimeout(hindernisLoop, 2000, newTyp);
    
}

//Erkennung der Position des Reglers
function steuerungLoop() {
    
    var reglerCoords = $('#regler').position().top - h*9/20;
    
    speed = reglerCoords*fac;
    
}

function animation() {
    
    $('#test1').html('FPS: '+Math.round(fpsw));
    
}

function panic() {
    
    delta = 0;
    
}

function gameLoop(timestamp) {
    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        
        requestAnimationFrame(gameLoop);
        return;
        
    }
    
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    
    if (timestamp > lastFpsUpdate + 1000) {
        
        fpsw = framesThisSecond //0.25 * framesThisSecond + 0.75 * fpsw;
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
        
    }
    
    framesThisSecond++;
    
    /*var numUpdatesSteps = 0;
    while (delta >= timestep) {
        
        steuerungLoop();
        animation();
        delta -= timestep;
        if (++numUpdatesSteps >= 240) {
            
            panic();
            break;
            
        }
        
    }*/
    
    animation();
    
    requestAnimationFrame(gameLoop);
    
}

/*-------------------------------------------------------------------------------*/

var startBild = {
    
    init: function() {
        
        $('#flugzeugAuswahl').css({display: 'none'});
        $('#optionen').css({display: 'none'});
        $('#hintergrund').css({display: 'none'});
        $('#startBild').css({display: 'inherit'});
    
    }
    
}

/*-------------------------------------------------------------------------------*/

var flugzeugAuswahl = {
    
    coordY: h/2-fh,
    realTimeCoordY: h/2-fh,
    distance: 0,
    newDistance: 0,
    
    init: function() {
        
        $('#startBild').css({display: 'none'});
        $('#flugzeugAuswahl').css({display: 'inherit'});
        
    },
    
    
    touchStartUp: function(e) {
        
        e.preventDefault();
        
        if (fAPosition != 1) {
            
            fAPosition -= 1;
            
            fAPos += 3*fh;
            
            $('#flugzeug1').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug1').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug2').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug2').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug3').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug3').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug4').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug4').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug5').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug5').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug6').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug6').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug7').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug7').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            
        }
        
    },
    
    touchStartDown: function(e) {
        
        e.preventDefault();
        
        if (fAPosition != 7) {
            
            fAPosition += 1;
            
            fAPos -= 3*fh;
            
            $('#flugzeug1').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug1').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug2').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug2').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug3').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug3').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug4').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug4').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug5').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug5').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug6').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug6').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug7').css('-webkit-transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            $('#flugzeug7').css('transform', 'translate3d(0px, '+fAPos+'px, 0px)');
            
        }
        
    }
    
}

/*-------------------------------------------------------------------------------*/

var optionen = {
    
    init: function() {
        
        $('#startBild').css({display: 'none'});
        $('#optionen').css({display: 'inherit'});
        
    }
    
}

/*-------------------------------------------------------------------------------*/

var game = {
    
    init: function() {
        
        $('#startBild').css({display: 'none'});
        $('#hintergrund').css({display: 'inherit'});
        
        window.setTimeout(hindernisLoop, 1000);
        
        requestAnimationFrame(gameLoop);
        
    }
    
}

var flying = {
    
    touchStartUp: function(e) {
        
        e.preventDefault();
        
        stillTouching = 1;
        
        var flugzeugCoords = $('#flugzeug').position().top;
    
        var dist = -0.116 * yFlugzeug;
    
        flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;
        
        $('#flugzeug').css({'-webkit-transition-duration': '0.2s'});
        $('#flugzeug').css({'transition-duration': '0.2s'});
        
        $('#flugzeug').css({'-webkit-transition-timing-function': 'ease-in'});
        $('#flugzeug').css({'transition-timing-function': 'ease-in'});
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
        window.setTimeout(flying.touchStartUpMove, 200);
        
    },
    
    touchStartUpMove: function() {
        
        onSpeed = 1;
        
        if (stillTouching == 1) {

            var flugzeugCoords = $('#flugzeug').position().top;

            var dist = -100 * yFlugzeug;

            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

            $('#flugzeug').css({'-webkit-transition-duration': '100s'});
            $('#flugzeug').css({'transition-duration': '100s'});

            $('#flugzeug').css({'-webkit-transition-timing-function': 'linear'});
            $('#flugzeug').css({'transition-timing-function': 'linear'});

            $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)')
        
        } else {
            
            flying.touchEndUp();
            
        }
    
    },
    
    touchStartDown: function(e) {
        
        e.preventDefault();
        
        stillTouching = 1;
        
        var flugzeugCoords = $('#flugzeug').position().top;
    
        var dist = 0.116 * yFlugzeug;
    
        flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;
        
        $('#flugzeug').css({'-webkit-transition-duration': '0.2s'});
        $('#flugzeug').css({'transition-duration': '0.2s'});

        $('#flugzeug').css({'-webkit-transition-timing-function': 'ease-in'});
        $('#flugzeug').css({'transition-timing-function': 'ease-in'});
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
        window.setTimeout(flying.touchStartDownMove, 200);
        
    },
    
    touchStartDownMove: function() {
        
        if (stillTouching == 1) {
        
            onSpeed = 1;
            
            var flugzeugCoords = $('#flugzeug').position().top;
    
            var dist = 100 * yFlugzeug;
    
            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;
        
            $('#flugzeug').css({'-webkit-transition-duration': '100s'});
            $('#flugzeug').css({'transition-duration': '100s'});

            $('#flugzeug').css({'-webkit-transition-timing-function': 'linear'});
            $('#flugzeug').css({'transition-timing-function': 'linear'});
        
            $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            
        } else {
            
            flying.touchEndDown();
            
        }
        
    },
    
    touchEndU: function(e) {
        
        e.preventDefault();
        
        if (onSpeed == 1) {
            
            flying.touchEndUp();
            onSpeed = 0;
            
        } else {
            
            stillTouching = 0;
            
        }
        
    },
    
    touchEndD: function(e) {
        
        e.preventDefault();
        
        if (onSpeed == 1) {
            
            flying.touchEndDown();
            onSpeed = 0;
            
        } else {
            
            stillTouching = 0;
            
        }
        
    },
    
    touchEndUp: function() {
        
        var flugzeugCoords = $('#flugzeug').position().top;
        
        var dist = -0.116 * yFlugzeug;
    
        flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;
        
        $('#flugzeug').css({'-webkit-transition-duration': '0.2s'});
        $('#flugzeug').css({'transition-duration': '0.2s'});
        
        $('#flugzeug').css({'-webkit-transition-timing-function': 'ease-out'});
        $('#flugzeug').css({'transition-timing-function': 'ease-out'});
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    },
    
    touchEndDown: function() {
        
        var flugzeugCoords = $('#flugzeug').position().top;
    
        var dist = 0.116 * yFlugzeug;
    
        flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;
        
        $('#flugzeug').css({'-webkit-transition-duration': '0.2s'});
        $('#flugzeug').css({'transition-duration': '0.2s'});

        $('#flugzeug').css({'-webkit-transition-timing-function': 'ease-out'});
        $('#flugzeug').css({'transition-timing-function': 'ease-out'});
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    }
    
}

var hindernis = {
    
    move: function(typ) {
        
        var x = -(w/5 + w + bergw);
        
        switch (typ) {
            case 1:
                $('#berg').css({'-webkit-transition-duration': '2s'});
                $('#berg').css({'transition-duration': '2s'});
                $('#berg').css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
                $('#berg').css('transform', 'translate3d('+x+'px, 0px, 0px)');
                break;
            case 2:
                $('#turm').css({'-webkit-transition-duration': '2s'});
                $('#turm').css({'transition-duration': '2s'});
                $('#turm').css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
                $('#turm').css('transform', 'translate3d('+x+'px, 0px, 0px)');
                break;
            case 3:
                $('#ballon').css({'-webkit-transition-duration': '2s'});
                $('#ballon').css({'transition-duration': '2s'});
                $('#ballon').css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
                $('#ballon').css('transform', 'translate3d('+x+'px, 0px, 0px)');
                break;
        }
    
        window.setTimeout('hindernis.reset('+typ+')', 2010);
                 
    },
    
    reset: function(typ) {
        
        score += 1;
        
        $('#score').html('Score: '+score);
        
        var w = window.innerWidth,
            h = window.innerHeight,
            x = w/10 + w;
        
        switch (typ) {
            case 1:
                $('#berg').css({'-webkit-transition-duration': '1ms'});
                $('#berg').css({'transition-duration': '1ms'});
                $('#berg').css('-webkit-transform', 'none');
                $('#berg').css('transform', 'none');
                break;
            case 2:
                $('#turm').css({'-webkit-transition-duration': '1ms'});
                $('#turm').css({'transition-duration': '1ms'});
                $('#turm').css('-webkit-transform', 'none');
                $('#turm').css('transform', 'none');
                break;
            case 3:
                $('#ballon').css({'-webkit-transition-duration': '1ms'});
                $('#ballon').css({'transition-duration': '1ms'});
                $('#ballon').css('-webkit-transform', 'none');
                $('#ballon').css('transform', 'none');
                break;
        }
        
    }
    
}

/*-------------------------------------------------------------------------------*/

s.addEventListener('touchstart', function(){$('#startButton').css({opacity: 0.1})});
s.addEventListener('touchend', function(){game.init(); $('#startButton').css({opacity: 0.5})});
f.addEventListener('touchstart', function(){$('#choosePlane').css({opacity: 0.1})});
f.addEventListener('touchend', function(){flugzeugAuswahl.init(); $('#choosePlane').css({opacity: 0.5})});
op.addEventListener('touchstart', function(){$('#options').css({opacity: 0.1})});
op.addEventListener('touchend', function(){optionen.init(); $('#options').css({opacity: 0.5})});

up.addEventListener('touchstart', function(){$('#up').css({opacity: 0.1})});
up.addEventListener('touchend', function(){$('#up').css({opacity: 0.5})});
up.addEventListener('touchend', flugzeugAuswahl.touchStartUp);
down.addEventListener('touchstart', function(){$('#down').css({opacity: 0.1})});
down.addEventListener('touchend', function(){$('#down').css({opacity: 0.5})});
down.addEventListener('touchend', flugzeugAuswahl.touchStartDown);
back1.addEventListener('touchstart', function(){$('#back1').css({opacity: 0.1})});
back1.addEventListener('touchend', function(){startBild.init(); $('#back1').css({opacity: 0.5})/*; $('#flugzeug').css({'background-image': 'url(../images/flugzeug'+fAPosition+'.svg)'})*/});

flyUp.addEventListener('touchstart', flying.touchStartUp);
flyUp.addEventListener('touchend', flying.touchEndU);
flyDown.addEventListener('touchstart', flying.touchStartDown);
flyDown.addEventListener('touchend', flying.touchEndD);

back2.addEventListener('touchstart', function(){$('#back2').css({opacity: 0.1})});
back2.addEventListener('touchend', function(){startBild.init(); $('#back2').css({opacity: 0.5})/*; $('#flugzeug').css({'background-image': 'url(../images/flugzeug'+fAPosition+'.svg)'})*/});