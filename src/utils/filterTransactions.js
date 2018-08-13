import {intersection, flatten } from 'underscore';


export const filterTransactions = (data, accountTypes, transactionTypes) => {
    let filterLists = []

    // filtering through account types
    for(let type of accountTypes){
        if(type.selected){
            filterLists.push(
                data.filter(entry => entry.accountName.toLowerCase() === type.name.toLowerCase())
            );
        }
    }

    let updatedAccountFilterList = flatten(filterLists)

    // checking if filtering happened. If not passing whole data
    if(filterLists.length) {
        updatedAccountFilterList = flatten(filterLists);
    }
    else{
        updatedAccountFilterList = data;
    }

    // Next filtering through the list of transactionTypes
    filterLists = []
    for(let type of transactionTypes){
        if(type.selected){
            filterLists.push(
                data.filter(entry => entry.transactionType.toLowerCase() === type.name.toLowerCase())
            );
        }
    }

    let updatedTransactionFilterList = flatten(filterLists)

    // If filtering is not done/required, set updatedTransactionFilterList to complete list
    if(filterLists.length) {
        updatedTransactionFilterList = flatten(filterLists);
    }
    else{
        updatedTransactionFilterList = data;
    }

    // Once filtering is done using both types of parameters, the final list is obtained by intersection
    return intersection(updatedTransactionFilterList,updatedAccountFilterList);
}