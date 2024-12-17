import React from 'react';
import MonthTable from './MonthTable';
import YearTable from './YearTable';
import SortTable from './SortTable';
import withDataAggregation from './withDataAggregation';
import './App.css';

export default class App extends React.Component {
  state = {
    list: []
  };

  url = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json';

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(res => this.setState(res));
  }

  render() {
    const { list } = this.state;
    const TransformMonthTable = withDataAggregation(MonthTable, 'month');
    const TransformYearTable = withDataAggregation(YearTable, 'year');
    const SortYearTable = withDataAggregation(SortTable, 'sort');

    return (
      <div id="app">
        <TransformMonthTable list={list} />
        <TransformYearTable list={list} />
        <SortYearTable list={list} />
      </div>
    );
  }
}
