/**
 * Created by 67 on 2017/5/26.
 * BUG: 不能查询同名内容
 */
/**
 * 用于首页查询功能
 */
var pareparam;
var count=0;//消歧计数器
var pausejsonlist;
var uri=0;

function search() {
    var info = document.getElementById("Search-box").value;
    $.getJSON("http://www.freekg.cn/poet/datasource/unknownquery?name=" + info, function (json) {
        console.log("新方法查询结果说明");
        console.log(json);
        if (json[0].born) {//判断单个实体的类型，是古诗还是诗人
            uri=json[0].id;
            answerpoetrequest(info);
        } else {
            answerpoemrequest(info);
        }
    });
}
// 响应诗人查询结果，页面跳转
function answerpoetrequest(info) {
    window.location.assign("poetinfo.html?poetname="+info+"?uri=http://www.freekg.com/poet/"+uri);
}
// 响应古诗题目或古诗内容查询结果，页面跳转
function answerpoemrequest(info) {
    window.location.assign("poeminfo.html?poemname="+info);
}
var btn=document.getElementById("btn");
btn.onclick=function () {
    search();
}

