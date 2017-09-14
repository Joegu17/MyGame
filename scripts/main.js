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
        
        flugzeug.draw();
        
    }
    
}

var flugzeug = {
    
    draw: function() {
        
        alert('hallo')
        
        var w = window.innerWidth,
            h = window.innerHeight;
        var fw = w/10,
            fh = w/10*67/215;
        
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        
        var f = document.getElementById('flugzeug');
        f.addEventListener('touchstart', flugzeug.touchStart);
        f.addEventListener('touchmove', flugzeug.touchMove);
        f.addEventListener('touchend', flugzeug.touchEnd);
        
    },
    
    touchCoord: null,
    touchStart: function(e) {
        
        e.preventDefault();
        var touch = e.touches[0];
        
        if (e.touches.length == 1) {
            
            flugzeug.touchCoord = {x: touch.pageX, y: touch.pageY, id: touch.identifer};
            
        }
        
    },
    
    touchMove: function(e) {
        
        e.preventDefault();
        
        for (var i = 0; i < e.touches.length; i++) {
            
            var touch = e.touches[0],
                moveCoords = {x: touch.pageX, y: touch.pageY},
                dif = {moveX: moveCoords.x - flugzeug.touchCoord.x, moveY: moveCoords.y - flugzeug.touchCoord.y};
            
            var x = parseInt((dif.moveX + flugzeug.coords.x)*10)/10,
                y = flugzeug.coords.y;
                //y = parseInt((dif.moveY + flugzeug.coords.y)*10)/10;
            
            $('#flugzeug').css('-webkit-transform', 'translate3d('+x+'px,' +y+'px, 0px)');
            $('#flugzeug').css('transform', 'translate3d('+x+'px,' +y+'px, 0px)');
            
        }
        
    }
    
    //touchEnd: function(e) {
        
        
        
    //}
    
}