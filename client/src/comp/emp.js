import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles, AppBar, Toolbar, IconButton, Typography, Grid, Paper, Divider, Select, MenuItem, Button } from '@material-ui/core';
import MenuButton from "@material-ui/icons/Menu";
import LogoutButton from '@material-ui/icons/Input';
import OrangeBackgroundImage from '../img/background.jpg';
import DeleteIcon from '@material-ui/icons/Clear';

import { actionTest, actionLogout, actionSetEmployeeDetails } from "../reducer.js";

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
        padding: theme.spacing(2,2,2,3),
        color: '#fff',
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
    },
    orderTableTitle: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
    },
    orderTableTitleValue: {
        minWidth: '20%',
    },
    formRow: {
        display: 'flex',
        alignItems: 'center',
    },
    formRowItem: {
        minWidth: '19%',
        marginRight: '1.2%',
    },
    formButton: {
        borderRadius: '50%',
        minWidth: '10px',
        maxWidth: '4%',
    },
    itemAddButton: {
        margin: theme.spacing(0.5,3,1,3),
    },
    leftColActions: {
        display: 'flex',
        marginTop: theme.spacing(1),
        alignItems: 'center'
    },
    orderButton: {
        marginRight: theme.spacing(2),
    },
    ratingSelection: {
        marginLeft: theme.spacing(1),
    },
    totalPriceText: {
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
    }
}));

function FormItem(props) {
    const classes = useStyles();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(props.item.price * props.item.quantity);
    }, [props.item.price,props.item.quantity]);

    const quantityArray = [1,2,3,4,5,6,7,8,9];

    //Select item from list
    const handleItemSelect = e => {
        var itemId = e.target.value;
        const itemFromMenu = props.menu.find(menuItem => menuItem._id === itemId);
        var newItemList = props.itemList;
        newItemList[props.index] = {
            name: itemFromMenu.name,
            type: itemFromMenu.type,
            _id: itemFromMenu._id,
            price: itemFromMenu.price,
            quantity: props.item.quantity === '' ? 1 : props.item.quantity
        };
        props.updateItemList(newItemList);
        props.forceRefresh(!props.refreshState);
    }

    //Change quantity
    const handleQuantitySelect = e => {
        var qty = e.target.value;
        var newItemList = props.itemList;
        newItemList[props.index] = {
            ...newItemList[props.index],
            quantity: qty
        };
        props.updateItemList(newItemList);
        props.forceRefresh(!props.refreshState);
    }

    //Remove item from list
    const deleteItem = ()  => {
        toast(props.item.name + ' removed from order.');
        var newItemList = props.itemList;
        newItemList.splice(props.index,1);
        props.updateItemList(newItemList);
        props.forceRefresh(!props.refreshState);
    }

    return (
        <div className={classes.formRow} >
            <Select
                value={props.item._id}
                onChange={e => handleItemSelect(e)}
                className={classes.formRowItem}
                style={{ margin: '5px' }}
                variant='outlined' >
                    { props.menu.map((dish,index) => (
                        <MenuItem key={index} value={dish._id}> {dish.name} </MenuItem>
                    )) }
            </Select>
            <Typography className={classes.formRowItem} style={{ marginLeft: '8px', marginRight: '0px' }} > {props.item.type} </Typography>
            <Typography className={classes.formRowItem} style={{ marginLeft: '8px', marginRight: '0px' }} > {props.item.price} </Typography>
            <Select
                value={props.item.quantity}
                onChange={e => handleQuantitySelect(e)}
                className={classes.formRowItem}
                style={{ marginTop: '5px', marginBottom: '5px' }}
                variant='outlined' >
                    { quantityArray.map((qty,index) => (
                        <MenuItem key={index} value={qty}> {qty} </MenuItem>
                    )) }
            </Select>
            <Typography className={classes.formRowItem} style={{ marginRight: '0px', minWidth: '15%' }}> {totalPrice} </Typography>
            <Button variant='contained' color='primary' className={classes.formButton} onClick={() => deleteItem()}>
                <DeleteIcon />
            </Button>
        </div>
    )
}

