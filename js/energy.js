var arrange = (function(arr) {

    arr.energy = function(points, positions) {
        var avgLen = avgConnLen(points, positions);
        var avgPoints = avgPointsOnLine(points, positions);

        // TODO: Assign weight to len and points on line
        return avgLen + avgPoints;
    };

    var avgConnLen = function(points, positions) {
        var len = points.c.length;
        var totDist = 0.0;

        for(var i=0; i<len; i++) {
            var conn = points.c[i];

            var from = positions[conn.from];
            var to = positions[conn.to];

            totDist += Math.sqrt(
                Math.pow((to.x - from.x), 2) +
                Math.pow((to.y - from.y), 2) 
            );
        }

        return totDist / len;

    };

    var avgPointsOnLine = function(points, positions) {
        var len = points.c.length;
        var totPointsOnLine = 0;

        for(var i=0; i<len; i++) {
            var conn = points.c[i];

            var line = {};
            line.from = positions[conn.from];
            line.to = positions[conn.to];

            totPointsOnLine += pointsOnLine(positions, line);
        }

        return totPointsOnLine / len;

    };


    var pointsOnLine = function(positions, line) {
        var cnt = 0;

        for (var i=0; i<positions.length; i++) {
            if (isPointOnLine(positions[i], line))
                cnt++;
        }

        return cnt;
    };

    var isPointOnLine = function(point, line) {
        var crossProduct = (line.from.y - line.to.y) * (point.x - line.to.x) - 
            (line.from.x - line.to.x) * (point.y - line.to.y);

        if (crossProduct !== 0 )
            return false;

        if (!isBetween(point.x, line.from.x, line.to.x))
            return false;

        if (!isBetween(point.y, line.from.y, line.to.y))
            return false;

        return true;

    };

    var isBetween = function(x, a, b) {
        if(a < b) {
            if (!(x>a && x<b))
                return false;
        } else if (b < a) {
            if (!(x>b && x<a))
                return false;
        } else if(a === b) {
            if (a !== x)
                return false;
        }

        return true;

    };

    return arr;

}(arrange || {}));
