/**
 * Created by Vineeth on 28-10-2017.
 */
var qn,g_reg,g_name;
function Register(regno,name) {
    g_reg=regno;
    g_name=name;
    database.ref(`users/${regno}`).set({
        name: name
    }).then(function () {
        Materialize.toast('Registered successfully!',3000);
        var current = database.ref(`currentQuestion/value`);
        current.on('value', function(snapshot) {
            $('#ans').val('');
            Materialize.toast('New question!',3000);
            qn=snapshot.val();
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
    $('#register').click(function(){
        Register($("#regno").val(),$('#name').val());
    });
    $('#sub').click(function () {
        if(g_name&&g_reg&&qn)
            Submit(g_reg,g_name,$('#ans').val());
    });
});