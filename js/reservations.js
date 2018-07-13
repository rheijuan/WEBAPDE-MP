var Reservation = function(mail) {
    this.mail = mail;
    this.status = false;
}

var reservations = []

reservations.push(new Reservation('hogo@dlsu.edu.ph'));
reservations.push(new Reservation('data@dlsu.edu.ph'));
reservations.push(new Reservation('dummy@dlsu.edu.ph'));
reservations.push(new Reservation('cold@dlsu.edu.ph'));
reservations.push(new Reservation('bark@dlsu.edu.ph'));

$(".clickable").on("click", function() {

    if ($(this).hasClass('clicked'))
        $(this).removeClass('clicked')
    else
        $(this).addClass('clicked')

    var target = $(this).find('td:first').text()
    for(var i = 0; i < reservations.length; i++) {
        if(reservations[i].mail == target) {

            if(reservations[i].status) {
                reservations[i].status = false;
                $("#cancel").css('backgroundColor', '#121212')
            }
            else {
                reservations[i].status = true;
                $(this).css('backgroundColor', '#FFFFFF')
                $("#cancel").css('backgroundColor', 'white')
            }
        }
    }
    document.getElementById("reserve").innerHTML = "Cancel";

});