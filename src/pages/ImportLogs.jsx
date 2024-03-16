import { Autocomplete, Box, Button, Card, Chip, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFileDownload } from "react-icons/md";
import { exportImportLogFile, getImportLogsData } from "../stores/importLogs";

const initialImportLogsQueries = {
    search: '',
    paginationModel: { pageSize: 10, page: 0 },
    sortModel: []
}

const importLogsQueryReducer = (state, { type, payload }) => {
    switch (type) {
        case "search":
            return { ...state, search: payload };
        case "paginationModel":
            return { ...state, paginationModel: payload };
        case "sortModel":
            return { ...state, sortModel: payload };
        default:
            return state;
    }
};



const ImportLogs = () => {
    const { importLogs } = useSelector(({ importLogsReducer }) => importLogsReducer);
    const [importLogsQueries, dispatchImportLogsQueries] = useReducer(importLogsQueryReducer, initialImportLogsQueries);
    const filterRef = useRef(null)
    const dispatch = useDispatch()
    const [rowCount, setRowCount] = useState(0)

    const filterOptions = [
        {
            title: 'Failed', value: 'failed',
        },
        {
            title: 'Completed', value: 'completed',
        },
        {
            title: 'Processing', value: 'processing',
        },
        {
            title: 'Partially Failed', value: 'partiallyFailed',
        },
    ]


    const columns = [
        {
            field: 'modelName', headerName: 'Model Name', flex: 1, editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'createdAt', headerName: 'Created At', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center',
            valueGetter: ({ row }) => formatDate(row.createdAt)
        },
        {
            field: 'updatedAt', headerName: 'Updated At', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center',
            valueGetter: ({ row }) => formatDate(row.createdAt)
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => (
                <Chip label={getChipText(row.status)} color={getChipColor(row.status)} />
            )
        },
        {
            field: 'importedFile', headerName: 'Imported File', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center', sortable: false,
            renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    row.importedFileUrl &&
                    <IconButton
                        variant="tonal"
                        onClick={() => dispatch(exportImportLogFile('import', row))}
                    >
                        <MdFileDownload />
                    </IconButton>
                }
            </Box >
        },
        {
            field: 'errorFile', headerName: 'Error File', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center', sortable: false,
            renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    row.errorLogsUrl &&
                    <IconButton
                        variant="tonal"
                        onClick={() => dispatch(exportImportLogFile('error', row))}
                    >
                        <MdFileDownload />
                    </IconButton>
                }
            </Box >
        },

    ];

    const formatDate = value => {
        const date = new Date(value)

        const options = { day: 'numeric', month: 'long', year: 'numeric' }

        const formattedDate = date.toLocaleString('en-US', options)
        const parts = formattedDate.split(" ")

        return `${parts[1].split(',')[0]} ${parts[0]} ${parts[2]}`
    }

    const getChipColor = status => {
        switch (status) {
            case ' completed':
                return "success"
            case 'failed':
                return "error"
            case 'processing':
                return "info"
            case 'partiallyFailed':
                return "warning"
        }
    }

    const getChipText = status => {
        switch (status) {
            case ' completed':
                return "Completed"
            case 'failed':
                return "Failed"
            case 'processing':
                return "Processing"
            case 'partiallyFailed':
                return "Partially Failed"
        }
    }

    const fetchImportLogs = async () => {
        const filter = filterRef.current.querySelector('input').value;
        const { search, paginationModel, sortModel } = importLogsQueries

        const options = {
            filter: filter && { status: filter } || {},
            search: search || "",
            page: paginationModel.page + 1 || 1,
            limit: paginationModel.pageSize || 10,
            sort: sortModel.length ? sortModel[0].field : "",
            sortOrder: sortModel.length ? sortModel[0].sort : "",
        }


        const res = await dispatch(getImportLogsData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    useEffect(() => {
        fetchImportLogs()
    }, [importLogsQueries])


    return (
        <Box>
            <Card elevation={4} sx={{ padding: '1rem', margin: '1rem' }} >

                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <Autocomplete
                        ref={filterRef}
                        sx={{ flexGrow: 1 }}
                        size="small"
                        variant="outlined"
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        options={filterOptions}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Status..." />}
                        onChange={(_, __, r) => r === 'clear' && fetchImportLogs()}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={fetchImportLogs}
                    >
                        Fetch Logs
                    </Button>
                </Stack>

            </Card >
            <Card elevation={4} sx={{ margin: '1rem' }}>
                <div className="table-container">
                    <div className="table-header-section">
                        <div className="search-and-items-per-page">
                            <div className="search-field">
                                <TextField
                                    value={importLogsQueries.search}
                                    variant="outlined"
                                    placeholder="Search..."
                                    size="small"
                                    onChange={(e) => dispatchImportLogsQueries({ type: 'search', payload: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-wrapper">
                    <DataGrid
                        columns={columns}
                        rows={importLogs}
                        getRowId={(row) => row._id}
                        disableColumnMenu
                        paginationMode="server"
                        sortingMode="server"
                        rowCount={rowCount}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        paginationModel={importLogsQueries.paginationModel}
                        onPaginationModelChange={(payload) => dispatchImportLogsQueries({ type: 'paginationModel', payload })}
                        sortModel={importLogsQueries.sortModel}
                        onSortModelChange={(payload) => dispatchImportLogsQueries({ type: 'sortModel', payload })}
                    />
                </div>
            </Card>
        </Box >
    )
}

export default ImportLogs