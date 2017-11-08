// JavaScript Document

/*

hindernis:  1 = berg1
            2 = turm1
            3 = ballon1
            4 = haus1
            5 = drachen1
            6 = baum1
            7 = baum2

*/

var w = screen.width,
    h = screen.height;
var fw = h/10*3,
    fh = h/10,
    fpoints = fh/302;
var berg1w = h*0.7/430*768,
    berg1h = h*0.7,
    b1points = berg1h/1000,
    berg1top = h-berg1h;
var turm1w = h*0.5/555*73,
    turm1h = h*0.5;
var ballon1w = h*0.6/328*225,
    ballon1h = h*0.6;
var haus1w = h*0.75/1049*1269,
    haus1h = h*0.75,
    h1points = haus1h/1049,
    h1top = h-haus1h;
var drachen1w = h*0.3/373*175,
    drachen1h = h*0.3,
    d1points = drachen1h/373,
    d1top = h*0.1;
var baum1w = h*0.6/836*586,
    baum1h = h*0.6,
    ba1points = baum1h/836,
    ba1top = h-baum1h;
var baum2w = h*0.6/813*498,
    baum2h = h*0.6,
    ba2points = baum2h/813,
    ba2top = h-baum2h;

var startButtonw = w/5,
    startButtonh = h/5;
var iconw = h*0.15,
    iconh = h*0.15;
var speed = 0,
    yFlugzeug = h - 0.12*h,
    realFlugzeugCoords = h/2-fh/2,
    facFlugzeug = 100/yFlugzeug,
    flugzeugDist = 0,
    hindernisSpeed = 0.01,
    hindernisMove = 0;
var ursprung = h*11/25,
    fac = 100/ursprung,
    newTyp = 0;

var score = 0,
    hits = 0,
    activ = 1;

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


var flugzeugPoints = [
    
    //[left, top]
    [33*fpoints+w*0.05, 39*fpoints],[55*fpoints+w*0.05, 16*fpoints],[102*fpoints+w*0.05, 17*fpoints],
    [124*fpoints+w*0.05, 32*fpoints],[138*fpoints+w*0.05, 52*fpoints],[202*fpoints+w*0.05, 130*fpoints],
    [443*fpoints+w*0.05, 48*fpoints],[632*fpoints+w*0.05, 30*fpoints],[670*fpoints+w*0.05, 43*fpoints],
    [731*fpoints+w*0.05, 92*fpoints],[857*fpoints+w*0.05, 93*fpoints],[901*fpoints+w*0.05, 19*fpoints],
    [913*fpoints+w*0.05, 3*fpoints],[923*fpoints+w*0.05, 3*fpoints],[947*fpoints+w*0.05, 143*fpoints],
    [926*fpoints+w*0.05, 281*fpoints],[917*fpoints+w*0.05+w*0.05, 281*fpoints],[825*fpoints+w*0.05, 201*fpoints],
    [743*fpoints+w*0.05, 209*fpoints],[669*fpoints+w*0.05, 283*fpoints],[645*fpoints+w*0.05, 282*fpoints],
    [564*fpoints+w*0.05, 216*fpoints],[336*fpoints+w*0.05, 224*fpoints],[235*fpoints+w*0.05, 297*fpoints],
    [217*fpoints+w*0.05, 293*fpoints],[167*fpoints+w*0.05, 227*fpoints],[111*fpoints+w*0.05, 223*fpoints],
    [81*fpoints+w*0.05, 205*fpoints],[61*fpoints+w*0.05, 176*fpoints],[32*fpoints+w*0.05, 49*fpoints]
    
];

