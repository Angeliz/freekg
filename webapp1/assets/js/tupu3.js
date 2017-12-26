/**
 * Created by Felixy on 2017/5/11.
 * 这个部分要展示:中心诗人实体，诗人引用实体，诗人引用实体之间的关系，诗人的作品，诗人的经历
 */
var pareparam;
var nodeslist = [];
var edgelist = [];
var categories=[{name:"诗人"},{name:"诗歌"}];
function doubcl(param,mode) {
    if (mode==2){
        $.ajaxSettings.async = false;
        $.getJSON('datasource/allpoet', function (json) {//这里获取诗人列表
            var num = JSONLength(json);
            for (var m = 0; m < num; m++) {
                namelist.push(json[m].name);
            }
            for (var a = 0; a < num; a++) {
                desinfo.push(
                    {
                        name:json[a].name,
                        ob:json[a].ob,
                        borntime:json[a].born,
                        id:json[a].id
                    }
                );
            }
        });
            $.getJSON('datasource/relation', function (rela) {
                console.log("下面输入获得的rela列表");
                console.log(rela);
                for (var b = 0; b < JSONLength(rela); b++) {
                    links.push({
                            source: rela[b].name1,
                            target: rela[b].name2,
                            source_uri: rela[b].poet1,
                            target_uri: rela[b].poet2,
                            value: rela[b].refer,
                            lineStyle: {normal: {width: 0.8000}}
                        }
                    );
                }
            });
        $.ajaxSettings.async = true;
    }
    $("#panel1").hide();
    $("#panel2").hide();
    findrelativelinkandnodes(param);
    findrelativelinkandwork(param);
    findrelativelinkandexp(param);
    deleteall();
    $("#tupuall").hide();
    $("#tupuone").show();
    var tupuone2 = document.getElementById("tupuone");
    var tupuone = echarts.init(tupuone2);
    // tupuone.showLoading();
    console.log("输出时用的");
    console.log(nodeslist);
    console.log(edgelist);
    option = {
        title: {
            text: param.data.name
    },
        tooltip: {},
        legend: [{
            data: categories.map(function (a) {
                return a.name;
            })
        }],
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
                categories: categories,
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
        ],
    };//option结束
    tupuone.setOption(option);
    tupuone.on('click', function (params) {
        $("#panel1").show();
        $("#panel2").show();
        clickonce(params);
    });
}
function findrelativelinkandnodes(param) {//查找相关的引用关系和引用实体，这里是从edge里面遍历去找引用实体的uri
    var poetname = param.data.name;
    edgelist = [];
    nodeslist = [];
    nodeslist.push({
        name: param.data.name,
        value:param.data.value,
        category:0,
        itemStyle: {
            normal: {
                color: 'red'
            }
        }
    });
    for (var i = 0; i < links.length; i++) {
        if (links[i].source == poetname) {
            edgelist.push(links[i]);
            //if结束
        } else {
            if (links[i].target == poetname) {
                edgelist.push(links[i]);
            }
        }//else结束
    }//for循环结束

    console.log(edgelist);
    console.log("初始nodeslist");
    console.log(nodeslist);
    for (var ca = 0; ca < edgelist.length; ca++) {//增加实体节点
        if (edgelist[ca].source == poetname) {
            for (var dd = 0; dd < nodeslist.length; dd++) {
                if (nodeslist[dd].name == edgelist[ca].target) {
                    nodeslist.splice(dd, 1);
                    break;
                }
            }
            nodeslist.push({
                name: edgelist[ca].target,
                value:edgelist[ca].target_uri,
                category:0,
                itemStyle: {
                    normal: {
                        color: 'green'
                    }
                }
            });
        } else {
            for (var dd = 0; dd < nodeslist.length; dd++) {
                if (nodeslist[dd].name == edgelist[ca].source) {
                    nodeslist.splice(dd, 1);
                    break;
                }
            }
            nodeslist.push({
                name: edgelist[ca].source,
                value:edgelist[ca].source_uri,
                category:0,
                itemStyle: {
                    normal: {
                        color: 'green'
                    }
                }
            });
        }
    }
        for (var dd = 0; dd < nodeslist.length; dd++) {
            if (nodeslist[dd].name == param.data.name) {
                nodeslist.splice(dd, 1);
                break;
            }
        }
    nodeslist.push({
        name: param.data.name,
        value:param.data.value,
        category:0,
        itemStyle: {
            normal: {
                color: 'red'
            }
        }
    });
    console.log("nodeslist:");
    console.log(nodeslist);
}
function findrelativelinkandwork(param) {
    $.ajaxSettings.async = false;
    $.getJSON("datasource/work?poeturi="+param.data.value, function (work) {
        console.log("现在返回的work数据")
        console.log(work);
        var worknum = JSONLength(work);
        if (worknum > 1) {
            if(worknum>100){
                worknum=100;
            }
            for (var i = 0; i < worknum; i++) {
                if(work[i].work!="") {
                    for (var dd = 0; dd < nodeslist.length; dd++) {
                        if (nodeslist[dd].name == convert(0,work[i].name)) {
                            nodeslist.splice(dd, 1);
                            break;
                        }
                    }
                    nodeslist.push({
                        name: convert(0,work[i].name),
                        value:convert(0,work[i].content),
                        category:1,
                        itemStyle: {
                            normal: {
                                color: 'blue'
                            }
                        }
                    });
                    edgelist.push({
                        source: param.data.name,
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
function findrelativelinkandexp(param) {
    $.getJSON("datasource/exp?poeturi="+param.data.value,function (exp) {
        deleteall();
        console.log(exp);
        for (var m=0;m<JSONLength(exp);m++) {
            $.ajaxSettings.async = false;
            $.getJSON("datasource/expdes?expuri=" + exp[m].exp, function (expdes) {
                var eme = document.getElementById('info_description');
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
    })
}


function clickonce(param) {
    if (typeof param.seriesIndex == 'undefined') {
        return;
    }
    if (param.type == 'click') {
        if(param.color=="blue"){
            pareparam=param;
            document.getElementById("selectnode").innerText=pareparam.name;
            $("#reloadbutton").hide();
            $("#directinfo").hide();
            $("#poembutton").show();
            console.log(param);
            showworkinfo(param.data.name,param.data.value);
        }else{
            $("#poembutton").hide();
            pareparam=param;
            document.getElementById("selectnode").innerText=pareparam.name;
            console.log("单击了其他诗人节点");
            console.log(pareparam);
            if(pareparam.dataType=="edge"){
                $("#reloadbutton").hide();
                $("#directinfo").hide();
            }else {
                $("#reloadbutton").show();
                $("#directinfo").show();
            }
            eConsole(pareparam);//显示对应节点的信息

        }

    }
}

function showworkinfo(name, value) {//展示作品信息
    deleteall();
    var eme=document.getElementById('info_description');
    var title=createredbutton("标题",name);
    var content=createbutton("内容",value);
    eme.appendChild(title);
    eme.appendChild(content);
}
function showpoempage() {
    window.location.assign("poeminfo.html?poemname="+pareparam.data.name);
}