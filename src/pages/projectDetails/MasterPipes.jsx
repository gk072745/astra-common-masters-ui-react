import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { importData } from "../../stores/importAndExport"
import { addMasterPipesData, deleteMasterPipesData, deleteMultiMasterPipesData, getMasterPipesData, updateMasterPipesData } from "../../stores/masterPipes"

const formDataInitial = {
    imperialDisplayText: '',
    outerDiameterInches: '',
    metricDisplayText: '',
    outerDiameterMM: '',
    dNSize: '',
}

const MasterPipes = () => {
    const dispatch = useDispatch()
    const masterPipes = useSelector(({ MasterPipesReducer }) => MasterPipesReducer.masterPipes)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(formDataInitial)

    const columns = [
        {
            field: 'imperialDisplayText',
            headerName: 'IMPERIAL DISPLAY TEXT',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'metricDisplayText',
            headerName: 'METRIC DISPLAY TEXT',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'dNSize',
            headerName: 'DN SIZE',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'outerDiameterInches',
            headerName: 'OUTER DIAMETER (IN)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'outerDiameterMM',
            headerName: 'OUTER DIAMETER (MM)',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const formConfig = {
        formHeader: "Add a Size",
        formRef: "Size",
        formFields: [
            {
                type: "text",
                key: "imperialDisplayText",
                label: "Imperial Display Text*",
                placeholder: "Imperial Display Text*",
                validations: ["required"],
                cols: 6,
            },
            {
                type: "text",
                key: "outerDiameterInches",
                label: "Outer Diameter (in)*",
                placeholder: "Outer Diameter (in)*",
                validations: ["required"],
                cols: 6,
            },
            {
                type: "text",
                key: "metricDisplayText",
                label: "Metric Display Text*",
                placeholder: "Metric Display Text*",
                validations: ["required"],
                cols: 6,
            },
            {
                type: "text",
                key: "outerDiameterMM",
                label: "Outer Diameter (mm)*",
                placeholder: "Outer Diameter (mm)*",
                validations: ["required"],
                cols: 6,
            },
            {
                type: "text",
                key: "dNSize",
                label: "DN Size*",
                placeholder: "DN Size*",
                validations: ["required"],
                cols: 6,
            },

        ]
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

        const res = await dispatch(getMasterPipesData(options))

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }

        console.log(masterPipes)


    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiMasterPipesData({ ids }))
        await fetchData(queriesRef.current)
    }

    const deleteProductType = async (data = {}) => {
        await dispatch(deleteMasterPipesData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {
        if (Object.keys(data).length < 3) return
        if (!data._id) {
            await dispatch(addMasterPipesData(data))
        } else {
            await dispatch(updateMasterPipesData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        await dispatch(importData({ modalName: "MasterPipes", file: data }));
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
            Master Pipe List
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
                rows={masterPipes}
                addDataText='ADD Size'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={deleteProductType}
                tableName='MasterPipes'
                importBtnClicked={handleImportBtnClicked}
            />
        </div>

    </>
}

export default MasterPipes