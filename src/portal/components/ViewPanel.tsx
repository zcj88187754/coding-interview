import { Button, Table } from 'antd';
import React, { Component } from "react";

// const columns = [
//   {
//     title: 'open',
//     dataIndex: 'open'
//   },
//   {
//     title: 'close',
//     dataIndex: 'close'
//   },
//   {
//     title: 'high',
//     dataIndex: 'high'
//   },
//   {
//     title: 'low',
//     dataIndex: 'low'
//   },
//   {
//     title: 'volume',
//     dataIndex: 'volume'
//   },
//   {
//     title: 'action',
//     render: (row)=>{
//       return (
//         <Button 
//           type="primary"
//           onClick={
//             ()=>{
//               this.props.itemClick(row)
//             }
//           }
//           >details</Button>
//       )
//     }
//   }
// ];

class ViewPanel extends Component {
    state = {
      height: 240,
      columns: [
        {
          title: 'open',
          dataIndex: 'open'
        },
        {
          title: 'close',
          dataIndex: 'close'
        },
        {
          title: 'high',
          dataIndex: 'high'
        },
        {
          title: 'low',
          dataIndex: 'low'
        },
        {
          title: 'volume',
          dataIndex: 'volume'
        },
        {
          title: 'action',
          render: (row)=>{
            return (
              <Button 
                type="primary"
                onClick={
                  ()=>{
                    this.props.itemClick(row)
                  }
                }
                >details</Button>
            )
          }
        }
      ]
    };
    static defaultProps = {
      data: []
    }
    constructor(props){
      super(props)
      this.el = React.createRef()
    }
    componentDidMount() {
      let rect =  this.el.current.getBoundingClientRect()
      this.setState({
        height: rect.height - 50
      })
    }
    render(){
      return(
        <div ref={ this.el } className='view-panel'>
          <Table 
            pagination={false}
            dataSource={this.props.data}
            scroll={{
              y: this.state.height,
            }}
            rowKey={ row=>row.key }
            columns={this.state.columns}></Table>
        </div>
      )
    } 
}
  
export default ViewPanel;