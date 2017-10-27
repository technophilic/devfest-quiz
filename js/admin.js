/**
 * Created by Vineeth on 28-10-2017.
 */
var current;
function setQuestion(qno) {
    if(current)
    current.off();
    database.ref().update({
            '/currentQuestion': {
                value: qno,
                [qno]: {
                    response: {}
                }
            }
        }).then(function () {
        Materialize.toast('Question updated !',3000);
        current = database.ref(`currentQuestion/${qno}/response`);
        current.on('value', function(snapshot) {
            console.log(`currentQuestion/${qno}/response`);
            constructTable(snapshot.val());
        });
    });
}
function constructTable(data) {
    console.log(data);
}
$(function () {
    $('#update').click(function(){
        setQuestion($("#qno").val());
    });
});