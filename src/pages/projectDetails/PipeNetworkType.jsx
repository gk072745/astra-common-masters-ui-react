import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { addGenericPipeSystemsData, deleteGenericPipeSystemsData, deleteMultiGenericPipeSystemsData, getGenericPipeSystemsData, updateGenericPipeSystemsData } from "../../stores/genericPipeSystems"
import { getMasterPipesData } from "../../stores/masterPipes"
import { clone } from "lodash"
import { addPipeNetworkTypesData, deleteMultiPipeNetworkTypesData, deletePipeNetworkTypesData, getPipeNetworkTypesData, updatePipeNetworkTypesData } from "../../stores/pipeNetworkTypes"


const initialFormData = {
    name: "",
    code: "",
}
const PipeNetworkType = () => {
    const dispatch = useDispatch()
    const { pipeNetworkTypes: items } = useSelector((store) => store.pipeNetworkTypesReducer)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)

    const columns = [
        {
            field: 'name',
            headerName: 'Pipe Network Type Name',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'code',
            headerName: 'Pipe Network Type Code (Max. 8 Characters)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const formConfig = {
        formHeader: "Pipe Network Types",
        formRef: "Pipe NetworkTypes",
        formFields: [
            {
                type: "text",
                key: "name",
                label: "Pipe Network Name*",
                placeholder: "Pipe Network Name*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "code",
                label: "Pipe Network Type Code*",
                placeholder: "Pipe Network Type Code*",
                validations: [
                    "required",
                    v =>
                        (v && v.length <= 3) || "Field must be 3 characters or less",
                ],
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

        const res = await dispatch(getPipeNetworkTypesData(options))

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiPipeNetworkTypesData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deletePipeNetworkTypesData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addPipeNetworkTypesData(data))
        } else {
            await dispatch(updatePipeNetworkTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "PipeNetworkTypes", file: data }));
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



    return <>
        <div className="table-header">
            Pipe Network Types
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
                addDataText='ADD PIPE NETWORK TYPE'
                tableName='PipeNetworkTypes'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default PipeNetworkType