var berg1Points = [
    
    [0*b1points, 996*b1points+berg1top],[111*b1points, 843*b1points+berg1top],[137*b1points, 767*b1points+berg1top],
    [156*b1points, 747*b1points+berg1top],[190*b1points, 730*b1points+berg1top],[222*b1points, 652*b1points+berg1top],
    [240*b1points, 543*b1points+berg1top],[272*b1points, 537*b1points+berg1top],[304*b1points, 471*b1points+berg1top],
    [338*b1points, 433*b1points+berg1top],[438*b1points, 446*b1points+berg1top],[466*b1points, 408*b1points+berg1top],
    [507*b1points, 312*b1points+berg1top],[552*b1points, 227*b1points+berg1top],[587*b1points, 177*b1points+berg1top],
    [615*b1points, 147*b1points+berg1top],[636*b1points, 105*b1points+berg1top],[654*b1points, 82*b1points+berg1top],
    [666*b1points, 46*b1points+berg1top],[691*b1points, 9*b1points+berg1top],[705*b1points, 1*b1points+berg1top],
    [733*b1points, 29*b1points+berg1top],[880*b1points, 324*b1points+berg1top],[1093*b1points, 293*b1points+berg1top],
    [1114*b1points, 309*b1points+berg1top],[1175*b1points, 382*b1points+berg1top],[1221*b1points, 464*b1points+berg1top],
    [1407*b1points, 588*b1points+berg1top],[1586*b1points, 724*b1points+berg1top],[1785*b1points, 999*b1points+berg1top]
    
];

var haus1Points = [
    
    [82*h1points, 1048*h1points+h1top],[81*h1points, 488*h1points+h1top],[0*h1points, 506*h1points+h1top],
    [2*h1points, 451*h1points+h1top],[297*h1points, 240*h1points+h1top],[298*h1points, 130*h1points+h1top],
    [373*h1points, 131*h1points+h1top],[402*h1points, 162*h1points+h1top],[634*h1points, 0*h1points+h1top],
    [1268*h1points, 445*h1points+h1top],[1265*h1points, 501*h1points+h1top]
    
];

var drachen1Points = [
    
    [170*d1points, 372*d1points+d1top],[0*d1points, 188*d1points+d1top],[28*d1points, 0*d1points+d1top],
    [155*d1points, 72*d1points+d1top],[170*d1points, 372*d1points+d1top]
    
]

var baum1Points = [
    
    [238*ba1points, 835*ba1points+ba1top],[253*ba1points, 782*ba1points+ba1top],[259*ba1points, 706*ba1points+ba1top],
    [263*ba1points, 521*ba1points+ba1top],[173*ba1points, 501*ba1points+ba1top],[117*ba1points, 465*ba1points+ba1top],
    [74*ba1points, 457*ba1points+ba1top],[50*ba1points, 428*ba1points+ba1top],[51*ba1points, 403*ba1points+ba1top],
    [25*ba1points, 373*ba1points+ba1top],[17*ba1points, 341*ba1points+ba1top],[18*ba1points, 329*ba1points+ba1top],
    [4*ba1points, 315*ba1points+ba1top],[0*ba1points, 298*ba1points+ba1top],[1*ba1points, 276*ba1points+ba1top],
    [6*ba1points, 227*ba1points+ba1top],[14*ba1points, 214*ba1points+ba1top],[30*ba1points, 199*ba1points+ba1top],
    [42*ba1points, 176*ba1points+ba1top],[43*ba1points, 148*ba1points+ba1top],[72*ba1points, 108*ba1points+ba1top],
    [88*ba1points, 106*ba1points+ba1top],[135*ba1points, 57*ba1points+ba1top],[155*ba1points, 58*ba1points+ba1top],
    [173*ba1points, 42*ba1points+ba1top],[224*ba1points, 22*ba1points+ba1top],[238*ba1points, 23*ba1points+ba1top],
    [278*ba1points, 1*ba1points+ba1top],[310*ba1points, 14*ba1points+ba1top],[372*ba1points, 13*ba1points+ba1top],
    [421*ba1points, 33*ba1points+ba1top],[443*ba1points, 31*ba1points+ba1top],[520*ba1points, 99*ba1points+ba1top],
    [573*ba1points, 180*ba1points+ba1top],[585*ba1points, 243*ba1points+ba1top]
    
];

