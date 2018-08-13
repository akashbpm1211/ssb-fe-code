import data from './../static/data.json';
import {sortBy, uniq, pluck, find} from 'underscore';
import actions from './../static/actions.constants';
import {filterTransactions} from "../utils/filterTransactions";

const initialState = {
    data: data.transactions,
    filteredData: [],
    accountTypes: sortBy(uniq(pluck(data.transactions,'accountName')).map(item =>
        {return {name: item, selected: false}}),'name'),
    transactionTypes: sortBy(uniq(pluck(data.transactions,'transactionType')).map(item =>
        {return {name: item, selected: false}}),'name'),
    selectedTransaction: null,
};

const applyAccountTypeFilter = (state = initialState, action) => {
    let data = state.data;
    let filteredData = [];
    let accountTypes = state.accountTypes;
    let transactionTypes = state.transactionTypes;

    switch (action.type) {
        case actions.ACCOUNT_FILTER:
            //Replacing changed filter with new value
            find(accountTypes, (item, index) => {
                if(item.name === action.payload.name) {
                    accountTypes[index] = {name:action.payload.name,selected:action.payload.selected};
                    return true;
                }
                return false
            });

            // fetching filtered data, passing complete data and new filters
            filteredData = filterTransactions(data, accountTypes, transactionTypes);

            // sending back changed state
            return {
                ...state,
                filteredData,
                accountTypes,
            };

        case actions.TRANSACTION_FILTER:
            // Replacing changed filter with new value

            find(transactionTypes, (item, index) => {
                if(item.name === action.payload.name) {
                    transactionTypes[index] = {name:action.payload.name,selected:action.payload.selected};
                    return true;
                }
                return false
            });

            // fetching filtered data, passing complete data and new filters
            filteredData = filterTransactions(data, accountTypes, transactionTypes);

            // sending back changed state
            return {
                ...state,
                filteredData,
                transactionTypes,
            };

        case actions.TRANSACTION_SELECTED:
            return {
                ...state,
                selectedTransaction : action.payload
            };
        default:
            return {...state, filteredData: data, accountTypes, transactionTypes}
    }
};





export default applyAccountTypeFilter