import React, { Component } from "react";
import { fetchTownHallHistory } from "../services/main";
import { Chart } from 'react-google-charts'

export class History extends Component {
  state = {
    selectedTownHall: 1,
    data: [],
    selectedOption: "nStations",
    selectedOptionName: "Numero di torrette"
  }

  componentDidMount() {
    this.refreshData(this.state.selectedTownHall);
  }

  async refreshData(townHall) {
    const response  =await fetchTownHallHistory(townHall);
    this.setState({
      data: response
    });
  }

  render() {

    const options =
    {
        hAxis: {
      title: "Data",
    },
      vAxis: { title: this.state.selectedOptionName },
      legend: "none"
    }
    const data = this.state.data.map(value => [new Date(value.createdAt).toDateString(), value[this.state.selectedOption]])
    console.log("Rendering", this.state.selectedOptionName, this.state.selectedTownHall, this.state.selectedOption)
    console.log("data", data);
    return (
      <div className="container">
        <h3 className="headline-3 text-center">Andamento nel tempo</h3>
        <p className="subtitle-2 text-center">Scopri come nel tempo è cambiato l'impegno per una città più green</p>
        <select className="form-control" value={this.state.selectedTownHall} onChange={this.changeTownHall.bind(this)}>
          <option value={''}>Tutti i municipi</option>
          <option value={1}>Municipio 1</option>
          <option value={2}>Municipio 2</option>
          <option value={3}>Municipio 3</option>
          <option value={4}>Municipio 4</option>
          <option value={5}>Municipio 5</option>
          <option value={6}>Municipio 6</option>
          <option value={7}>Municipio 7</option>
          <option value={8}>Municipio 8</option>
          <option value={9}>Municipio 9</option>
        </select>
        <select className="form-control" value={this.state.selectedOption} onChange={this.changeSelectedOption.bind(this)}>
          <option value={"nStations"}>Numero di torrette</option>
          <option value={"avgDistanceFromStation"}>Media distanza da torretta</option>
          <option value={"maxDistanceFromStation"}>Massima distanza da torretta</option>
        </select>
        <Chart
          chartType="LineChart"
          data={[["Data", this.state.selectedOptionName], ...data]}
          width="100%"
          height="400px"
          options={options}
          legendToggle
        />
      </div>
    )
  }

  changeTownHall(event) {
    console.log("target selected", event, event.target.value || null)
    this.setState({selectedTownHall: event.target.value || null});
    this.refreshData(event.target.value || null);
  }
  changeSelectedOption(event) {
    console.log(event)
    this.setState({selectedOption: event.target.value, selectedOptionName: event.target.options[event.target.selectedIndex].text});
  }
}
