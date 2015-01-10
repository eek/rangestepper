/**
 * rangestepper.js 0.1
 *
 *
 * (c) 2014+ Radu-Sebastian Amarie
 * http://skidding.mit-license.org
 */

(function ($) {

    $.fn.rangestepper = function ( options ) {

        var settings = $.extend({
            inputName: "rangestepper",
            minVal: 0,
            maxVal: 10,
            val: null
        }, options );

        var minLeft = this.offset().left;
        var maxRight = minLeft + this.width() - 12;

        //If it doesn't have the rangestepper class, add it.
        if (!this.hasClass('rangestepper')) {
            this.addClass('rangestepper');
        }
        //Check if settings.minVal and settings.maxVal are integers
        if (!(settings.minVal === parseInt(settings.minVal, 10)) || !(settings.maxVal === parseInt(settings.maxVal, 10))) return;

        //Compute the number of steps required
        var steps = settings.maxVal - settings.minVal;

        //If there aren't any steps, exit.
        if (steps <= 0) return;

        //Create the actual steps and their value
        for (var i = 0; i <= steps; i++) {
            var dataValue = settings.minVal + i;
            var newStep = $("<div class='step' data-val='" + dataValue + "' />");

            this.append(newStep);
            //if set and if in range
            if( settings.val && settings.val >= settings.minVal && settings.val <= settings.maxVal ) {
                //if current stepper
                if( i == settings.val ) {
                    draggerCreate( newStep );
                }
            }else if( settings.minVal == 0 && i == 0 ){
                draggerCreate( newStep );
            }else{
                if( settings.minVal < 0 && dataValue == 0 ){
                    draggerCreate( newStep );
                }
            }

            //We need a space to center them with variable space between.
            this.append(' ');
        }

        this.append('<span class="stretch"></span><div class="rangeline"></div><input type="hidden" name="' + settings.inputName + '" />');


        $(document).on('click', '.rangestepper .step', function () {
            if( !$(this).children('.dragger').length ){

                //Empty other active steps
                $('.rangestepper .step').html('');

                //Creat the active node
                draggerCreate( $(this) );
            }
        });

        //==================== DRAGGABLE ====================\\
        var lastLeftOffset = 0;
        $('body').on('mousedown', '.rangestepper .dragger', function() {
            $(this).addClass('draggable').parents().on('mousemove', function(e) {
                var draggable = $('.draggable');

                if( draggable.length ){
                    lastLeftOffset = e.pageX - draggable.outerWidth() / 2;

                    if( lastLeftOffset < minLeft ) lastLeftOffset = minLeft;
                    if( lastLeftOffset > maxRight ) lastLeftOffset = maxRight;

                    draggable.offset({
                        left: lastLeftOffset
                    });
                }

            });
        }).on('mouseup', '.rangestepper .dragger', function() {
            var closestSnap = {};
            var closestSnapDiff = 9999;

            $( ".rangestepper .step" ).each(function() {
                var leftOffset = $(this).offset().left;
                var diff = lastLeftOffset - leftOffset;

                if(diff < 0) diff *= -1;

                if(diff <= closestSnapDiff){
                    closestSnapDiff = diff;
                    closestSnap = $(this);
                }

            });
            $('.dragger').remove();

            //Create the Dragger in the Closest Snap
            draggerCreate( closestSnap );

        });

        function draggerCreate( currentSnap ){
            currentSnap.html("<div class='dragger'><div class='arrow'>&#8801;</div><div class='active'></div></div>");

            //Set value for the current Snap
            setCurrentValue( currentSnap );
        }

        function setCurrentValue( closestSnap ){
            var $el = $('.rangestepper input[name="' + settings.inputName + '"]');
            var value = closestSnap.data('val');
            $el.val(value);
            $el.trigger('change', value);
        }

        return this;
    };

}(jQuery));