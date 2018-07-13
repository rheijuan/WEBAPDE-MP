 $('#login').on('click', function(e) {
     e.preventDefault()
     var email = $('#email-field').val()
     if (email != 'admin@dlsu.edu.ph')
        window.location.href="../html/home.html"
     else
         window.location.href="../html/admin.html"
 })