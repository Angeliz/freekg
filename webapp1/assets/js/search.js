var pareparam;
var count=0;//消歧计数器
var pausejsonlist;
var uri=0;
// var dom = document.getElementById("search_shower");
function search() {
    // $("#search_shower").hide();
    // deleteambiguity();
    var info = document.getElementById("Search-box").value;
    // if (info == "") {
    //     info = "除却巫山不是云";
    // }
    // var realinfo = convert(1, info);
    $.getJSON("http://www.freekg.cn/poet/datasource/unknownquery?name=" + info, function (json) {
        console.log("新方法查询结果说明");
        console.log(json);
        if (json.length > 1) {//如果不止一个元素就消歧
            pausejsonlist = [];
            // $("#search_shower").hide();
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


                // console.log(uri);
                // alert(uri);
            } else {
                answerpoemrequest(info);
            }
            // $("#search_shower").show();
        }
    });
}
function answerpoetrequest(info) {
    window.location.href="http://www.freekg.cn/poet/poetinfo.html?poetname="+info+"?uri=http://www.freekg.com/poet/"+uri;
}
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

