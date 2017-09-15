// JavaScript Document


function gameLoop() {
        
    var typ = getRandomInt(1, 3);
    
    hindernis.move(typ);
    
    window.setTimeout(gameLoop, 3500);
    
    //gameLoop();
    
}

var game = {
    
    init: function() {
        
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
        
        $('#hintergrund').css({width: w+'px', height: h+'px'});
        $('#flugzeug').css({width: fw+'px', height: fh+'px', top: h/2-fh/2+'px'});
        $('#berg').css({width: bergw+'px', height: bergh+'px'});
        $('#turm').css({width: turmw+'px', height: turmh+'px'});
        $('#ballon').css({width: ballonw+'px', height: ballonh+'px'});
        
        var f = document.getElementById('flugzeug');
        f.addEventListener('touchstart', flugzeug.touchStart);
        f.addEventListener('touchmove', flugzeug.touchMove);
        f.addEventListener('touchend', flugzeug.touchEnd);
        
        window.setTimeout(gameLoop, 1000);
        
        //gameLoop();
        
    }
    
}

var flugzeug = {
    
    coords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    realTimeCoords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    endCoords: window.innerHeight/2-(window.innerWidth/10*67/215)/2,
    
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
    
}

var hindernis = {
    
    move: function(typ) {
        
        var w = window.innerWidth,
            h = window.innerHeight,
            x = w/10 + w;
        
        switch (typ) {
            case 1:
                var moveX = -(x + w/10 + h*0.7/430*768);
                //$('#berg').css('-webkit-transform', 'save');
                //$('#berg').css('transform', 'save');
                $('#berg').css('-webkit-transform', 'translate3d('+moveX+'px, 0px, 0px)');
                $('#berg').css('transform', 'translate3d('+moveX+'px, 0px, 0px)');
                break;
            case 2:
                var moveX = -(x + w/10 + h*0.5/555*73);
                $('#turm').css('-webkit-transform', 'translate3d('+moveX+'px, 0px, 0px)');
                $('#turm').css('transform', 'translate3d('+moveX+'px, 0px, 0px)');
                break;
            case 3:
                var moveX = -(x + w/10 + h*0.6/328*225);
                $('#ballon').css('-webkit-transform', 'translate3d('+moveX+'px, 0px, 0px)');
                $('#ballon').css('transform', 'translate3d('+moveX+'px, 0px, 0px)');
                break;
        }
    
        window.setTimeout('hindernis.reset('+typ+')', 3250);
                 
    },
    
    reset: function(typ) {
        
        var w = window.innerWidth,
            x = w/10 + w;
        
        switch (typ) {
            case 1:
                $('#berg').css('-webkit-transform', 'none');
                $('#berg').css('transform', 'none');
                /*var wert = document.getElementById('berg').getAttribute('style');
                alert(wert);*/
                break;
            case 2:
                $('#turm').css('-webkit-transform', 'none');
                $('#turm').css('transform', 'none');
                break;
            case 3:
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





