var baum2Points = [
    
    [190*ba2points, 812*ba2points+ba2top],[205*ba2points, 781*ba2points+ba2top],[212*ba2points, 734*ba2points+ba2top],
    [203*ba2points, 609*ba2points+ba2top],[138*ba2points, 580*ba2points+ba2top],[122*ba2points, 553*ba2points+ba2top],
    [91*ba2points, 535*ba2points+ba2top],[49*ba2points, 485*ba2points+ba2top],[53*ba2points, 459*ba2points+ba2top],
    [23*ba2points, 434*ba2points+ba2top],[26*ba2points, 411*ba2points+ba2top],[9*ba2points, 375*ba2points+ba2top],
    [8*ba2points, 358*ba2points+ba2top],[0*ba2points, 339*ba2points+ba2top],[7*ba2points, 324*ba2points+ba2top],
    [16*ba2points, 315*ba2points+ba2top],[6*ba2points, 285*ba2points+ba2top],[10*ba2points, 266*ba2points+ba2top],
    [25*ba2points, 248*ba2points+ba2top],[28*ba2points, 182*ba2points+ba2top],[40*ba2points, 160*ba2points+ba2top],
    [46*ba2points, 100*ba2points+ba2top],[78*ba2points, 79*ba2points+ba2top],[93*ba2points, 44*ba2points+ba2top],
    [113*ba2points, 30*ba2points+ba2top],[174*ba2points, 29*ba2points+ba2top],[230*ba2points, 3*ba2points+ba2top],
    [251*ba2points, 0*ba2points+ba2top],[284*ba2points, 10*ba2points+ba2top],[313*ba2points, 6*ba2points+ba2top],
    [351*ba2points, 21*ba2points+ba2top],[386*ba2points, 58*ba2points+ba2top],[434*ba2points, 81*ba2points+ba2top],
    [486*ba2points, 198*ba2points+ba2top],[497*ba2points, 279*ba2points+ba2top]
    
]

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
    flyDown = document.getElementById('flyDown'),
    re = document.getElementById('reset');

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
$('#hindernis1').css({width: berg1w+'px', height: berg1h+'px', left: w*1.1+'px'});
$('#hindernis2').css({width: turm1w+'px', height: turm1h+'px', left: w*1.1+'px'});
$('#hindernis3').css({width: ballon1w+'px', height: ballon1h+'px', left: w*1.1+'px'});
$('#hindernis4').css({width: haus1w+'px', height: haus1h+'px', left: w*1.1+'px'});
$('#hindernis5').css({width: drachen1w+'px', height: drachen1h+'px', left: w*1.1+'px'});
$('#hindernis6').css({width: baum1w+'px', height: baum1h+'px', left: w*1.1+'px'});
$('#hindernis7').css({width: baum2w+'px', height: baum2h+'px', left: w*1.1+'px'});
$('#score').css({'font-size': h/10+'px'});

$('#optionen').css({width: w+'px', height: h+'px'});
$('#back2').css({width: iconw+'px', height: iconh+'px', left: w/100+'px', bottom: w/100+'px'});
$('#musicText').css({width: w/5+'px', height: h/10+'px', left: w/10*3+'px', top: h/10*3+'px'});
$('#musicIcon').css({width: w/10+'px', height: h/10+'px', left: w/10*6+'px', top: h/10*3+'px'});
$('#soundText').css({width: w/5+'px', height: h/10+'px', left: w/10*3+'px', top: h/10*5+'px'});
$('#soundIcon').css({width: w/10+'px', height: h/10+'px', left: w/10*6+'px', top: h/10*5+'px'});

$('#reset').css({width: w+'px', height: h+'px'});

$('#test1').css({'font-size': h/20+'px'});
$('#test2').css({'font-size': h/20+'px'});
$('#test3').css({'font-size': h/20+'px'});
$('#test4').css({'font-size': h/20+'px'});

/*-------------------------------------------------------------------------------*/

function hindernisLoop(typ) {
    
    if (activ == 1) {
        
        newTyp = getRandomInt(4, 7);

        while (newTyp == typ) {

            newTyp = getRandomInt(4, 7);

        }

        hindernis.move(newTyp);

        $('#test4').html(newTyp);

        window.setTimeout(hindernisLoop, 2000, newTyp);
        
    }
    
}

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

