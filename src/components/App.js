import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Checkbox from 'material-ui/Checkbox';
import { bindActionCreators } from 'redux';
import {applyAccountTypeFilter, selectTransaction, applyTransactionTypeFilter} from './../actions/actions.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Transaction from "./Transaction";

const customTitleStyle = {
    borderBottom: '1px solid black',
    padding: '1%'
};

class App extends React.Component{

    constructor(props){
        super(props);
        this.updateAccountTypeCheck = this.updateAccountTypeCheck.bind(this);
        this.updateTransactionTypeCheck = this.updateTransactionTypeCheck.bind(this);
        this.updateSelectedTransaction = this.updateSelectedTransaction.bind(this);
        this.linkFormat = this.linkFormat.bind(this);
    }

    // update account type checkbox value and dispatch action
    updateAccountTypeCheck(label,value){
        this.props.applyAccountTypeFilter({name:label,selected:value})
    }

    // update transaction type checkbox value and dispatch action
    updateTransactionTypeCheck(label,value){
        this.props.applyTransactionTypeFilter({name:label,selected:value})
    }

    // Update selected transaction and dispatch that action
    updateSelectedTransaction(selectedTransaction){
        this.props.selectTransaction(selectedTransaction);
    }

    // Display cell as a Link
    linkFormat(column, row){
        const columnLink = "/account";
        return (
            <Link onClick={(event) => this.updateSelectedTransaction(row)} to={columnLink}>{column}</Link>
        )
    }

    render(){
        const {filteredData, accountTypes, transactionTypes} =  this.props;
        if(filteredData && accountTypes && transactionTypes){
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
                                Showing {filteredData.length === 1 ? filteredData.length + " record" :
                                filteredData.length + " records"}
                            </p>
                            <BootstrapTable data={filteredData} pagination
                                            exportCSV
                                            csvFileName={"Transaction.csv"}>
                                <TableHeaderColumn dataSort={true} dataField='account' isKey={true} dataFormat={this.linkFormat} >
                                    ACCOUNT NO
                                </TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='accountName'>ACCOUNT
                                    NAME</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='currencyCode'>CURRENCY</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='amount'>AMOUNT</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='transactionType'>TRANSACTION
                                    TYPE</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            )
        }
        else return null

    }
}

const mapStateToProps = (state) => {
    return {
        filteredData: state.data.filteredData,
        accountTypes: state.data.accountTypes,
        transactionTypes: state.data.transactionTypes
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectTransaction,
        applyAccountTypeFilter,
        applyTransactionTypeFilter,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
