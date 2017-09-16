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

function gameLoop(typ) {
    
    var newTyp = getRandomInt(1, 3);
    
    while (newTyp == typ) {
        
        newTyp = getRandomInt(1, 3);
            
    }
    
    hindernis.move(newTyp);
        
    window.setTimeout(gameLoop, 2000, newTyp);
    
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
        
        window.setTimeout(gameLoop, 1000);
        
    }
    
}

/*var flugzeug = {
    
    coords: h/2-(h/10*67/215)/2,
    realTimeCoords: h/2-(h/10*67/215)/2,
    endCoords: h/2-(h/10*67/215)/2,
    
    touchCoord: null,
    touchStart: function(e) {
        
        e.preventDefault();
        
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            flugzeug.touchCoord = {y: touch.pageY, id: touch.identifier};
            
        }
        
    },
    
    touchMove: function(e) {
        
        e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            if (e.touches[i].identifier == flugzeug.touchCoord.id) {
            
                var touch = e.touches[0],
                    moveCoords = touch.pageY,
                    dif = moveCoords - flugzeug.touchCoord.y;

                var y = parseInt((dif + flugzeug.coords)*10)/10;
                
                flugzeug.realTimeCoords = y;

                $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+dif+'px, 0px)');
                $('#flugzeug').css('transform', 'translate3d(0px, '+dif+'px, 0px)');
                
            }
            
        }
        
        $('#flugzeug').css({top: flugzeug.realTimeCoords+'px'});
        
    },
    
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == flugzeug.touchCoord.id) {
                
                var dif = e.changedTouches[0].pageY - flugzeug.touchCoord.y,
                    y = parseInt((dif + flugzeug.coords)*10)/10;
                
                flugzeug.coords = flugzeug.realTimeCoords;
                
            }
            
        }
        
    }
    
}*/

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
                    dif = moveCoords - regler.touchCoord.y,
                    moveUp = -(h/2+fh/2+h/10),
                    moveDown = h/2+fh/2+h/10;
                
                switch (true) {
                    case (dif < 0):
                        $('#flugzeug').css({top: h/100+'px'});
                        //$('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+moveUp+'px, 0px)');
                        //$('#flugzeug').css('transform', 'translate3d(0px, '+moveUp+'px, 0px)');
                        break;
                    case (dif == 0):
                        var flugzeugCoords = $('#flugzeug').position(),
                            flugzeugY = flugzeugCoords.top;
                        $('#flugzeug').css({top: flugzeugY+'px'});
                        break;
                    case (dif > 0):
                        $('#flugzeug').css({top: (h/100*99-fh)+'px'});
                        //$('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+moveDown+'px, 0px)');
                        //$('#flugzeug').css('transform', 'translate3d(0px, '+moveDown+'px, 0px)');
                } 

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
                
                $('#regler').css({'-webkit-transition-duration': '0.5s', 'transition-duration': '0.5s'});
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

/*var hindernis = {
    
    generate: function(typ) {
        
        var hindernisData = {},
            w = window.innerWidth,
            h = window.innerHeight,
            x = w/10 + w;
        
        hindernisData.coordX = x;
        
        switch (typ) {
            case 1:
                var hh = h/10*7,
                    hw = h/10*7/430*768,
                    y = h - hh;
                hindernisData.coordY = y;
                hindernisData.id = 'berg';
                $('#hindernisse').append('<div id="berg" class="berg" style="width: '+hw+'px; height: '+hh+'px; -webkit-transform:translate3d('+x+'px, '+y+'px, 0px); transform:translate3d('+x+'px, '+y+'px, 0px);"></div>');
                break;
            case 2:
                var hh = h/10*7,
                    hw = h/10*7/555*73,
                    y = h - hh;
                hindernisData.coordY = y;
                hindernisData.id = 'turm';
                $('#hindernisse').append('<div id="turm" class="turm" style="width: '+hw+'px; height: '+hh+'px; -webkit-transform:translate3d('+x+'px, '+y+'px, 0px); transform:translate3d('+x+'px, '+y+'px, 0px);"></div>');
                break;
            case 3:
                var hh = h/10*7,
                    hw = h/10*7/328*225,
                    y = h - hh;
                hindernisData.coordY = y;
                hindernisData.id = 'ballon';
                $('#hindernisse').append('<div id="ballon" class="ballon" style="width: '+hw+'px; height: '+hh+'px; -webkit-transform:translate3d('+x+'px, '+y+'px, 0px); transform:translate3d('+x+'px, '+y+'px, 0px);"></div>');
                break;
        }
        
        return(hindernisData);
        
    },
    
    move: function(data) {
        
        for (var i = 0; i < data.length; i++) {
            
            var x = data[i].coordX,
                y = data[i].coordY;
            
            $('#'+data[i].id).css('-webkit-transform', 'translate3d(3000px, 0px, 0px)');
            $('#'+data[i].id).css('transform', 'translate3d(3000px, 0px, 0px)');
            
            //alert(x+' '+y);
            
        }
        
    }
    
}*/





































