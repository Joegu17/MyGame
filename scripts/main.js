// JavaScript Document


function gameLoop() {
    
    do {
        
        
        
    } while (true);
    
}

var game = {
    
    init: function() {
        
        var w = window.innerWidth,
            h = window.innerHeight;
        var fw = h/10*215/67,
            fh = h/10;
        
        $('#hintergrund').css({width: w+'px', height: h+'px'});
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        
        var f = document.getElementById('flugzeug');
        f.addEventListener('touchstart', flugzeug.touchStart);
        f.addEventListener('touchmove', flugzeug.touchMove);
        f.addEventListener('touchend', flugzeug.touchEnd);
        
        //gameLoop();
        
    }
    
}

var flugzeug = {
    
    coords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    realTimeCoords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    endCoords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    
    touchCoord: null,
    touchStart: function(e) {
        
        //e.preventDefault();
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            flugzeug.touchCoord = {y: touch.pageY, id: touch.identifier};
            
        }
        
    },
    
    touchMove: function(e) {
        
        //e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            if (e.touches[i].identifier == flugzeug.touchCoord.id) {
            
                var touch = e.touches[0],
                    moveCoords = touch.pageY,
                    dif = moveCoords - flugzeug.touchCoord.y;

                var y = parseInt((dif + flugzeug.coords)*10)/10;
                
                flugzeug.realTimeCoords = y;

                $('#flugzeug').css('-webkit-transform', 'translateY('+dif+'px)');
                $('#flugzeug').css('transform', 'translateY('+dif+'px)');
                
            }
            
        }
        
        $('#flugzeug').css({top: flugzeug.coords+'px'});
        
    },
    
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == flugzeug.touchCoord.id) {
                
                var dif = e.changedTouches[0].pageY - flugzeug.touchCoord.y,
                    y = parseInt((dif + flugzeug.coords)*10)/10;
                
                flugzeug.coords = flugzeug.realTimeCoords;
                
                //$('#flugzeug').css({top: flugzeug.coords+'px'});
                
            }
            
        }
        
    }
    
}
