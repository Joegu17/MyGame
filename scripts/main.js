// JavaScript Document


function gameLoop() {
    
    do {
        
        
        
    } while (true);
    
}

var game = {
    
    init: function() {
        
        var w = window.innerWidth,
            h = window.innerHeight;
        var fw = w/10,
            fh = w/10*67/215;
        
        $('#hintergrund').css({width: w+'px', height: h+'px'});
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        
        alert(h/2-fh/2)
        
        var hg = document.getElementById('hintergrund');
        hg.addEventListener('touchstart', flugzeug.touchStart);
        hg.addEventListener('touchmove', flugzeug.touchMove);
        //hg.addEventListener('touchend', flugzeug.touchEnd);
        
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
                
                alert(e.touches[i].pageY +' '+ e.touches[0].pageY);

                var y = parseInt((dif + flugzeug.coords)*10)/10;
                
                flugzeug.realTimeCoords = y;

                $('#flugzeug').css('-webkit-transform', 'translate3d(0px, '+y+'px, 0px)');
                $('#flugzeug').css('transform', 'translate3d(0px, '+y+'px, 0px)');
                
            }
            
        }
        
    },
    
    touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == flugzeug.touchCoord.id) {
                
                var endCoords = e.changedTouches[0].pageY,
                    dif = endCoords - flugzeug.touchCoord.y;
                
                
                
            }
            
        }
        
    }
    
}

alert(flugzeug.coords);