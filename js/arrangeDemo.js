
(function($) {
    var pn;
    var cn;
    $(document).ready( function() {
        $('#gen').click(generate);
        $('#arr').click(arrange);

        $('#more-div').on('hidden', hidden);

    });

    var arrange = function(e) {
       surface.arrange(); 
    };

    var generate = function(e) {
        if(validate()) {
            console.log('validation pass');
            var points = surface.generate(pn, cn);
            console.log(points);
        } else {
            message('Validation Error', 'Invalid Inputs');
        }
    };

    var hidden = function(e) {
        $('#more-div').addClass('no-border');
    };

    var validate = function() {
        pn = +($('#pn').val());
        cn = +($('#cn').val());

        if(isNaN(pn))
            return false;
        if(isNaN(cn))
            return false;
        
        if(pn <=0)
            return false;
        if(cn <=0 || cn > (pn * pn))
            return false;

        return true;
    };

    var message = function(title, message) {
       $('#messageModalTitle').html(title);
       $('#messageModalBody').html(message);
       $('#messageModal').modal(); 
    };


}(jQuery));
