var element = document.getElementById("tupuall");
var tupu = echarts.init(element);
var elementc = document.getElementById("tupuallc");
var tupuc = echarts.init(elementc);
var desinfo = [];
var links =[];
links.pop();
var namelist = [];
<!--获取图谱生成数据-->
$.getJSON('http://www.freekg.cn/poet/datasource/allpoet', function (json) {//这里获取诗人列表
    var num = json.length;
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
    $.getJSON('http://www.freekg.cn/poet/datasource/relation',function (rela) {
        console.log("下面输入获得的rela列表");
        console.log(rela);
        for (var b=0;b<rela.length;b++){
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

        option = {
            title: {
                text: ''
            },
            tooltip: {},
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 28,
                    roam: true,
                    draggable:true,
                    animation:false,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{b}',
                            textStyle:{
                                fontSize:10
                            }
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
                            value:node.ob
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
        optionc = {
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
                            color: '#ABC327',
                            // color: '#4a4564',
                            curveness: 0.5
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#6C890B'
                            // color:'#292638'
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
        tupuc.setOption(optionc);
        <!--定义鼠标事件-->
        // tupu.on('click', function (params) {
        //     $("#panel1").show();
        //     $("#panel2").show();
        //     if(params.dataType=="edge"){
        //         $("#reloadbutton").hide();
        //         $("#directinfo").hide();
        //     }else {
        //         $("#reloadbutton").show();
        //         $("#directinfo").show();
        //     }
        //     pareparam=params;
        //     document.getElementById("selectnode").innerText=pareparam.name;
        //     eConsole(params);
        // });

    });
});




