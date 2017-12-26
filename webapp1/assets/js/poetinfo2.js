/**
 * Created by Yuero on 2017/10/28.
 */

console.log("shuchu");

$.getJSON('assets/json/poetexp_time3.json',function (data) {
    console.log("下面输出data");
    console.log(data.timePoet);
    var i,j;
    var $poetname = $("#poet_name_title").text();
    for(i=0;i<data.timePoet.length;i++) {  //循环遍历导入json数据数组
        if (data.timePoet[i]['name'] == $poetname){     //只导入该诗人的经历
            // console.log("李白出现次数："+data.timePoet[i]['name']);
            var poetthings = data.timePoet[i]['exp_series'];
            for(j=0;j<poetthings.length;j++) {        //遍历输出exp_series数组中的内容
                if(poetthings[j]['des'][0] == "）"&&poetthings[j]['des'][1] == "，") {
                    // poetthings[j]['des'] = poetthings[j]['des'].replace("）", "");    //对首字为"），"的进行删除
                    poetthings[j]['des'] = poetthings[j]['des'].replace("），", "");
                }
                if(poetthings[j]['des'][0] == "）") {
                    poetthings[j]['des'] = poetthings[j]['des'].replace("）", "");    //对首字为"）"的进行删除
                }
                if(poetthings[j]['des'][0] == ")"&&poetthings[j]['des'][1] == "，") {    //对首字为")，"的进行删除
                    poetthings[j]['des'] = poetthings[j]['des'].replace(")，", "");
                }
                // var litext = poetthings[j]['des'];
                // console.log("litext="+i+" "+j+" "+litext);

                // if(litext == "）"){
                //     data.timePoet[i]['exp_series'][j]['des']=data.timePoet[i]['exp_series'][j]['des'].replace(/（/," ");
                //     //     console.log("你好厉害啊"+j+litext);
                //     //     let desarray = data.timePoet[i]['exp_series'][j]['des'];
                //     //     delete desarray[0];
                //     // str=str.replace("),","")
                //
                //     //     data.timePoet[i]['exp_series'][j]['des'] = desarray;
                //     //     // data.timePoet[i]['exp_series'][j]['des'].text() -= ")";
                // }
                var $li = '<li>' + poetthings[j]['time']+'<br>'
                +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+poetthings[j]['des']+'</li>';
                //添加新的使人经历节点
                $("#poetthings").append($li)
                        .css({"margin-left":"20px","margin-top":"20px",
                            "margin-bottom":"20px","margin-right":"35px"});
                //对经历中出现的链接进行更改
                $("#poetthings a").each(function () {
                    let text = $(this).text();
                    $(this).attr("href","poetinfo.html?poetname="+text+"?uri=null");
                })
                // var text = $("#poetthings a").text();
                // console.log(text[0]);
                // $("#poetthings a").attr("href","poetinfo.html?poetname="+text+"?uri=null");
                // text = '';
            }
        }
    }
});


