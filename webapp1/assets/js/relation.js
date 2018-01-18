var myChart=echarts.init(document.getElementById('data-shower'));
  myChart.showLoading();
  $.getJSON('assets/json/hello.json', function (json) {
      myChart.hideLoading();
      myChart.setOption(option = {
          title: {
              text: ''
          },
          xAxis: {
              type : 'value',
              name:'时间',
              nameLocation:'start'
          },
          yAxis: {
              type : 'value'
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
              {
                  type: 'graph',
                  layout: 'none',
                  // coordinateSystem: 'cartesian2d',
                  // progressiveThreshold: 700,
                  data: json.nodes.map(function (node) {
                      return {
                          x: node.x,
                          y: node.y,
                          id: node.id,
                          name: node.label,
                          symbolSize: node.size,
                          itemStyle: {
                              normal: {
                                  color: node.color
                              }
                          }
                      };
                  }),
                  edges: json.edges.map(function (edge) {
                      return {
                          source: edge.sourceID,
                          target: edge.targetID
                      };
                  }),
                  label: {
                      emphasis: {
                          position: 'right',
                          show: true
                      }
                  },
                  roam: true,
                  focusNodeAdjacency: true,
                  lineStyle: {
                      normal: {
                          width: 0.5,
                          curveness: 0.3,
                          opacity: 0.7
                      }
                  }
              }
          ]
      }, true);
  });