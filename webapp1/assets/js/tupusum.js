/**
 * Created by Felixy on 2017/6/25.
 */
var pareparam;
var nodeslist = [];
var edgelist = [];
var links=[];
$.getJSON('datasource/relation',function (rela) {
    for (var b=0;b<JSONLength(rela);b++){
        links.push({
                source:rela[b].name1,
                target:rela[b].name2,
                value:rela[b].refer,
                lineStyle:{normal:{width: 0.8000}}
            }
        );
    }});
function doubcl(param) {
    findrelativelinkandnodes(param);
    findrelativelinkandwork(param);
    deleteall();
    $("#staticinfobody").hide();
    $("#statictupubody").show();
    var tupuone2 = document.getElementById("statictupubody");
    var tupuone = echarts.init(tupuone2);
    // tupuone.showLoading();
    console.log("输出时用的");
    console.log(nodeslist);
    console.log(edgelist);
    option = {
        title: {
            text: param.data.name
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
}
function findrelativelinkandnodes(param) {//查找相关的引用关系和引用实体
    var poetname = param.data.name;
    edgelist = [];
    nodeslist = [];
    nodeslist.push({
        name: param.data.name,
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
function deleteall() {
    var element = document.getElementById('statictupubody');
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
