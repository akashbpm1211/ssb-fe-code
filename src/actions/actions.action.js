import actions from './../static/actions.constants';

// account type change action
export const applyAccountTypeFilter = (filter) =>  {
    return {
        type: actions.ACCOUNT_FILTER,
        payload: filter
    }
}

// transaction type change action
export const applyTransactionTypeFilter = (filter) =>  {
    return {
        type: actions.TRANSACTION_FILTER,
        payload: filter
    }
}

// transaction select action
export const selectTransaction = (transaction) => {
    return {
        type: actions.TRANSACTION_SELECTED,
        payload: transaction
    }
}
