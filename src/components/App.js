import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import {sortBy, uniq, pluck, find, union, intersection } from 'underscore';

import Constants from '../static/constants';
import data from '../static/data.json';

const customContentStyle = {
    width: '50%',
    maxWidth: 'none',
    zIndex: 1499
};

const customTitleStyle = {
    borderBottom: '1px solid black',
    padding: '1%'
};

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data: [],
            updatedList: [],
            accountTypes: [],
            transactionTypes: [],
            selectedTransaction: null,
            showSelectedTransactionDialog: false,
        };
        this.updateAccountTypeCheck = this.updateAccountTypeCheck.bind(this);
        this.updateTransactionTypeCheck = this.updateTransactionTypeCheck.bind(this);
        this.filterTransactions = this.filterTransactions.bind(this);
    }

    componentDidMount(){
        /*
        We can save the types in a constant File(or fetch from an API) and populate like this.

        let accountTypes = Constants.ACCOUNT_TYPES.map(item =>  {return {name: item, selected: false}});
        let transactionTypes = Constants.TRANSACTION_TYPES.map(item =>  {return {name: item, selected: false}});

        Since the problem statement states not to hard code, I'm fetching the accountTypes and transactionTypes from
        the data file using underscore.js 's "pluck"; then duplicates are removed and sorted
         */

        let accountTypes = sortBy(uniq(pluck(data.transactions,'accountName')).map(item =>
        {return {name: item, selected: false}}),'name');
        let transactionTypes = sortBy(uniq(pluck(data.transactions,'transactionType')).map(item =>
        {return {name: item, selected: false}}),'name');

        this.setState({
            data: data.transactions,
            updatedList: data.transactions,
            accountTypes,
            transactionTypes
        })
    }

    filterTransactions(){
        const {data, accountTypes,transactionTypes} =  this.state;

        let updatedAccountFilterList = [];
        let updatedTransactionFilterList = [];

        // Flags to be certain if filtering is done or not
        let accountFilterDone = false;
        let transactionFilterDone = false;

        // First filtering through the list of accountTypes
        for(let type of accountTypes){
            if(type.selected){
                updatedAccountFilterList = union(updatedAccountFilterList,data.filter(
                    entry => entry.accountName.toLowerCase() === type.name.toLowerCase()));
                accountFilterDone = true;
            }
        }

        // If filtering is not done/required, set updatedAccountFilterList to complete list.
        if(!accountFilterDone) updatedAccountFilterList = data;

        // Next filtering through the list of transactionTypes
        for(let type of transactionTypes){
            if(type.selected){
                updatedTransactionFilterList = union(updatedTransactionFilterList,data.filter(
                    entry => entry.transactionType.toLowerCase() === type.name.toLowerCase()));
                transactionFilterDone = true;
            }
        }

        // If filtering is not done/required, set updatedTransactionFilterList to complete list
        if(!transactionFilterDone) updatedTransactionFilterList = data;

        // Once filtering is done using both types of parameters, the final list is obtained by intersection
        let updatedList = intersection(updatedTransactionFilterList,updatedAccountFilterList);

        this.setState({
            updatedList
        })
    }

    updateAccountTypeCheck(label,value){
        // Finding and replacing previous selected value
        let accountTypes = this.state.accountTypes;
        find(accountTypes, function(item, index) {
            if(item.name === label) {
                accountTypes[index] = {name:label,selected:value};
                return true;
            }
            return false
        });
        this.setState({
            accountTypes
        },this.filterTransactions)
    }

    updateTransactionTypeCheck(label,value){
        // Finding and replacing previous selected value
        let transactionTypes = this.state.transactionTypes;
        find(transactionTypes, function(item, index) {
            if(item.name === label) {
                transactionTypes[index] = {name:label,selected:value};
                return true;
            }
            return false
        });
        this.setState({
            transactionTypes
        },this.filterTransactions)
    }

    onRowClick(selectedTransaction) {
        // Invoked on clicking a single row in the transactionss table
        this.setState({
            selectedTransaction,
            showSelectedTransactionDialog: true,
        })
    }

    // Invoked to close the Dialog
    handleCloseDialog(){
        this.setState({
            selectedTransaction: null,
            showSelectedTransactionDialog: false,
        })
    }


    /*
    Transaction Details Dialog
    Since in current example doesn't have a lot of data to show in a new page, I have taken the liberty to use
    Dialog/Modal to display a transaction in detail.
     */
    renderTransactionDialog(){
        const { selectedTransaction } = this.state;

        if(selectedTransaction) {
            return (
                <Dialog
                    modal={false}
                    open={this.state.showSelectedTransactionDialog}
                    onRequestClose={this.handleCloseDialog.bind(this)}
                    autoScrollBodyContent={true}
                    contentStyle={customContentStyle}
                >
                    <h3 style={customTitleStyle}>{`Transaction ${selectedTransaction.account}`}</h3>
                    <table style={{margin: 'auto'}}>
                        <tbody>
                        <tr>
                            <td className="details-td"><strong>Account Number: </strong></td>
                            <td>{selectedTransaction.account}</td>
                        </tr>
                        <tr>
                            <td className="details-td"><strong>Account Name: </strong></td>
                            <td>{selectedTransaction.accountName}</td>
                        </tr>
                        <tr>
                            <td className="details-td"><strong>Currency Code: </strong></td>
                            <td>{selectedTransaction.currencyCode}</td>
                        </tr>
                        <tr>
                            <td className="details-td"><strong>Amount: </strong></td>
                            <td>{selectedTransaction.amount}</td>
                        </tr>
                        <tr>
                            <td className="details-td"><strong>Transaction Type: </strong></td>
                            <td>{selectedTransaction.transactionType}</td>
                        </tr>
                        </tbody>
                    </table>
                </Dialog>
            )
        }
    }

    /*
    If we want to display Transaction details in a new Page, we need to make following changes in render() function:
    1. Check if "this.state.selectedTransaction" is not null. If yes, we return a new Component
            <TransactionDetails details = {this.state.selectedTransaction} />
            1.a. Provide a "Back" button, upon clicking which, we set "selectedTransaction" to null.
    2. If "this.state.selectedTransaction" is null, we return whatever render is returning currently i.e., Transaction
       List and Filters.
     */
    render(){
        // Options for React-bootstrap-table
        const options = {
            onRowClick: this.onRowClick.bind(this),
            expandBy: 'column',
        };
        const {updatedList, accountTypes, transactionTypes} =  this.state;
        return (
            <div className="app-container">
                <h1 style={customTitleStyle}>My Transactions</h1>
                <div>
                    <div className="left-filter-pane">
                        <h5>Filters</h5>
                        <div className="filter-div">
                            <p>Account Type</p>
                            {
                                accountTypes.map((item, index) =>
                                    <Checkbox
                                        key={index}
                                        label={item.name}
                                        checked={item.selected}
                                        labelStyle={{fontWeight:'unset'}}
                                        onCheck={(event) => this.updateAccountTypeCheck(item.name, !item.selected)}
                                    />
                                )
                            }
                        </div>
                        <div className="filter-div">
                            <p>Transaction Type</p>
                            {
                                transactionTypes.map((item, index) =>
                                    <Checkbox
                                        key={index}
                                        label={item.name.slice(0,1).toUpperCase()+item.name.slice(1)}
                                        labelStyle={{fontWeight:'unset'}}
                                        checked={item.selected}
                                        onCheck={(event) => this.updateTransactionTypeCheck(item.name, !item.selected)}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div className="right-table-pane">
                        <p>
                            Showing {updatedList.length === 1 ? updatedList.length + " record" :
                            updatedList.length + " records"}
                        </p>
                        <BootstrapTable data={updatedList} options={options} pagination
                                        exportCSV
                                        csvFileName={"Transaction.csv"}
                        >
                            <TableHeaderColumn dataSort={true} dataField='account' isKey={true}>ACCOUNT
                                NO</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='accountName'>ACCOUNT
                                NAME</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='currencyCode'>CURRENCY</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='amount'>AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='transactionType'>TRANSACTION
                                TYPE</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                {this.renderTransactionDialog()}
            </div>
        )
    }

}
