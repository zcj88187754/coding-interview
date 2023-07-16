# Coding Interview

## Summary

[Figma Placeholder]

As shown in the above figure, a two-column layout Data Portal needs to be implemented.

The data for this Data Portal will be obtained through a WebSocket connection, which will provide a real-time, dynamically updated stream of price data with time as the dimension.

The left side will display a dynamically updated line chart, with the vertical axis representing prices and the horizontal axis representing time. This repository provides the echarts-for-react library as a chart rendering tool. However, you can also choose other chart rendering libraries according to your preference.

On the right side, there will be a sidebar that displays price information from the past 10 minutes. By clicking the highlight button next to each price entry, the corresponding price node on the left side line chart, representing the selected time, will be highlighted and detailed tooltips will be displayed.

## Dependencies

- React@^18.2.0
- Ant Design@^4.23.6
- echarts-for-react@^3.0.2


_If you are not familiar with **React**, you can replace it with a **Vue** development environment._

_Also, you can choose other component libraries and chart libraries besides **Ant design** and **echarts-for-react**._

_However, **TypeScript** is a mandatory requirement._


## Data endpoint

url: wss://trading-server-staging.azurewebsites.net/interview-price

response:
```
{
    price_list: [
        { price: 100, data: '2023-07-16' }
        { price: 100, data: '2023-07-16' }
        { price: 100, data: '2023-07-16' }
        ...
    ]
}
```

