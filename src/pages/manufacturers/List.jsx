import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { clone } from "lodash"
import { exportTables, importData } from "../../stores/importAndExport"
import * as yup from 'yup'
import { addManufacturersData, deleteManufacturersData, deleteMultiManufacturersData, getManufacturersData, updateManufacturersData } from "../../stores/manufacturersList"
import { getCountryData } from "../../stores/country"


const initialFormData = {
    manufacturerName: "",
    manufacturerCode: '',
    country: '',
    unitType: '',
    notes: '',
}


const List = () => {
    const dispatch = useDispatch()
    const { manufacturers: items } = useSelector((store) => store.manufacturersReducer)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)

    const columns = [
        {
            field: 'manufacturerName',
            headerName: 'Manufacturer Name',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'manufacturerCode',
            headerName: 'Manufacturer Code',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'country.country_code',
            headerName: 'Country Code',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            valueGetter: params => params.row.country.country_code,
        },
        {
            field: 'compositeCode',
            headerName: 'Composite Code',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'unitType',
            headerName: 'Unit Type',
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
    ];

    const formConfig = {
        formHeader: "Add a Manufacturer",
        formRef: "manufacturer",
        formFields: [
            {
                type: "text",
                key: "manufacturerName",
                label: "Manufacturer name*",
                placeholder: "Manufacturer name*",
            },
            {
                type: "text",
                key: "manufacturerCode",
                label: "Manufacturer code*",
                placeholder: "Manufacturer code*",
            },
            {
                type: "asyncAutocomplete",
                key: "country",
                label: "Country*",
                placeholder: "Country*",
                itemText: "name",
                itemValue: "_id",
                returnObject: true,
                apiCall: getCountryData,
                validations: ["required"],
            },
            {
                type: "autocomplete",
                key: "unitType",
                label: "Unit Type*",
                validations: ["required"],
                placeholder: "Unit Type",
                items: ["mm", "in"],
            },
            {
                type: "textarea",
                key: 'notes',
                label: "Notes",
                placeholder: "Notes",
            },
        ],
        formValidations: {
            manufacturerName: yup.string().required('Manufacturer Name is required.'),
            manufacturerCode: yup.string().required('Manufacturer Code is required.'),
            country: yup.object().shape({
                _id: yup.string().required('Country ID is required'),
                name: yup.string().required('Country name is required'),
                country_code: yup.string().required('Country code is required'),
                isDisabled: yup.boolean().required('Country disabled status is required')
            }).required('Country details are required'),
            unitType: yup.string().required('Unit Type is required.'),
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

        const res = await dispatch(getManufacturersData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiManufacturersData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deleteManufacturersData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {
        // console.log(data)
        const modifedFormData = {
            ...data,
            compositeCode: `${data.manufacturerCode}_${data.country.country_code}`,
            country: data.country._id,
        }
        // return
        if (!data._id) {
            await dispatch(addManufacturersData(modifedFormData))
        } else {
            await dispatch(updateManufacturersData(modifedFormData))
        }

        closeForm()
        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        const res = await dispatch(importData({ modalName: "Manufacturers", file: data }));
        console.log(res)
    }

    const handleExportOptionClicked = async (data) => {
        await dispatch(exportTables({ type: 'Manufacturers', ...data }))
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
            Manufacturers List
            <Dialog open={showForm} >
                {
                    showForm &&
                    <CustomForm
                        formData={formData}
                        formConfig={formConfig}
                        handleSubmitClicked={handleSubmitClicked}
                        handleCancelClicked={closeForm}
                    />
                }
            </Dialog>
        </div>
        <div>
            <CustomTable
                openForm={openForm}
                columns={columns}
                rows={items}
                addDataText='ADD FIELD'
                tableName='CommonProductFields'
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

export default List