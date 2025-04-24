var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Divider, Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useMemo, useState } from 'react';
import { POST, UPLOADCSV } from '../../helpers/fetchApi';
import AttachFileIcon from '@mui/icons-material/AttachFile';
const columns = [
    {
        id: 'existsInDB',
        label: "Status",
        type: "boolean",
    },
    {
        id: 'system_transaction_id',
        label: "System Transaction ID",
        type: "string",
    },
    {
        id: 'amount',
        label: "Amount",
        type: "number"
    }
];
function UploadPage() {
    var _a;
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect (0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [apiMessage, setApiMessage] = useState("");
    const [orderBy, setOrderBy] = useState(null);
    const [totalData, setTotalData] = useState(0);
    const [order, setOrder] = useState({
        order: "asc",
        sortType: "string",
    });
    const [searchData, setSearchData] = useState({
        system_transaction_id: "",
    });
    const onSort = (dataName, dataType) => {
        console.log('dataType:', dataType);
        console.log('dataName:', dataName);
        const isAscending = order.order === "asc" ? "desc" : "asc";
        //const arrow = order.order === "asc" ? 1 : 0;
        setOrder((prev) => (Object.assign(Object.assign({}, prev), { order: isAscending, sortType: dataType })));
        setOrderBy(dataName);
    };
    const onSearchChange = (event) => {
        setSearchData((prev) => (Object.assign(Object.assign({}, prev), { [event.target.name]: event.target.value })));
    };
    const sortCompare = (a, b, dataType) => {
        if (dataType === "string") {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        }
        // if (dataType === "date") {
        //   return new Date(a as string).valueOf() - new Date(b as string).valueOf();
        // }
        return a - b;
    };
    const dataList = useMemo(() => {
        console.log('searchData.system_transaction_id:', searchData.system_transaction_id);
        const filterData = data
            .filter((f) => {
            if (searchData.system_transaction_id) {
                return f.system_transaction_id.toLowerCase().startsWith(searchData.system_transaction_id.toLowerCase());
            }
            return f;
        });
        const result = filterData.sort((a, b) => {
            if (orderBy) {
                if (order.order === "asc") {
                    return sortCompare(a[orderBy], b[orderBy], order.sortType);
                }
                return sortCompare(b[orderBy], a[orderBy], order.sortType);
            }
            return 0;
        });
        setTotalData(filterData.length);
        const startItem = page * rowsPerPage;
        const endItem = startItem + rowsPerPage;
        return result.slice(startItem, endItem);
    }, [
        JSON.stringify(data),
        page,
        orderBy,
        order.order,
        JSON.stringify(searchData),
        rowsPerPage,
    ]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // console.log('newPage:', newPage)
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        // console.log('+event.target.value:', +event.target.value)
        setPage(0);
    };
    const handleGetCSV = (event) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };
    const handleUploadCSV = () => __awaiter(this, void 0, void 0, function* () {
        setApiMessage("Uploading...");
        const formdata = new FormData;
        formdata.append("file", file);
        // console.log("Handle Upload is called")
        try {
            const res = yield POST(UPLOADCSV, formdata, true);
            if (res.data) {
                console.log("API called is succesful");
                setApiMessage(res.message);
                setData(res.data);
                setTotalData(data.length);
            }
            else {
                setApiMessage(`API called is succesful, but backend responded with [${res.message}], Are you sure the uploaded file is valid?`);
                console.log("Data from Backend is missing!");
            }
        }
        catch (error) {
            console.log("error : ", error);
        }
    });
    return (_jsxs("div", { className: 'upload', children: [_jsxs(Paper, { variant: "elevation", className: 'upload-border', children: [_jsx(Typography, { variant: 'h4', textAlign: 'left', padding: 2, children: "Upload CSV" }), _jsx(Divider, { textAlign: "center", children: _jsx(Typography, { variant: 'h6', textAlign: 'left', padding: 2, children: "Assign File" }) }), _jsx("div", { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: 4, children: _jsxs(Button, { component: "label", startIcon: _jsx(AttachFileIcon, {}), variant: "outlined", size: "large", className: 'assign-button', children: [_jsx(Typography, { variant: 'h4', textAlign: 'center', children: "Assign CSV" }), _jsx(VisuallyHiddenInput, { type: "file", onChange: (event) => handleGetCSV(event), multiple: true })] }) }), _jsx(Grid, { size: 8, children: _jsx(Typography, { variant: 'h4', textAlign: 'center', align: 'center', className: 'upload-button', children: (_a = file === null || file === void 0 ? void 0 : file.name) !== null && _a !== void 0 ? _a : "Please assign the csv file." }) })] }) }), _jsx(Divider, { textAlign: "center", children: _jsx(Typography, { variant: 'h6', textAlign: 'left', padding: 2, children: "Upload File" }) }), _jsx("div", { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: 8, children: _jsx(Typography, { variant: 'h4', textAlign: 'center', align: 'center', className: 'upload-button', children: apiMessage }) }), _jsx(Grid, { size: 4, children: _jsx(Button, { component: "label", startIcon: _jsx(CloudUploadIcon, {}), variant: "outlined", size: "large", className: 'upload-button', onClick: handleUploadCSV, children: _jsx(Typography, { variant: 'h4', textAlign: 'center', children: "Submit CSV" }) }) })] }) })] }), _jsxs(Paper, { variant: "elevation", className: 'upload-border', sx: { overflow: 'hidden' }, children: [_jsx(TextField, { variant: "outlined", type: "string", name: "system_transaction_id", id: "search", label: "Search for System Transaction ID : ", value: searchData.system_transaction_id, 
                        // onKeyUp={() => setSearchInput()}
                        placeholder: "Please enter System Transaction ID", className: 'upload-button', onChange: onSearchChange }), _jsx(TableContainer, { sx: { maxHeight: 500 }, children: _jsxs(Table, { stickyHeader: true, "aria-label": "sticky table", children: [_jsx(TableHead, { children: _jsx(TableRow, { children: columns.map((columnList, columnIndex) => (_jsx(TableCell, { align: columnList.align, style: { minWidth: columnList.minWidth }, children: _jsx(TableSortLabel, { active: orderBy === columnList.id, direction: order.order, 
                                                // onClick={() => onSort(columnList.id, (columnList.type === "string") ? "string" : (columnList.type === "boolean") ? "boolean" 
                                                //   : (columnList.type === "number") ? "number")}
                                                onClick: () => onSort(columnList.id, columnList.type), children: columnList.label }) }, columnList.id))) }) }), _jsx(TableBody, { children: dataList.map((datalist, datalistIndex) => {
                                        // console.log('datalistIndex:', datalistIndex)
                                        return (_jsx(TableRow, { children: columns.map((column) => {
                                                const value = datalist[column.id];
                                                if (column.id === "existsInDB") {
                                                    // console.log('column.id:', column.id)
                                                    // console.log('column.id:', datalist.system_transaction_id)
                                                    // console.log('value:', value)
                                                    switch (value) {
                                                        case true: {
                                                            return (_jsx(TableCell, { align: column.align, children: _jsx(Box, { sx: {
                                                                        width: 100,
                                                                        height: 30,
                                                                        borderRadius: 5,
                                                                        bgcolor: 'rgba(20, 233, 38, 0.2)', // 
                                                                        color: '#7DDA58',
                                                                    }, children: _jsx(Typography, { variant: 'subtitle1', component: "div", textAlign: 'center', children: "Matched" }) }) }, column.id));
                                                        }
                                                        case false: {
                                                            return (_jsx(TableCell, { align: column.align, children: _jsx(Box, { sx: {
                                                                        width: 120,
                                                                        height: 30,
                                                                        borderRadius: 5,
                                                                        bgcolor: 'rgba(255, 89, 89, 0.5)',
                                                                        color: '#D20103',
                                                                    }, children: _jsx(Typography, { variant: 'subtitle1', component: "div", textAlign: 'center', children: "Not Matched" }) }) }, column.id));
                                                        }
                                                    }
                                                }
                                                return (_jsx(TableCell, { align: column.align, children: value }, column.id));
                                            }) }, datalistIndex));
                                    }) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [10, 25, 100, 250, 500], component: "div", count: totalData, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] })] }));
}
export default UploadPage;
