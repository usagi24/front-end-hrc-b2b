import React, { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow, TablePagination, Paper, Checkbox, Button, ButtonGroup, Grid, TextField, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import AdvanceSearchDialog from "./AdvanceSearchDialog";
import AnalyticsDialog from "./AnalyticsDialog";
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: '#283D4A',
        color: '#fff',
        ' & .MuiCheckbox-root': {
            color: '#fff',
        },
    },
    paper: {
        width: '100%',
    },
    table: {
        // minHeight: '75vh',
        backgroundColor: '#283D4A',
    },
    button: {
        borderColor: '#4fc3f7',
        width: '100%',
        '&:disabled': {
            borderColor: '#1C658C'
        }
    },
    tablecellHead: {
        minWidth: '2rem',
        padding: '0.8rem',
        color: '#fff',
        textAlign: 'center'
    },
    tablecell: {
        minWidth: '2rem',
        padding: '0.2rem',
        color: '#fff',
        textAlign: 'center'
    },
    makeHeaderStickey: {
        overflowX: "initial",
        overflowY: "initial"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function LeftButtonGroup(props) {
    const [advanceSearchDialog, setAdvanceSearchDialog] = useState(false);
    const [analyticsDialog, setAnalyticsDialog] = useState(false);
    const classes = useStyles();

    const [isBackdropOpen, setIsBackdropOpen] = useState(false);
    return (
        <div style={{ padding: '25px 14px 10px' }}>
            <ButtonGroup style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: "flex-start" }} aria-label="outlined button group">
                <Button style={{
                    width: '100%', backgroundColor: '#4fc3f7', color: '#fff', borderColor: '#fff'
                }} variant="contained" disableElevation disabled>predict</Button>
                <Button style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }} onClick={() => setAnalyticsDialog(true)}>analytics view</Button>
                <Button onClick={() => setAdvanceSearchDialog(true)} style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }}>advance search</Button>
            </ButtonGroup>
            <AnalyticsDialog 
                open={analyticsDialog} closeDialog={() => {
                    setAnalyticsDialog(false);
                }}
            />
            <AdvanceSearchDialog open={advanceSearchDialog} closeDialog={() => {
                setAdvanceSearchDialog(false);
            }} handleIsBackdropOpen={(mode) => {
                setIsBackdropOpen(mode);
                }} setAdvancedSearchData={e => {
                    props.setAdvancedSearchData(e);
                    setIsBackdropOpen(false);
                }} />
            <Backdrop className={classes.backdrop} open={isBackdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

function RightButtonGroup(props) {

    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const classes = useStyles();

    const [isBackdropOpen, setIsBackdropOpen] = useState(false);

    return (
        <div style={{ padding: '25px 14px 10px' }}>
            <ButtonGroup style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: "flex-end" }} aria-label="outlined button group">

                <Button onClick={() => setAddDialog(true)} style={{ width: '100%', color: '#fff', borderColor: '#4fc3f7' }}>add</Button>
                <Button className={classes.button} onClick={() => setEditDialog(true)} style={{ color: '#fff' }} disabled={props.handleCheckboxCount() !== 1}>edit</Button>
                <Button className={classes.button} style={{ color: '#fff' }} onClick={() => setDeleteDialog(true)}
                    disabled={props.handleCheckboxCount() < 1}>delete</Button>
            </ButtonGroup>
            <AddDialog open={addDialog}
                setSortModeDefault={() => props.setSortModeDefault()}
                fetchData={() => props.fetchData()}
                closeDialog={() => {
                setAddDialog(false);
            }} handleIsBackdropOpen={(mode) => {
                setIsBackdropOpen(mode);
            }} />
            <EditDialog open={editDialog}
                setSortModeDefault={() => props.setSortModeDefault()}
                fetchData={() => props.fetchData()}
                closeDialog={() => {
                setEditDialog(false);
            }} getSl_no={() => props.getSl_no()} handleIsBackdropOpen={(mode) => {
                setIsBackdropOpen(mode);
            }} />
            <DeleteDialog open={deleteDialog}
                setSortModeDefault={() => props.setSortModeDefault()}
                fetchData={() => props.fetchData()} closeDialog={() => {
                setDeleteDialog(false);
            }} getSl_no={() => props.getSl_no()} handleIsBackdropOpen={(mode) => {
                setIsBackdropOpen(mode);
            }} />
            <Backdrop className={classes.backdrop} open={isBackdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

function Search(props) {

    const [isEntered, setIsEntered] = useState(false);

    return (
        <Grid container>
            <Paper elavation={0}>
                <TextField size='small' height='5.5ch' id="filled-search" label="Search Customer ID" type="search" variant="filled" onChange={(event) => {
                    const value = event.target.value;
                    console.log(value);
                    if (value?.length === 9) {
                        axios({
                            url: '/AdvancedSearch',
                            method: 'get',
                            baseURL: 'http://localhost:8080/hrcservlet/',
                            params: {
                                doc_id: null,
                                invoice_id: null,
                                cust_number: value,
                                buisness_year: null,
                            }
                        }).then((res) => {
                            const data = res.data;
                            props.setTableData(data);
                            setIsEntered(true);
                        })
                    }
                    else {
                        if (isEntered) {
                            props.fetchData();
                            setIsEntered(false);
                        }
                    }
                }}/>
            </Paper>
        </Grid>
    );
}

export default function TableView(props) {

    const classes = useStyles();

    const headerArray = ['Sl no', 'Business Code', 'Customer Number', 'Clear Date', 'Business Year', 'Document ID', 'Posting Date', 'Document Create Date', 'Due Date', 'Invoice Currency', 'Document Type', 'Posting ID', 'Total Open Amount', 'Baseline Create Date', 'Customer Payment Terms', 'Invoice ID', 'Predicted']

    const dataArray = ['sl_no', 'business_code', 'cust_number', 'clear_date', 'buisness_year', 'doc_id', 'posting_date', 'document_create_date', 'due_in_date', 'invoice_currency', 'document_type', 'posting_id', 'total_open_amount', 'baseline_create_date', 'cust_payment_terms', 'invoice_id', 'predicted'];

    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isSelected, setIsSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isAnySelected, setIsAnySelected] = useState(false);
    const [colSort, setColSort] = useState(dataArray[0]);
    const [sortMode, setSortMode] = useState('ASC');
    const [isBackdropOpen, setIsBackdropOpen] = useState(false);


    function fetchData() {
        fetch("http://localhost:8080/hrcservlet/GetData").then(async (res) => {
            const data = await res.json();
            setTableData(data);

            const rowsCollection = new Array(data.length).fill(false);
            setIsSelected(rowsCollection);
            props.closeBackdrop();
        })
    }

    function setAdvancedSearchData(searchedData) {
        setTableData(searchedData);
    }

    function applySort(col, sort_mode) {
        setIsBackdropOpen(true);
        axios({
            url: '/SortData',
            method: 'get',
            baseURL: 'http://localhost:8080/hrcservlet/',
            params: {
                col, sort_mode
            }
        }).then((res) => {
            const data = res.data;
            setTableData(data);
            setIsBackdropOpen(false);
        })
    }

    function revertSortMode(sort_mode) {
        return sort_mode === 'ASC' ? 'DESC' : 'ASC';
    }

    function handleApplySort(col) {
        let tempSortMode;
        if (col === colSort) {
            tempSortMode = revertSortMode(sortMode);
        }
        
        else {
            setColSort(col);
            tempSortMode = 'ASC';
        }
        setSortMode(tempSortMode);
        applySort(col, tempSortMode);
    }

    function getSl_no() {
        let tempSl_no = [];
        tableData.map((element, index) => {
            if (isSelected[index]) tempSl_no.push(element['sl_no']);
        })
        return tempSl_no;
    }

    function handleCheckboxCount() {
        return isSelected.reduce((accumulator, number) => accumulator + number, 0)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
    };

    function handleCheckedAll(event, checkedAll) {
        const temp = checkedAll ? new Array(tableData.length).fill(true) : new Array(tableData.length).fill(false);
        setIsSelected(temp);
        setIsAllSelected(checkedAll);
        setIsAnySelected(true);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
    }, [tableData])


    useEffect(() => {
    }, [isAnySelected])

    useEffect(() => {
        if (handleCheckboxCount() === tableData.length && tableData.length !== 0) setIsAllSelected(true);
    }, [isSelected])


    return (
        !props.isBackdropOpen &&
        <div className={classes.root} style={{ backgroundColor: '#283D4A', minHeight: '75vh' }}>
            {/* <Paper className={classes.paper}> */}
                <Backdrop className={classes.backdrop} open={isBackdropOpen}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            <Grid
                container
                direction="row"
                style={{ marginBottom: '1.5rem' }}
            >
                <Grid item xs={5}>
                        <LeftButtonGroup setSortModeDefault={() => setSortMode('ASC')} setAdvancedSearchData={e => setAdvancedSearchData(e)} />
                </Grid>
                <Grid item xs={2} style={{ marginTop: '1.2rem' }}>
                        <Search setTableData={(data) => setTableData(data)} fetchData={ () => fetchData()}/>
                </Grid>
                <Grid item xs={5}>
                        <RightButtonGroup setSortModeDefault={() => setSortMode('ASC')} handleCheckboxCount={() => handleCheckboxCount()} getSl_no={() => getSl_no()} fetchData={() => fetchData()} />
                </Grid>
            </Grid>

            <TableContainer>
                {
                    tableData.length !== 0 &&
                        <Table className={classes.table} size='small' >
                        <TableHead>
                            <TableRow>
                                <TableCell padding='checkbox'>
                                    {
                                        isAllSelected ?
                                            <Checkbox
                                                checked={true}
                                                id="checkedAll"
                                                onChange={handleCheckedAll}
                                            /> : <Checkbox
                                                indeterminate={isSelected.reduce((accumulator, number) => accumulator || number, false)}
                                                id="checkedAll"
                                                onChange={handleCheckedAll}
                                            />
                                    }
                                </TableCell>
                                        {/* <TableSortLabel> */}
                                {
                                            headerArray.map((element, index) => <TableCell onClick={() => {
                                                handleApplySort(dataArray[index]);
                                            }} key={index} classes={{
                                        root: classes.tablecellHead,
                                    }}
                                            ><span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>{element}
                                                    {
                                                        dataArray[index] === colSort ? sortMode === 'ASC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                                                    }
                                                    </span></TableCell>)
                                            }
                                        {/* </TableSortLabel> */}
                            </TableRow>
                        </TableHead>
                        <TableBody> {
                            tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((element, index) => <TableRow key={page * rowsPerPage + index} style={{ height: 30 }}
                            >
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        id={String(page * rowsPerPage + index)}
                                        checked={isSelected[page * rowsPerPage + index]}
                                        onChange={(event, checkedEvent) => {

                                            let tempSelectedRow = [...isSelected];
                                            tempSelectedRow[page * rowsPerPage + index] = checkedEvent;
                                            setIsSelected(tempSelectedRow);
                                            setIsAnySelected(true);

                                            if (isSelected.reduce((accumulator, number) => accumulator && number, true) && checkedEvent) setIsAllSelected(true);
                                            if (!checkedEvent) setIsAllSelected(false);
                                        }}
                                    />
                                </TableCell>
                                {
                                    dataArray.map((rowElement, idx) => <TableCell classes={{
                                        root: classes.tablecell,
                                    }}
                                        key={idx}
                                    > {element[rowElement] ? element[rowElement] : '-'}</TableCell>)
                                }

                            </TableRow>)
                        }
                        </TableBody>
                    </Table>
                }

            </TableContainer>
            {
                tableData.length !== 0 &&
                <TablePagination style={{ color: '#fff' }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
            }
            {/* </Paper> */}
        </div>
    );
}