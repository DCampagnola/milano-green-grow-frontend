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
    return (await fetch(process.env.REACT_APP_BASE_API + 'stats', {
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
    return (await fetch(process.env.REACT_APP_BASE_API + 'city-hall-stats', {
    })).json();
}

/**
 *
 * @returns {Promise<TownHalLStatsHistory[]>}
 */
export async function fetchTownHallHistory(townHall) {
    return (await fetch(process.env.REACT_APP_BASE_API + 'history' + (townHall ? '?townHall=' + townHall : ''), {
    })).json();
}
