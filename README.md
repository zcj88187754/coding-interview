# Coding Interview

## Summary

[Figma Placeholder]

As depicted in the diagram above, our goal is to create a dual-column layout for a Data Portal.

Data for this portal will be sourced through a WebSocket connection. This will deliver a stream of price data that updates in real-time and is structured around time as a dimension.

The left column will feature a dynamically updated line chart. The vertical axis denotes price, while the horizontal axis signifies time. This project provides the 'echarts-for-react' library for chart rendering. However, your preferred chart rendering library can be employed as an alternative.

In contrast, the right column is reserved for a sidebar that showcases the most recent price data received from the WebSocket connection. This data will be consistently updated in real time. By selecting the highlight button adjacent to each price entry, the corresponding price node on the left-side line chart will be emphasized, thereby displaying a detailed tooltip for the chosen time frame.

In addition to these, the interface will include buttons to disconnect or reestablish the WebSocket connection at the user's discretion.

## Dependencies
React@^18.2.0

Ant Design@^4.23.6

echarts-for-react@^3.0.2

Feel free to utilize other component libraries and chart libraries apart from Ant Design and echarts-for-react if desired.

However, the usage of **React 18 and TypeScript** is a prerequisite for this project.

## Data Endpoint
URL: wss://trading-server-staging.azurewebsites.net/datafeed/subscribe/kline

To connect and send a message, use:
```
{"exchange":"binance","market":"future","symbol":"BTC/USDT","resolution":"1m"}
```

A sample response would be:
```
{
"time": 1689476400000,
"open": 30239.2,
"high": 30248.0,
"low": 30209.1,
"close": 30209.1,
"volume": 418.419
}
```

