import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { clone } from "lodash"
import { addPipeFittingTypesData, deleteMultiPipeFittingTypesData, deletePipeFittingTypesData, getPipeFittingTypesData, updatePipeFittingTypesData } from "../../stores/pipeFittingTypes"


const initialFormData = {
    description: "",
    numberOfConnections: '',
    notes: ''
}

const PipeFittingTypes = () => {
    const dispatch = useDispatch()
    const { pipeFittingTypes: items } = useSelector((store) => store.pipeFittingTypesReducer)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)

    const columns = [
        {
            field: 'description',
            headerName: 'DESCRIPTION',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'numberOfConnections',
            headerName: 'NO. OF CONNECTIONS (0,1,2,3 MAX)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'notes',
            headerName: 'NOTES',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        }
    ];

    const formConfig = {
        formHeader: "Material Types",
        formRef: "PipeParameters",
        formFields: [
            {
                type: "text",
                key: "description",
                label: "Description*",
                placeholder: "Description*",
                validations: ["required"],
            },
            {
                type: "autocomplete",
                key: "numberOfConnections",
                label: "No. of Connections*",
                placeholder: "No. of Connections*",
                items: ["0", "1", "2", "3"],
                validations: ["required"],
                defaultValue: '',
            },
            {
                type: "textarea",
                key: "notes",
                label: "Notes*",
                placeholder: "Notes",
            },
        ],
    }

    const fetchData = async (data) => {
        queriesRef.current = data
        const { search, paginationModel, sortModel } = data

        const options = {
            search: search || "",
            page: paginationModel?.page + 1 || 1,
            limit: paginationModel?.pageSize || 10,
            sort: sortModel?.length ? sortModel[0].field : "",
            sortOrder: sortModel?.length ? sortModel[0].sort : "",
        }

        const res = await dispatch(getPipeFittingTypesData(options))
        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiPipeFittingTypesData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deletePipeFittingTypesData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addPipeFittingTypesData(data))
        } else {
            await dispatch(updatePipeFittingTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "PipeFittingTypes", file: data }));
    }

    const openForm = (data = initialFormData) => {
        const formData = clone(data)

        setFormData(formData)
        setShowForm(true)
    }

    const closeForm = (() => {
        setShowForm(false)
        setFormData(initialFormData)
    })

    console.log(items)

    return <>
        <div className="table-header">
            Pipe Fitting Types
            <Dialog open={showForm} >
                {showForm && <CustomForm
                    formData={formData}
                    formConfig={formConfig}
                    handleSubmitClicked={handleSubmitClicked}
                    handleCancelClicked={closeForm}
                />}
            </Dialog>
        </div>
        <div>
            <CustomTable
                openForm={openForm}
                columns={columns}
                rows={items}
                addDataText='ADD FIELD'
                tableName='PipeFittingTypes'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default PipeFittingTypes