function collision() {
    
    switch (newTyp) {
        case 1:
            
            var hindernisCoords = $('#hindernis1').position().left;
            
            if (hindernisCoords > h*0.05 - berg1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h-berg1h-fh && flugzeugY < h) {
                    
                    collisionDetection(berg1Points, '#hindernis1');
                
                    $('#test2').html('Kollision möglich mit: '+newTyp);
                    
                }
                
            }
            break;
        case 2:
            
            var hindernisCoords = $('#hindernis2').position().left;
            
            if (hindernisCoords > h*0.05 - turm1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h-turm1h-fh && flugzeugY < h) {
                
                    $('#test2').html('Kollision mit: '+newTyp);
                    
                }
                
            }
            break;
        case 3:
            
            var hindernisCoords = $('#hindernis3').position().left;
            
            if (hindernisCoords > h*0.05 - ballon1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h*0.1 - fh && flugzeugY < h*0.1 + ballon1h) {
                
                    $('#test2').html('Kollision mit: '+newTyp);
                    
                }
                
            }
            break;
        case 4:
            
            var hindernisCoords = $('#hindernis4').position().left;
            
            if (hindernisCoords > h*0.05 - haus1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h-haus1h-fh && flugzeugY < h) {
                    
                    collisionDetection(haus1Points, '#hindernis4');
                
                    $('#test2').html('Kollision möglich mit: '+newTyp);
                    
                }
                
            }
            break;
        case 5:
            
            var hindernisCoords = $('#hindernis5').position().left;
            
            if (hindernisCoords > h*0.05 - drachen1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h*0.1 - fh && flugzeugY < h*0.1 + drachen1h) {
                    
                    collisionDetection(drachen1Points, '#hindernis5');
                
                    $('#test2').html('Kollision möglich mit: '+newTyp);
                    
                }
                
            }
            break;
        case 6:
            
            var hindernisCoords = $('#hindernis6').position().left;
            
            if (hindernisCoords > h*0.05 - baum1w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h-baum1h-fh && flugzeugY < h) {
                    
                    collisionDetection(baum1Points, '#hindernis6');
                
                    $('#test2').html('Kollision möglich mit: '+newTyp);
                    
                }
                
            }
            break;
        case 7:
            
            var hindernisCoords = $('#hindernis7').position().left;
            
            if (hindernisCoords > h*0.05 - baum2w && hindernisCoords < h*0.05 + fw) {
                
                var flugzeugY = $('#flugzeug').position().top;
                
                if (flugzeugY > h-baum2h-fh && flugzeugY < h) {
                    
                    collisionDetection(baum2Points, '#hindernis7');
                
                    $('#test2').html('Kollision möglich mit: '+newTyp);
                    
                }
                
            }
            break;
            
        }
    
}

function collisionDetection(points, hindernis) {
    
    var flugzeugCoords = $('#flugzeug').position().top;
    var hindernisCoords = $(hindernis).position().left;
    
    for (var i = 0; i < (flugzeugPoints.length-1); i++) {
        
       for (var j = 0; j < (points.length-1); j++) {
            
           if (activ == 1) {
               
                var ax1 = flugzeugPoints[i][0],
                    ay1 = flugzeugCoords + flugzeugPoints[i][1],
                    ax2 = flugzeugPoints[i+1][0],
                    ay2 = flugzeugCoords + flugzeugPoints[i+1][1],
                    bx1 = hindernisCoords + points[j][0],
                    by1 = points[j][1],
                    bx2 = hindernisCoords + points[j+1][0],
                    by2 = points[j+1][1];

                var f1 = (ay2-ay1)*(bx1-ax2)-(by1-ay2)*(ax2-ax1),
                    f2 = (ay2-ay1)*(bx2-ax2)-(by2-ay2)*(ax2-ax1);

                if (Math.sign(f1) != Math.sign(f2)) {

                    var g1 = (by2-by1)*(ax1-bx2)-(ay1-by2)*(bx2-bx1),
                        g2 = (by2-by1)*(ax2-bx2)-(ay2-by2)*(bx2-bx1);

                    if (Math.sign(g1) != Math.sign(g2)) {

                        hits++

                        $('#test3').html('Kollision mit: '+newTyp+'   '+hits);

                        activ = 0;

                        var x = -((w*1.1)-hindernisCoords);

                        $(hindernis).css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
                        $(hindernis).css('transform', 'translate3d('+x+'px, 0px, 0px)');

                        speed = 0;

                        flugzeugDist = flugzeugCoords - realFlugzeugCoords;

                        $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
                        $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
                        
                        $('#reset').css({display: 'inherit'});

                    }
                    
                }
                
            }
            
        }
        
    }
    
}

