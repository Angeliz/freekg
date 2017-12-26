/**
 * Created by Yuero on 2017/11/19.
 */

$(".poetplace").click(function () {
    $("#switchli li:gt(1)").removeClass("active");
    $("#switchli li:lt(1)").removeClass("active");
    $("#switchli li:eq(1)").addClass("active");
    var $newdiv ="<div class='row'><div class='col-md-8 panel panel-body' id='poetplace' style='width: 780px;height: 500px;margin-left: 20px'></div>" +  //;border-style:solid
                 "<div class='col-md-4'><div class='panel panel-body' id='showdes' style='margin-left:30px;margin-right: 20px'></div></div></div>";
    $("#staticinfobody").html(" ").append($newdiv);
    $("#showdes").hide();
        // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('poetplace'));
        //对于已有的地点进行经纬度匹配的相关数值
    var geoCoordMap = {
        '上海': [121.4648,31.2891],
        '东莞': [113.8953,22.901],
        '东营': [118.7073,37.5513],
        '中山': [113.4229,22.478],
        '临汾': [111.4783,36.1615],
        '临沂': [118.3118,35.2936],
        '丹东': [124.541,40.4242],
        '丽水': [119.5642,28.1854],
        '乌鲁木齐': [87.9236,43.5883],
        '佛山': [112.8955,23.1097],
        '保定': [115.0488,39.0948],
        '兰州': [103.5901,36.3043],
        '包头': [110.3467,41.4899],
        '北京': [116.4551,40.2539],
        '北海': [109.314,21.6211],
        '南京': [118.8062,31.9208],
        '南宁': [108.479,23.1152],
        '南昌': [116.0046,28.6633],
        '南通': [121.1023,32.1625],
        '厦门': [118.1689,24.6478],
        '台州': [121.1353,28.6688],
        '合肥': [117.29,32.0581],
        '呼和浩特': [111.4124,40.4901],
        '咸阳': [108.4131,34.8706],
        '哈尔滨': [127.9688,45.368],
        '唐山': [118.4766,39.6826],
        '嘉兴': [120.9155,30.6354],
        '大同': [113.7854,39.8035],
        '大连': [122.2229,39.4409],
        '天津': [117.4219,39.4189],
        '太原': [112.3352,37.9413],
        '威海': [121.9482,37.1393],
        '宁波': [121.5967,29.6466],
        '宝鸡': [107.1826,34.3433],
        '宿迁': [118.5535,33.7775],
        '常州': [119.4543,31.5582],
        '广州': [113.5107,23.2196],
        '廊坊': [116.521,39.0509],
        '延安': [109.1052,36.4252],
        '张家口': [115.1477,40.8527],
        '徐州': [117.5208,34.3268],
        '德州': [116.6858,37.2107],
        '惠州': [114.6204,23.1647],
        '成都': [103.9526,30.7617],
        '扬州': [119.4653,32.8162],
        '承德': [117.5757,41.4075],
        '拉萨': [91.1865,30.1465],
        '无锡': [120.3442,31.5527],
        '日照': [119.2786,35.5023],
        '昆明': [102.9199,25.4663],
        '杭州': [119.5313,29.8773],
        '枣庄': [117.323,34.8926],
        '柳州': [109.3799,24.9774],
        '株洲': [113.5327,27.0319],
        '武汉': [114.3896,30.6628],
        '汕头': [117.1692,23.3405],
        '江门': [112.6318,22.1484],
        '沈阳': [123.1238,42.1216],
        '沧州': [116.8286,38.2104],
        '河源': [114.917,23.9722],
        '泉州': [118.3228,25.1147],
        '泰安': [117.0264,36.0516],
        '泰州': [120.0586,32.5525],
        '济南': [117.1582,36.8701],
        '济宁': [116.8286,35.3375],
        '海口': [110.3893,19.8516],
        '淄博': [118.0371,36.6064],
        '淮安': [118.927,33.4039],
        '深圳': [114.5435,22.5439],
        '清远': [112.9175,24.3292],
        '温州': [120.498,27.8119],
        '渭南': [109.7864,35.0299],
        '湖州': [119.8608,30.7782],
        '湘潭': [112.5439,27.7075],
        '滨州': [117.8174,37.4963],
        '潍坊': [119.0918,36.524],
        '烟台': [120.7397,37.5128],
        '玉溪': [101.9312,23.8898],
        '珠海': [113.7305,22.1155],
        '盐城': [120.2234,33.5577],
        '盘锦': [121.9482,41.0449],
        '石家庄': [114.4995,38.1006],
        '福州': [119.4543,25.9222],
        '秦皇岛': [119.2126,40.0232],
        '绍兴': [120.564,29.7565],
        '聊城': [115.9167,36.4032],
        '肇庆': [112.1265,23.5822],
        '舟山': [122.2559,30.2234],
        '苏州': [120.6519,31.3989],
        '莱芜': [117.6526,36.2714],
        '菏泽': [115.6201,35.2057],
        '营口': [122.4316,40.4297],
        '葫芦岛': [120.1575,40.578],
        '衡水': [115.8838,37.7161],
        '衢州': [118.6853,28.8666],
        '西宁': [101.4038,36.8207],
        '西安': [109.1162,34.2004],
        '贵阳': [106.6992,26.7682],
        '连云港': [119.1248,34.552],
        '邢台': [114.8071,37.2821],
        '邯郸': [114.4775,36.535],
        '郑州': [113.4668,34.6234],
        '鄂尔多斯': [108.9734,39.2487],
        '重庆': [107.7539,30.1904],
        '金华': [120.0037,29.1028],
        '铜川': [109.0393,35.1947],
        '银川': [106.3586,38.1775],
        '镇江': [119.4763,31.9702],
        '长春': [125.8154,44.2584],
        '长沙': [113.0823,28.2568],
        '长治': [112.8625,36.4746],
        '阳泉': [113.4778,38.0951],
        '青岛': [120.4651,36.3373],
        '韶关': [113.7964,24.7028],
        //自行添加的新的经纬度
        '甘肃天水':[105.69,34.60],
        '洛阳':[112.16,34.32],
        '四川大匡山':[104.72,31.75],
        '金陵':[118.49,31.56],
        '安陆':[113.69,31.25]
    };

        //获取json格式标准的数据，所爬取数据必须为该样式
    // $.getJSON('assets/json/time_place.json',function (data) {
    //     console.log(data.poetTimePlace);
    //     data.poetTimePlace.forEach(function(item){
    //         console.log(item.timePlace);
    //         item.timePlace.forEach(function (shuzu) {
    //             // console.log(shuzu.place)
    //         })
    //     });
    //     //获取echarts图的位置
    //     var myChart = echarts.init(document.getElementById('poetplace'));
    //
    //
    //     var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    //     //对echarts图中的内容进行设置
    //     var convertData = function (data) {
    //         var res = [];
    //         for (var i = 0; i < data.length-1; i++) {
    //             console.log(data[i].place);
    //             var fromCoord = geoCoordMap[data[i].place];
    //             var toCoord = geoCoordMap[data[i+1].place];
    //             if (fromCoord && toCoord) {
    //                 res.push({
    //                     fromName: data[i].place,
    //                     toName: data[i+1].place,
    //                     coords: [fromCoord, toCoord],
    //                     value:[data[i].time,data[i+1].time,data[i+1].des]
    //                 });
    //             }
    //         }
    //         return res;
    //     };
    //
    //     var color = ['#009fe8', '#8a2be2'];
    //     var series = [];
    //     var pn = poetname;
    //     data.poetTimePlace.forEach(function (item, i) {
    //         //判断是否为当前诗人的诗人轨迹，只显示该诗人轨迹
    //         if(pn==item.poetname){
    //         series.push(
    //             // {
    //             //     name: item.poetname,
    //             //     type: 'lines',
    //             //     zlevel: 1,
    //             //     effect: {
    //             //         show: true,
    //             //         period: 6,
    //             //         trailLength: 0.7,
    //             //         color: '#fff',
    //             //         symbolSize: 4
    //             //     },
    //             //     lineStyle: {
    //             //         normal: {
    //             //             color: color[i],
    //             //             width: 0,
    //             //             curveness: 0.2
    //             //         }
    //             //     },
    //             //     data: convertData(item.timePlace)
    //             // },
    //             {
    //                 name: item.poetname,
    //                 type: 'lines',
    //                 zlevel: 2,
    //                 symbol: ['none', 'arrow'],
    //                 symbolSize: 10,
    //                 effect: {
    //                     show: true,
    //                     period: 6,
    //                     trailLength: 0,
    //                     symbol: 'arrow',
    //                     symbolSize: 10
    //                 },
    //                 lineStyle: {
    //                     normal: {
    //                         color: color[i],
    //                         width: 1,
    //                         opacity: 0.6,
    //                         curveness: 0.2
    //                     }
    //                 },
    //                 data: convertData(item.timePlace)
    //             },
    //             {
    //                 name: item.poetname,
    //                 type: 'effectScatter',
    //                 coordinateSystem: 'geo',
    //                 zlevel: 2,
    //                 rippleEffect: {
    //                     brushType: 'stroke'
    //                 },
    //                 label: {
    //                     normal: {
    //                         show: true,
    //                         position: 'right',
    //                         formatter: '{b}'
    //                     }
    //                 },
    //                 symbolSize:12,
    //                     /* function (val) {
    //                      return val[2] / 8;
    //                      },*/
    //                 itemStyle: {
    //                     normal: {
    //                         color: color[i]
    //                     }
    //                 },
    //                 data: item.timePlace.map(function (dataItem) {
    //                     return {
    //                         name: dataItem.place,
    //                         value: geoCoordMap[dataItem.place].concat([dataItem.time]),
    //                             //.concat([dataItem.des])
    //                         des:dataItem.des
    //                     };
    //                 })
    //             });
    //     }
    //     });
    //
    //     option = {
    //         // backgroundColor: '#404a59',
    //         title : {
    //             text: poetname,
    //             // subtext: '数据纯属虚构',
    //             left: 'center',
    //             textStyle : {
    //                 color: '#000'
    //             }
    //         },
    //         tooltip : {
    //             trigger: 'item'
    //             // show:false
    //         },
    //         legend: {
    //             orient: 'vertical',
    //             top: 'bottom',
    //             left: 'right',
    //             data:[poetname],
    //             textStyle: {
    //                 color: '#000'
    //             },
    //             selectedMode: 'single'
    //         },
    //         // {
    //         //     type: 'map',
    //         //     mapType: 'china',
    //         //     roam:true,
    //         //     label: {
    //         //         normal: {
    //         //             show: true,//显示省份标签
    //         //             textStyle: {color: "#c71585"}//省份标签字体颜色
    //         //         },
    //         //         emphasis: {//对应的鼠标悬浮效果
    //         //             show: true,
    //         //             textStyle: {color: "#800080"}
    //         //         }
    //         //     },
    //         //     itemStyle: {
    //         //         normal: {
    //         //             borderWidth: .5,//区域边框宽度
    //         //             borderColor: '#009fe8',//区域边框颜色
    //         //             areaColor: "#ffefd5",//区域颜色
    //         //         },
    //         //         emphasis: {
    //         //             borderWidth: .5,
    //         //             borderColor: '#4b0082',
    //         //             areaColor: "#ffdead",
    //         //         }
    //         //     }
    //         // },
    //         geo: {
    //             map: 'china',
    //             label: {
    //                 normal:{
    //                     show: true,//显示省份标签
    //                     textStyle: {color: "#000"}//省份标签字体颜色
    //                 },
    //                 emphasis: {
    //                     show: true,
    //                     textStyle: {color:"#800080"}
    //                 }
    //             },
    //             roam: true,
    //             itemStyle: {
    //                 normal: {
    //                     borderColor: '#b4a572',//区域边框颜色
    //                     areaColor: "#f5f3f0",//区域颜色
    //                     // areaColor: '#323c48',
    //                     // borderColor: '#404a59'
    //                 },
    //                 emphasis: {
    //                     areaColor: '#ffdead'
    //                 }
    //             }
    //         },
    //         series: series
    //     };
    //     myChart.setOption(option);
    //     myChart.on('click',function (params) {
    //         console.log(params);
    //         if(params.componentSubType=="lines"){
    //             // for(var i=0;data.poetTimePlace.poetname==params.seriesName&&data.poetTimePlace.timePlace[i].place==params.data.toName;i++){
    //             console.log(params.value);
    //             var $showdes = "<div class='panel-heading panel-success'><h6 class='panel-title'>诗人名称：<button class='btn btn-info'>"+
    //                             params.seriesName+"</button></h6></div>"+
    //                             "<div class='panel-body'><h6>诗人经历：</h6>" +
    //                             "<h6>时间：" + params.value[0] + "--"+ params.value[1] +"</h6>" +
    //                             "<h6>轨迹：<a>"+params.seriesName+"</a>从<a>"+params.data.fromName+"</a>--><a>"+params.data.toName+"</a></h6>"+
    //                             "<h6>经历描述：</h6>"+params.value[2]+"</div> ";
    //             //添加点击轨迹线后的信息内容
    //             $("#showdes").show().html("").append($showdes);
    //         }
    //         if(params.componentSubType=="effectScatter"){
    //             console.log(params.name);
    //             console.log(params.value[2]);
    //             var $showdes = "<div class='panel-heading panel-success'><h6 class='panel-title'>诗人名称：<button class='btn btn-info'>"+
    //                 params.seriesName+"</button></h6></div>"+
    //                 "<div class='panel-body'><h6>诗人经历：</h6>" +
    //                 "<h6>时间：" + params.value[2] +"</h6>" +
    //                 "<h6>轨迹：<a>"+params.seriesName+"</a>在<a>"+params.name+"</a></h6>"+
    //                 "<h6>经历描述：</h6>"+params.data.des+"</div> ";
    //             //显示panel，添加点击某个地点后的内容
    //             $("#showdes").show().html("").append($showdes);
    //         }
    //     })
    // });

    $.getJSON('assets/json/time_place.json', function (data) {
        console.log(data.poetTimePlace);
        data.poetTimePlace.forEach(function (item) {
            console.log(item.timePlace);
            item.timePlace.forEach(function (shuzu) {
                console.log(shuzu.time)
            })
        });
        // //获取echarts图的位置
        // var myChart = echarts.init(document.getElementById('poetplace'));

        //对echarts图中的内容进行设置
        var newconvertData = function (data,i) {
            var res = [];
            console.log(data[i].place);
            var fromCoord = geoCoordMap[data[i].place];
            var toCoord = geoCoordMap[data[i + 1].place];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: data[i].place,
                    toName: data[i + 1].place,
                    coords: [fromCoord, toCoord],
                    value: [data[i].time, data[i + 1].time, data[i + 1].des]
                });
            }
            console.log(res);
            return res;
        };
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length-1; i++) {
                console.log(data[i].place);
                var fromCoord = geoCoordMap[data[i].place];
                var toCoord = geoCoordMap[data[i+1].place];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: data[i].place,
                        toName: data[i+1].place,
                        coords: [fromCoord, toCoord],
                        value:[data[i].time,data[i+1].time,data[i+1].des]
                    });
                }
            }
            return res;
        };
        var geoitem = function (data,i) {
            data.map(function () {
                var res =[];
                var fromCoord = geoCoordMap[data[i].place];
                var toCoord = geoCoordMap[data[i + 1].place];
                if (fromCoord && toCoord) {
                    res.push({
                        name:data[i].place,
                        value:fromCoord.concat([data[i].time])
                    });
                    res.push({
                        name:data[i+1].place,
                        value:toCoord.concat([data[i+1].time])
                    });
                    console.log(res);
                    return res;
                }
            })
        };

        var color = ['#009fe8', '#f00'];
        var series = [];
        var series0 =[];
        var options = [];
        var pn = poetname;
        var years =[];
        data.poetTimePlace.forEach(function (item, i) {
            //判断是否为当前诗人的诗人轨迹，只显示该诗人轨迹
            if (pn == item.poetname) {
                series0.push(
                    // {
                    //     name: item.poetname,
                    //     type: 'lines',
                    //     zlevel: 1,
                    //     effect: {
                    //         show: true,
                    //         period: 6,
                    //         trailLength: 0.7,
                    //         color: '#fff',
                    //         symbolSize: 4
                    //     },
                    //     lineStyle: {
                    //         normal: {
                    //             color: color[i],
                    //             width: 0,
                    //             curveness: 0.2
                    //         }
                    //     },
                    //     data: convertData(item.timePlace)
                    // },
                    {
                        name: '全部轨迹',
                        type: 'lines',
                        zlevel: 2,
                        symbol: ['none', 'circle'],
                        symbolSize: 10,
                        effect: {
                            show: false,
                            period: 6,
                            trailLength: 0,
                            symbol: 'circle',
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item.timePlace)
                    },
                    {
                        name: item.poetname,
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize:12,
                        /* function (val) {
                         return val[2] / 8;
                         },*/
                        itemStyle: {
                            normal: {
                                color: color[i]
                            }
                        },
                        data: item.timePlace.map(function (dataItem) {
                            return {
                                name: dataItem.place,
                                value: geoCoordMap[dataItem.place].concat([dataItem.time]),
                                //.concat([dataItem.des])
                                des:dataItem.des
                            };
                        })
                    });
                item.timePlace.forEach(function (shuju) {
                    var x = shuju.time.length-1;
                    console.log(x);
                    if(shuju.time[x]=="年"){
                        shuju.time =shuju.time.replace("年","");
                    }
                    years.push(
                        shuju.time
                    );
                });
                for(var x=0;x<item.timePlace.length-1;x++){
                    series = [];
                    series.push(
                        // {
                        //     name: item.poetname,
                        //     type: 'lines',
                        //     zlevel: 1,
                        //     effect: {
                        //         show: true,
                        //         period: 6,
                        //         trailLength: 0.7,
                        //         color: '#fff',
                        //         symbolSize: 4
                        //     },
                        //     lineStyle: {
                        //         normal: {
                        //             color: color[i],
                        //             width: 0,
                        //             curveness: 0.2
                        //         }
                        //     },
                        //     data: convertData(item.timePlace)
                        // },
                        {
                            name: item.poetname,
                            type: 'lines',
                            zlevel: 4,
                            symbol: ['none'],
                            symbolSize: 10,
                            effect: {
                                show: true,
                                period: 2,
                                trailLength: 0,
                                symbol: 'arrow',
                                symbolSize: 10
                            },
                            lineStyle: {
                                normal: {
                                    color: color[1],
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: newconvertData(item.timePlace,x)
                        }
                    );
                    options.push(
                        {
                            title:{text:years[x]+"年"+poetname},
                            series:series,
                        }
                    );
                }
            }
        });
        console.log(options);

        option = {
            // backgroundColor: '#404a59',
            baseOption: {
                timeline: {
                    // y: 0,
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 2,
                    playInterval: 2000,//播放的速率
                    // controlStyle: {
                    //     position: 'left'
                    // },
                    data: years,
                    label: {
                        formatter : function(s) {
                            return (new Date(s)).getFullYear()+"年";
                        }
                    }
                },
                // title: {
                //     text: poetname,
                //     // subtext: '数据纯属虚构',
                //     left: 'center',
                //     textStyle: {
                //         color: '#000'
                //     }
                // },
                tooltip: {
                    trigger: 'item'
                    // show:false
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data: [poetname,'全部轨迹'],
                    textStyle: {
                        color: '#000'
                    },
                    selectedMode: 'multiple'
                },
                // {
                //     type: 'map',
                //     mapType: 'china',
                //     roam:true,
                //     label: {
                //         normal: {
                //             show: true,//显示省份标签
                //             textStyle: {color: "#c71585"}//省份标签字体颜色
                //         },
                //         emphasis: {//对应的鼠标悬浮效果
                //             show: true,
                //             textStyle: {color: "#800080"}
                //         }
                //     },
                //     itemStyle: {
                //         normal: {
                //             borderWidth: .5,//区域边框宽度
                //             borderColor: '#009fe8',//区域边框颜色
                //             areaColor: "#ffefd5",//区域颜色
                //         },
                //         emphasis: {
                //             borderWidth: .5,
                //             borderColor: '#4b0082',
                //             areaColor: "#ffdead",
                //         }
                //     }
                // },
                geo: {
                    map: 'china',
                    label: {
                        normal: {
                            show: true,//显示省份标签
                            textStyle: {color: "#000"}//省份标签字体颜色
                        },
                        emphasis: {
                            show: true,
                            textStyle: {color: "#800080"}
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#b4a572',//区域边框颜色
                            areaColor: "#f5f3f0",//区域颜色
                            // areaColor: '#323c48',
                            // borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#ffdead'
                        }
                    }
                },
                series: series0
            },
            options:options,
        };
        myChart.setOption(option);
        myChart.on('click',function (params) {
            console.log(params);
            if(params.componentSubType=="lines"){
                // for(var i=0;data.poetTimePlace.poetname==params.seriesName&&data.poetTimePlace.timePlace[i].place==params.data.toName;i++){
                console.log(params.value);
                var $showdes = "<div class='panel-heading panel-success'><h6 class='panel-title'>诗人名称：<button class='btn btn-info'>"+
                    params.seriesName+"</button></h6></div>"+
                    "<div class='panel-body'><h6>诗人经历：</h6>" +
                    "<h6>时间：" + params.value[0] + "--"+ params.value[1] +"</h6>" +
                    "<h6>轨迹：<a>"+params.seriesName+"</a>从<a>"+params.data.fromName+"</a>--><a>"+params.data.toName+"</a></h6>"+
                    "<h6>经历描述：</h6>"+params.value[2]+"</div> ";
                //添加点击轨迹线后的信息内容
                $("#showdes").show().html("").append($showdes);
            }
            if(params.componentSubType=="effectScatter"){
                console.log(params.name);
                console.log(params.value[2]);
                var $showdes = "<div class='panel-heading panel-success'><h6 class='panel-title'>诗人名称：<button class='btn btn-info'>"+
                    params.seriesName+"</button></h6></div>"+
                    "<div class='panel-body'><h6>诗人经历：</h6>" +
                    "<h6>时间：" + params.value[2] +"</h6>" +
                    "<h6>轨迹：<a>"+params.seriesName+"</a>在<a>"+params.name+"</a></h6>"+
                    "<h6>经历描述：</h6>"+params.data.des+"</div> ";
                //显示panel，添加点击某个地点后的内容
                $("#showdes").show().html("").append($showdes);
            }
        })
    });
    return false;//阻止页面跳转
});

$(".poetinfo").click(function () {
    var thisURL = document.URL;
    var  getval =thisURL.split('?')[1];
    var getval2=thisURL.split('?')[2];
    var poetname= decodeURIComponent(getval.split("=")[1]);//将url字符解码为utf8编码后的诗人姓名
    var poeturi=decodeURIComponent(getval2.split("=")[1]);//将url字符解码为utf8之后的诗人uri
    console.log(poetname);
    // window.location.href="poetinfo.htm"+"?poetname="+poetname;
    //当点击静态消息时让页面跳转至想要的地方
    window.location.assign("poetinfo.html?poetname="+poetname+"?uri="+poeturi);
    //+pareparam.data.value
    //跳转到诗人主页
    return false;
});
