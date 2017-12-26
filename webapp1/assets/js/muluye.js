/**
 * Created by Yuero on 2017/11/29.
 */

$(function () {
    var myChart = echarts.init(document.getElementById('mulutu'));
    myChart.showLoading();
    $.get('assets/json/mulu.json', function (data) {
        myChart.hideLoading();

        //使树的显示到第二层，去掉后变为显示三层
        echarts.util.each(data.children, function (datum) {
            datum.collapsed = true;
        });

        myChart.setOption(option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
                    name:'',
                    data: [data],

                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',

                    symbolSize: 20,

                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 13
                        }
                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });
    });
    myChart.on('click',function (params) {
        if(params.value){
            window.location.assign(params.value);
        }
    })
});
