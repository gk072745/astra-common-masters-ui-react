import { useDispatch, useSelector } from "react-redux"
import CustomTable from "../../components/CustomTable"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import CustomForm from "../../components/CustomForm"
import { addGenericPipeSystemsData, deleteGenericPipeSystemsData, deleteMultiGenericPipeSystemsData, getGenericPipeSystemsData, updateGenericPipeSystemsData } from "../../stores/genericPipeSystems"
import { getMasterPipesData } from "../../stores/masterPipes"
import { exportTables, importData } from "../../stores/importAndExport"
import { clone } from "lodash"

const initialFormData = {
    name: "",
    code: "",
    unitType: "",
    master_pipes: [],
}
const GenericPipeSystems = () => {
    const dispatch = useDispatch()
    const { genericPipeSystemsForTable: items, genericPipeSystems } = useSelector((store) => store.genericPipeSystemsReducer)
    const [rowCount, setRowCount] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const queriesRef = useRef(null)
    const [formData, setFormData] = useState(initialFormData)
    const [localPipeSize, setLocalPipeSize] = useState([])

    const columns = [
        {
            field: 'name',
            headerName: 'GPS NAME',
            flex: 1,
            editable: false,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'code',
            headerName: 'CODE',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'unitType',
            headerName: 'UNIT TYPE',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'displayMasterPipes',
            headerName: 'SIZES',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const formConfig = {
        formHeader: "Add Pipe System",
        formRef: "generic_size",
        formFields: [
            {
                type: "text",
                key: "name",
                label: "GPS Name*",
                placeholder: "GPS Name*",
                validations: ["required"],
                cols: 6,
            },
            {
                type: "autocomplete",
                key: "unitType",
                label: "Unit Type*",
                placeholder: "Unit Type*",
                validations: ["required"],
                items: ['mm', "in"],
                defaultValue: [],
                dependentKey: ["master_pipes"],
                disabled: false,
                dependencyCondition: {
                    master_pipes: v => {
                        return v && v.length
                    }
                },
                dependencyChange: {
                    master_pipes: () => {
                        return [{ key: "disabled", value: true }]
                    }
                },
                cols: 6,
            },
            {
                type: "text",
                key: "code",
                cols: 6,

                label: "Code*",
                placeholder: "Code*",

                validations: ["required",
                    v =>
                        (v && v.length <= 3) || "Field must be 3 characters or less"],
            },
            {
                type: "pipeSizeCheckBoxes",
                key: "master_pipes",
                label: "Pipe Sizes Available*",
                placeholder: "Pipe Sizes Available*",
                validations: ["required"],
                disabled: true,
                unitTypeKey: 'unitType',
                cols: 6,
                items: localPipeSize,
                itemText: 'imperialDisplayText',
                itemValue: '_id',
                multiple: true,
                dependentKey: ["unitType"],
                defaultValue: [],
                dependencyCondition: {
                    unitType: v => {
                        return !(!v)
                    },
                },
                dependencyChange: {
                    unitType: data => {
                        const itemTextValue =
                            data == "mm" ? "metricDisplayText" : "imperialDisplayText"

                        return [
                            {
                                key: 'disabled',
                                value: false,
                            },
                            {
                                key: 'itemText',
                                value: itemTextValue,
                            },
                        ]
                    }
                },
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

        const res = await dispatch(getGenericPipeSystemsData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiGenericPipeSystemsData({ ids }))
        await fetchData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deleteGenericPipeSystemsData(data))
        await fetchData(queriesRef.current)
    }

    const handleSubmitClicked = async (data) => {

        if (!data._id) {
            await dispatch(addGenericPipeSystemsData(data))
        } else {
            await dispatch(updateGenericPipeSystemsData(data))
        }

        closeForm()

        await fetchData(queriesRef.current)

    }

    const handleImportBtnClicked = async (data) => {
        const res = await dispatch(importData({ modalName: "GenericPipeSystems", file: data }));
        console.log(res)

    }

    const handleExportOptionClicked = async (data) => {
        await dispatch(exportTables({ type: 'GenericPipeSystems', ...data }))
    }

    const openForm = (data = initialFormData) => {
        const formData = clone(data)

        formData.master_pipes = formData.master_pipes.map((item) => item._id)

        setFormData(formData)
        setShowForm(true)
    }

    const closeForm = (() => {
        setShowForm(false)
        setFormData(initialFormData)
    })

    const getMasterPipes = async () => {
        const res = await dispatch(getMasterPipesData({ limit: 9999 })).catch(err => console.log(err))

        setLocalPipeSize(res?.data?.data)

    }

    useEffect(() => {
        getMasterPipes()
    }, [])

    return <>
        <div className="table-header">
            Generic Pipe Systems
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
                addDataText='ADD SYSTEM'
                rowCount={rowCount}
                fetchData={fetchData}
                deleteAllCicked={handleDeleteAllClicked}
                deleteRowClicked={handleDeleteRow}
                tableName='GenericPipeSystems'
                importBtnClicked={handleImportBtnClicked}
                handleExportOptionClicked={handleExportOptionClicked}
            />
        </div>

    </>
}

export default GenericPipeSystems