import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { clone } from "lodash"
import { addValveParametersData, deleteMultiValveParametersData, deleteValveParametersData, getValveParametersData, updateValveParametersData } from "../../stores/valveParameters"


const initialFormData = {
    description: "",
    type: '',
    isMandatory: false,
    notes: ''
}

const ValveParameters = () => {
    const dispatch = useDispatch()
    const { valveParameters: items } = useSelector((store) => store.valveParametersReducer)
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
            field: 'type',
            headerName: 'TYPE',
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
        },
        {
            field: 'isMandatory',
            headerName: 'IS Mandatory',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => (
                row.isMandatory ? 'True' : 'False'
            )
        },
    ];

    const formConfig = {
        formHeader: "Material Types",
        formRef: "ValveParameters",
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
                key: "type",
                label: "Type*",
                placeholder: "Type*",
                items: [
                    {
                        text: "Date",
                        value: "Date",
                    },
                    {
                        text: "Text",
                        value: "Text",
                    },
                    {
                        text: "Number",
                        value: "Number",
                    },
                    {
                        text: "Boolean(Y/N)",
                        value: "Boolean",
                    },
                    {
                        text: "Image",
                        value: "Image",
                    },

                ],
                itemText: "text",
                itemValue: "value",
                validations: ["required"],
                defaultValue: '',
            },
            {
                key: 'isMandatory',
                type: "boolean",
                label: "Mandatory",
                placeholder: "Mandatory",
            },
            {
                type: "textarea",
                key: "notes",
                label: "Notes",
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

        const res = await dispatch(getValveParametersData(options))
        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiValveParametersData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deleteValveParametersData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addValveParametersData(data))
        } else {
            await dispatch(updateValveParametersData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "ValveParameters", file: data }));
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
            Valves Parameters
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
                tableName='ValveParameters'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default ValveParameters