var grid = (function() {

    var grid = {};

    grid.N = -1;
    grid.W = -1;

    grid.init = function(noOfPoints, width) {
        grid.N = Math.ceil(Math.sqrt(noOfPoints));
        grid.W = Math.round(width / grid.N);
    };

    return grid;

})();
