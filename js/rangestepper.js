/**
 * rangestepper.js 0.1
 *
 *
 * (c) 2014+ Radu-Sebastian Amarie
 * http://skidding.mit-license.org
 */

(function ($) {

    $.fn.rangestepper = function (minval, maxval) {

        //If it doesn't have the rangestepper class, add it.
        if (!this.hasClass('rangestepper')) {
            this.addClass('rangestepper');
        }
        //Check if minval and maxval are integers
        if (!(minval === parseInt(minval, 10)) || !(maxval === parseInt(maxval, 10)))
            return;

        //Compute the number of steps required
        var steps = maxval - minval;

        //If there aren't any steps, exit.
        if (steps <= 0)
            return;

        //Create the actual steps and their value
        for (var i = 0; i <= steps; i++) {
            var newstep = $("<div class='step' data-val='" + (minval + i) + "' />");
            this.append(newstep);

            //We need a space to center them with variable space between.
            this.append(' ');
        }
        this.append('<span class="stretch"></span><div class="rangeline"></div>');

        $(document).on('click', '.rangestepper .step', function () {
            //Empty other active steps
            $('.rangestepper .step').html('');

            //Creat the active node
            $(this).html("<div class='dragger'><div class='arrow'>&#8801;</div><div class='active'></div></div>");

            //Update the current value
            $(this).parent().data('val', $(this).data('val'));
        });


        //==================== DRAGGABLE ====================\\

        var selected = null, // Object of the element to be moved
            x_pos = 0, // Stores x coordinates of the mouse pointer
            x_elem = 0, // Stores left values (edge) of the element
            x_left = 0;

        // Will be called when user starts dragging an element
        function drag_init(elem) {
            // Store the object of the element which needs to be moved
            selected = elem;
            x_left = selected.css('left').split('px')[0];
            x_elem = selected.offset().left - x_left;

        }

        // Will be called when user dragging an element
        function _move_elem(e) {
            if (selected !== null) {

                x_pos = document.all ? window.event.clientX : e.pageX;

                console.log('X: ' + x_pos);
                console.log( 'X elem: ' +  x_elem );
                console.log( 'X left: ' + x_left );

                //9 pixels to justify courser error (left side instead of middle)
                selected.css('left', ( x_pos - x_elem - 9 ) + 'px');
            }
        }

        // Destroy the object when we are done
        function _destroy() {
            selected = null;
        }

        // Bind the functions...
        $(document).on('mousedown', '.rangestepper .dragger', function () {
            drag_init($(this));
        });

        document.onmousemove = _move_elem;
        document.onmouseup = _destroy;

        return this;
    };

}(jQuery));