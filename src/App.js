import './App.css';
import Header from './layout/Header'
import {Component, useEffect, useState} from 'react';
import OverviewStations from "./milan-map/OverviewStations";
import { fetchProviderStats, fetchStats, fetchTownHall } from "./services/main";
import { History } from "./history/History";
import { ProviderStats } from "./providers/ProviderStats";

class App extends Component {
    componentDidMount() {
        fetchStats().then((info) => {
            this.setState({
                nStations: info.nStations,
                maxDistanceFromStation: info.maxDistanceFromStation,
                avgDistanceFromStation: info.avgDistanceFromStation,
                doneStats: true
            });
        });
        fetchTownHall().then((info) => {
            this.setState({
                townHalls: info,
                doneTownHall: true
            })
        });
        fetchProviderStats().then((info) => {
            console.log(info)
            this.setState({
                providerStats: info,
            })
        });
    }
    state= {
        nStations: 0,
        maxDistanceFromStation: 20,
        avgDistanceFromStation: 40,
        townHalls: [],
        providerStats: [],
        doneStats: false,
        doneTownHall: false
    }
    render() {
        return (
            <>
                <Header/>
                {
                    this.state.doneStats && this.state.doneTownHall ?
                        (
                            <OverviewStations nStations={this.state.nStations}
                                              maxDistanceFromStation={this.state.maxDistanceFromStation}
                                              avgDistanceFromStation={this.state.avgDistanceFromStation}
                                              townHalls={this.state.townHalls}/>
                        ) :
                        <p>Loading</p>
                }
                <History />
                <ProviderStats providerStats={this.state.providerStats}/>
            </>
        );
    }
}

export default App;
