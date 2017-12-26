/**
 * Created by Felixy on 2017/5/28.
 */

var dom = document.getElementById("tupuone");
var tupuone = echarts.init(dom);
function moduleSearch1() {
    $("#tupuall").hide();
    $("#tupuone").show();
    var info=document.getElementById("module1").value;

    tupuone.showLoading();
    $.getJSON('datasource/poet?name='+info, function (test) {
        tupuone.hideLoading();
        //处理实体信息
        //处理work信息
        var work = [];
        var workall=test.work.toString();
        work=workall.split(",");
        //处理经历信息
        var exp=[];
        exp=test.exp;
        // for (var e=0;e<exp.length;e++){
        //     console.log(exp[e]);
        // };
        //处理坐标信息
        var location=[];
        for (var m=25;m<=975;m+=50){
            for (var n=25;n<475;n+=50){
                location.push({
                        xposition:m,
                        yposition:n
                    }
                );
            }
        };
        for (var e=0;e<exp.length;e++){
            console.log(location[e]);
        };
        //汇总节点数据
        var nodeall=[];
        var suiji=200;
        for (var f=0;f<work.length;f++){
            var fx=Math.floor(Math.random()*suiji);
            var f1={
                name:work[f],
                x:location[fx].xposition,
                y:location[fx].yposition,
                value:1,
                itemStyle:{
                    normal:{
                        color:"#87c158"
                    }
                }
            }
            nodeall.push(f1);
            location.splice(fx-1,1);
            suiji--;
        }
        suiji=suiji-50;
        for (var g=0;g<exp.length;g++){
            var fy=Math.floor(Math.random()*suiji);
            // alert(fy);
            var f1={
                name:"经历"+(g+1),
                x:location[fy].xposition,
                y:location[fy].yposition,
                value:2,
                symbolSize:60,
                itemStyle:{
                    normal:{
                        color:"#cbe1f1"
                    }
                }
            }
            nodeall.push(f1);
            location.splice(fy-1,1);
            suiji--;
        }
        var fy=Math.floor(Math.random()*suiji);
        nodeall.push({
            name:info,
            x:location[fy].xposition,
            y:location[fy].yposition,
            value:0

        });
        var links=[];
        for (var l=nodeall.length;l>=0;l--){
            links.push({
                "source":nodeall.length-1,
                "target":l,
                "value":"has"
            });
        }


        option = {
            title: {
                text: info + '关系图谱',
                left: '5%'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
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
                    data:nodeall,
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
        tupuone.setOption(option);
        tupuone.on('click', function (param) {
            if(param.value==0){
                deleteall();
                var eme=document.getElementById('searchinfo');
                var emechild=createpoetinfo(test.name,test.born,test.death,test.zi,test.hao,test.identity,test.paibie);
                eme.appendChild(emechild);
            }else if(param.value==1){
                alert("作品");
            }else {
                alert("经历正在完善中，请等待");
            }
        })

    })
}
function moduleSearch2() {
    $("#tupuall").hide();
    $("#tupuone").show();
    var info=document.getElementById("module2").value;
    var info2=document.getElementById("module3").value;

    tupuone.showLoading();
    $.getJSON('datasource/poet?name='+info, function (test) {
        tupuone.hideLoading();
        //处理实体信息
        //处理work信息
        var work = [];
        if (document.getElementById("select2").value=="的作品？"){
            var workall=test.work.toString();
            work=workall.split(",");
        }
        //处理经历信息
        var exp=[];
        if (document.getElementById("select2").value=="的经历？"){
            exp=test.exp;
        }
        // for (var e=0;e<exp.length;e++){
        //     console.log(exp[e]);
        // };
        //处理坐标信息
        var location=[];
        for (var m=25;m<=975;m+=50){
            for (var n=25;n<475;n+=50){
                location.push({
                        xposition:m,
                        yposition:n
                    }
                );
            }
        };
        for (var e=0;e<exp.length;e++){
            console.log(location[e]);
        };
        //汇总节点数据
        var nodeall=[];
        var suiji=200;
        for (var f=0;f<work.length;f++){
            var fx=Math.floor(Math.random()*suiji);
            var f1={
                name:work[f],
                x:location[fx].xposition,
                y:location[fx].yposition,
                value:1,
                itemStyle:{
                    normal:{
                        color:"#87c158"
                    }
                }
            }
            nodeall.push(f1);
            location.splice(fx-1,1);
            suiji--;
        }
        suiji=suiji-50;
        for (var g=0;g<exp.length;g++){
            var fy=Math.floor(Math.random()*suiji);
            // alert(fy);
            var f1={
                name:"经历"+(g+1),
                x:location[fy].xposition,
                y:location[fy].yposition,
                value:2,
                symbolSize:60,
                itemStyle:{
                    normal:{
                        color:"#cbe1f1"
                    }
                }
            }
            nodeall.push(f1);
            location.splice(fy-1,1);
            suiji--;
        }
        var fy=Math.floor(Math.random()*suiji);
        nodeall.push({
            name:info,
            x:location[fy].xposition,
            y:location[fy].yposition,
            value:0

        });
        var links=[];
        for (var l=nodeall.length;l>=0;l--){
            links.push({
                "source":nodeall.length-1,
                "target":l,
                "value":"has"
            });
        }


        option = {
            title: {
                text: info + '关系图谱',
                left: '5%'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
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
                    data:nodeall,
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
        tupuone.setOption(option);
        tupuone.on('click', function (param) {
            if(param.value==0){
                deleteall();
                var eme=document.getElementById('info_description');
                var emechild=createpoetinfo(test.name,test.born,test.death,test.zi,test.hao,test.identity,test.paibie);
                eme.appendChild(emechild);
            }else if(param.value==1){
                alert("作品");
            }else {
                alert("经历正在完善中，请等待");
            }
        })

    })
}