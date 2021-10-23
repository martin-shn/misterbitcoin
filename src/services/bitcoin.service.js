import { httpService } from '@/services/http.service.js';

const DB = 'BTDB';
let rate;
let BC_graph={};

async function getBitcoinRate() {
    rate = await httpService.get('https://blockchain.info/tobtc?currency=USD&value=1');
    _saveDB(DB);
    return rate;
}

async function getMarketPrice(){
    const url = 'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true'
    BC_graph = _loadDb('BC_graph')
    BC_graph = BC_graph?BC_graph:{}
        
    if (!BC_graph?.marketPrice) {
        BC_graph.marketPrice = await _fetch(url)
        _saveDB_graph('BC_graph')
    }
    return BC_graph.marketPrice
} 

async function getTradeVolume(){
    const url = 'https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true'
    BC_graph = _loadDb('BC_graph')
    BC_graph = BC_graph?BC_graph:{}
    
    if (!BC_graph?.tradeVolume) {
        BC_graph.tradeVolume = await _fetch(url)
        _saveDB_graph('BC_graph')
    }
    return BC_graph.tradeVolume

} 

async function getConfirmedTransactions(){

}

async function _fetch(url){
    return await httpService.get(url)
}

function _saveDB(DB) {
    localStorage.setItem(DB, JSON.stringify({ ..._loadDb(DB), rate }));
}

function _saveDB_graph(DB) {
    localStorage.setItem(DB, JSON.stringify({ ..._loadDb(DB), ...BC_graph }));
}

function _loadDb(DB){
    const tempDb = localStorage.getItem(DB)
    if (tempDb) return JSON.parse(tempDb)
    return null
}

export default{
    getBitcoinRate,
    getMarketPrice,
    getTradeVolume
}
