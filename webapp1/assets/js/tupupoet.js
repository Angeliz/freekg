/**
 * Created by 67 on 2018/1/18.
 * 诗人目录图谱
 **/
var element = document.getElementById("tupuall");
var tupu = echarts.init(element);
var one =[];
var two =[];
var three =[];
var four =[];
var years=[
    {
        name: "初唐",
        children: one
    },
    {
        name: "盛唐",
        children: two
    },
    {
        name: "中唐",
        children: three
    },
    {
        name: "晚唐",
        children: four
    }
];
var data={
    "name": "诗人",
    "children": years
};
$.getJSON('http://www.freekg.cn/poet/datasource/allpoet', function (json) {//这里获取诗人列表
        var num = json.length;
        for(var i=0; i<num; i++){
            if(json[i].born>617&&json[i].born<712){
                one.push(
                    {
                        name: json[i].name
                    }
                );
            }
            if(json[i].born>711&&json[i].born<762){
                two.push(
                    {
                        name: json[i].name
                    }
                );
            }
            if(json[i].born>761&&json[i].born<827){
                three.push(
                    {
                        name: json[i].name
                    }
                );
            }
            if(json[i].born>826&&json[i].born<860){
                four.push(
                    {
                        name: json[i].name
                    }
                );
            }
        }
    option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series:[
            {
                type: 'tree',

                data: [data],

                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',

                symbol: 'emptyCircle',

                orient: 'vertical',

                expandAndCollapse: true,

                label: {
                    normal: {
                        position: 'top',
                        rotate: -90,
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 10
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'bottom',
                            rotate: -90,
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                animationDurationUpdate: 750
            }
        ]
    };
    tupu.setOption(option);
    }
);
