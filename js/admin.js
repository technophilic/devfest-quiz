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
        current = database.ref(`currentQuestion/`);
        current.on('value', function(snapshot) {
            console.log(`currentQuestion/`);
            constructTable(snapshot.val());
        });
    });
}
function constructTable(data) {
    if(data!==null){
        var current=Number(data.value);
        console.log(data);
        if(data[current]){
        for(var i in data[current].response){
            var time="";
            var d= new Date(data[current].response[i].t_stp);
            time+=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            var html="<tr>";
            html+="<td>"+current+"</td>";
            html+="<td>"+data[current].response[i].answer+"</td>";
            html+="<td>"+time+"</td>";
            html+="<td>"+data[current].response[i].name+" ("+data[current].response[i].regno+")</td>";
            html+="</tr>";
        }
        $('#tableBody').html(html);
        console.log(data);
    }
    }
}
$(function () {
    $('#update').click(function(){
        setQuestion($("#qno").val());
    });
});
