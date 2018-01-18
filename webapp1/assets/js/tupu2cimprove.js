/**
 * Created by Felixy on 2017/11/30.
 */
/**
 * Created by Felixy on 2017/6/15.
 */
/**
 * Created by Felixy on 2017/5/6.
 */
var element = document.getElementById("tupuall");
var tupu = echarts.init(element);
var desinfo = [];
var links =[];
links.pop();
var namelist = [];
<!--获取图谱生成数据-->

$.getJSON('http://www.freekg.cn/poet/datasource/allpoet', function (json) {//这里获取诗人列表
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
                id:json[a].id,
                symbolSize:10.0
            }
        );
    }
    $.getJSON('http://www.freekg.cn/poet/datasource/relation',function (rela) {
        //'http://www.freekg.cn/poet/datasource/relation'
        console.log("下面输入获得的rela列表");
        // console.log(rela);
        for (var b=0;b<JSONLength(rela);b++){
            links.push({
                    source:rela[b].name1,
                    target:rela[b].name2,
                    source_uri:rela[b].poet1,
                    target_uri:rela[b].poet2,
                    value:rela[b].refer,
                    lineStyle:{normal:{width: 0.8000}}
                }
            );
        }
        console.log("下面输出赋值遍历好的links");
        console.log(links);
        // for(var i=0;i<desinfo.length;i++){
        //     // console.log(desinfo[i]['name']);
        //     for(var j=0;j<links.length;j++) {
        //         // console.log(links[j]['source']);
        //         if(desinfo[i]['name']!=links[j]['source'] && desinfo[i]['name']!=links[j]['target']){
        //             desinfo.splice(i,1);
        //         }
        //     }
        // }
        console.log(desinfo);
        for(var x=0;x<links.length;x++){
            for(var b=0;b<desinfo.length;b++){
                if (desinfo[b].name==links[x].source){
                    desinfo[b].symbolSize +=0.1;
                }else if (desinfo[b].name==links[x].target){
                    desinfo[b].symbolSize +=0.1;
                }
            }
        }
        for(var b=0;b<desinfo.length;b++){
            if(desinfo[b].symbolSize<=10.3){
                desinfo.splice(b,1);
            }
        }
        console.log(desinfo);



        option = {
            title: {
                text: ''
            },
            tooltip: {},
            series: [
                {
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    roam: true,
                    draggable:true,
                    animation:false,
                    label: {
                        normal: {
                            show: true,
                            position: [50,50],
                            formatter: '{b}',
                            textStyle:{
                                fontSize:10
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#4a4564',
                            curveness: 0.5
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#292638'
                        }
                    },
                    force: {
                        repulsion: 100,
                        edgeLength:5
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
                    data: desinfo.map(function (node) {
                        return {
                            name:node.name,
                            value:node.ob,
                            symbolSize:node.symbolSize
                        };
                    }),
                    // links: [],
                    links:links
                    // lineStyle: {
                    //     normal: {
                    //         opacity: 0.9,
                    //         width: 2,
                    //         curveness: 0
                    //     }
                    // }
                }
            ]
        };
        tupu.setOption(option);
        <!--定义鼠标事件-->
        tupu.on('click', function (params) {
            $("#panel1").show();
            $("#panel2").show();
            if(params.dataType=="edge"){
                $("#reloadbutton").hide();
                $("#directinfo").hide();
            }else {
                $("#reloadbutton").show();
                $("#directinfo").show();
            }
            pareparam=params;
            document.getElementById("selectnode").innerText=pareparam.name;
            eConsole(params);
        });

    });
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
        deleteall();
        console.log(param);
        if(param.dataType=="node"){

            $.getJSON('http://www.freekg.cn/poet/datasource/poet?poeturi='+param.data.value, function (json) {//这里根据传入的名称向后台发送请求，显示对应节点的知识卡片
                console.log("下面输出诗人详情");
                console.log(json);
                var altername=json[0].alter_name;
                var born=json[0].born;
                var death=json[0].death;
                var name=json[0].name;
                var work=json[0].work;
                var info=json[0].info;
                $("#info_description").append('<h1>'+name+'</h1><p>'+info+'</p>');
            });
        }else {
            deleteall();
            console.log("输出referuri这里执行");
            var uri=param.data.value;
            console.log("输出referuri下面这里执行");
            $.getJSON('datasource/rela?referuri='+uri, function (jb) {
                console.log("请求referuri返回数据");
                console.log(jb);
                var retime=jb.results.bindings[0].time.value;
                var poemliststr=jb.results.bindings[0].poem.value;
                var poemlists=JSON.parse(poemliststr);
                var referlist='<h2>引用关系说明：'+pareparam.name+'</h2>';
                for (var i=0;i<poemlists.length;i++){
                    referlist=referlist+'<div class="poemcard"><h1 class="poemcard_title">'+poemlists[i].title+
                        '</h1>' +'<p class="poemcard_content">'+poemlists[i].content+'</p></div>';
                }
                $("#info_description").append(referlist);
            });
        }
    }
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
function createpoetinfo(name,name_cht,borntime,deathtime,id) {
    var a1=createbutton("姓名",name);
    var a2=createbutton("姓名（繁体）",name_cht);
    var a3=createbutton("生于",borntime);
    var a4=createbutton("死于",deathtime);
    var a5=createbutton("id",id);
    var all=document.createElement("div");
    all.setAttribute("class","btn-group");
    all.setAttribute("style","width:100%;");
    a1.setAttribute("onclick","reload()");
    all.appendChild(a1);
    all.appendChild(a2);
    all.appendChild(a3);
    all.appendChild(a4);
    all.appendChild(a5);
    return all;
};
function createpoeminfo(name,content) {
    var a1=createbutton("题目",name);
    var a2=createbutton("内容",content);
    var all=document.createElement("div");
    all.setAttribute("class","btn-group");
    all.setAttribute("style","width:100%;");
    a1.setAttribute("onclick","reload()");
    all.appendChild(a1);
    all.appendChild(a2);
    return all;
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

function reload() {
    if (pareparam.dataType=="node"){
        console.log("输出传过去的节点参数");
        console.log(pareparam);
        doubcl(pareparam,1);
    }
    $("#btnc").hide();
    $("#btnf").hide();
}
function showpoetpage() {
    window.location.assign("poetinfo.html?poetname="+pareparam.data.name+"?uri="+pareparam.data.value);
}



