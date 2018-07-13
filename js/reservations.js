$(".clickable").on("click", function() {
    $(this).css('backgroundColor', "rgb(0,255,0)")  
});

$("prevbtn").on('click', function(){
    window.location.href="../html/selectLabRm.html"
});

$("#resbtn").on('click', function(){
    window.location.href="../html/conres.html"
});