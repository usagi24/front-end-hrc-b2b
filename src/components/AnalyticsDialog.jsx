// React components

import React, { useState } from "react";

// Mui components

import { Grid, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, useMediaQuery, useTheme, makeStyles } from "@material-ui/core/";
import axios from 'axios';

// Chartjs components

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = 'white';

// theming

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: '28ch',
        },
    },
    inputRoot: {
        color: '#fff',
        borderColor: '#fff',
        '&:hover': {
            borderColor: '#fff',
        },
        '&:disabled': {
            opacity: 0.6,
            color: '#D1D1D1',
            borderColor: '#D1D1D1',
        }
    },
    labelRoot: {
        textAlign: 'left',
        color: '#fff',
        width: '100%',
        padding: '0.5rem 0.7rem'
    },
}));

export default function AnalyticsDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    // State variables
    
    const [startClearDate, setStartClearDate] = useState('');
    const [endClearDate, setEndClearDate] = useState('');
    const [startDueDate, setStartDueDate] = useState('');
    const [endDueDate, setEndDueDate] = useState('');
    const [startBaselineCreateDate, setStartBaselineCreateDate] = useState('');
    const [endBaselineCreateDate, setEndBaselineCreateDate] = useState('');
    const [invoiceCurrency, setInvoiceCurrency] = useState('');

    const [chartMode, setChartMode] = useState(false);

    const options = {
        responsive: true
    };

    const [analyticsData, setAnalyticsData] = useState(null);

    // functions

    function analytics() {
        axios({
            url: '/Analytics',
            method: 'get',
            baseURL: 'http://localhost:8080/hrcservlet/',
            params: {
                startClearDate,
                endClearDate,
                startDueDate,
                endDueDate,
                startBaselineCreateDate,
                endBaselineCreateDate,
                invoiceCurrency
            }
        }).then((res) => {
            const data = res.data;
            console.log(data);
            setAnalyticsData(data);
            setChartMode(true);
        })
    }

    function getStringFromDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    function setToDefault() {
        setStartClearDate('');
        setEndClearDate('');
        setStartDueDate('');
        setEndDueDate('');
        setStartBaselineCreateDate('');
        setEndBaselineCreateDate('');
        setInvoiceCurrency('');
    }

    // DialogBox

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: "#2D4250",
                    minWidth: '37.5rem'
                },
            }}
            fullScreen={fullScreen}
            open={props.open}
            onClose={() => props.closeDialog()}
        >

            <DialogTitle
                classes={{
                    root: classes.inputRoot
                }}
            >
                {"Analytics View"}
            </DialogTitle>
            <DialogContent> {
                chartMode ? <Bar options={options} data={{
                    labels: analyticsData.business_code,
                    datasets: [
                        {
                            label: 'No of customers',
                            data: analyticsData.cust_count,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Total open amount(1M)',
                            data: analyticsData.amount,
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }} /> :
                    <Grid container direction="row" spacing={2}>
                        <Grid justifyContent="center" container item xs spacing={2}>
                            <Grid justifyContent="center" container item xs>
                                <Typography classes={{ root: classes.labelRoot }}>
                                    Clear Date
                                </Typography>
                                <Paper className={classes.root} >
                                    <TextField
                                        type="date"
                                        label="From"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setStartClearDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Paper className={classes.root} >
                                    <TextField
                                        type="date"
                                        label="To"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setEndClearDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Typography classes={{ root: classes.labelRoot }}>
                                    Baseline Create Date
                                </Typography>
                                <Paper className={classes.root}>
                                    <TextField
                                        type="date"
                                        label="From"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setStartBaselineCreateDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Paper className={classes.root}>
                                    <TextField
                                        type="date"
                                        label="To"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setEndBaselineCreateDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid justifyContent="center" container item xs spacing={2}>
                            <Grid justifyContent="center" container item xs>
                                <Typography classes={{ root: classes.labelRoot }}>
                                    Due Date
                                </Typography>
                                <Paper className={classes.root}>
                                    <TextField
                                        type="date"
                                        label="From"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setStartDueDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Paper className={classes.root}>
                                    <TextField
                                        type="date"
                                        label="To"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event) => {
                                            setEndDueDate(getStringFromDate(new Date(event.target.value)));
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Typography classes={{ root: classes.labelRoot }}>
                                    Invoice Currency
                                </Typography>
                                <Paper className={classes.root}>
                                    <TextField
                                        value={invoiceCurrency}
                                        label="Invoice Currency"
                                        onChange={(event) => {
                                            setInvoiceCurrency(event.target.value);
                                        }} />
                                </Paper>
                            </Grid>
                            <Grid justifyContent="center" container item xs>
                                <Box height="100%" width={200} display="inline-block" mb={6}>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
            }

                <br />
            </DialogContent>
            <DialogActions>
                {
                    chartMode ?
                        <Grid xs={6} container justifyContent="flex-end"><Button
                            classes={{ root: classes.inputRoot }}
                            fullWidth={true}
                            variant="outlined"
                            autoFocus
                            onClick={() => {
                                setAnalyticsData(null);
                                setChartMode(false);
                                props.closeDialog();
                                setToDefault();
                            }}
                        >
                            close
                        </Button>
                        </Grid> :
                        <Grid container direction="row" xs={12} spacing={1}>
                            <Grid item xs={6}>
                                <Button classes={{ root: classes.inputRoot }}
                                    fullWidth={true}
                                    variant="outlined"
                                    autoFocus
                                    onClick={() => analytics()}
                                    color="primary"
                                    disabled={
                                        startClearDate === '' ||
                                        endClearDate === '' ||
                                        startDueDate === '' ||
                                        endDueDate === '' ||
                                        startBaselineCreateDate === '' ||
                                        endBaselineCreateDate === '' ||
                                        invoiceCurrency === ''
                                    }>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    classes={{ root: classes.inputRoot }}
                                    fullWidth={true}
                                    variant="outlined"
                                    onClick={() => {
                                        props.closeDialog();
                                        setToDefault();
                                    }}
                                    color="primary"
                                    autoFocus>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                }
                
            </DialogActions>
        </Dialog>
    );
}