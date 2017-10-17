var w = window.innerWidth,
    h = window.innerHeight;
var reglerw = w/5,
    reglerh = h/10;

var re = document.getElementById('regler');

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

re.addEventListener('touchstart', regler.touchStart);
re.addEventListener('touchmove', regler.touchMove);
re.addEventListener('touchend', regler.touchEnd);