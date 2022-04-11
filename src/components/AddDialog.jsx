import React, { useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    useMediaQuery,
    useTheme,
    makeStyles,
} from "@material-ui/core/";
import { Alert } from '@material-ui/lab';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            width: "28ch"
        },
        '& .MuiAlert-icon': {
            color: '#fff',
        },
        '& .MuiAlert-filledSuccess': {
            background: '#4caf50',
        },
        '& .MuiAlert-filledError': {
            background: '#f44336',
        },
    },
    inputRoot: {
        color: "#fff",
        borderColor: "#fff",
        "&:hover": {
            borderColor: "#fff"
        },
        '&:disabled': {
            opacity: 0.6,
            color: '#D1D1D1',
            borderColor: '#D1D1D1'
        }
    },
    gridRoot: {
        justifyContent: "space-evenly",
        alignContent: "center"
    },
}));

export default function AddDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [businessCode, setBusinessCode] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [clearDate, setClearDate] = useState('');
    const [businessYear, setBusinessYear] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [postingDate, setPostingDate] = useState('');
    const [documentCreateDate, setDocumentCreateDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [invoiceCurrency, setInvoiceCurrency] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [postingId, setPostingId] = useState('');
    const [totalOpenAmount, setTotalOpenAmount] = useState('');
    const [baselineCreatedate, setBaselineCreatedate] = useState('');
    const [customerPaymentTerms, setCustomerPaymentTerms] = useState('');
    const [invoiceId, setInvoiceId] = useState('');


    const [open, setOpen] = useState(true);
    const [resultState, setResultState] = useState(false);
    const [error, setError] = useState(false);

    function addData() {
        props.handleIsBackdropOpen(true);
        axios({
            url: '/AddData',
            method: 'get',
            baseURL: 'http://localhost:8080/hrcservlet/',
            params: {
                business_code: businessCode,
                cust_number: customerNumber,
                clear_date: clearDate === '' ? '0000-00-00' : clearDate,
                buisness_year: businessYear,
                doc_id: documentId,
                posting_date: postingDate,
                document_create_date: documentCreateDate,
                due_in_date: dueDate,
                invoice_currency: invoiceCurrency,
                document_type: documentType,
                posting_id: postingId,
                total_open_amount: totalOpenAmount,
                baseline_create_date: baselineCreatedate,
                cust_payment_terms: customerPaymentTerms,
                invoice_id: invoiceId,
                isOpen: clearDate === '' ? 1 : 0,
            }
        }).then((res) => {
            setToDefault();
            props.fetchData();
            props.setSortModeDefault();
            props.closeDialog();
            setTimeout(() => {
                setError(!res.data);
                setResultState(true);
            }, 5000)
            setTimeout(() => {
                setError(false);
                setResultState(false);
            }, 6500)
            setTimeout(() => {
                props.handleIsBackdropOpen(false);
            }, 5000)
        })
    }

    function getStringFromDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

    function setToDefault() {
        setBusinessCode('');
        setCustomerNumber('');
        setClearDate('');
        setBusinessYear('');
        setDocumentId('');
        setPostingDate('');
        setDocumentCreateDate('');
        setDueDate('');
        setInvoiceCurrency('');
        setDocumentType('');
        setPostingId('');
        setTotalOpenAmount('');
        setBaselineCreatedate('');
        setCustomerPaymentTerms('');
        setInvoiceId('');
    }

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: "#2D4250"
                    }
                }}
                fullWidth={true}
                maxWidth="lg"
                fullScreen={fullScreen}
                open={props.open}
                onClose={() => props.closeDialog()}
            >
                <DialogTitle
                    classes={{
                        root: classes.inputRoot
                    }}
                >
                    {"Add"}
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Business Code"
                                    onChange={(event) => {
                                        setBusinessCode(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Customer Number"
                                    onChange={(event) => {
                                        setCustomerNumber(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField

                                    type="date"
                                    label="Clear Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={(event) => {
                                        setClearDate(getStringFromDate(new Date(event.target.value)));
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Business Year"
                                    onChange={(event) => {
                                        setBusinessYear(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Document ID"
                                    onChange={(event) => {
                                        setDocumentId(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    type="date"
                                    label="Posting Date" InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={(event) => {
                                        setPostingDate(getStringFromDate(new Date(event.target.value)));
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    type="date"
                                    label="Document Create Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={(event) => {
                                        setDocumentCreateDate(getStringFromDate(new Date(event.target.value)));
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    type="date"
                                    label="Due Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={(event) => {
                                        setDueDate(getStringFromDate(new Date(event.target.value)));
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Invoice Currency"
                                    onChange={(event) => {
                                        setInvoiceCurrency(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Document Type"
                                    onChange={(event) => {
                                        setDocumentType(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Posting ID"
                                    onChange={(event) => {
                                        setPostingId(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Total Open Amount"
                                    onChange={(event) => {
                                        setTotalOpenAmount(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    type="date"
                                    label="Baseline Create Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={(event) => {
                                        setBaselineCreatedate(getStringFromDate(new Date(event.target.value)));
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Customer Payment Terms"
                                    onChange={(event) => {
                                        setCustomerPaymentTerms(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper className={classes.root}>
                                <TextField
                                    required
                                    label="Invoice ID"
                                    onChange={(event) => {
                                        setInvoiceId(event.target.value);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            classes={{
                                root: classes.gridRoot
                            }}
                        >
                            <Paper style={{ width: "28ch" }}></Paper>
                        </Grid>
                    </Grid>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Grid xs={6}>
                        <Button
                            classes={{
                                root: classes.inputRoot
                            }}
                            fullWidth={true}
                            variant="outlined"
                            autoFocus
                            onClick={() => addData()}
                            color="primary"
                            disabled={
                                businessCode === '' ||
                                customerNumber === '' ||
                                businessYear === '' ||
                                documentId === '' ||
                                postingDate === '' ||
                                documentCreateDate === '' ||
                                dueDate === '' ||
                                invoiceCurrency === '' ||
                                documentType === '' ||
                                postingId === '' ||
                                totalOpenAmount === '' ||
                                baselineCreatedate === '' ||
                                customerPaymentTerms === '' ||
                                invoiceId === ''
                            }
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button
                            classes={{
                                root: classes.inputRoot
                            }}
                            fullWidth={true}
                            variant="outlined"
                            onClick={() => {
                                props.closeDialog();
                                setToDefault();
                            }}
                            color="primary"
                            autoFocus
                        >
                            Cancel
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>

            {
                resultState && <>
                    {
                        error ? <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                            <Alert severity="error" variant="filled">
                                Error!
                            </Alert>
                        </Snackbar> : <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                                <Alert severity="success" variant="filled">
                                Added Successfully!
                            </Alert>
                        </Snackbar>
                    }
                </>
            }
        </div>
    );
}
