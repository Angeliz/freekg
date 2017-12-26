/**
 * Created by Felixy on 2017/5/28.
 */
$(".modulebox").each(function (index,element) {
    var box=$(element);
    $(element).mouseover(function(){
        box.css({
            "background-color":"#cbe1f1"
        });
    });
    $(element).mouseout(function(){
        box.css({
            "background-color":"#fff"
        });
    });
});

function showModulebox() {
    var element = document.getElementById("Moudule_search_panel");
    if (document.getElementById("catalog_showModulebox").checked) {
        element.className = "panel panel-flat";
    } else {
        element.className = "panel panel-flat hidden";
    }

}