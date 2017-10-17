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
var reglerw = w/5,
    reglerh = h/10;
var startButtonw = w/5,
    startButtonh = h/5;
var iconw = h*0.15,
    iconh = h*0.15;
var speed = 50,
    yFlugzeug = h*8.8/1000,
    flugzeugCoords = 0,
    realFlugzeugCoords = h/2-fh/2,
    flugzeugMax = (h - 0.16*h) / 2,
    hindernisSpeed = 0.01,
    hindernisMove = 0;
var ursprung = h*11/25,
    fac = 100/ursprung;

var score = 0;

var fps = 0;

//var worker = new Worker('regler.js');

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
    re = document.getElementById('regler'),
    mu = document.getElementById('musicIcon'),
    so = document.getElementById('soundIcon');

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
$('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
//$('#flugzeug').css('background-image', 'url(../images/flugzeug5.svg)');
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

/*-------------------------------------------------------------------------------*/

//Erkennung der Position des Reglers
function steuerungLoop() {
    
    var reglerCoords = $('#regler').position().top - h*9/20;
    
    speed = reglerCoords*fac;
    
}

function animation() {
    
    /*var dist = speed /60 * yFlugzeug;
    
    if (flugzeugCoords > -flugzeugMax && speed < 0) {
        
        flugzeugCoords += dist;
        
    }
    
    if (flugzeugCoords < flugzeugMax && speed > 0) {
        
        flugzeugCoords += dist;
        
    }*/
    
    var dist = speed /60 * yFlugzeug;
    
    if (flugzeugCoords > -flugzeugMax && speed < 0) {
        
        flugzeugCoords += dist;
        
    }
    if (flugzeugCoords < -flugzeugMax && speed < 0) {
        
        speed = speed * (-1);
        
    }
    
    if (flugzeugCoords < flugzeugMax && speed > 0) {
        
        flugzeugCoords += dist;
        
    }
    if (flugzeugCoords > flugzeugMax && speed > 0) {
        
        speed = speed * (-1);
        
    }
    
    //hindernisMove -= hindernisSpeed;
    
}

function draw() {
    
    
    /*switch (hindernisTyp) {
        case 1:
            $('#berg').css('-webkit-transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            $('#berg').css('transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            break;
        case 2:
            $('#turm').css('-webkit-transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            $('#turm').css('transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            break;
        case 3:
            $('#ballon').css('-webkit-transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            $('#ballon').css('transform', 'translate3d('+hindernisMove+'px, 0px, 0px)');
            break;
    }*/
    
    $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugCoords+'px, 0px)');
    $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugCoords+'px, 0px)');
    $('#test1').html('FPS: '+fps);
    $('#score').html('Score: '+score);
    
}

function panic() {
    
    delta = 0;
    
}

function gameLoop(timestamp) {
    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        
        requestAnimationFrame(gameLoop);
        return;
        
    }
    
    /*if (timestamp - lastHindernis >= hindernisTime) {
        
        var newTyp = getRandomInt(1, 3);
        
        while (newTyp == hindernisTyp) {
            
            newTyp = getRandomInt(1, 3); 
            
        }
        
        switch (hindernisTyp) {
            case 1:
                $('#berg').css('-webkit-transform', 'none');
                $('#berg').css('transform', 'none');
                break;
            case 2:
                $('#turm').css('-webkit-transform', 'none');
                $('#turm').css('transform', 'none');
                break;
            case 3:
                $('#ballon').css('-webkit-transform', 'none');
                $('#ballon').css('transform', 'none');
                break;
        }
        
        hindernisMove = 0;
        hindernisTyp = newTyp;
        lastHindernis = timestamp;
        
    }*/
    
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    
    /*if (timestamp > lastFpsUpdate + 1000) {
        
        fps = 0.25 * framesThisSecond + 0.75 * fps;
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
        
    }
    
    framesThisSecond++;*/
    
    var numUpdatesSteps = 0;
    while (delta >= timestep) {
        
        //steuerungLoop();
        animation();
        delta -= timestep;
        if (++numUpdatesSteps >= 240) {
            
            panic();
            break;
            
        }
        
    }
    
    draw();
    
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
        
        requestAnimationFrame(gameLoop);
        
    }
    
}

var regler = {
    
    coordY: h/2 - reglerh/2,
    realTimeCoordY: h/2 - reglerh/2,
    
    touchCoord: null,
    touchStart: function(e) {
        
        e.preventDefault();
        
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            regler.touchCoord = {y: touch.pageY, id: touch.identifier};
            
            $('#regler').css({'-webkit-transition-duration': 'initial', 'transition-duration': 'initial'});
            
        }
        
    },
    
    touchMove: function(e) {
        
        e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            if (e.touches[i].identifier == regler.touchCoord.id) {
            
                var touch = e.touches[i],
                    moveCoords = touch.pageY,
                    dif = moveCoords - regler.touchCoord.y;

                var y = parseInt((dif + regler.coordY)*10)/10;
                
                regler.realTimeCoordY = y;
                
                if (y > h/100 && y < h/100*99-reglerh) {

                    $('#regler').css('-webkit-transform', 'translate3d(0px, '+dif+'px, 0px)');
                    $('#regler').css('transform', 'translate3d(0px, '+dif+'px, 0px)');
                    
                }
                
            }
            
        }
        
    },
    
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == regler.touchCoord.id) {
                
                var dif = e.changedTouches[0].pageY - regler.touchCoord.y,
                    y = parseInt((dif + regler.coordY)*10)/10;
                
                $('#regler').css({'-webkit-transition-duration': '0.2s', 'transition-duration': '0.2s'});
                $('#regler').css('-webkit-transform', 'none');
                $('#regler').css('transform', 'none');
                
            }
            
        }
        
    }
    
}

/*var hindernis = {
    
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
    
}*/

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

/*re.addEventListener('touchstart', regler.touchStart);
re.addEventListener('touchmove', regler.touchMove);
re.addEventListener('touchend', regler.touchEnd);*/

back2.addEventListener('touchstart', function(){$('#back2').css({opacity: 0.1})});
back2.addEventListener('touchend', function(){startBild.init(); $('#back2').css({opacity: 0.5})/*; $('#flugzeug').css({'background-image': 'url(../images/flugzeug'+fAPosition+'.svg)'})*/});