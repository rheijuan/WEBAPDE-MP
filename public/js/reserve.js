var year = -1;
var month = -1;
var day = -1;
var startHour = -1;
var startMinute = -1;
var endHour = -1;
var endMinute = -1;
var selectedFloor = -1;

// this is temporary only.
var ReservationSlot = function (year, month, day, floor, slot, 
    startHour, startMinute, endHour, endMinute) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.floor = floor;
        this.slot = slot;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
}

// Will remove once database is integrated to the UI.
var tempSlots = []

tempSlots.push(new ReservationSlot(2018, 8, 9, 2, 8, 10, 0, 11, 0))
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 2, 8, 0, 8, 30))
tempSlots.push(new ReservationSlot(2018, 8, 9, 2, 5, 9, 00, 9, 30))
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 6, 11, 0, 11, 30))
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 20, 13, 0, 13, 30))

function clearSlots() {
    for (var i = 1; i <= 20; i++) {
        $("#"+i).removeClass('red disabled');
    }
}

function slotsChecker() {
    for (var i = 1; i <= 20; i++) {
        tempSlots.filter((revSlot)=> {
            if (revSlot.slot == i && revSlot.startHour >= startHour && revSlot.endHour == endHour 
                && revSlot.endMinute == endMinute && revSlot.floor == selectedFloor && revSlot.month == month
            && revSlot.year == year && revSlot.day == day) {
                $("#"+i).addClass('red disabled')
            }
        });
    }
}

$("#date-picker").calendar({
    type: 'date',
    inline: true,
    onChange: function(date) {
        year = parseInt(date.getFullYear());
        month = parseInt(date.getMonth() + 1);
        day = parseInt(date.getDate());
        //selectedFloor = parseInt($(".ui.selection.dropdown").dropdown('get value'));

        console.log(year + '-' + month + '-' + day);
    }
});

$('.ui.dropdown').dropdown({
    onChange: function(val) {
        selectedFloor = val;
        clearSlots();
        slotsChecker();
    }
});

$("#start-time").calendar({
    type : "time",
    ampm : false,
    onChange: function (date, text, mode) {
        startHour = parseInt(date.getHours());
        startMinute = parseInt(date.getMinutes());
        //selectedFloor = parseInt($(".ui.selection.dropdown").dropdown('get value'));
        clearSlots();

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
        endHour = parseInt(date.getHours());
        endMinute = parseInt(date.getMinutes());
        selectedFloor = parseInt($(".ui.selection.dropdown").dropdown('get value'));

        clearSlots();

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

var selected = null; 
$(".computer.ui.button").on("click", function() {
    selected = $(this).attr("id");
    console.log(selected);
});

function getSelected() {
    return selected;
}