function EmployeePage(props) {
    const classes = useStyles();

    //Placeholder item template for form
    const item = {
        _id: '',
        name: '',
        type: '',
        price: 0,
        quantity: ''
    }

    const [itemList, updateItemList] = useState([]);
    const [refreshState, forceRefresh] = useState(false);
    const [rating, setRating] = useState(5);
    const ratingArray = [1,2,3,4,5];
    const [totalPrice, setTotalPrice] = useState(0);

    //Update total Price on DOM re-render
    useEffect(() => {
        setTotalPrice(itemList.reduce((acc,item) => acc + item.price * item.quantity,0));
    }, [itemList]);

    const performLogout = () => {
        props.actionLogout();
        toast('Logged out successfully!');
        props.history.push('/');
    }

    //Add a new item to order list
    const addItemToList = () => {
        updateItemList([
            ...itemList,
            item
        ]);
    }

    const placeOrder = () => {
        //Check if order is correct
        var isFormFilled = true;
        for (const key in itemList) {
            if (itemList[key]._id === '')
                isFormFilled = false;
        }
        if (!isFormFilled || itemList.length === 0) {
            toast("Please fill the form completely first.");
            console.log(!isFormFilled);
            console.log(itemList.length === 0)
            return;
        }

        //Send order to server
        const objectToSend = {
            msg: 'Order placement request from server.',
            token: props.empId,
            order: itemList
        };

        fetch('http://localhost:8125/api/placeOrder', {
            method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(objectToSend)
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.status === 'ERROR')
                toast('Error in placing order. Please try again.');
            else if (res.status === 'SUCCESS') {
                toast('Order successfully placed!');
                updateItemList([]);
                const newEmployeeDetails = {
                    tips: res.emp.tips,
                    rating: res.emp.rating,
                    orderCount: res.emp.orderCount
                };
                props.actionUpdateEmployeeDetails(newEmployeeDetails);
            }
        }).catch(err => {
            throw err;
        })
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
            <Grid container className={classes.root} spacing={3} >
                    {/* New order Placement Form */}
                <Grid item xs={12} sm={12} md={8}>
                    <Paper className={classes.leftColPaper}>
                        <div className={classes.leftColTitle}>
                            <Typography component='h6' variant='h6' style={{ color: '#fff' }}> New Order </Typography>
                        </div>
                        <div className={classes.leftColDetails}>
                            <div className={classes.orderTableTitle}>
                                <Typography className={classes.orderTableTitleValue}><b> Item Name </b></Typography>
                                <Typography className={classes.orderTableTitleValue}><b> Type </b></Typography>
                                <Typography className={classes.orderTableTitleValue}><b> Price (in Rs.) </b></Typography>
                                <Typography className={classes.orderTableTitleValue}><b> Quantity </b></Typography>
                                <Typography className={classes.orderTableTitleValue}><b> Total (in Rs.) </b></Typography>
                            </div>
                            <Divider style={{ backgroundColor: '#fff' }} />
                            { itemList.map((item,index) => (
                                <FormItem key={index} item={item} index={index} updateItemList={updateItemList} itemList={itemList} menu={props.menu} refreshState={refreshState} forceRefresh={forceRefresh} />
                            )) }
                            <Button className={classes.itemAddButton} variant='contained' color='primary' onClick={() => addItemToList()} > Add Item </Button>
                            <Divider style={{ backgroundColor: '#fff' }} />
                            <div className={classes.leftColActions}>
                                <Button className={classes.orderButton} variant='contained' color='secondary' onClick={() => placeOrder()} > Place Order </Button>
                                <Typography> Rating:  </Typography>
                                <Select
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                    className={classes.ratingSelection}
                                    style={{ marginTop: '5px', marginBottom: '5px' }}
                                    defaultValue={5} >
                                        { ratingArray.map((qty,index) => (
                                            <MenuItem key={index} value={qty}> {qty} </MenuItem>
                                        )) }
                                </Select>
                                <Typography className={classes.totalPriceText}> Total Price = Rs. {totalPrice} </Typography>

                            </div>
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
                            <Typography className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Name:                   {props.empName} </pre></Typography>
                            <Typography className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> No. of Orders:      {props.empDetails.orderCount} </pre></Typography>
                            <Typography className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Tips Received:     Rs. {props.empDetails.tips} </pre></Typography>
                            <Typography className={classes.rightColField}><pre style={{ fontFamily: 'inherit' }}> Average rating:    {props.empDetails.rating} stars </pre></Typography>
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
        empId: state.user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: data => dispatch(actionTest(data)),
        actionLogout: () => dispatch(actionLogout()),
        actionUpdateEmployeeDetails: (employeeDetails) => dispatch(actionSetEmployeeDetails(employeeDetails)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EmployeePage));