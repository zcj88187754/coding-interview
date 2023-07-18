import LineChart from '@/components/charts/line';
import './index.css';
import MyWebSocket from '@/utils/websocket.js';
import { useEffect, useState, useRef } from 'react';
import ViewPanel from './components/ViewPanel';
import { dateToFormat } from '../utils/tools';

function getSerieConfig (name) {
  return {
    name: name,
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      },
    },
    data: []
  }
}

let preStamp = 0

let xdataCache = []

let seriesCache = []

let tableDateCache = []

let socket = null

function Portal() {
  // implement the Portal here
  const El = useRef(null);

  const [xdata, setXdata] = useState([])

  const [series, setSeries] = useState([])

  const [tableDate, setTableDate ] = useState([])

  useEffect(() => {
      if (!socket) {
        socket = new MyWebSocket('wss://trading-server-staging.azurewebsites.net/datafeed/subscribe/kline', ()=>{
        socket.sendMsg({
          "exchange":"binance",
          "market":"future",
          "symbol":"BTC/USDT",
          "resolution":"1m"
        })
      })
      socket.onMsg(data => {
        data = JSON.parse(data)
        let date =  new Date();
        let stamp = date.getTime();
        if (stamp - preStamp > 1000 * 60) {
          preStamp = stamp;
          setChart(data, date)
          tableDateCache.push({
            ...data,
            key: stamp
          }) 
          setTableDate([...tableDateCache])
        }
      })
    }

    return () => {
      if (socket) {
        socket.close();
      }
    }
  },[])

  function setChart(data, date){
    let format = dateToFormat(date);
    // 设置X轴
    xdataCache = [...xdataCache, format]
    setXdata(xdataCache);
    let currentSeries = [];
    if (seriesCache.length === 0) {
      let low = getSerieConfig('low-price');
      low.data = [data.low];
      let high = getSerieConfig('high-price');
      high.data = [data.high];
      let open = getSerieConfig('open-price');
      open.data = [data.open];
      let close = getSerieConfig('close-price');
      close.data = [data.close];
      currentSeries = [low, high, open, close];
    } else {
      currentSeries = JSON.parse(JSON.stringify(seriesCache));
      currentSeries.forEach(item => {
        if (item.name === 'high-price' ) {
          item.data.push(data.high);
        } else if (item.name === 'low-price') {
          item.data.push(data.low + 100);
        }else if (item.name === 'open-price') {
          item.data.push(data.open + 100);
        }else if (item.name === 'close-price') {
          item.data.push(data.close + 100);
        }
      })
    }
    seriesCache = currentSeries
    setSeries(seriesCache);
  }
  function itemClick (node) {
    var index = 0;
    for (var i = 0; i < tableDateCache.length; i++) {
      if (tableDateCache[i].key == node.key) {
        index = i
      }
    }
    El.current.state.chart.dispatchAction({         
      type: 'showTip',
      seriesIndex: 1,
      dataIndex: index
    })
    setTimeout(() => {
      El.current.state.chart.dispatchAction({
          type: 'hideTip'
        });
      }, 3000);
  }
  
  return (
    <div className='portal-box'>
      <div className='chart-box'>
        <LineChart ref={El} xdata={ xdata } series={ series }></LineChart>
      </div>
      <div className='data-view'>
        <ViewPanel data={ tableDate } itemClick={ itemClick }></ViewPanel>
      </div>
    </div>
  )
}

export default Portal;
