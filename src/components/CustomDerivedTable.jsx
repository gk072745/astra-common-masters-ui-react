import { Box, Button, Card, IconButton, Menu, MenuItem, Stack, TextField } from "@mui/material"
import { useEffect, useReducer, useRef, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { TbTableDown, TbTableImport } from "react-icons/tb";
import SampleFileBtn from "./SampleFileBtn";
import { DataGrid } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { createPortal } from "react-dom";
import CustomTable from "./CustomTable";

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

const CustomDerivedTable = ({ openForm, columns, rows, addDataText, tableName, rowCount, fetchData, deleteAllCicked, deleteRowClicked, importBtnClicked, handleExportOptionClicked }) => {
    const [multipackDialog, setMultipackDialog] = useState(false)



    return <>
        <div>
            <CustomTable
                openForm={openForm}
                columns={columns}
                rows={rows}
                addDataText={addDataText}
                tableName={tableName}
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={deleteAllCicked}
                deleteRowClicked={deleteRowClicked}
                importBtnClicked={importBtnClicked}
                handleExportOptionClicked={handleExportOptionClicked}
                multipackBtn={
                    <Button
                        variant="contained"
                        onClick={() => setMultipackDialog(true)}
                    >
                        MULTIPACK LIST
                    </Button>
                }
            />
        </div>

    </>

}

export default CustomDerivedTable