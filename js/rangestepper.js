/**
 * rangestepper.js 0.1
 *
 *
 * (c) 2014+ Radu-Sebastian Amarie
 * http://skidding.mit-license.org
 */

(function ( $ ) {

  $.fn.rangestepper = function( minval, maxval ) {

    //If it doesn't have the rangestepper class, add it.
    if( !this.hasClass('rangestepper') ){
      this.addClass('rangestepper');
    }
    //Check if minval and maxval are integers
    if( !(minval === parseInt(minval, 10)) || !(maxval === parseInt(maxval, 10)) )
        return;

    //Compute the number of steps required
    var steps = maxval - minval;

    //If there aren't any steps, exit.
    if( steps <= 0 )
        return;

    //Create the actual steps and their value
    for ( var i = 0; i <= steps; i++ ){
        var newstep = $( "<div class='step' data-val='" + (minval+i) + "' />" );
        this.append(newstep);

        //We need a space to center them with variable space between.
        this.append(' ');
    }
      this.append( '<span class="stretch"></span><div class="rangeline"></div>');

    $(document).on('click', '.rangestepper .step', function(){
        //Empty other active steps
        $('.rangestepper .step').html('');

        //Creat the active node
        $(this).html("<div class='dragger'><div class='arrow'>&#8801;</div><div class='active'></div></div>");

        //Update the current value
        $(this).parent().data( 'val', $(this).data('val') );
    });

    return this;
  };

}( jQuery ));