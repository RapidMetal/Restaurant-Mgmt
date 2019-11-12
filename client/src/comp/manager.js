import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles, AppBar, Toolbar, IconButton, Typography, Grid, Paper, Divider } from '@material-ui/core';
import MenuButton from "@material-ui/icons/Menu";
import LogoutButton from '@material-ui/icons/Input';
import OrangeBackgroundImage from '../img/background.jpg';

import { actionTest, actionLogout } from "../reducer.js";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: 'url(' + OrangeBackgroundImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
    },
    root: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            maxWidth: '90%',
            marginLeft: '5%',
        }
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1
    },
    leftColPaper: {
        [theme.breakpoints.up('lg')]: {
            minHeight: '60vh'
        },
        backgroundColor: '#382c78',
    },
    leftColTitle: {
        padding: theme.spacing(2,4),
        backgroundColor: '#4e63d9',
        borderRadius: 'inherit'
    },
    leftColDetails: {
        padding: theme.spacing(2,2,2,5),
        color: '#fff'
    },
    rightColPaper: {
        [theme.breakpoints.up('lg')]: {
            marginTop: '10vh'
        },
        backgroundColor: '#382c78',
    },
    rightColTitle: {
        padding: theme.spacing(2,4),
        backgroundColor: '#4e63d9',
        borderRadius: 'inherit'
    },
    rightColDetails: {
        padding: theme.spacing(2,2,2,5),
        color: '#fff',  
    },
    rightColField: {
        fontSize: '2ch',
        marginBottom: theme.spacing(1),
    },
    employeeTableTitle: {
        display: 'flex',
        margin: theme.spacing(1),
    },
    employeeTableItem: {
        display: 'flex',
        margin: theme.spacing(0.5,1,1,1),
    },
    employeeTableValue: {
        minWidth: '29%',
        overflow: 'hidden',
    },
}));

function EmployeePerf(props) {
    const classes = useStyles();

    return (
        <div className={classes.employeeTableItem} >
            <Typography className={classes.employeeTableValue}> {props.name} </Typography>
            <Typography className={classes.employeeTableValue}> {props.orderCount} </Typography>
            <Typography className={classes.employeeTableValue}> {props.tips} </Typography>
            <Typography className={classes.employeeTableValue}> {props.rating} out of 5 </Typography>
        </div>
    )
}

function ManagerPage(props) {
    const classes = useStyles();

    const performLogout = () => {
        props.actionLogout();
        toast('Logged out successfully!');
        props.history.push('/');
    }

    return (
        <div className={classes.background}>
                {/* Top Bar */}
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} color='inherit' >
                        <MenuButton />
                    </IconButton>
                    <Typography variant='h6' className={classes.menuTitle}> Wayside Restaurant Inc. </Typography>
                    <div className={classes.grow} />
                    <IconButton edge='end' className={classes.menuButton} color='inherit' onClick={performLogout}>
                        <LogoutButton />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.root} spacing='3' >
                    {/* Employee Performance */}
                <Grid item xs={12} sm={12} md={8}>
                    <Paper className={classes.leftColPaper}>
                        <div className={classes.leftColTitle}>
                            <Typography component='h6' variant='h6' style={{ color: '#fff' }}> Employee Performance </Typography>
                        </div>
                        <div className={classes.leftColDetails}>
                            <div className={classes.employeeTableTitle}>
                                <Typography className={classes.employeeTableValue}><b> Name </b></Typography>
                                <Typography className={classes.employeeTableValue}><b> Orders Handled </b></Typography>
                                <Typography className={classes.employeeTableValue}><b> Tips Received (in Rs.) </b></Typography>
                                <Typography className={classes.employeeTableValue}><b> Average Rating </b></Typography>
                            </div>
                            <Divider />
                            { props.employees.map((emp, index) => (
                                <EmployeePerf name={emp.name} orderCount={emp.orderCount} tips={emp.tips} rating={emp.rating} key={index} />
                            ))}
                        </div>
                    </Paper>
                </Grid>
                    {/* Restaurant History */}
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.rightColPaper}>
                        <div className={classes.rightColTitle}>
                            <Typography component='h6' variant='h6' style={{ color: '#fff' }}> Restaurant Performance </Typography>
                        </div>
                        <div className={classes.rightColDetails}>
                            <Typography className={classes.rightColField}> <pre style={{ fontFamily: 'inherit' }}>Name:                  Wayside Restaurant Inc.</pre> </Typography>
                            <Typography className={classes.rightColField}> <pre style={{ fontFamily: 'inherit' }}>No. of Orders:     {props.restaurantDetails.orderCount}</pre> </Typography>
                            <Typography className={classes.rightColField}> <pre style={{ fontFamily: 'inherit' }}>Total Revenue:   Rs. {props.restaurantDetails.revenue}</pre> </Typography>
                            <Typography className={classes.rightColField}> <pre style={{ fontFamily: 'inherit' }}>Tips Received:    Rs. {props.restaurantDetails.tips}</pre> </Typography>
                            <Typography className={classes.rightColField}> <pre style={{ fontFamily: 'inherit' }}>Average rating:   {props.restaurantDetails.rating}/5 stars</pre> </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        empName: state.user.name,
        testData: state.testData,
        restaurantDetails: state.restaurantDetails,
        employees: state.employees,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: data => dispatch(actionTest(data)),
        actionLogout: () => dispatch(actionLogout()),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ManagerPage));