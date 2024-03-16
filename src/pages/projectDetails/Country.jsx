import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { addCountryData, deleteCountryData, deleteMultiCountryData, getCountryData, updateCountryData } from "../../stores/country"

const initialFormData = {
    name: "",
    country_code: "",
    notes: ""
}

const Country = () => {
    const dispatch = useDispatch()
    const countries = useSelector(({ countryReducer }) => countryReducer.countries)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)

    const columns = [
        {
            field: 'name',
            headerName: 'NAME',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'country_code',
            headerName: 'COUNTRY CODE',
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
        formHeader: "Add Country",
        formRef: "Country/RegionList",
        formFields: [
            {
                type: "text",
                key: "name",
                label: "Country/Region Name*",
                placeholder: "Country/Region Name*",
                validations: ["required"],
            },
            {
                type: "text",
                key: "country_code",
                label: "Country/Region Code*",
                placeholder: "Country/Region Code*",
                validations: [
                    "required",
                    v =>
                        (v && v.length <= 3) || "field must be less than 3 characters",
                ],
            },
            {
                type: "textarea",
                key: 'notes',
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

        const res = await dispatch(getCountryData(options))

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

        console.log(countries)


    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiCountryData({ ids }))
        await fetchData(queriesRef.current)
    }

    const deleteProductType = async (data = {}) => {
        await dispatch(deleteCountryData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {
        if (Object.keys(data).length < 3) return
        if (!data._id) {
            await dispatch(addCountryData(data))
        } else {
            await dispatch(updateCountryData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "Country", file: data }));
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
            Country List
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
                rows={countries}
                addDataText='ADD COUNTRY'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={deleteProductType}
                tableName='Countries'
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default Country