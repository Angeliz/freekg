/**
 * Created by 67 on 2018/1/18.
 * 诗歌目录图谱
 */
var element = document.getElementById("tupuall");
var tupu = echarts.init(element);
var namelist = [];
var data={
    "name": "诗歌",
    "children": namelist
};
<!--获取图谱生成数据-->

    $.getJSON('http://www.freekg.cn/poet/datasource/allpoet', function (json) {//这里获取诗人列表
            var num = JSONLength(json);
            var work=[];
            $.ajaxSettings.async = false;
            for(var i=0; i<num; i++){
                $.getJSON('http://www.freekg.cn/poet/datasource/work?poeturi='+json[i].id,function (rela) {
                    var nums=JSONLength(rela);
                    if (nums>50){
                        nums=50;
                    }
                    for(var j=0; j<nums; j++){
                        work.push(
                            {
                                "name": rela[j].name
                            }
                        )
                    }
                    namelist.push(
                        {
                            "name": json[i].name,
                            "children": work
                        }
                    );
                    work=[];
                });
            }
        }
);
// $.ajaxSettings.async = true;
$(document).ajaxStop(function () {
    option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: [data],

                top: '18%',
                bottom: '14%',

                layout: 'radial',

                symbol: 'emptyCircle',

                // symbolSize: 7,

                initialTreeDepth: 1

                // animationDurationUpdate: 750

            }
        ]
    };
    tupu.setOption(option);
});

function JSONLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};




