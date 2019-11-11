import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { actionTest } from './reducer.js';
import LoginPage from './comp/login.js';

function App(props) {
  	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route exact path='/' component={LoginPage} />
				</Switch>
			</Router>
			<ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
		</React.Fragment>
  	);
}

const mapStateToProps = state => {
	return {
		testState: state.testData,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setData: data => dispatch(actionTest(data)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);