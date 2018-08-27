var year = -1;
var month = -1;
var day = -1;
var startHour = -1;
var startMinute = -1;
var endHour = -1;
var endMinute = -1;
var selectedFloor = -1;

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