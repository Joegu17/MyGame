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
var speed = 0,
    newSpeed = 0;

var score = 0;

function hindernisLoop(typ) {
    
    var newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
        
    window.setTimeout(hindernisLoop, 2000, newTyp);
    
}

var game = {
    
    init: function() {
        
        $('#hintergrund').css({width: w+'px', height: h+'px'});
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        $('#berg').css({width: bergw+'px', height: bergh+'px'});
        $('#turm').css({width: turmw+'px', height: turmh+'px'});
        $('#ballon').css({width: ballonw+'px', height: ballonh+'px'});
        $('#score').css({'font-size': h/10+'px'});
        $('#flugzeug').css({'-webkit-transition-duration': '2s'});
        $('#flugzeug').css({'transition-duration': '2s'});
        
        var r1 = document.getElementById('regler1'),
            r2 = document.getElementById('regler2');
        r1.addEventListener('touchstart', regler.touchStartUp);
        r2.addEventListener('touchstart', regler.touchStartDown);
        
        window.setTimeout(hindernisLoop, 1000);
        
    }
    
}

var regler = {
    
    coordY: h/2 - reglerh/2,
    realTimeCoordY: h/2 - reglerh/2,
    
    touchCoord: null,
    touchStartUp: function(e) {
        
        e.preventDefault();
        
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            var flugzeugCoords = $('#flugzeug').position().top;
            
            speed = newSpeed;
            
            if (speed > -5) {
                newSpeed = speed - 1;
            }
            
            $('#test1').html('Speed: '+newSpeed);
            
            var time = (100/h * (flugzeugCoords - h/100))/(15+newSpeed*5)
            
            $('#flugzeug').css({'-webkit-transition-duration': time+'s'});
            $('#flugzeug').css({'transition-duration': time+'s'});
            
            $('#flugzeug').css({top: h/100+'px'});
            
        }
        
    },
    
    touchStartDown: function(e) {
        
        e.preventDefault();
        
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            var flugzeugCoords = $('#flugzeug').position().top;
            
            speed = newSpeed;
            
            if (speed < 5) {
                newSpeed = speed + 1;
            }
            
            $('#test1').html('Speed: '+newSpeed);
            
            var time = (100/h * (flugzeugCoords - h/100))/(15+newSpeed*5)
            
            $('#flugzeug').css({'-webkit-transition-duration': time+'s'});
            $('#flugzeug').css({'transition-duration': time+'s'});
            
            $('#flugzeug').css({top: (h/100*99-fh)+'px'});
            
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
