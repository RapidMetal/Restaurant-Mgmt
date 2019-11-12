import React, { useState } from 'react';
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
        backgroundColor: '#382c78'
    },
    leftColTitle: {
        padding: theme.spacing(2,4),
        backgroundColor: '#4e63d9',
        borderRadius: 'inherit'
    },
    leftColDetails: {
        padding: theme.spacing(2,2,2,5),
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
    },
    rightColField: {
        fontSize: '2ch',
        marginBottom: theme.spacing(1),
        color: '#fff'
    }
}));

function FormItem(props) {
    const classes = useStyles();

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

function EmployeePage(props) {
    const classes = useStyles();

    const [itemList, updateItemList] = useState([]);

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
                    {/* New order Placement Form */}
                <Grid item xs={12} sm={12} md={8}>
                    <Paper className={classes.leftColPaper}>
                        <div className={classes.leftColTitle}>
                            <Typography component='h6' variant='h6' style={{ color: '#fff' }}> New Order </Typography>
                        </div>
                        <div className={classes.leftColDetails}>

                        </div>
                    </Paper>
                </Grid>
                    {/* Employee History */}
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.rightColPaper}>
                        <div className={classes.rightColTitle}>
                            <Typography component='h6' variant='h6' style={{ color: '#fff' }}> Your History </Typography>
                        </div>
                        <div className={classes.rightColDetails}>
                            <Typography component='p' variant='p' className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Name:                  {props.empName} </pre></Typography>
                            <Typography component='p' variant='p' className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> No. of Orders:      {props.empDetails.orderCount} </pre></Typography>
                            <Typography component='p' variant='p' className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Tips Received:     Rs. {props.empDetails.tips} </pre></Typography>
                            <Typography component='p' variant='p' className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Average rating:    {props.empDetails.rating} stars </pre></Typography>
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
        empDetails: state.employeeDetails,
        menu: state.menu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: data => dispatch(actionTest(data)),
        actionLogout: () => dispatch(actionLogout()),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EmployeePage));