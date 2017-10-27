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
var speed = 0,
    yFlugzeug = h - 0.12*h,
    realFlugzeugCoords = h/2-fh/2,
    facFlugzeug = 100/yFlugzeug,
    flugzeugDist = 0,
    flugzeugMax = (h - 0.16*h) / 2,
    hindernisSpeed = 0.01,
    hindernisMove = 0;
var ursprung = h*11/25,
    fac = 100/ursprung,
    newTyp = 0;

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
$('#hindernis1').css({width: bergw+'px', height: bergh+'px'});
$('#hindernis2').css({width: turmw+'px', height: turmh+'px'});
$('#hindernis3').css({width: ballonw+'px', height: ballonh+'px'});
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
    
    newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
    
    $('#test4').html(newTyp);
    
    window.setTimeout(hindernisLoop, 2000, newTyp);
    
}

//Erkennung der Position des Reglers
function steuerungLoop() {
    
    var flugzeugCoords = $('#flugzeug').position().top;
    
    if (flugzeugCoords < h*0.02 && speed == -10) {
        
        flugzeugDist = flugzeugCoords - realFlugzeugCoords;
        
        speed = 0;
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    }
    
    if (flugzeugCoords > h*0.98-fh && speed == 10) {
        
        flugzeugDist = flugzeugCoords - realFlugzeugCoords;
        
        speed = 0;
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    }
    
}

function animation() {
    
    $('#test1').html('FPS: '+Math.round(fpsw));
    
}

function panic() {
    
    delta = 0;
    
}

function collision(newTyp) {
    
    $('#test3').html(newTyp);
    
    var hindernisCoords = $('#hindernis'+newTyp).position().left;
    
    switch (newTyp) {
        case 1:
            if (hindernisCoords > h*0.05 - bergw && hindernisCoords < h*0.05 + fw) {
                
                $('#test2').html('Kollision mit: '+newTyp);
                
            } else {
                
                $('#test2').html('keine Kollision möglich');
                
            }
            break;
        case 2:
            if (hindernisCoords > h*0.05 - turmw && hindernisCoords < h*0.05 + fw) {
                
                $('#test2').html('Kollision mit: '+newTyp);
                
            } else {
                
                $('#test2').html('keine Kollision möglich');
                
            }
            break;
        case 3:
            if (hindernisCoords > h*0.05 - ballonw && hindernisCoords < h*0.05 + fw) {
                
                $('#test2').html('Kollision mit: '+newTyp);
                
            } else {
                
                $('#test2').html('keine Kollision möglich');
                
            }
            break;
    }
    
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
    
    var numUpdatesSteps = 0;
    while (delta >= timestep) {
        
        steuerungLoop();
        collision(newTyp);
        delta -= timestep;
        if (++numUpdatesSteps >= 240) {
            
            panic();
            break;
            
        }
        
    }
    
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
        
        var flugzeugCoords = $('#flugzeug').position().top;
        
        if (flugzeugCoords > h*0.02) {
            
            var dist = -10 * yFlugzeug;
            
            speed = -10;

            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

            $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            
        }
        
    },
    
    touchStartDown: function(e) {
        
        e.preventDefault();
        
        var flugzeugCoords = $('#flugzeug').position().top;
        
        if (flugzeugCoords < h*0.98) {
            
            var dist = 10 * yFlugzeug;
            
            speed = 10;

            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

            $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            
        }
        
    },
    
    touchEnd: function(e) {
        
        e.preventDefault();
        
        var flugzeugCoords = $('#flugzeug').position().top;
        
        speed = 0;
        
        flugzeugDist = flugzeugCoords - realFlugzeugCoords;
        
        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    }
    
}

var hindernis = {
    
    move: function(typ) {
        
        var x = -(w/5 + w + bergw);
        
        $('#hindernis'+typ).css({'-webkit-transition-duration': '2s'});
        $('#hindernis'+typ).css({'transition-duration': '2s'});
        $('#hindernis'+typ).css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
        $('#hindernis'+typ).css('transform', 'translate3d('+x+'px, 0px, 0px)');
        
    
        window.setTimeout('hindernis.reset('+typ+')', 2010);
                 
    },
    
    reset: function(typ) {
        
        score += 1;
        
        $('#score').html('Score: '+score);
        
        $('#hindernis'+typ).css({'-webkit-transition-duration': 'initial'});
        $('#hindernis'+typ).css({'transition-duration': 'initial'});
        $('#hindernis'+typ).css('-webkit-transform', 'none');
        $('#hindernis'+typ).css('transform', 'none');
        
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
flyUp.addEventListener('touchend', flying.touchEnd);
flyDown.addEventListener('touchstart', flying.touchStartDown);
flyDown.addEventListener('touchend', flying.touchEnd);

back2.addEventListener('touchstart', function(){$('#back2').css({opacity: 0.1})});
back2.addEventListener('touchend', function(){startBild.init(); $('#back2').css({opacity: 0.5})/*; $('#flugzeug').css({'background-image': 'url(../images/flugzeug'+fAPosition+'.svg)'})*/});