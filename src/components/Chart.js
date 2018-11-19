import React, { Component } from "react";
import { connect } from "react-redux";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import * as d3 from "d3";

const dateFormat = (time) => {
  const d=new Date(time);
	return d.getHours() + ":" + d.getMinutes();;
};

  const now = new Date();
  const domainToday = d3.scaleTime().domain([d3.timeDay.floor(now), d3.timeDay.ceil(now)]);
  const ticks = domainToday.ticks(d3.timeMinute.every(5));

class TemperatureChart extends React.Component {
    componentDidMount() {
    }
    render() {
        const {
            drone_data
          } = this.props;
      return (
        <LineChart width={500} height={300} data={drone_data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="timestamp" 
                    scale="time" 
                    tickFormatter={dateFormat} 
                    type="number" 
                    ticks={ticks} 
                    domain={domainToday}
                    interval="preserveStart"/>
            <YAxis dataKey="metric" />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="metric" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="timestamp" stroke="#82ca9d"/>
        </LineChart>
      );
    }
  }

  const mapState = (state, ownProps) => {
    const {
      drone_data
    } = state.weather;
    return {
      drone_data
    };
  };

  export default connect(
    mapState
  )(TemperatureChart);