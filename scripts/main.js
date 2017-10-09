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
var speed = 0,
    yFlugzeug = h*8.8/1000;
var iconw = h*0.15,
    iconh = h*0.15;

var score = 0;

var fAPosition = 1,
    fAPos = 0;

var s = document.getElementById('startButton'),
    f = document.getElementById('choosePlane'),
    up = document.getElementById('up'),
    down = document.getElementById('down'),
    back1 = document.getElementById('back1'),
    re = document.getElementById('regler');

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
$('#berg').css({width: bergw+'px', height: bergh+'px'});
$('#turm').css({width: turmw+'px', height: turmh+'px'});
$('#ballon').css({width: ballonw+'px', height: ballonh+'px'});
$('#score').css({'font-size': h/10+'px'});

function hindernisLoop(typ) {
    
    var newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
        
    window.setTimeout(hindernisLoop, 2000, newTyp);
    
}

function steuerungLoop() {
    
    var reglerCoords = $('#regler').position().top;
    
    switch (true) {
        case (reglerCoords > (h/100) && reglerCoords < (h/100+h*0.044)):
            speed = -100;
            break;
        case (reglerCoords > (h/100+h*0.044) && reglerCoords < (h/100+3*h*0.044)):
            speed = -80;
            break;
        case (reglerCoords > (h/100+3*h*0.044) && reglerCoords < (h/100+5*h*0.044)):
            speed = -60;
            break;
        case (reglerCoords > (h/100+5*h*0.044) && reglerCoords < (h/100+7*h*0.044)):
            speed = -40;
            break;
        case (reglerCoords > (h/100+7*h*0.044) && reglerCoords < (h/100+9*h*0.044)):
            speed = -20;
            break;
        case (reglerCoords > (h/100+9*h*0.044) && reglerCoords < (h/100+11*h*0.044)):
            speed = 0;
            break;
        case (reglerCoords > (h/100+11*h*0.044) && reglerCoords < (h/100+13*h*0.044)):
            speed = 20;
            break;
        case (reglerCoords > (h/100+13*h*0.044) && reglerCoords < (h/100+15*h*0.044)):
            speed = 40;
            break;
        case (reglerCoords > (h/100+15*h*0.044) && reglerCoords < (h/100+17*h*0.044)):
            speed = 60;
            break;
        case (reglerCoords > (h/100+17*h*0.044) && reglerCoords < (h/100+19*h*0.044)):
            speed = 80;
            break;
        case (reglerCoords > (h/100+19*h*0.044) && reglerCoords < (h/100+20*h*0.044)):
            speed = 100;
            break;
    }
    
    window.setTimeout(steuerungLoop, 20);
    
}

function animation() {
    
    var dist = speed /60 * yFlugzeug,
        flugzeugCoords = $('#flugzeug').position().top,
        newFlugzeugCoords = flugzeugCoords + dist;
    
    if (flugzeugCoords > h*0.03 && speed < 0) {
    
        $('#flugzeug').css({top: newFlugzeugCoords+'px'});
        
    }
    
    if (flugzeugCoords < h*0.97-fh && speed > 0) {
        
        $('#flugzeug').css({top: newFlugzeugCoords+'px'});
        
    }
    
    window.setTimeout(animation, 16);
    
}

var startBild = {
    
    init: function(i) {
        
        switch(true) {
            case (i == 1):
                up.removeEventListener('touchstart', flugzeugAuswahl.touchStartUp);
                down.removeEventListener('touchstart', flugzeugAuswahl.touchStartDown);
                back1.removeEventListener('touchstart', startBild.init);
                $('#flugzeugAuswahl').css({visibility: 'hidden'});
                break;
            case (i == 2):
                re.removeEventListener('touchstart', regler.touchStart);
                re.removeEventListener('touchmove', regler.touchMove);
                re.removeEventListener('touchend', regler.touchEnd);
                $('#hintergrund').css({visibility: 'hidden'});
                break;
        }
        
        $('#startBild').css({visibility: 'inherit'});
        
        s.addEventListener('touchstart', game.init);
        f.addEventListener('touchstart', flugzeugAuswahl.init);
        
    }
    
}

var flugzeugAuswahl = {
    
    coordY: h/2-fh,
    realTimeCoordY: h/2-fh,
    distance: 0,
    newDistance: 0,
    
    init: function() {
        
        s.removeEventListener('touchstart', game.init);
        f.removeEventListener('touchstart', flugzeugAuswahl.init);
        
        $('#startBild').css({visibility: 'hidden'});
        $('#flugzeugAuswahl').css({visibility: 'inherit'});
        
        up.addEventListener('touchstart', flugzeugAuswahl.touchStartUp);
        down.addEventListener('touchstart', flugzeugAuswahl.touchStartDown);
        back1.addEventListener('touchstart', startBild.init, 1);
        
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

var game = {
    
    init: function() {
        
        s.removeEventListener('touchstart', game.init);
        f.removeEventListener('touchstart', flugzeugAuswahl.init);
        
        $('#startBild').css({visibility: 'hidden'});
        $('#hintergrund').css({visibility: 'inherit'});
        
        re.addEventListener('touchstart', regler.touchStart);
        re.addEventListener('touchmove', regler.touchMove);
        re.addEventListener('touchend', regler.touchEnd);
        
        window.setTimeout(hindernisLoop, 1000);
        
        steuerungLoop();
        
        animation();
        
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
            
                var touch = e.touches[0],
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
        
        $('#regler').css({top: flugzeug.realTimeCoords+'px'});
        
    },
    
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == regler.touchCoord.id) {
                
                var dif = e.changedTouches[0].pageY - regler.touchCoord.y,
                    y = parseInt((dif + regler.coordY)*10)/10;
                
                regler.coordY = regler.realTimeCoordY;
                
                $('#regler').css({'-webkit-transition-duration': '0.2s', 'transition-duration': '0.2s'});
                $('#regler').css('-webkit-transform', 'none');
                $('#regler').css('transform', 'none');
                
            }
            
        }
        
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
