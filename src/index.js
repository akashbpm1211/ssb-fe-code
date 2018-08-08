import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/styles.css';

const Index = () => {
    return <div>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </div>;
};

ReactDOM.render(<Index />, document.getElementById("app"));