import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { clone } from "lodash"
import { addPlumbingFixtureParametersData, deleteMultiPlumbingFixtureParametersData, deletePlumbingFixtureParametersData, getPlumbingFixtureParametersData, updatePlumbingFixtureParametersData } from "../../stores/plumbingFixtureParameters"
import { exportTables, importData } from "../../stores/importAndExport"
import * as yup from 'yup'


const initialFormData = {
    description: "",
    type: '',
    isMandatory: false,
    notes: ''
}

const PlumbingFixtureParameters = () => {
    const dispatch = useDispatch()
    const { plumbingFixtureParameters: items } = useSelector((store) => store.plumbingFixtureParametersReducer)
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
        formValidations: {
            description: yup.string().required('Description is required.'),
            type: yup.string().required('Type is required.'),
            isMandatory: yup.boolean().required('Please select the mandatory option.'),
            notes: yup.string(),
        }
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

        const res = await dispatch(getPlumbingFixtureParametersData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiPlumbingFixtureParametersData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deletePlumbingFixtureParametersData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addPlumbingFixtureParametersData(data))
        } else {
            await dispatch(updatePlumbingFixtureParametersData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        const res = await dispatch(importData({ modalName: "PlumbingFixtureParameters", file: data }));
        console.log(res)
    }

    const handleExportOptionClicked = async (data) => {
        await dispatch(exportTables({ type: 'PlumbingFixtureParameters', ...data }))
    }
    const openForm = (data = initialFormData) => {
        const formData = clone(data)

        setFormData(formData)
        setShowForm(true)
    }

    const closeForm = (() => {
        setFormData(initialFormData)
        setShowForm(false)
    })

    console.log(items)

    return <>
        <div className="table-header">
            Plumbing Fixture Parameters
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
                tableName='PlumbingFixtureParameters'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                importBtnClicked={handleImportBtnClicked}
                handleExportOptionClicked={handleExportOptionClicked}
            />
        </div>

    </>
}

export default PlumbingFixtureParameters