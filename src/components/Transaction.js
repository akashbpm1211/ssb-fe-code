import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const customTitleStyle = {
    borderBottom: '1px solid black',
    padding: '1%'
};

const tdStyle = {
    width: '150px',
    height: '40px'
};

// Transaction detail component

class Transaction extends React.Component{

    render(){
        const {transaction} = this.props
        return(
            <div className="app-container">
                <h1 style={customTitleStyle}>Transaction {transaction.account}</h1>
                <div className="transaction-detail">
                    <table>
                        <tbody>
                        <tr>
                            <td style={tdStyle}><strong>Account No:</strong></td>
                            <td>{transaction.account}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Account Name:</strong></td>
                            <td>{transaction.accountName}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Amount:</strong></td>
                            <td>{transaction.amount} {transaction.currencyCode}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Currency Name:</strong></td>
                            <td>{transaction.currencyName}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Transaction Type:</strong></td>
                            <td>{transaction.transactionType}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transaction: state.data.selectedTransaction
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)