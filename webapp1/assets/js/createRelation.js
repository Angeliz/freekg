var pareparam;
var count=0;//消歧计数器
var pausejsonlist;
var nodeslist = [];//节点列表
var edgelist = [];//边列表
var dom = document.getElementById("search_shower");
var tupuone = echarts.init(dom);
function search() {
    $("#search_shower").hide();
    deleteambiguity();
    var info = document.getElementById("search_content").value;
    if (info == "") {
        info = "除却巫山不是云";
    }
    // var realinfo = convert(1, info);
    $.getJSON("datasource/unknownquery?name=" + info, function (json) {
        console.log("新方法查询结果说明");
        console.log(json);
        if (JSONLength(json) > 1) {//如果不止一个元素就消歧
            pausejsonlist=[];
            $("#search_shower").hide();
            ambiguity(json);
            var len=JSONLength(json);
            for (let a=0;a<len;a++){
                pausejsonlist.push(
                    json[a]
                )
            }
            console.log("复制数组结果")
            console.log(pausejsonlist);
        } else {
            if (json[0].born) {//判断单个实体的类型，是古诗还是诗人
                answerpoetrequest(json[0]);
            } else {
                answerpoemrequest(json[0]);
            }
            $("#search_shower").show();
        }
    });
    // tupuone.showLoading();
    // $.getJSON('datasource/poet?name='+info, function (test) {
    //         tupuone.hideLoading();
    //         //处理实体信息
    //         //处理work信息
    //         var work = [];
    //         var workall=test.work.toString();
    //         work=workall.split(",");
    //         //处理经历信息
    //         var exp=[];
    //         exp=test.exp;
    //         // for (var e=0;e<exp.length;e++){
    //         //     console.log(exp[e]);
    //         // };
    //         //处理坐标信息
    //         var location=[];
    //         for (var m=25;m<=975;m+=50){
    //             for (var n=25;n<475;n+=50){
    //                 location.push({
    //                         xposition:m,
    //                         yposition:n
    //                     }
    //                 );
    //             }
    //         };
    //         for (var e=0;e<exp.length;e++){
    //             console.log(location[e]);
    //         };
    //         //汇总节点数据
    //         var nodeall=[];
    //         var suiji=200;
    //         for (var f=0;f<work.length;f++){
    //             var fx=Math.floor(Math.random()*suiji);
    //             var f1={
    //                 name:work[f],
    //                 x:location[fx].xposition,
    //                 y:location[fx].yposition,
    //                 value:1,
    //                 itemStyle:{
    //                     normal:{
    //                         color:"#87c158"
    //                     }
    //                 }
    //             }
    //             nodeall.push(f1);
    //             location.splice(fx-1,1);
    //             suiji--;
    //         }
    //         suiji=suiji-50;
    //         for (var g=0;g<exp.length;g++){
    //             var fy=Math.floor(Math.random()*suiji);
    //             // alert(fy);
    //             var f1={
    //                 name:"经历"+(g+1),
    //                 x:location[fy].xposition,
    //                 y:location[fy].yposition,
    //                 value:2,
    //                 symbolSize:60,
    //                 itemStyle:{
    //                     normal:{
    //                         color:"#cbe1f1"
    //                     }
    //                 }
    //             }
    //             nodeall.push(f1);
    //             location.splice(fy-1,1);
    //             suiji--;
    //         }
    //         var fy=Math.floor(Math.random()*suiji);
    //         nodeall.push({
    //             name:info,
    //             x:location[fy].xposition,
    //             y:location[fy].yposition,
    //             value:0
    //
    //         });
    //         var links=[];
    //         for (var l=nodeall.length;l>=0;l--){
    //             links.push({
    //                 "source":nodeall.length-1,
    //                 "target":l,
    //                 "value":"has"
    //             });
    //         }
    //
    //
    //         option = {
    //             title: {
    //                 text: info + '关系图谱',
    //                 left: '5%'
    //             },
    //             tooltip: {},
    //             animationDurationUpdate: 1500,
    //             animationEasingUpdate: 'quinticInOut',
    //             series: [
    //                 {
    //                     type: 'graph',
    //                     layout: 'none',
    //                     symbolSize: 50,
    //                     roam: true,
    //                     label: {
    //                         normal: {
    //                             show: true
    //                         }
    //                     },
    //                     edgeSymbol: ['circle', 'arrow'],
    //                     edgeSymbolSize: [4, 10],
    //                     edgeLabel: {
    //                         normal: {
    //                             textStyle: {
    //                                 fontSize: 20
    //                             }
    //                         }
    //                     },
    //                     data:nodeall,
    //                     // links: [],
    //                     links:links,
    //                     lineStyle: {
    //                         normal: {
    //                             opacity: 0.9,
    //                             width: 2,
    //                             curveness: 0
    //                         }
    //                     }
    //                 }
    //             ]
    //         };
    //         tupuone.setOption(option);
    //         tupuone.on('click', function (param) {
    //             if(param.value==0){
    //             deleteall();
    //             var eme=document.getElementById('searchinfo');
    //             var emechild=createpoetinfo(test.name,test.born,test.death,test.zi,test.hao,test.identity,test.paibie);
    //             eme.appendChild(emechild);
    //             }else if(param.value==1){
    //                 alert("作品");
    //             }else {
    //                 alert("经历正在完善中，请等待");
    //             }
    //         })
    //
    //     })
}
function answerpoetrequest(info) {//响应诗人查询结果，下面显示单个节点图，并可以从右侧选择进入相应的诗人主页或者图谱页面
    nodeslist=[];
    edgelist=[];
    deleteall();
    findworklink(info);
    finexpinfo(info);
    console.log("作图前数据");
    console.log(edgelist);
    console.log(nodeslist);
    option = {
        title: {
            text: convert(0,info.name)
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 32,
                roam: true,
                draggable: true,
                animation: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}',
                        textStyle: {
                            fontSize: 12
                        }
                    }
                },
                force: {
                    repulsion: 130,
                    initLayout:"circular",
                    layoutAnimation:false
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 6],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: nodeslist,
                links: edgelist,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };//option结束
    tupuone.setOption(option);
    tupuone.on('click', function (param) {
        clicktodo(param);
    });
}
function answerpoemrequest(info) {//相应古诗查询结果，从下面显示古诗及作者节点图，并可以从右侧选择进入相应诗人主页或图谱页面
    nodeslist=[];
    edgelist=[];
    deleteall();
    var json={
        name:info.author,
        ob:info.authoruri,
        poemname:info.name,
        content:info.content
    }
    findworklink(json);
    console.log("作图前数据");
    console.log(edgelist);
    console.log(nodeslist);
    option = {
        title: {
            text: convert(0,info.name)
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 32,
                roam: true,
                draggable: true,
                animation: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}',
                        textStyle: {
                            fontSize: 12
                        }
                    }
                },
                force: {
                    repulsion: 130,
                    initLayout:"circular",
                    layoutAnimation:false
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 6],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: nodeslist,
                links: edgelist,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };//option结束
    tupuone.setOption(option);
    tupuone.on('click', function (param) {
        clicktodo(param);
    });
}
function ambiguity(json) {//消除歧义，并给每个链接赋值之类的
    var container = document.getElementById("ambiguity_shower");
    var len = JSONLength(json);
    for (let a = 0; a < len; a++) {
        container.appendChild(createambiguity(json[a]));
    }
    count=0;//赋值完毕，计数器归零
}
function createambiguity(info) {//根据传入对象的不同，返回不同的dom节点
    if (info.born != null) {
        var ale = document.createElement("a");
        ale.setAttribute("class", "btn btn-default");
        var innertext = document.createTextNode(convert(0, info.name) + "(" + convert(0, info.alter_name) + ")");
        ale.appendChild(innertext);
        ale.setAttribute("onclick","choose("+count+")");
        ale.setAttribute("style","max-width:50%;margin: 3px;overflow:hidden;text-overflow:ellipsis;word-break:break-all;");
        count++;
        return ale;
    } else {
        var ale = document.createElement("a");
        ale.setAttribute("class", "btn btn-info");
        var innertext = document.createTextNode(convert(0, info.name) + "(" + convert(0, info.author) + ")");
        ale.appendChild(innertext);
        ale.setAttribute("onclick","choose("+count+")");
        ale.setAttribute("style","max-width:50%;margin: 3px;overflow:hidden;text-overflow:ellipsis;word-break:break-all;");
        count++;
        return ale;
    }
}
function deleteall() {
    var element = document.getElementById('searchinfo');
    var sonnodes = element.childNodes;
    for (var i = 0; i < sonnodes.length; i++) {
        if (sonnodes.item(i)) {
            element.removeChild(sonnodes.item(i));
            i = i - 1;
        }
    }
};
function deleteambiguity() {
    var element = document.getElementById('ambiguity_shower');
    var sonnodes = element.childNodes;
    for (var i = 0; i < sonnodes.length; i++) {
        if (sonnodes.item(i)) {
            element.removeChild(sonnodes.item(i));
            i = i - 1;
        }
    }
};
function JSONLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function findworklink(json) {
    nodeslist.push({
        name:convert(0,json.name),
        value:convert(0,json.ob)
    });
    if (json.poemname) {
        nodeslist.push({
            name: convert(0, json.poemname),
            value: convert(0, json.content),
            itemStyle: {
                normal: {
                    color: '#F17F42'
                }
            }
        });
        edgelist.push({
            source: convert(0,json.name),
            target: convert(0,json.poemname),
            value: convert(0,json.content),
            lineStyle: {normal: {width: 0.8000}}
        })
    }
    $.ajaxSettings.async = false;
    $.getJSON("datasource/work?poeturi="+json.ob, function (work) {
        console.log("现在返回的work数据")
        console.log(work);
        var worknum = JSONLength(work);
        if (worknum > 1) {
            if(worknum>100){
                worknum=100;
            }
            for (var i = 0; i < worknum; i++) {
                if(work[i].name!="") {
                    for (let dd = 0; dd < nodeslist.length; dd++) {
                        if (nodeslist[dd].name == convert(0,work[i].name)) {
                            nodeslist.splice(dd, 1);
                            break;
                        }
                    }
                    if(work[i].name==json.poemname){
                        nodeslist.push({
                            name: convert(0,work[i].name),
                            value:convert(0,work[i].content),
                            itemStyle: {
                                normal: {
                                    color: '#F17F42'
                                }
                            }
                        });
                    }else {
                    nodeslist.push({
                        name: convert(0,work[i].name),
                        value:convert(0,work[i].content),
                        itemStyle: {
                            normal: {
                                color: '#00bcd4'
                            }
                        }
                    });
                    }
                    edgelist.push({
                        source: convert(0,json.name),
                        target: convert(0,work[i].name),
                        value: convert(0,work[i].content),
                        lineStyle: {normal: {width: 0.8000}}
                    });
                }
            }

        }//if结束
        console.log("添加完work节点后");
        console.log(nodeslist);
        console.log(edgelist);
    });
    $.ajaxSettings.async = true;

}
function finexpinfo(json) {
    $.getJSON("datasource/exp?poeturi="+json.ob,function (exp) {
        deleteall();
        console.log(exp);
        if(exp[0].description){
        for (var m=0;m<JSONLength(exp);m++) {
            $.ajaxSettings.async = false;
            $.getJSON("datasource/expdes?expuri=" + exp[m].exp, function (expdes) {
                var eme = document.getElementById('searchinfo');
                var a1 = createbutton("经历", expdes[0].description);
                var a2 = createbutton("地点", expdes[0].place);
                var a3 = createbutton("时间", expdes[0].timefrom + "到" + expdes[0].timeto);
                var a4 = createbutton("涉及人物", expdes[0].relationperson);
                eme.appendChild(a1);
                eme.appendChild(a2);
                eme.appendChild(a3);
                eme.appendChild(a4);
                console.log("返回的exp");
                console.log(expdes);
            });
            $.ajaxSettings.async = true;
        }
        }
    })
}
function createbutton(info,desinfo) {
    if (desinfo!=""){
        info=info+":  ";
        var b1=document.createElement("a");
        b1.innerHTML=desinfo;
        b1.setAttribute("style","margin:3px;max-width:80%;white-space:normal;");
        b1.setAttribute("class","btn btn-info");
        var b2=document.createElement("span");
        b2.setAttribute("style","margin-top:10px;");
        var b3=document.createTextNode(info);
        b2.appendChild(b3);
        var b4=document.createElement("div");
        b4.appendChild(b2);
        b4.appendChild(b1);
        return b4;
    } else{
        info=info+":  ";
        var b3=document.createTextNode(info);
        var b2=document.createElement("p");
        b2.setAttribute("style","margin-top:10px;");
        b2.appendChild(b3);
        return b2;
    }

}
function createredbutton(info,desinfo) {
    if (desinfo!=""){
        info=info+":  ";
        var b1=document.createElement("a");
        b1.innerHTML=desinfo;
        b1.setAttribute("style","margin:3px;max-width:80%;white-space:normal;");
        b1.setAttribute("class","btn btn-danger");
        var b2=document.createElement("span");
        b2.setAttribute("style","margin-top:10px;");
        var b3=document.createTextNode(info);
        b2.appendChild(b3);
        var b4=document.createElement("div");
        b4.appendChild(b2);
        b4.appendChild(b1);
        return b4;
    } else{
        info=info+":  ";
        var b3=document.createTextNode(info);
        var b2=document.createElement("p");
        b2.setAttribute("style","margin-top:10px;");
        b2.appendChild(b3);
        return b2;
    }

}
function choose(num) {
    $("#search_shower").show();
    if (pausejsonlist[num].born) {
        answerpoetrequest(pausejsonlist[num]);
    } else {
        answerpoemrequest(pausejsonlist[num]);
    }
}
function clicktodo(param) {
    if(param.dataType=="node"){
        if (param.color!="#c23531"){
            $("#concreteinfoshow").hide();
            $("#concretepoetpageshow").hide();
            showworkinfo(param.name,param.value);
        }else {
            deleteall();
            pareparam=param;
            $("#concreteinfoshow").show();
            $("#concretepoetpageshow").show();
            console.log("输出临时变量");
            console.log(pareparam);
        }
    }
}
function showworkinfo(name, value) {//展示作品信息
    deleteall();
    var eme=document.getElementById('searchinfo');
    var title=createredbutton("标题",name);
    var content=createbutton("内容",value);
    eme.appendChild(title);
    eme.appendChild(content);
}
function showpoetpage() {
    window.location.assign("poetinfo.html?poetname="+pareparam.data.name+"?uri="+pareparam.data.value);
}
function showtupu() {
    window.location.assign("catalog.html?poetname="+pareparam.data.name+"?uri="+pareparam.data.value);
}