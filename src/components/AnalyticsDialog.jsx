import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, useMediaQuery, useTheme, makeStyles } from "@material-ui/core/";
import axios from 'axios';

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
}));

export default function AnalyticsDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [chartMode, setChartMode] = useState(false);

    const [startClearDate, setStartClearDate] = useState('');
    const [endClearDate, setEndClearDate] = useState('');
    const [startDueDate, setStartDueDate] = useState('');
    const [endDueDate, setEndDueDate] = useState('');
    const [startBaselineCreateDate, setStartBaselineCreateDate] = useState('');
    const [endBaselineCreateDate, setEndBaselineCreateDate] = useState('');
    const [invoiceCurrency, setInvoiceCurrency] = useState('');

    const options = {
        responsive: true
    };

    const [analyticsData, setAnalyticsData] = useState(null);

    function analytics() {
        // props.handleIsBackdropOpen(true);
        // props.closeDialog();
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
            // props.setAdvancedSearchData(data);
            // props.handleIsBackdropOpen(false);
        })
    }

    function getStringFromDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

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
                            label: 'Total open amount(1K)',
                            data: analyticsData.amount,
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }} /> :
                    <Grid container direction="row" spacing={2}>
                    <Grid justifyContent="center" container item xs spacing={2}>
                        <Grid justifyContent="center" container item xs>
                            <p style={{ textAlign: 'left', color: '#fff', width: '100%', padding: '0.5rem 0.7rem'}}>
                            Clear Date
                        </p>
                            <Paper className={classes.root} >
                                    <TextField type="date" label="From" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setStartClearDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            <Paper className={classes.root} >
                                    <TextField type="date" label="To" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setEndClearDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            <p style={{ textAlign: 'left', color: '#fff', width: '100%', padding: '0.5rem 0.7rem' }}>
                            Baseline Create Date
                        </p>
                            <Paper className={classes.root}>
                                    <TextField type="date" label="From" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setStartBaselineCreateDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            <Paper className={classes.root}>
                                    <TextField type="date" label="To" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setEndBaselineCreateDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid justifyContent="center" container item xs spacing={2}>
                        <Grid justifyContent="center" container item xs>
                            <p style={{ textAlign: 'left', color: '#fff', width: '100%', padding: '0.5rem 0.7rem' }}>
                            Due Date
                        </p>
                            <Paper className={classes.root}>
                                    <TextField type="date" label="From" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setStartDueDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            <Paper className={classes.root}>
                                    <TextField type="date" label="To" InputLabelProps={{ shrink: true }} onChange={(event) => {
                                    setEndDueDate(getStringFromDate(new Date(event.target.value)));
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            <p style={{ textAlign: 'left', color: '#fff', width: '100%', padding: '0.5rem 0.7rem' }}>
                            Invoice Currency
                        </p>
                            <Paper className={classes.root}>
                                <TextField value={invoiceCurrency} label="Invoice Currency" onChange={(event) => {
                                    setInvoiceCurrency(event.target.value);
                                }} />
                            </Paper>
                        </Grid>
                        <Grid justifyContent="center" container item xs>
                            {/* <Paper className={classes.root}> */}
                                {/* <TextField value={invoiceCurrency} label="Invoice Currency" onChange={(event) => {
                                    setInvoiceCurrency(event.target.value);
                                }} /> */}
                                <Box height="100%" width={200} display="inline-block" mb={6}>
                                </Box>
                            {/* </Paper> */}
                        </Grid>
                    </Grid>
                </Grid>
            }
                
            <br/>
            </DialogContent>
            <DialogActions>
                <Grid xs={6}>
                    {
                        chartMode ? <Button
                            classes={{
                                root: classes.inputRoot
                            }} fullWidth={true} variant="outlined" autoFocus onClick={() => {
                                setAnalyticsData(null);
                                setChartMode(false);
                            }}
                        >
                        delete
                        </Button> : 
                            
                    <Button classes={{
                        root: classes.inputRoot
                    }} fullWidth={true} variant="outlined" autoFocus onClick={() => analytics()} color="primary"
                        disabled={
                            startClearDate === '' ||
                            endClearDate === '' ||
                            startDueDate === '' ||
                            endDueDate === '' ||
                            startBaselineCreateDate === '' ||
                            endBaselineCreateDate === '' ||
                            invoiceCurrency === ''
                        }
                    >
                        Submit
                    </Button>
                    }
                </Grid>
                <Grid xs={6}>
                    <Button classes={{
                        root: classes.inputRoot
                    }} fullWidth={true} variant="outlined" onClick={() => {
                        props.closeDialog();
                        setStartClearDate('');
                        setEndClearDate('');
                        setStartDueDate('');
                        setEndDueDate('');
                        setStartBaselineCreateDate('');
                        setEndBaselineCreateDate('');
                        setInvoiceCurrency('');
                    }} color="primary" autoFocus>
                        Cancel
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
