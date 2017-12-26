
var tupuall=document.getElementById("tupuall");
var tupu = echarts.init(tupuall);
//添加点击事件
// var ecConfig=require('echarts/config');
// tupu.on(ecConfig.EVENT.CLICK,eConsole());
tupu.on('click', function (params) {
    var city = params.name;
});
option = {
    title: {
        text: ''
    },
    // dataZoom: [
    //     {   // 这个dataZoom组件，默认控制x轴。
    //         type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    //         start: 10,      // 左边在 10% 的位置。
    //         end: 60         // 右边在 60% 的位置。
    //     }
    // ],
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
        {
            type: 'graph',
            coordinateSystem:'cartesian2d',
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
            data: [{
                name: '节点1',
                index:"jiuzheyang",
                x: 300,
                y: 300
            }, {
                index:2,
                name: '节点2',
                x: 800,
                y: 300
            }, {
                name: '节点3',
                x: 550,
                y: 100
            }, {
                name: '节点4',
                x: 550,
                y: 500
            }],
            // links: [],
            links: [{
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                    normal: {
                        show: true
                    }
                },
                lineStyle: {
                    normal: {
                        width: 5,
                        curveness: 0.2
                    }
                }
            }, {
                source: '节点2',
                target: '节点1',
                label: {
                    normal: {
                        show: true
                    }
                },
                lineStyle: {
                    normal: { curveness: 0.2 }
                }
            }, {
                source: '节点1',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点4'
            }, {
                source: '节点1',
                target: '节点4'
            }],
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
tupu.setOption(option,true);
function eConsole(param) {
    if (typeof param.seriesIndex == 'undefined') {
        return;
    }
    if (param.type == 'click') {
        alert(param.name);
    }
}