function reset(typ) {
    
    activ = 1;
    
    score = 0;
    
    $('#flugzeug').css('-webkit-transform', 'none');
    $('#flugzeug').css('transform', 'none');
    
    $('#score').html('Score: '+score);

    $('#hindernis'+typ).css({'-webkit-transition-duration': 'initial'});
    $('#hindernis'+typ).css({'transition-duration': 'initial'});
    $('#hindernis'+typ).css('-webkit-transform', 'none');
    $('#hindernis'+typ).css('transform', 'none');
                      
    $('#reset').css({display: 'none'});
    
    startBild.init();
    
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
    while (delta >= timestep && activ == 1) {
        
        steuerungLoop();
        collision();
        delta -= timestep;
        if (++numUpdatesSteps >= 240) {
            
            panic();
            break;
            
        }
        
    }
    
    animation();
    
    if (activ == 1) {
        requestAnimationFrame(gameLoop);
    }
    
}

/*-------------------------------------------------------------------------------*/

var startBild = {
    
    init: function() {
        
        $('#flugzeugAuswahl').css({display: 'none'});
        $('#optionen').css({display: 'none'});
        $('#hintergrund').css({display: 'none'});
        $('#reset').css({display: 'none'});
        $('#startBild').css({display: 'inherit'});
        
        game.init();
    
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
        
        if (activ == 1) {
            
            e.preventDefault();

            var flugzeugCoords = $('#flugzeug').position().top;

            if (flugzeugCoords > h*0.02) {

                var dist = -10 * yFlugzeug;

                speed = -10;

                flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

                $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
                $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');

            }
            
        }
        
    },
    
    touchStartDown: function(e) {
        
        if (activ == 1) {
            
            e.preventDefault();

            var flugzeugCoords = $('#flugzeug').position().top;

            if (flugzeugCoords < h*0.98) {

                var dist = 10 * yFlugzeug;

                speed = 10;

                flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

                $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
                $('#flugzeug').css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');

            }
            
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
        
        if (activ == 1) {
            
            var x = -(w*1.2 + berg1w);

            $('#hindernis'+typ).css({'-webkit-transition-duration': '2s'});
            $('#hindernis'+typ).css({'transition-duration': '2s'});
            $('#hindernis'+typ).css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
            $('#hindernis'+typ).css('transform', 'translate3d('+x+'px, 0px, 0px)');


            window.setTimeout('hindernis.reset('+typ+')', 2010);
            
        }
                 
    },
    
    reset: function(typ) {
        
        if (activ == 1) {
        
            score += 1;

            $('#score').html('Score: '+score);

            $('#hindernis'+typ).css({'-webkit-transition-duration': 'initial'});
            $('#hindernis'+typ).css({'transition-duration': 'initial'});
            $('#hindernis'+typ).css('-webkit-transform', 'none');
            $('#hindernis'+typ).css('transform', 'none');
            
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
flyUp.addEventListener('touchend', flying.touchEnd);
flyDown.addEventListener('touchstart', flying.touchStartDown);
flyDown.addEventListener('touchend', flying.touchEnd);

back2.addEventListener('touchstart', function(){$('#back2').css({opacity: 0.1})});
back2.addEventListener('touchend', function(){startBild.init(); $('#back2').css({opacity: 0.5})/*; $('#flugzeug').css({'background-image': 'url(../images/flugzeug'+fAPosition+'.svg)'})*/});

re.addEventListener('touchend', function(){reset(newTyp);});