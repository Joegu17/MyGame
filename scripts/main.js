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
        
        var hg = document.getElementById('hintergrund');
        hg.addEventListener('touchstart', flugzeug.touchStart);
        hg.addEventListener('touchmove', flugzeug.touchMove);
        //hg.addEventListener('touchend', flugzeug.touchEnd);
        
        //gameLoop();
        
    }
    
}

var flugzeug = {
    
    touchCoord: null,
    touchStart: function(e) {
        
        alert('start');
        
        e.preventDefault();
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            flugzeug.touchCoord = {x: touch.pageX, id: touch.identifier};
            
        }
        
    },
    
    touchMove: function(e) {
        
        alert('move');
        
        e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            if (e.touches[i].identifier == flugzeug.touchCoord.id) {
            
                var touch = e.touches[0],
                    moveCoords = touch.pageX,
                    dif = moveCoords - flugzeug.touchCoord.x;

                var x = parseInt((dif + flugzeug.coords.x)*10)/10;

                $('#flugzeug').css('-webkit-transform', 'translate3d('+x+'px, 0px, 0px)');
                $('#flugzeug').css('transform', 'translate3d('+x+'px, 0px, 0px)');
                
            }
            
        }
        
    },
    
    /*touchEnd: function(e) {
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            
            if (e.changedTouches[i].identifier == flugzeug.touchCoord.id) {
                
                var endCoords = e.changedTouches[0].pageX,
                    dif = endCoords - flugzeug.touchCoord.x;
                
                
                
            }
            
        }
        
    }*/
    
}