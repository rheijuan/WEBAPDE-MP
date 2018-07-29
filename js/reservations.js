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
    $(this).css('backgroundColor', "rgb(0,255,0)")  
});

$("prevbtn").on('click', function(){
    window.location.href="../html/selectLabRm.html"
});

$("#resbtn").on('click', function(){
    window.location.href="../html/conres.html"
});

$("#aprevbtn").on('click', function(){
    window.location.href="../html/admin-selectLabRm.html"
});

$("#aresbtn").on('click', function(){
    window.location.href="../html/admin-conres.html"
});

    var flag = false;

    if ($(this).hasClass('clicked'))
        $(this).removeClass('clicked')
    else
        $(this).addClass('clicked')

    var target = $(this).find('td:first').text()
    for(var i = 0; i < reservations.length; i++) {
        if(reservations[i].mail == target) {

            if(reservations[i].status) {
                reservations[i].status = false;
                document.getElementById("reserve").innerHTML = "Cancel Reservation";
            }
            else {
                reservations[i].status = true;
                $(this).css('backgroundColor', '#FFFFFF');
                document.getElementById("reserve").innerHTML = "Cancel Reservation";
            }
        }
    }

    for(var i = 0; i < reservations.length; i++) {
        if(reservations[i].status) {
            flag = true;
            break;
        }
    }

    if(flag)
        $("#cancel").css('backgroundColor', 'white');
    else
        $("#cancel").css('backgroundColor', '#121212');

$("#cancel").on('click', function() {
    $('.clicked').remove();
})
