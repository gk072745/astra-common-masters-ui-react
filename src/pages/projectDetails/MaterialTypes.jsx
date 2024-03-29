import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { addMaterialTypesData, deleteMaterialTypesData, deleteMultiMaterialTypesData, getMaterialTypesData, updateMaterialTypesData } from "../../stores/materialTypes"
import { exportTables, importData } from "../../stores/importAndExport"
import * as yup from 'yup'

const formDataInitial = {
    name: "",
    code: ""
}

const MaterialTypes = () => {
    const dispatch = useDispatch()
    const materialTypes = useSelector(({ materialTypesReducer }) => materialTypesReducer.materialTypes)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(formDataInitial)

    const columns = [
        {
            field: 'name',
            headerName: 'Material Type Name',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'code',
            headerName: 'Material Type Code (Max. 3 Characters)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const formConfig = {
        formHeader: "Material Types",
        formRef: "materialTypes",
        formFields: [
            {
                type: "text",
                key: "name",
                label: "Material Name*",
                placeholder: "Material Name*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "code",
                label: "Material Type Code*",
                placeholder: "Material Type Code*",
                validations: [
                    "required",
                    v =>
                        (v && v.length <= 3) || "Field must be 3 characters or less",
                ],
            },
        ],
        formValidations: {
            name: yup.string().required('Name is required.'),
            code: yup.string().required('Code is required.')
                .max(3, 'Code must be a maximum of 3 characters.')
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

        const res = await dispatch(getMaterialTypesData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiMaterialTypesData({ ids }))
        await fetchData(queriesRef.current)
    }

    const deleteProductType = async (data = {}) => {
        await dispatch(deleteMaterialTypesData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addMaterialTypesData(data))
        } else {
            await dispatch(updateMaterialTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        const res = await dispatch(importData({ modalName: "MaterialTypes", file: data }));
        console.log(res)
    }

    const handleExportOptionClicked = async (data) => {
        await dispatch(exportTables({ type: 'MaterialTypes', ...data }))
    }

    const openForm = (data = formDataInitial) => {
        setFormData(data)
        setShowForm(true)
    }

    const closeForm = (() => {
        setFormData(formDataInitial)
        setShowForm(false)
    })

    return <>
        <div className="table-header">
            Material Types
        </div>
        <div>

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
                rows={materialTypes}
                addDataText='ADD Type'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={deleteProductType}
                tableName='MaterialTypes'
                importBtnClicked={handleImportBtnClicked}
                handleExportOptionClicked={handleExportOptionClicked}
            />
        </div>

    </>
}

export default MaterialTypes