const 

var year= -1;
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

//2018, august 9, 2nd flr, 8th seatm 10:00, 11:00
tempSlots.push(new ReservationSlot(2018, 8, 9, 2, 8, 10, 0, 11, 0))

//2018, august 9, 1st flr, 2nd seat, 8:00, 8:30
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 2, 8, 0, 8, 30))

//2018, august 9, 2nd flr, 5th seat, 9:00, 9:30
tempSlots.push(new ReservationSlot(2018, 8, 9, 2, 5, 9, 00, 9, 30))
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 6, 11, 0, 11, 30))
tempSlots.push(new ReservationSlot(2018, 8, 9, 1, 20, 13, 0, 13, 30))


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

