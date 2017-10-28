/**
* Created by Vineeth on 28-10-2017.
*/
var qn,g_reg,g_name;
$("#logoutBlock").hide();
$("#questionsBlock").hide();
function Register(regno,name) {
    g_reg=regno;
    g_name=name;
    if(!g_reg || !g_name){
        Materialize.toast('All fields are required!',3000);
        return;
    }
    database.ref(`users/${regno}`).set({
        name: name
    }).then(function () {
        Materialize.toast('Registered successfully!',3000);
        $("#loginBlock").fadeOut();
        $("#logoutBlock").fadeIn();
        var current = database.ref(`currentQuestion/value`);
        current.on('value', function(snapshot) {
            $("#questionsBlock").fadeIn();
            qn=snapshot.val();
            $('#ans').val('');
            $('#qn').html(`${qn}`);
            Materialize.toast('New question!',3000);
            console.log('current question is - ',snapshot.val());
        });
    });
}
function Submit(regno,name,val){
    console.log({
        [`currentQuestion/${qn}/response/${regno}`]: {
            name:name,
            answer: val,
            t_stp:new Date()
        }
    });
    database.ref().update({
        [`currentQuestion/${qn}/response/${regno}`]: {
            name: name,
            answer: val,
            t_stp:new Date()
        }
    }).then(function () {
        Materialize.toast('Submitted successfully!',3000);
    });
}
$(function () {
    $( "#registerForm").submit(function( event ) {
        Register($("#regno").val(),$('#name').val());
        event.preventDefault();
    });
    $('#sub').click(function () {
        if(g_name&&g_reg&&qn)
        Submit(g_reg,g_name,$('#ans').val());
    });
});
