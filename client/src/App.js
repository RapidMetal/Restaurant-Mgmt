import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { testAction } from './reducer.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	testButton: {
		margin: theme.spacing(1),
	},
}));

function App(props) {
	const classes = useStyles();
  	return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	  	<Typography>State Contents: {props.testState}</Typography>
        <Button className={classes.testButton} onClick={() => props.setData("State changed!")}> Click Here! </Button>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
	return {
		testState: state.testData,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setData: (data) => dispatch(testAction(data)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);