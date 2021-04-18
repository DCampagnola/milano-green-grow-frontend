/** @typedef {Object} Stats
 * @property {Number} avgDistanceFromStation
 * @property {Number} maxDistanceFromStation
 * @property {Number} nStations
 */

/**
 *
 * @returns {Promise<Stats>}
 */
export async function fetchStats() {
    return (await fetch('http://localhost:8080/stats', {
    })).json();
}

/** @typedef {Object} TownHalLStats
 * @property {Number} avgDistanceFromStation
 * @property {Object} cityHall
 * @property {Number} cityHallID
 * @property {Number} maxDistanceFromStation
 * @property {Number} nStations
 */

/** @typedef {Object} TownHalLStatsHistory
 * @property {Number} avgDistanceFromStation
 * @property {Object} cityHall
 * @property {Number} cityHallID
 * @property {Number} maxDistanceFromStation
 * @property {Number} nStations
 * @property {Date} createdAt
 */

/**
 *
 * @returns {Promise<TownHalLStats[]>}
 */
export async function fetchTownHall() {
    return (await fetch('http://localhost:8080/city-hall-stats', {
    })).json();
}

/**
 *
 * @returns {Promise<TownHalLStatsHistory[]>}
 */
export async function fetchTownHallHistory(townHall) {
    return (await fetch('http://localhost:8080/history' + (townHall ? '?townHall=' + townHall : ''), {
    })).json();
}
