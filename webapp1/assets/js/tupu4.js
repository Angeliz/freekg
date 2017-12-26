/**
 * Created by Felixy on 2017/5/15.
 */
function showworkinfo(){
  $.getJSON('assets/json/exp.json', function (json) {

        var element = document.getElementById("info_description");
        for(var i=0; i<json.length; i++)

//console.log(jarray[i]);
var jobj = json[i];
for(var key in jobj)
{
      deleteall();
      var mm1=document.createTextNode(key.id);
      var mm2=document.createTextNode(key.relationname);
      var mm3=document.createTextNode(key.timefrom);
      var mm4=document.createTextNode(key.timeto);
      var mm5=document.createTextNode(key.place);
      var mm6=document.createTextNode(key.description);
      element.appendChild(mm1);
      element.appendChild(mm2);
      element.appendChild(mm3);
      element.appendChild(mm4);
      element.appendChild(mm5);
      element.appendChild(mm6);
}

  });
}
