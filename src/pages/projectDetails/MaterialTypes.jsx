import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { addMaterialTypesData, deleteMaterialTypesData, deleteMultiMaterialTypesData, getMaterialTypesData, updateMaterialTypesData } from "../../stores/materialTypes"

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

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

        console.log(materialTypes)


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
        if (Object.keys(data).length < 2) return
        if (!data._id) {
            await dispatch(addMaterialTypesData(data))
        } else {
            await dispatch(updateMaterialTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "MaterialTypes", file: data }));
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
            />
        </div>

    </>
}

export default MaterialTypes