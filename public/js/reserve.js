var year = -1;
var month = -1;
var day = -1;
var startHour = -1;
var startMinute = -1;
var endHour = -1;
var endMinute = -1;
var selectedFloor = -1;

var selected = -1;

/**** CONSTRUCTOR FOR CHECKING ONLY ****/
var SlotBasis = function (date, floor, slot, 
    startTime, endTime) {
        this.date = date;
        this.floor = floor;
        this.slot = slot;
        this.startTime = startTime;
        this.endTime = endTime;
}
/****************************************/



$(".computer.ui.button").on("click", function() {
    selected = $(this).attr("id");
    console.log(selected);
});

function getSelected() {
    return selected;
}

function clearSlots() {
    for (var i = 1; i <= 20; i++) {
        $("#"+i).removeClass('red disabled');
    }
}

function slotsChecker(resultSlots, baseSlot) {
    // Still Buggy
    for (var i = 0; i <= resultSlots.length; i++) {
        if (resultSlots[i].date == baseSlot.date && 
            resultSlots[i].room == baseSlot.floor) {

            if (resultSlots[i].endTime <= baseSlot.startTime) {
                $("#"+resultSlots[i].seat).addClass('red disabled')
            } else if (resultSlots[i].startTime >= baseSlot.startTime && resultSlots[i].endTime <= baseSlot.endTime)  {
                $("#"+resultSlots[i].seat).addClass('red disabled')
            }
        }
    }
}

// For searching of slots
$("#search").on("click", function() {
    clearSlots()
    selectedFloor = parseInt($(".ui.selection.dropdown").dropdown('get value'))

    var date = month + "/" + day + "/" + year

    var startTime = parseInt(startHour + "" + startMinute)
    var endTime = parseInt(endHour + "" + endMinute)
    
    if (startMinute === 0)
        startTime = startTime * 10;

    if (endMinute === 0)
        endTime = endTime * 10;

    console.log("Start Time: " + startTime)
    console.log("End Time: " + endTime);

    var compNumber = selected;

    var slotBasis = new SlotBasis(date, selectedFloor, compNumber, startTime, endTime)

    $.ajax({
        method: "get",
        url: "getslots",
        data: {
            date, startTime, endTime, selectedFloor, compNumber
        },
    
        success: function(slots) {           
            slotsChecker(slots, slotBasis)
            console.log("Success!")
        }
    })    
})

$("#date-picker").calendar({
    type: 'date',
    onChange: function(date) {
        year = parseInt(date.getFullYear());
        month = parseInt(date.getMonth() + 1);
        day = parseInt(date.getDate());
        
        console.log(year + '-' + month + '-' + day);
    }
});

$('.ui.dropdown').dropdown({
    onChange: function(val) {
        selectedFloor = val;
    }
});

$("#start-time").calendar({
    type : "time",
    ampm : false,
    minuteStep: 30,
    onChange: function (date, text, mode) {
        startHour = parseInt(date.getHours());
        startMinute = parseInt(date.getMinutes());

        // checking status
        if (startHour >= 0 && startMinute >= 0 && 
            endHour >= 0 && endMinute >= 0) {
            if (startHour > endHour) {
                $("#time-error").text("Invalid time.");
            } else {
                $("#time-error").text(" ");
            }
        }
    }  
  })

$('#end-time').calendar({
    type: 'time',
    ampm : false,
    minuteStep: 30,
    onChange: function (date, text, mode) {
        endHour = parseInt(date.getHours());
        endMinute = parseInt(date.getMinutes());
        selectedFloor = parseInt($(".ui.selection.dropdown").dropdown('get value'));

        if (startHour >= 0 && startMinute >= 0 && 
            endHour >= 0 && endMinute >= 0) {
            if (startHour > endHour) {
                $("#time-error").text("Invalid time.");
            } else {
                $("#time-error").text(" ");
            }
        }
    }
});