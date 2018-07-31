var year = -1;
var month = -1;
var day = -1;
var startHour = -1;
var startMinute = -1;
var endHour = -1;
var endMinute = -1;

function slotsChecker() {
    // this works...

    //var slot = document.getElementById("1");
    //    $("#1").addClass("red");
    //$("#1").removeClass("red");
}

$("#date-picker").calendar({
    type: 'date',
    inline: true,
    onChange: function(date) {
        year = parseInt(date.getFullYear());
        month = parseInt(date.getMonth() + 1);
        day = parseInt(date.getDate());

        console.log(year + '-' + month + '-' + day);
    }
});

$("#start-time").calendar({
    type : "time",
    ampm : false,
    onChange: function (date, text, mode) {
        startHour = date.getHours();
        startMinute = date.getMinutes();

        // checking status
        if (startHour >= 0 && startMinute >= 0 && 
            endHour >= 0 && endMinute >= 0) {
            if (startHour > endHour) {
                $("#time-error").text("Invalid time.");
            } else {
                $("#time-error").text(" ");
            }
        }

        slotsChecker();
    }  
  })

$('#end-time').calendar({
    type: 'time',
    ampm : false,
    onChange: function (date, text, mode) {
        endHour = date.getHours();
        endMinute = date.getMinutes();

        if (startHour >= 0 && startMinute >= 0 && 
            endHour >= 0 && endMinute >= 0) {
            if (startHour > endHour) {
                $("#time-error").text("Invalid time.");
            } else {
                $("#time-error").text(" ");
            }
        }

        slotsChecker();
    }
});

