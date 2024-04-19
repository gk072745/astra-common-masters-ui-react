import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import CustomDerivedTable from '../../../components/CustomDerivedTable';
import CustomForm from '../../../components/CustomForm';
import { Dialog } from "@mui/material"
import { cloneDeep } from 'lodash';
import { getCommonProductFieldsData } from '../../../stores/commonProductFields';
import { getPipeParametersData } from '../../../stores/pipeParameters';
import { getMultiPacksData } from '../../../stores/multiPacks';
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup'
import { getProductRangesData, getSinglePipeRangeData } from '../../../stores/productRanges';
import { deleteMultiPipeDataData, deletePipeDataData, getPipeDataData, setProjectRangeData } from '../../../stores/pipeData';
import { exportTables, importData } from '../../../stores/importAndExport';

let initialFormData = {
    productRange: "",
    commonProductFields: {},
    masterPipe: "",
    outerDiameter: "",
    innerDiameter: "",
    pipeParameterFields: {},
    multiPack: "",
    isMultiPackEnabled: false
}

const Pipe = () => {
    const { id } = useParams();
    const [showForm, setShowForm] = useState(false)
    const [imageFields, setImageFields] = useState([])
    const [formData, setFormData] = useState(initialFormData)
    const dispatch = useDispatch()
    const queriesRef = useRef()
    const [formConfig, setFormConfig] = useState({
        formHeader: "Pipe Data",
        formRef: "Pipe Data",
        container: true,
        formFields: [],
        formValidations: {}
    })
    const [columns, setColumns] = useState([])
    const { commonProductFields } = useSelector((store) => store.commonProductFieldsReducer)
    const { pipeParameters } = useSelector((store) => store.pipeParametersReducer)
    const { multiPacks } = useSelector((store) => store.multiPacksReducer)
    const { pipeData: items } = useSelector((store) => store.pipeDataReducer)
    const [rowCount, setRowCount] = useState(0)
    const [productRange, setProjectRange] = useState({})


    const fetchPipeData = async (data) => {
        queriesRef.current = data
        const { search, paginationModel, sortModel } = data

        const options = {
            search: search || "",
            page: paginationModel?.page + 1 || 1,
            limit: paginationModel?.pageSize || 10,
            sort: sortModel?.length ? sortModel[0].field : "",
            sortOrder: sortModel?.length ? sortModel[0].sort : "",
        }

        const res = await dispatch(getPipeDataData(options))
        console.log(res)

        if (res.status === 200) {
            setRowCount(res.data.meta.totalItems)
        }
    }

    const handleDeleteAllClicked = async (ids = []) => {
        await dispatch(deleteMultiPipeDataData({ ids }))
        await fetchPipeData(queriesRef.current)
    }

    const handleDeleteRow = async (data = {}) => {
        await dispatch(deletePipeDataData(data))
        await fetchPipeData(queriesRef.current)
    }

    const handleImportBtnClicked = async (data) => {
        const res = await dispatch(importData({ modalName: "PipeData", file: data }));
        console.log(res)
    }

    const handleExportOptionClicked = async (data) => {
        await dispatch(exportTables({ type: 'PipeData', ...data }))
    }

    const handleSubmitClicked = async data => {
        console.log(data)
        closeForm()
        fetchPipeData(queriesRef.current)
    }

    const openForm = (data = initialFormData) => {
        const formData = cloneDeep(data)

        setFormData(formData)
        setShowForm(true)
    }

    const closeForm = () => {
        setFormData(initialFormData)
        setShowForm(false)
    }

    const getDynamicHeaders = (prefix, data) => {
        return data.map(obj => {
            const fieldPath = `${prefix}.${obj.key}`;
            const isNested = fieldPath.split('.').length > 1;

            const headerConfig = {
                headerName: obj.description,
                field: fieldPath,
                editable: false,
                headerAlign: 'center',
                align: 'center',
                minWidth: 200,
                width: 300,
            };

            if (isNested) {
                headerConfig.valueGetter = ({ row }) => {
                    return row?.[prefix]?.[obj.key];
                };
            }

            return headerConfig;
        });
    }

    const getDynamicFields = (prefix, data, formConfig) => {
        if (!data || !data.length) return []
        const dynamicFieldsData = JSON.parse(JSON.stringify(data))
        const dynamicFields = []

        for (let i = 0; i < dynamicFieldsData.length; i++) {
            const fieldData = dynamicFieldsData[i]
            if (fieldData.type == 'Image') {
                setImageFields((prevVal) => [...prevVal, `${prefix}.${fieldData.key}`])
            }


            dynamicFields.push({
                key: `${prefix}.${fieldData.key}`,
                label: fieldData.isMandatory ? `${fieldData.description}*` : `${fieldData.description}`,
                placeholder: fieldData.isMandatory ? `${fieldData.description}*` : `${fieldData.description}`,
                type: fieldData.type.toLowerCase(),
                validations: fieldData.isMandatory ? ["required"] : "",
                cols: 6,
            })

            if (fieldData.isMandatory) {
                formConfig.formValidations[`${prefix}.${fieldData.key}`] = yup.string().required('This field is required.')
            }
        }

        return dynamicFields
    }

    const fetchDependentData = async () => {
        try {
            const res1 = await dispatch(getCommonProductFieldsData({}))
            const res2 = await dispatch(getPipeParametersData({}))
            const res3 = await dispatch(getMultiPacksData({ filter: { type: 'PIPE_DATA' } }))

            setColumns([
                {
                    headerName: 'Product Code',
                    field: 'productCode',
                    editable: false,
                    minWidth: 200,
                    width: 200,
                },
                {
                    headerName: 'Product Range Code ',
                    field: 'productRange.productRangeCode',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                    valueGetter: ({ row }) => row.productRange.productRangeCode
                },
                {
                    headerName: 'Product Range Name - Main',
                    field: 'productRange.mainRangeName',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                    valueGetter: ({ row }) => row.productRange.mainRangeName
                },
                {
                    headerName: 'Product Range Name - Sub',
                    field: 'productRange.subRangeName',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                    valueGetter: ({ row }) => row.productRange.subRangeName
                },
                {
                    headerName: "MultiPack Enabled",
                    field: 'isMultiPackEnabled',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                },
                {
                    headerName: 'Multipack',
                    field: 'multiPack.name',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                    valueGetter: ({ row }) => row.multiPack.name

                },
                {
                    headerName: 'Unit',
                    field: 'unitType',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                },
                {
                    headerName: 'Pipe Size',
                    field: 'pipeSize',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                    valueGetter: ({ row }) => {
                        const unitKey = row.unitType == 'in' ? 'imperialDisplayText' : 'metricDisplayText'

                        return ['masterPipe'][unitKey]

                    }

                },
                {
                    headerName: 'OuterDiameter',
                    field: 'outerDiameter',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                },
                {
                    headerName: 'Inner Diameter',
                    field: 'innerDiameter',
                    editable: false,
                    headerAlign: 'center',
                    align: 'center',
                    minWidth: 200,
                    width: 300,
                },
                ...getDynamicHeaders('commonProductFields', res1.data.data),
                ...getDynamicHeaders('pipeParameterFields', res2.data.data),

            ])

            setFormConfig((formConfig) => {

                const newFormConfig = cloneDeep(formConfig)


                newFormConfig.formValidations = {
                    // masterPipe: yup.string().required('This field is required.'),
                    outerDiameter: yup.string().required('This field is required.'),
                    innerDiameter: yup.string().required('This field is required.'),
                }


                newFormConfig.formFields = [
                    {
                        // type: "pipeSizeCheckBoxes",
                        type: "sizesPopup",
                        key: "masterPipe",
                        label: productRange.unitType ? `Pipe Size (${productRange.unitType})*` : "Pipe Size*",
                        placeholder: productRange.unitType ? `Pipe Size (${productRange.unitType})*` : "Pipe Size*",
                        items: productRange.masterPipes || [],
                        itemText: productRange.unitType == 'mm' ? 'metricDisplayText' : 'imperialDisplayText',
                        itemValue: "_id",
                        unitType: productRange.unitType,
                        cols: 6,
                    },
                    {
                        type: "text",
                        key: "outerDiameter",
                        label: "Outer Diameter*",
                        placeholder: "Outer Diameter*",
                        cols: 6,
                    },
                    {
                        type: "text",
                        key: "innerDiameter",
                        label: "Inner Diameter*",
                        placeholder: "Inner Diameter*",
                        cols: 6,
                    },
                    ...getDynamicFields('commonProductFields', res1.data.data, newFormConfig),
                    ...getDynamicFields('pipeParameterFields', res2.data.data, newFormConfig),
                    {
                        type: 'boolean',
                        key: 'isMultiPackEnabled',
                        label: "Multipack Available?",
                        placeholder: "Multipack Available?",
                        cols: 6,
                    },
                    {
                        type: "autocomplete",
                        key: "multiPack",
                        label: "Mutlipack*",
                        items: res3.data.data,
                        placeholder: "Mutlipack*",
                        returnObject: true,
                        itemText: "name",
                        itemValue: "_id",
                        cols: 6,
                        dependentKey: ["isMultiPackEnabled"],
                        dependencyCondition: { isMultiPackEnabled: v => v },
                        disabled: true,
                        dependencyChange: {
                            isMultiPackEnabled: data => {
                                return [
                                    {
                                        key: 'disabled',
                                        value: false,
                                    },
                                ]
                            }
                        },

                    },
                ]

                if (id == 'all') {

                    newFormConfig.formFields.unshift(
                        {
                            type: "asyncAutocomplete",
                            key: "productRange",
                            label: "Product Range*",
                            placeholder: "Product Range*",
                            itemText: "mainRangeName",
                            itemValue: "_id",
                            returnObject: true,
                            params: { filter: { 'productType.mainCategory': '^Pipe$' } },
                            apiCall: getProductRangesData,
                            validations: ["required"],
                            cols: 6,
                        },
                    )

                    newFormConfig.formFields.forEach(field => {
                        if (field.key === 'masterPipe') {
                            const dependencyAdded = {
                                ...field,
                                disabled: true,
                                dependentKey: ["productRange"],
                                dependencyCondition: { productRange: v => !(!v) },
                                dependencyChange: {
                                    productRange: data => {

                                        if (!data) {
                                            return [
                                                {
                                                    key: 'disabled',
                                                    value: true,
                                                }
                                            ]
                                        }

                                        const itemTextValue = data.unitType === "mm" ? "metricDisplayText" : "imperialDisplayText"

                                        return [
                                            {
                                                key: 'disabled',
                                                value: false,
                                            },
                                            {
                                                key: 'itemText',
                                                value: itemTextValue,
                                            },
                                            {
                                                key: 'items',
                                                value: data.masterPipes,
                                            },
                                            {
                                                key: 'label',
                                                value: `Pipe Size (${data.unitType})*`,
                                            },
                                            {
                                                key: 'placeholder',
                                                value: `Pipe Size (${data.unitType})*`,
                                            },
                                            {
                                                key: 'unitType',
                                                value: data.unitType,
                                            },
                                        ]
                                    },
                                },
                            }

                            const fieldIndex = newFormConfig.formFields.indexOf(field)

                            newFormConfig.formFields[fieldIndex] = dependencyAdded
                        }
                    })
                }

                // initialFormData = newFormData
                // setFormData(initialFormData)

                return newFormConfig
            })

        } catch (error) {
            console.error('Error fetching parameters:', error)
        }
    }






    useEffect(() => {
        if (id !== 'all') {
            dispatch(setProjectRangeData(id))
            dispatch(getSinglePipeRangeData({ id })).then((res) => {
                if (res.success) setProjectRange(res.data)
                console.log(res)
            })

        } else {

            dispatch(setProjectRangeData(''))
            setProjectRange({})

        }

        fetchPipeData({})
        fetchDependentData()
    }, [id])


    return <>
        <div className="table-header">
            Pipe Data

        </div>

        <div>

            <Dialog open={showForm} >
                {showForm && <CustomForm
                    formData={formData}
                    formConfig={formConfig}
                    imageFields={imageFields}
                    handleSubmitClicked={handleSubmitClicked}
                    handleCancelClicked={closeForm}
                />}
            </Dialog>
        </div>
        <div>
            {
                columns && columns.length !== 0 &&
                <CustomDerivedTable
                    openForm={openForm}
                    columns={columns}
                    rows={items}
                    addDataText='ADD FIELD'
                    tableName='PipeData'
                    rowCount={rowCount}
                    fetchData={fetchPipeData}
                    deleteAllCicked={handleDeleteAllClicked}
                    deleteRowClicked={handleDeleteRow}
                    importBtnClicked={handleImportBtnClicked}
                    handleExportOptionClicked={handleExportOptionClicked}
                />
            }

        </div>
    </>
}

export default Pipe
