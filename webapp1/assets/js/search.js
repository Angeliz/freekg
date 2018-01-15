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
        if (json.length > 1) {//如果不止一个元素就消歧
            pausejsonlist = [];
            ambiguity(json);
            var len = json.length;
            for (let a = 0; a < len; a++) {
                pausejsonlist.push(
                    json[a]
                )
            }
            console.log("复制数组结果")
            console.log(pausejsonlist);
        } else {
            if (json[0].born) {//判断单个实体的类型，是古诗还是诗人
                uri=json[0].id;
                answerpoetrequest(info);
            } else {
                answerpoemrequest(info);
            }
        }
    });
}
// 响应诗人查询结果，页面跳转
function answerpoetrequest(info) {
    window.location.href="http://www.freekg.cn/poet/poetinfo.html?poetname="+info+"?uri=http://www.freekg.com/poet/"+uri;
}
// 响应古诗题目或古诗内容查询结果，页面跳转
function answerpoemrequest(info) {
    window.location.href="http://www.freekg.cn/poet/poeminfo.html?poemname="+info;
}
function ambiguity(json) {//消除歧义，并给每个链接赋值之类的
    var container = document.getElementById("ambiguity_shower");
    var len = json.length;
    for (let a = 0; a < len; a++) {
        container.appendChild(createambiguity(json[a]));
    }
    count=0;//赋值完毕，计数器归零
}
var btn=document.getElementById("btn");
btn.onclick=function () {
    search();
}

