// window.React = require('react');
import React from 'react';

import { render } from 'react-dom';
import SortableTable from 'react-sortable-table';
window.React = require('react');
function getFamilyName(name) {
  return name.split(' ').slice(-1)[0]
}
 
const FamilyNameSorter = {
desc: (data, key) => {
    var result = data.sort(function (_a, _b) {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      if ( a <= b ) {
        return 1;
      } else if ( a > b) {
        return -1;
      }
    });
    return result;
  },
 
  asc: (data, key) => {
    return data.sort(function (_a, _b) {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      if ( a >= b ) {
        return 1;
      } else if ( a < b) {
        return -1;
      }
    })
  }
};
 
 
export default class TablePage extends React.Component {
  constructor() {
    super()
    const count = 1
    this.state = {
      data: [
        { id: 3, name: 'Satoshi Yamamoto', class: 'B' },
        { id: 1, name: 'Taro Tanak', class: 'A' },
        { id: 2, name: 'Ken Asada', class: 'A' },
        { id: 4, name: 'Masaru Tokunaga', class: 'C' }
      ]
    };
  }
 
  render() {
    const columns = [
      {
        header: 'ID',
        key: 'id',
        // defaultSorting: 'ASC',
        headerStyle: { fontSize: '15px', backgroundColor: '#FFDAB9', width: '100px' },
        dataStyle: { fontSize: '15px', backgroundColor: '#FFDAB9'},
        dataProps: { className: 'align-right' },
        sortable: false,
        render: (id) => { return <a href={'user/'+id}>{id}</a>; }
      },
      {
        header: 'NAME',
        key: 'name',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        sortable: false
        // descSortFunction: FamilyNameSorter.desc,
        // ascSortFunction: FamilyNameSorter.asc
      },
      {
        header: 'CLASS',
        key: 'class',
        headerStyle: { fontSize: '15px' },
        sortable: false
      }
    ];
 
    const style = {
      backgroundColor: '#eee'
    };
 
    const iconStyle = {
      color: '#aaa',
      paddingLeft: '5px',
      paddingRight: '5px'
    };
 
    return (
      <div>
        <SortableTable
        data={this.state.data}
        columns={columns}
        style={style}
        iconStyle={iconStyle} />
      </div>
    );
  }
}