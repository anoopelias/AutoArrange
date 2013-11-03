var arrange = (function(arrange) {

    arrange.arrange = function(points, positions) {
        var map = toMap(points, positions);
        var en = arrange.energy(points, positions);

        // Gradient Decent
        for(var i=0; i<20; i++) {
            var newMap = randomNeighbor(points, map);
            var newPositions = toPositions(points, newMap);
            var newEnergy = arrange.energy(points, newPositions);

            console.log(i + " : " + newEnergy);

            if(newEnergy < en) {
                en = newEnergy;
                map = newMap;
                positions = newPositions;
            }
        }
        
        return positions;
    };

    var randomNeighbor = function(points, map) {

        // Random pos
        var randP = Math.floor(Math.random() * grid.N);

        // Random direction
        var randD = Math.floor(Math.random() * 4);

        // copy to new map
        var newMap = new Array(grid.N);
        for(var i=0; i< grid.N; i++) {
            newMap[i] = new Array(grid.N);
            for(var j=0; j<grid.N; j++) {
                newMap[i][j] = map[i][j];
            }
        }
        map = newMap;

        // Moving column up
        if(randD === 0) {
            var tempPoint = map[randP][0];
            for(var i=1; i<grid.N; i++) {
                map[randP][i-1] = map[randP][i];
            }
            map[randP][grid.N - 1] = tempPoint;
        }

        // Moving column down
        if(randD === 2) {
            var tempPoint = map[randP][grid.N - 1];
            for(var i=grid.N - 1 ; i>0; i--) {
                map[randP][i] = map[randP][i - 1];
            }
            map[randP][0] = tempPoint;
        }
        
        // Moving row to left
        if(randD === 1) {
            var tempPoint = map[0][randP];
            for(var i=1 ; i<grid.N; i++) {
                map[i - 1][randP] = map[i][randP];
            }
            map[grid.N - 1][randP] = tempPoint;
        }

        // Moving row to right
        if(randD === 3) {
            var tempPoint = map[grid.N - 1][randP];
            for(var i=grid.N - 1 ; i>0; i--) {
                map[i][randP] = map[i - 1][randP];
            }
            map[0][randP] = tempPoint;
        }

        return map;
    };

    var toMap = function(points, positions) {

        // Initialize
        var map = new Array(grid.N);
        for(var i=0; i<grid.N; i++) {
            map[i] = new Array(grid.N);
        }

        // Mapping
        for(var i=0; i<points.n; i++) {
            var pos = positions[i];
            map[pos.x][pos.y] = i;
        }
        
        return map;
    };

    var toPositions = function(points, map) {
        var positions = new Array(points.n);
        for(var i=0; i< grid.N; i++) {
           for(var j=0; j<grid.N; j++) {
               if(map[i][j] !== 'undefined') {
                   positions[map[i][j]] = {
                       x : i,
                       y : j
                   }

               }
           }
        }

        return positions;
    };

    return arrange;

}(arrange || {}));
