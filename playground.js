/** This file contains the functions 
 * to the CRUD operations of the 2 databases**/


/** USER DATABASE **/
//Register function
app.post("/add", urlencoder, (req, res) => {
    console.log("POST /ADD")

    var username = req.body.username
    var mail = req.body.email
    var password = req.body.identification
    
    if(mail && password && username) {

        User.find({
            username,
            email: mail
        }).then((doc) => {
            if(doc.length == 0) {
                var newUser = new User({
                    username,
                    email: mail,
                    password
                })

                newUser.save().then(() => {
                    console.log("A new user has been added")
                    res.redirect("/")
                }, (error) => {
                    console.log(error)
                })

            } else {
                res.render("register.hbs", {
                    big_error: "Email/ Username is already in use"
                })
            }
        }, (error) => {
            console.log(error)
        })
    } else if(mail && password && !username) {
        res.render("register.hbs", {
            username_error: "Please enter a username"
        })
    } else if(mail && !password && username) {
        res.render("register.hbs", {
            password_error: "Please enter a password"
        })
    } else if(!mail && password && username) {
        res.render("register.hbs", {
            email_error: "Please enter an email"
        })
    } else {
        res.render("register.hbs", {
            big_error: "Incomplete credentials! Please accomplish all fields"
        })
    } 
})



/** RESERVATION DATABASE **/


app.post("/store", urlencoder, (req, res)=>{
    console.log("POST /STORE")
    var username = req.body.username
    var email = req.body.email
    var labRm = req.body.labRm
    var seatNo = req.body.seatNo 
    var date = req.body.date
    var startTime = req.body.startTime
    var endTime = req.body.endTime
    
    var dets = new details({
        name: username,
        email,
        labRm,
        seatNo, 
        date, 
        startTime, 
        endTime 
    })
    
    dets.save().then((newDets)=>{
        console.log("success")
        res.render("home.hbs", {
            username
        })
        
    }, (err)=>{
        console.log("fail " + err)
        res.render("tempAdd.hbs")
    })
})

/************** CANCEL **************/

app.post("/cancelRes", urlencoder, (req, res)=>{
    