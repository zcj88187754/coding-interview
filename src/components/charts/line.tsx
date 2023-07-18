import React, { Component } from "react";
import * as echarts from 'echarts';

class LineChart extends Component {
  constructor(props){
    super(props);
    this.el = React.createRef()
  }
  
  state = {
    chart: null,
  };

  componentDidMount() {
    this.initChart()
    window.addEventListener("resize", () => this.resize());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sidebarCollapsed !== this.props.sidebarCollapsed ||
      this.props.series !== prevProps.series ||
      this.props.xdata !== prevProps.xdata
      ) {
      this.update()
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  update() {
    this.setOptions();
    this.resize();
  }

  resize() {
    const chart = this.state.chart;
    chart.resize()
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }

  setOptions() {
    this.state.chart.setOption({
      backgroundColor: "#394056",
      title: {
        top: 20,
        text: "price-time",
        textStyle: {
          fontSize: 18,
          color: "#F1F1F3",
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617B",
          },
        },
      },
      legend: {
        top: 20,
        icon: "rect",
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: this.props.series.map(item=>{
          return item.name
        }),
        right: "4%",
        textStyle: {
          fontSize: 12,
          color: "#F1F1F3",
        },
      },
      grid: {
        top: 100,
        left: "2%",
        right: "2%",
        bottom: "2%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#57617B",
            }
          },
          data: this.props.xdata,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "$",
          min: function (value) {
            return Math.floor(value.min - 100)
          },
          max: function (value) {
            return Math.ceil(value.max + 100)
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#57617B",
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
          splitLine: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
      ],
      series: this.props.series,
    }, true);
  }

  initChart() {
    if (!this.el.current) return;
    this.setState({ chart: echarts.init(this.el.current) }, () => {
      this.setOptions();
    });
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%", overflow: 'hidden' }}>
        <div
          style={{ width: "100%", height: "100%" }}
          ref={ this.el }
        >
        </div>
      </div>
      
    );
  }
}

export default LineChart
