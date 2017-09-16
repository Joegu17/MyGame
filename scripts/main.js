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

var score = 0;

function hindernisLoop(typ) {
    
    var newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
        
    window.setTimeout(hindernisLoop, 2000, newTyp);
    
}

function steuerungLoop() {
    
    var reglerCoords = $('#regler').position().top,
        flugzeugCoords = $('#flugzeug').position().top;
    
    $('#test1').html('reglerCoors: '+reglerCoords);
    
    $('#flugzeug').css({top: reglerCoords+'px'});
    
    /*switch (true) {
        case (reglerCoords > (h/100) && reglerCoords < (h/100+h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '1s'});
            $('#flugzeug').css({'transition-duration': '1s'});
            $('#flugzeug').css({top: h/100+'px'});
            $('#test2').html('speed: -5');
            break;
        case (reglerCoords > (h/100+h*0.044) && reglerCoords < (h/100+3*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '2s'});
            $('#flugzeug').css({'transition-duration': '2s'});
            $('#flugzeug').css({top: h/100+'px'});
            $('#test2').html('speed: -4');
            break;
        case (reglerCoords > (h/100+3*h*0.044) && reglerCoords < (h/100+5*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '3s'});
            $('#flugzeug').css({'transition-duration': '3s'});
            $('#flugzeug').css({top: h/100+'px'});
            $('#test2').html('speed: -3');
            break;
        case (reglerCoords > (h/100+5*h*0.044) && reglerCoords < (h/100+7*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '4s'});
            $('#flugzeug').css({'transition-duration': '4s'});
            $('#flugzeug').css({top: h/100+'px'});
            $('#test2').html('speed: -2');
            break;
        case (reglerCoords > (h/100+7*h*0.044) && reglerCoords < (h/100+9*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '5s'});
            $('#flugzeug').css({'transition-duration': '5s'});
            $('#flugzeug').css({top: h/100+'px'});
            $('#test2').html('speed: -1');
            break;
        case (reglerCoords > (h/100+9*h*0.044) && reglerCoords < (h/100+11*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#test2').html('speed: 0');
            break;
        case (reglerCoords > (h/100+11*h*0.044) && reglerCoords < (h/100+13*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '5s'});
            $('#flugzeug').css({'transition-duration': '5s'});
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            $('#test2').html('speed: 1');
            break;
        case (reglerCoords > (h/100+13*h*0.044) && reglerCoords < (h/100+15*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '4s'});
            $('#flugzeug').css({'transition-duration': '4s'});
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            $('#test2').html('speed: 2');
            break;
        case (reglerCoords > (h/100+15*h*0.044) && reglerCoords < (h/100+17*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '3s'});
            $('#flugzeug').css({'transition-duration': '3s'});
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            $('#test2').html('speed: 3');
            break;
        case (reglerCoords > (h/100+17*h*0.044) && reglerCoords < (h/100+19*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '2s'});
            $('#flugzeug').css({'transition-duration': '2s'});
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            $('#test2').html('speed: 4');
            break;
        case (reglerCoords > (h/100+19*h*0.044) && reglerCoords < (h/100+20*h*0.044)):
            $('#flugzeug').css({top: flugzeugCoords+'px'});
            $('#flugzeug').css({'-webkit-transition-duration': '1s'});
            $('#flugzeug').css({'transition-duration': '1s'});
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            $('#test2').html('speed: 5');
            break;
    }*/
    
    window.setTimeout(steuerungLoop, 17);
    
}

var game = {
    
    init: function() {
        
        $('#hintergrund').css({width: w+'px', height: h+'px'});
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        $('#berg').css({width: bergw+'px', height: bergh+'px'});
        $('#turm').css({width: turmw+'px', height: turmh+'px'});
        $('#ballon').css({width: ballonw+'px', height: ballonh+'px'});
        $('#score').css({'font-size': h/10+'px'});
        
        var f = document.getElementById('regler');
        f.addEventListener('touchstart', regler.touchStart);
        f.addEventListener('touchmove', regler.touchMove);
        f.addEventListener('touchend', regler.touchEnd);
        
        window.setTimeout(hindernisLoop, 1000);
        
        steuerungLoop();
        
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
                
                touch.realTimeCoordY = y;
                
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
