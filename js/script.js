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
    localStorage.setItem("regno",regno);
    localStorage.setItem("name",name);
    database.ref(`users/${regno}`).set({
        name: name
    }).then(function () {
        fetchQuestion();
        Materialize.toast('Registered successfully!',3000);
        $("#loginBlock").fadeOut();
        $("#logoutBlock").fadeIn();
        $("#loggedRegn").text(g_regno);
        $("#loggedName").text(g_name);
    });
}
function fetchQuestion(){
    var current = database.ref(`currentQuestion/value`);
    current.on('value', function(snapshot) {
        $("#questionsBlock").fadeIn();
        qn=snapshot.val();
        $('#ans').val('');
        $('#qn').html(`${qn}`);
        Materialize.toast('New question!',3000);
        console.log('current question is - ',snapshot.val());
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
    if(localStorage.getItem("regno")){
        $("#loginBlock").hide();
        $("#logoutBlock").show();
        $("#questionsBlock").show();
        g_reg=localStorage.getItem("regno");
        g_name=localStorage.getItem("name");
        $("#loggedRegno").text(g_reg);
        $("#loggedName").text(g_name);
        fetchQuestion();
    }
    $( "#registerForm").submit(function( event ) {
        Register($("#regno").val(),$('#name').val());
        event.preventDefault();
    });
    $('#sub').click(function () {
        if(g_name&&g_reg&&qn)
        Submit(g_reg,g_name,$('#ans').val());
    });
    $("#logout").click(function(){
        localStorage.removeItem("regno");
        localStorage.removeItem("name");
        document.location.reload();
    });
});
