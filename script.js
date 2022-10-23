$(document).ready(function () {
    let hrTimeout;
    
    // On click any saveEvent button, save that event to localStorage
    $('.saveEventBtn').on('click', function () {
        let newEventHr = parseInt($(this).attr('data-hr'));
        
        let newEventDescr = $(this).siblings('.hr-event').val();
  
        localStorage.setItem("eventHour-"+newEventHr, newEventDescr);
        
        $('#savedMsg').removeClass('d-none');
        $('#savedMsg').addClass('d-inline');
    
        setTimeout(function () {
            $('#savedMsg').addClass('d-none');
            $('#savedMsg').removeClass('d-inline');
        }, 5000);

        updateHr();
    });

    // Calculate time remaining until next hour and set timeout until next hour update
    function setNextHourTimer() {
        const minutes = 60 - moment().minute();
        const seconds = 60 - moment().second();
        const milliseconds = 1000 - moment().millisecond();
        clearTimeout(hrTimeout);
        hrTimeout = setTimeout(function () {
            updateHr();
        }, 60*1000*minutes + 1000*seconds + milliseconds);
    }

    // Update styling/text on page
    function updateHr() {
        const currentHr = moment().hour();
        let idString;

        // loop through all calendar hours
        for( let h = 9 ; h <= 17 ; h++ ) {
            idString = '#hr-'+h+" textarea";

            // Remove all temporal classes
            $(idString).removeClass('present');
            $(idString).removeClass('past');
            $(idString).removeClass('future');

            // Apply relevant temporal class
            if( h === currentHr ) {
                $(idString).addClass('present');
            } else if( h > currentHr ) {
                $(idString).addClass('future');
            } else {
                $(idString).addClass('past');
            }

            // Add stored event text to page and apply border to all events
            let eventBlock = localStorage.getItem("eventHour-"+h);
            if(eventBlock) {
                $(idString).text(eventBlock);
                $(idString).addClass('eventSlot');
                $(idString).removeClass('emptySlot');
            } else {
                $(idString).text("");
                $(idString).addClass('emptySlot');
                $(idString).removeClass('eventSlot');
            }
        }

        updateDay();
    }

    // Update date displayed at top of page
    function updateDay() {
        $('#currentDay').text(moment().format('dddd, MMMM Do'));
    }

    updateHr();
    setNextHourTimer();

});