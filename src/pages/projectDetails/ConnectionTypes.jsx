import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { addConnectionTypesData, deleteConnectionTypesData, deleteMultiConnectionTypesData, getConnectionTypesData, updateConnectionTypesData } from "../../stores/connectionTypes"

const initialFormData = {
    name: "",
    code: "",
}

const MaterialTypes = () => {
    const dispatch = useDispatch()
    const { connectionTypes: items } = useSelector((store) => store.connectionTypesReducer)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)

    const columns = [
        {
            field: 'name',
            headerName: 'Connection Type Name',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'code',
            headerName: 'Connection Type Code (Max. 8 Characters)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const formConfig = {
        formHeader: "Connection Types",
        formRef: "ConnectionTypes",
        formFields: [
            {
                type: "text",
                key: "name",
                label: "Connection Name*",
                placeholder: "Connection Name*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "code",
                label: "Connection Type Code*",
                placeholder: "Connection Type Code*",
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

        const res = await dispatch(getConnectionTypesData(options))

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

        console.log(items)


    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiConnectionTypesData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deleteConnectionTypesData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {
        if (Object.keys(data).length < 2) return
        if (!data._id) {
            await dispatch(addConnectionTypesData(data))
        } else {
            await dispatch(updateConnectionTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "ConnectionTypes", file: data }));
    }

    const openForm = (data = initialFormData) => {
        setFormData(data)
        setShowForm(true)
    }

    const closeForm = (() => {
        setFormData(initialFormData)
        setShowForm(false)
    })

    return <>
        <div className="table-header">
            Connection Types
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
                addDataText='ADD Type'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                tableName='MaterialTypes'
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default MaterialTypes