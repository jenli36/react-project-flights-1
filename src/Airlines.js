import React, { Component } from 'react';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'
import { flights } from "./data/flights";
import { airline } from "./data/airline";
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';

import 'firebase/auth';
import 'firebase/database';
import Switch from "react-switch";

export class Airlines extends Component {

  constructor(props) {
    super(props);
    this.state = {checked: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }


  render() {
    const data = flights

    const columns = [{
      Header: 'Airline',
      accessor: 'AIRLINE',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }

        return row[filter.id] === filter.value;
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="UA">United Airlines</option>
          <option value="AA">American Airlines</option>
          <option value="US">US Airways</option>
          <option value="F9">Frontier Airlines</option>
          <option value="B6">JetBlue Airways</option>
          <option value="OO">Skywest Airlines</option>
          <option value="AS">Alaska Airlines</option>
          <option value="WN">Spirit Air Lines</option>
          <option value="DL">Southwest Airlines</option>
          <option value="EV">Atlantic Southeast Airlines</option>
          <option value="HA">Hawaiian Airlines</option>
          <option value="MQ">American Eagle Airlines</option>
          <option value="VX">Virgin America</option>
        </select>
    }, {
      Header: 'Origin Airport',
      accessor: 'ORIGIN_AIRPORT',
      Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["ORIGIN_AIRPORT"] }),
      filterAll: true

    },
    {
      Header: 'Destination Airport',
      accessor: 'DESTINATION_AIRPORT',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["DESTINATION_AIRPORT"] }),
      filterAll: true // Custom cell components!
    },
    {
      Header: 'Departure Delay (Minutes)',
      accessor: 'DEPARTURE_DELAY',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["DEPARTURE_DELAY"] }),
      filterAll: true // Custom cell components!
    }]
    const airlineData = airline;

    return (
      <div>
        <Card>
          <CardBody>
            <div className="box" id="graph">
              <CardBody>

                <CardTitle>Graph</CardTitle>
                <CardText>This graph demonstrates the maximum and minimum delay time for each airline.</CardText>
                  <BarChart width={600} height={300} data={airlineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="AIRLINE" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke='#000' />
                    <Brush dataKey='AIRLINE' height={30} stroke="#8884d8" />
                    <Bar dataKey="max" fill="#8884d8" />
                    <Bar dataKey="min" fill="#82ca9d" />
                  </BarChart>
              </CardBody>
            </div>
            <div className="box" id="table">
              <CardBody>
                <CardTitle>Table</CardTitle>
                <label htmlFor="normal-switch">
                  <span>Highlight your Airline</span>
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                    id="normal-switch"
                  />
                </label>
                <CardText>You can sort by clicking on the column names.</CardText>
                < ReactTable
                  data={data}
                  minRows={10}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                  columns={columns}
                />
              </CardBody>
            </div>
          </CardBody>
        </Card>
      </div>

    )
  }
}

