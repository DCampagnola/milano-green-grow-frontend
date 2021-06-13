/** @typedef {Object} Stats
 * @property {Number} avgDistanceFromStation
 * @property {Number} maxDistanceFromStation
 * @property {Number} nStations
 */
/** @typedef {Object} ProviderStats
 * @property {string} providerName
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

/**
 *
 * @returns {Promise<ProviderStats[]>}
 */
export async function fetchProviderStats() {
    const providers = await (await fetch(process.env.REACT_APP_BASE_API + 'providers', {
    })).json()
    const otherProviderBucket = {
        providerName: "Altri",
        nStations: 0
    };
    const totalStations = providers.reduce((sum, provider) => sum + provider.nStations, 0);
    const isOther = (provider) => provider.nStations / totalStations <= 0.1;
    const toReturn = [];
    providers.forEach((provider) => {
        if(isOther(provider)) {
            otherProviderBucket.nStations++;
        } else {
            toReturn.push(provider)
        }
    });
    if(otherProviderBucket.nStations > 0) toReturn.push(otherProviderBucket);
    return toReturn;
}
