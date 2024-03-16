import { Box, Button, Card, IconButton, Menu, MenuItem, Stack, TextField } from "@mui/material"
import { useEffect, useReducer, useRef, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { TbTableDown, TbTableImport } from "react-icons/tb";
import SampleFileBtn from "./SampleFileBtn";
import { DataGrid } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { createPortal } from "react-dom";

const initialQueries = {
    search: '',
    paginationModel: { pageSize: 10, page: 0 },
    sortModel: [],
}

const queryReducer = (state, { type, payload }) => {
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

const CustomTable = ({ columns = [], rows = [], rowCount = 0, tableName = '', fetchData, addDataText, deleteAllCicked, deleteRowClicked, openForm, importBtnClicked, handleExportOptionClicked }) => {
    const [queries, dispatchQueries] = useReducer(queryReducer, initialQueries);
    const [anchorEl, setAnchorEl] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const importFilePicker = useRef(null)

    const open = Boolean(anchorEl);

    const actionOptions = [
        {
            title: 'Edit',
            value: 'edit',
            prependIcon: 'mdi-pencil',
        },
        {
            title: 'Delete',
            value: 'delete',
            prependIcon: 'mdi-delete-outline',
        },
    ]

    const actionColumn = {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        editable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row, rowIndex }) => {
            const [anchorElActions, setAnchorElActions] = useState(null);

            const handleOpenMenu = (event) => {
                setAnchorElActions(event.currentTarget);
            };

            const handleCloseMenu = () => {
                setAnchorElActions(null);
            };

            const handleMenuItemClick = (actionType, value) => {
                if (actionType === 'delete') {
                    deleteRowClicked(value)
                } else {
                    handleCloseMenu()
                    console.log(value)
                    openForm(value)
                }
            };

            return (
                <Box>
                    <IconButton
                        aria-label="more"
                        aria-controls={`menu-${rowIndex}`}
                        aria-haspopup="true"
                        onClick={handleOpenMenu}
                    >
                        <HiOutlineDotsVertical />
                    </IconButton>
                    <Menu
                        id={`menu-${rowIndex}`}
                        anchorEl={anchorElActions}
                        open={Boolean(anchorElActions)}
                        onClose={handleCloseMenu}
                        PaperProps={{
                            elevation: 1,
                        }}
                    >
                        {actionOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                onClick={() => handleMenuItemClick(option.value, row)}
                            >
                                {option.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            );
        },
    };

    const exportOptions = [
        {
            title: '.xlsx',
            value: 'xlsx',
        },
        {
            title: '.csv',
            value: 'csv',
        },
    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImportClicked = data => {
        importFilePicker.current.click()
    }

    const isSupportedFile = filename => {
        const lowerCaseFilename = filename.toLowerCase()

        return (
            lowerCaseFilename.endsWith('.xlsx') ||
            lowerCaseFilename.endsWith('.xls') ||
            lowerCaseFilename.endsWith('.csv')
        )
    }

    const handleFileImport = e => {
        const fileToImport = e.target.files[0]

        if (!fileToImport) return

        if (!isSupportedFile(fileToImport.name)) {
            alert("invalid file type")
        } else {
            importBtnClicked(fileToImport)
        }
    }

    const exportOptionClicked = (format) => {
        const { search, sortModel } = queries

        handleExportOptionClicked({
            format,
            search: search || "",
            sort: sortModel?.length ? sortModel[0].field : "",
            sortOrder: sortModel?.length ? sortModel[0].sort : "",
        })

        handleClose()

    }

    useEffect(() => {
        fetchData(queries)
    }, [queries])

    return (
        <Card elevation={4} sx={{ margin: '1rem' }}>
            <>

                {createPortal(
                    <input
                        ref={importFilePicker}
                        type="file"
                        className="import-input"
                        onInput={handleFileImport}
                    />,
                    document.body
                )}


                <div className="table-container">
                    <div className="table-header-section">
                        <div className="search-and-items-per-page">
                            <div className="search-field">
                                <TextField
                                    value={queries.search}
                                    variant="outlined"
                                    placeholder="Search..."
                                    size="small"
                                    onChange={(e) => dispatchQueries({ type: 'search', payload: e.target.value })}
                                />
                            </div>
                        </div>
                        <Stack justifyContent={'flex-end'} direction={'row'} spacing={2} flexWrap={'wrap'} className="buttons-wrapper full" >
                            <Button
                                variant="contained"
                                disabled={rowSelectionModel.length === 0}
                                startIcon={<MdDelete />}
                                onClick={() => deleteAllCicked(rowSelectionModel, queries)}
                            >
                                DELETE
                            </Button>
                            <SampleFileBtn tableName={tableName} />
                            <Button onClick={handleImportClicked} startIcon={<TbTableImport />} >
                                IMPORT
                            </Button>
                            <Button
                                id="export-button"
                                aria-controls={open ? 'export-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                startIcon={<TbTableDown />}
                                onClick={handleClick}
                            >
                                EXPORT
                            </Button>
                            <Menu
                                id="export-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                {
                                    exportOptions.map(({ title, value }) => {
                                        return <MenuItem key={value} onClick={() => exportOptionClicked(value)}>{title} </MenuItem>
                                    })
                                }

                            </Menu>


                            <Button variant="contained" onClick={() => openForm()} startIcon={<MdAdd />}>
                                {addDataText}
                            </Button>
                        </Stack>
                    </div>
                    <div className="table-wrapper">
                        <DataGrid
                            checkboxSelection={!!columns.length}
                            columns={[...columns, actionColumn]}
                            rows={rows}
                            getRowId={(row) => row._id}
                            disableColumnMenu
                            disableRowSelectionOnClick
                            paginationMode="server"
                            sortingMode="server"
                            rowCount={rowCount}
                            pageSizeOptions={[5, 10, 25, 50, 100]}

                            paginationModel={queries.paginationModel}
                            onPaginationModelChange={(payload) => dispatchQueries({ type: 'paginationModel', payload })}

                            sortModel={queries.sortModel}
                            onSortModelChange={(payload) => dispatchQueries({ type: 'sortModel', payload })}

                            rowSelectionModel={rowSelectionModel}
                            onRowSelectionModelChange={setRowSelectionModel}
                        />
                    </div>
                </div>
            </>
        </Card>
    )
}

export default CustomTable