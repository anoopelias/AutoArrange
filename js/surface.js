var surface = (function ($) {
    var surface = {};

    // Assuming square grid
    var w = 500;
    
    surface.generate = function(pn, cn) {

        var points = {
            n : pn,
            c : randomConnections(pn, cn)
        };
        surface.place(points);

        return points;
    };

    surface.place = function(points) {
        grid.init(points.n, w);

        surface.points = points;
        surface.positions = randomPositions(points.n);
        
        surface.plot();
    };

    surface.arrange = function() {
        surface.positions = 
            arrange.arrange(surface.points, surface.positions);
        
        surface.plot();

    };

    surface.plot = function() {
        $('#surface').empty();
        surface.node = SVG('surface').size(w, w);

        plotPoints(surface.points, surface.positions);
    };
    
    var plotPoints = function(points, positions) {
        for(var i=0; i<points.n; i++)
            plotPoint(i, positions[i]);
            
        var connections = points.c;
            
        for(var i=0; i<connections.length; i++)
            plotConnection(positions[connections[i].from], positions[connections[i].to]);
    };
    
    var plotPoint = function(id, p) {
        var p = cordinates(p);

        surface.node.circle(6).attr({fill: '#000'}).center(p.x, p.y);
        surface.node.text(id + "").move(p.x, p.y);
    };
    
    var plotConnection = function(from, to) {
        var from = cordinates(from);
        var to = cordinates(to);
        
        surface.node.line(from.x, from.y, to.x, to.y)
             .stroke({width : 1});
    };

    var cordinates = function(p) {
        return {
            x : p.x * grid.W + Math.round(grid.W / 2),
            y : p.y * grid.W + Math.round(grid.W / 2)
        }
        
    };
    
    var randomConnections = function(pn, cn) {
        /*
        Generating a power set will take quadratic complexity, Nevertheless,
        can't find a better way to generate a random subset without duplicates.
        */
        var powSet = [];
        for(var i=0; i<pn; i++)
            for(var j=i+1; j<pn; j++)
                powSet.push({from : i, to : j});

        // Shuffle the power set
        // TODO: Probably you don't have to shuffle the entire set
        shuffle(powSet);
        
        
        return powSet.slice(0, cn); // Splice the first cn to get random connections.        
    };

    var randomPositions = function(n) {
        
        var powSet = [];
        for(var i=0; i<grid.N; i++)
            for(var j=0; j<grid.N; j++)
                powSet.push({x : i, y : j});
        
        shuffle(powSet);
        
        return powSet.slice(0, n);

    };

    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    
    
    return surface;
}(jQuery));
