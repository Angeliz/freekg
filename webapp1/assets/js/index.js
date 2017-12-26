/**
 * Created by Felixy on 2017/5/26.
 */
/**
 * Created by Felixy on 2017/5/6.
 */
var element = document.getElementById("tupuall");
var tupu = echarts.init(element);
var desinfo = [];
<!--生成坐标轴数据-->
var axisData = [];
for (var i = 0; i < 101; i++) {
    var str = '年';
    var mtr = -1000 + i * 20;
    str = mtr + str;
    axisData.push(str);
}
var data = axisData.map(function (item, i) {
    return Math.round(Math.random() * 1000 * (i + 1));
});
var links =[];
links.pop();
var namelist = [];
<!--获取图谱生成数据-->
$.getJSON('assets/json/show_poet.json', function (json) {//这里获取诗人列表
    var num = JSONLength(json.poet);
    for (var m = 0; m < num; m++) {
        namelist.push(json.poet[m].name);
    }
    for (var a = 0; a < num; a++) {
        desinfo.push(
            {
                name: json.poet[a].name,
                borntime: json.poet[a].borntime,
                deathtime: json.poet[a].deathtime,
                zi: json.poet[a].zi,
                hao: json.poet[a].hao,
                identity: json.poet[a].identity,
                paibie: json.poet[a].paibie,
                id:a

            }
        );
    }
    for (var o = 0; o < num; o++) {
        for (var p=0;p<num;p++){
            var midvalue=(desinfo[o].borntime-desinfo[p].borntime);
            if (o!=p&(midvalue<20&midvalue>-20)){
                links.push({
                    source:o,
                    target:p,
                    value:"可能相识"
                });
            }
        }

    }
    option = {
        title: {
            text: ''
        },
        tooltip: {},
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 10,
                end: 90
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                labelFormatter: function (value) {
                    return value;
                },
                left: '93%',
                start: 45,
                end: 70
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 1,
                end: 35
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 29,
                end: 36
            }
        ],
        xAxis: {
            type: 'category',
            data: namelist,
            show:false
        },
        yAxis: {
            type: 'value',
            splitLine:{
                show:false
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: desinfo.map(function (node) {
                    return {
                        value:node.borntime
                    };
                }),
                // links: [],
                links:links,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };
    tupu.setOption(option);
    <!--定义鼠标事件-->
    tupu.on('click', function (params) {
        eConsole(params);
    });
    tupu.on('dblclick', function (params) {
        pareparam=params;
        doubcl(params);
    })
});
function createlink(name) {//点击后动态生成link
    // $.getJSON('datasource/exp?ownername='+name, function (json) {
    //     name=name.replace(/经历/,"");
    //     var i=parseInt(name)-1;
    //     var mm2 =json[i].relationname;
    //     var mm7=json[i].relationperson;
    //
    // });


}
function returnindex(name) {//返回对应姓名的索引值
    for (var i=0;i<namelist.length;i++){
        if (namelist[i]==name){
            return i;
        }
    }
    return null;
}
function eConsole(param) {
    if (typeof param.seriesIndex == 'undefined') {
        return;
    }
    if (param.type == 'click') {
        // alert(param.dataIndex);
        var n=param.dataIndex;
        deleteall();
        var eme=document.getElementById('info_description');
        var emechild=createpoetinfo(desinfo[n].name,desinfo[n].borntime,desinfo[n].deathtime,desinfo[n].zi,desinfo[n].hao,desinfo[n].identity,desinfo[n].paibie);
        eme.appendChild(emechild);
        createlink(desinfo[n].name);
    }
    ;
}
function deleteall() {
    var element = document.getElementById('info_description');
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
function createpoetinfo(name,borntime,deathtime,zi,hao,identity,paibie) {
    var a1=createbutton("姓名",name);
    var a2=createbutton("生于",borntime);
    var a3=createbutton("死于",deathtime);
    var a4=createbutton("字",zi);
    var a5=createbutton("号",hao);
    var a6=createbutton("身份",identity);
    var a7=createbutton("派别",paibie);
    var all=document.createElement("div");
    all.setAttribute("class","btn-group");
    all.setAttribute("style","width:100%;");
    all.appendChild(a1);
    all.appendChild(a4);
    all.appendChild(a5);
    all.appendChild(a6);
    all.appendChild(a7);
    all.appendChild(a2);
    all.appendChild(a3);
    return all;
};
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

function reload() {
    doubcl(pareparam);
}

