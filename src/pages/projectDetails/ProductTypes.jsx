import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { addProductTypeData, deleteMultiProductData, deleteProductTypeData, getProductTypesData, updateProductTypesData } from '../../stores/productTypes'
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"

const initialFormData = {
    mainCategory: "",
    masterCategory: "",
    subCategory: ""
}
const ProductTypes = () => {
    const dispatch = useDispatch()
    const productTypes = useSelector(({ productTypesReducer }) => productTypesReducer.productTypes)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)


    const columns = [
        {
            field: 'masterCategory', headerName: 'Master Category', flex: 1, editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'mainCategory', headerName: 'Main Category', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'subCategory', headerName: 'Sub Category', flex: 1, editable: false,
            headerAlign: 'center',
            align: 'center',
        }
    ];


    const formConfig = {
        formHeader: "Product Types",
        formRef: "ProductTypes",
        formFields: [
            {
                type: "text",
                key: "masterCategory",
                label: "Master Category*",
                placeholder: "Master Category*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "mainCategory",
                label: "Main Category*",
                placeholder: "Main Category*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "subCategory",
                label: "Sub Category*",
                placeholder: "sub Category*",
                validations: ["required"],
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

        const res = await dispatch(getProductTypesData(options))

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

        console.log(productTypes)


    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiProductData({ ids }))
        await fetchData(queriesRef.current)
    }

    const deleteProductType = async (data = {}) => {
        await dispatch(deleteProductTypeData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {
        if (Object.keys(data).length < 3) return
        if (!data._id) {
            await dispatch(addProductTypeData(data))
        } else {
            await dispatch(updateProductTypesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "ProductTypes", file: data }));

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
            Product Types
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
                rows={productTypes}
                addDataText='ADD PRODUCT TYPE'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={deleteProductType}
                tableName='ProductTypes'
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default ProductTypes