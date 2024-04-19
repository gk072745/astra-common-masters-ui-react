import { useEffect, useMemo, useReducer, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { exportTables, importData } from "../../../stores/importAndExport"
import { Button, Card, Stack, TextField, Menu, MenuItem, Box, IconButton, Checkbox, Icon, Dialog, CardHeader, CardContent, CardActions, Grid, Autocomplete, FormControlLabel, Switch, Chip } from "@mui/material"
import { MdAdd, MdDelete } from "react-icons/md"
import SampleFileBtn from "../../../components/SampleFileBtn"
import { TbTableDown, TbTableImport } from "react-icons/tb"
import { clone, cloneDeep, filter, initial } from "lodash"
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridNoRowsOverlay, } from "@mui/x-data-grid"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { addProductRangesData, deleteMultiProductRangesData, deleteProductRangesData, getProductRangesData, updateProductRangesData } from "../../../stores/productRanges"
import { IoMdLock } from 'react-icons/io'
import { useFormik } from "formik"
import * as yup from 'yup'
import { getManufacturersData } from "../../../stores/manufacturersList"
import { getMaterialTypesData } from "../../../stores/materialTypes"
import { getConnectionTypesData } from "../../../stores/connectionTypes"
import { getProductTypesData } from "../../../stores/productTypes"
import { getMasterPipesData } from "../../../stores/masterPipes"
import PipeSizesDialog from "../../../components/PipeSizesDialog"
import { useNavigate } from 'react-router-dom'

const initialQueries = {
  search: '',
  paginationModel: { pageSize: 10, page: 0 },
  sortModel: [],
  filter: {}
}

const initialFormData = {
  manufacturer: '',
  isManufacturerEnabled: false,
  subRangeName: '',
  isSubRangeNameEnabled: false,
  country: '',
  isCountryEnabled: false,
  materialType: '',
  isMaterialTypeEnabled: false,
  manufacturerCode: '',
  isManufacturerCodeEnabled: false,
  connectionType: '',
  isConnectionTypeEnabled: false,
  productTypeMain: '',
  isProductTypeEnabled: false,
  unitType: '',
  isUnitTypeEnabled: false,
  productTypeSub: '',
  isProductTypeSubEnabled: false,
  masterPipes: [],
  mainRangeName: '',
  isMainRangeNameEnabled: false,
}

const validationSchema = {
  manufacturer: yup.string().required('Manufacturer is required.'),
  subRangeName: yup.string().required('Range Name - Sub is required.'),
  country: yup.string().required('Country is required.'),
  materialType: yup.string().required('Material Type is required.'),
  manufacturerCode: yup.string().required('Manufacture Code is required.'),
  connectionType: yup.string().required('Connection Type is required.'),
  productTypeMain: yup.string().required('Product Type - Main is required.'),
  unitType: yup.string().required('Unit Type is required.'),
  productTypeSub: yup.string().required('Product Type - Sub is required.'),
  masterPipes: yup.array().min(1, 'Master Pipe is required.'),
  mainRangeName: yup.string().required('Range Name - Main is required.'),
}

const queryReducer = (state, { type, payload }) => {
  switch (type) {
    case "search":
      return { ...state, search: payload };
    case "paginationModel":
      return { ...state, paginationModel: payload };
    case "sortModel":
      return { ...state, sortModel: payload };
    case 'filter':
      return { ...state, filter: { ...state.filter, ...payload } }
    default:
      return state;
  }
};
const Ranges = () => {
  const [queries, dispatchQueries] = useReducer(queryReducer, initialQueries);
  const { productRanges: items } = useSelector((store) => store.productRangesReducer)
  const { manufacturers } = useSelector((store) => store.manufacturersReducer)
  const { materialTypes } = useSelector((store) => store.materialTypesReducer)
  const { connectionTypes } = useSelector((store) => store.connectionTypesReducer)
  const { productTypes } = useSelector((store) => store.productTypesReducer)
  const { masterPipes } = useSelector((store) => store.MasterPipesReducer)
  const importFilePicker = useRef(null)
  const dispatch = useDispatch()
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowCount, setRowCount] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [showForm, setShowForm] = useState(false)
  const [subCategoryArray, setSubCategoryArray] = useState([])
  const [showPipeSizesDialog, setShowPipeSizesDialog] = useState(false)
  const [countryName, setCountryName] = useState('')
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: yup.object(validationSchema),
    onSubmit: async (values) => {
      const { productTypeMain, productTypeSub, manufacturerCode, ...data } = cloneDeep(values)

      data.productType = productTypes.find(
        ({ mainCategory, subCategory }) => mainCategory === productTypeMain && subCategory === productTypeSub
      )?._id || null;

      console.log(data)

      if (!data._id) {
        const res = await dispatch(addProductRangesData(data))
        console.log(res)
      } else {
        const res = await dispatch(updateProductRangesData(data))
        console.log(res)
      }

      closeForm()
      fetchProductRanges()
    },
  });


  const open = Boolean(anchorEl);

  const actionOptions = [
    {
      title: 'Edit',
      value: 'edit',
      prependIcon: 'mdi-pencil',
    },
    {
      title: 'Delete',
      value: 'delete',
      prependIcon: 'mdi-delete-outline',
    },
    {
      title: 'Go to Range Data',
      value: 'goToProductRange',
      prependIcon: 'mdi-database',
    },
  ]


  const actionColumn = {
    field: 'actions',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    headerName: 'Actions',
    align: 'center',
    width: 150,
    renderCell: ({ row, rowIndex }) => {
      const navigate = useNavigate()
      const [anchorElActions, setAnchorElActions] = useState(null);

      if (row._id === 'search') return ''

      const handleOpenMenu = (event) => {
        setAnchorElActions(event.currentTarget);
      };

      const handleCloseMenu = () => {
        setAnchorElActions(null);
      };

      const handleMenuItemClick = (actionType, value) => {
        if (actionType === 'delete') {
          handleDeleteRow(value)
        } else if (actionType === 'edit') {
          handleCloseMenu()
          openForm(value)
        } else {
          if (value.productType.mainCategory == 'Pipe') {
            navigate(`/manufacturers-product-ranges/pipe/${value._id}`)
          }
        }
      };

      return (
        <Box>
          <IconButton
            aria-label="more"
            aria-controls={`menu-${rowIndex}`}
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <HiOutlineDotsVertical />
          </IconButton>
          <Menu
            id={`menu-${rowIndex}`}
            anchorEl={anchorElActions}
            open={Boolean(anchorElActions)}
            onClose={handleCloseMenu}
            PaperProps={{
              elevation: 1,
            }}
          >
            {actionOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleMenuItemClick(option.value, row)}
              >
                {option.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      );
    },
  };

  const columns = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      renderCell: (params) => {
        if (params.row._id === 'search') return ''
        return GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)
      }
    },
    {
      headerName: "Product Range Code",
      field: "productRangeCode",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      minWidth: 200,
    },
    {
      headerName: "MANUFACTURER",
      field: "manufacturer.manufacturerName",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 150,
      minWidth: 200,
      renderCell: (params) => {
        const { field, row } = params

        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />

          </>
        } else {
          return row.manufacturer.manufacturerName ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.manufacturer.manufacturerName}
              {
                row.isManufacturerEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'

        }
      },
    },
    {
      headerName: "COUNTRY",
      field: "country.name",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row.country.name ? <Stack direction="row" sx={{ alignItems: 'center', gap: '0.5rem', justifyContent: 'center,' }}>
            {row.country.name}
            {row.isCountryEnabled && <Icon color='error' fontSize="small">
              <IoMdLock />
            </Icon>}

          </Stack> : '-'
        }
      },
    },
    {
      headerName: "MANUFACTURER CODE",
      field: "manufacturer.manufacturerCode",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row.manufacturer.manufacturerCode ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.manufacturer.manufacturerCode}
              {
                row.isManufacturerCodeEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "PRODUCT TYPE - MAIN",
      field: "productType.mainCategory",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row.productType.mainCategory ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.productType.mainCategory}
              {
                row.isProductTypeEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "PRODUCT TYPE - SUB",
      field: "productType.subCategory",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {
          return row.productType.subCategory ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.productType.subCategory}
              {
                row.isProductTypeSubEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "PRODUCT RANGE NAME - MAIN",
      field: "mainRangeName",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row[field] ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row[field]}
              {
                row.isMainRangeNameEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "PRODUCT RANGE NAME - SUB",
      field: "subRangeName",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row[field] ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row[field]}
              {
                row.isSubRangeNameEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "MATERIAL TYPE",
      field: "materialType.name",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {
          return row.materialType.name ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.materialType.name}
              {
                row.isMaterialTypeEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "CONNECTION TYPE",
      field: "connectionType.name",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {

          return row.connectionType.name ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row.connectionType.name}
              {
                row.isConnectionTypeEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "UNIT TYPE",
      field: "unitType",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ field, row }) => {
        if (row._id === 'search') {
          return <>
            <TextField
              variant="outlined"
              size='medium'
              InputProps={{
                inputProps: {
                  style: {
                    padding: '10px 14px'
                  },
                },
              }}
              onChange={(e) => dispatchQueries({ type: 'filter', payload: { [field]: e.target.value } })} />
          </>
        } else {
          return row[field] ?
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              {row[field]}
              {
                row.isUnitTypeEnabled && <Icon color='error' fontSize="small">
                  <IoMdLock />
                </Icon>
              }
            </Stack> : '-'
        }
      },
    },
    {
      headerName: "PIPE SIZES AVAILABLE",
      field: "masterPipes",
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      width: 300,
      valueGetter: ({ row }) => {
        const { masterPipes, unitType } = row

        if (row._id === 'search') return ''

        return masterPipes.map(size => {
          if (unitType == "mm") {
            return size.metricDisplayText
          } else {
            return size.imperialDisplayText
          }
        }).join(", ") || '-'

      }
    },
  ]

  const exportOptions = [
    {
      title: '.xlsx',
      value: 'xlsx',
    },
    {
      title: '.csv',
      value: 'csv',
    },
  ]

  const fetchProductRanges = async () => {
    const { search, paginationModel, sortModel, filter } = queries

    const options = {
      search: search || "",
      page: paginationModel?.page + 1 || 1,
      limit: paginationModel?.pageSize || 10,
      sort: sortModel?.length ? sortModel[0].field : "",
      sortOrder: sortModel?.length ? sortModel[0].sort : "",
      filter
    }

    const res = await dispatch(getProductRangesData(options))
    console.log(res)
    if (res.status === 200) {
      setRowCount(res.data.meta.totalItems)
    }
  }

  const fetchManufacturersData = async () => {
    const res = await dispatch(getManufacturersData({}))
  }

  const fetchMaterialTypesData = async () => {
    const res = await dispatch(getMaterialTypesData({}))
  }

  const fetchConnectionTypesData = async () => {
    const res = await dispatch(getConnectionTypesData({}))
  }

  const fetchProductTypesData = async () => {
    const res = await dispatch(getProductTypesData({}))
  }

  const fetchMasterPipesData = async () => {
    const res = await dispatch(getMasterPipesData({}))
  }
  const handleDeleteAllClicked = async (ids = []) => {
    await dispatch(deleteMultiProductRangesData({ ids }))
    await fetchProductRanges()
  }

  const handleDeleteRow = async (data = {}) => {
    await dispatch(deleteProductRangesData(data))
    await fetchProductRanges()
  }

  const handleImportClicked = () => {
    importFilePicker.current.click()
  }

  const isSupportedFile = filename => {
    const lowerCaseFilename = filename.toLowerCase()

    return (
      lowerCaseFilename.endsWith('.xlsx') ||
      lowerCaseFilename.endsWith('.xls') ||
      lowerCaseFilename.endsWith('.csv')
    )
  }

  const handleFileImport = async e => {
    const fileToImport = e.target.files[0]

    if (!fileToImport) return

    if (!isSupportedFile(fileToImport.name)) {
      alert("invalid file type")
    } else {
      const res = await dispatch(importData({ modalName: "ProductRanges", file: fileToImport }));
      console.log(res)
    }
  }

  const exportOptionClicked = async (format) => {
    const { search, sortModel, filter } = queries

    const data = {
      format,
      search: search || "",
      sort: sortModel?.length ? sortModel[0].field : "",
      sortOrder: sortModel?.length ? sortModel[0].sort : "",
      filter
    }

    await dispatch(exportTables({ type: 'ProductRanges', ...data }))

    setAnchorEl(null);

  }

  // initialFormData
  const openForm = (data = initialFormData) => {
    const { productType, ...formData } = cloneDeep(data)
    const { connectionType, country, manufacturer, masterPipes, materialType } = formData

    if (formData._id) {

      setCountryName(country.name)
      setSubCategoryArray(getSubcategoriesForMainCategory(productType.mainCategory))

      formData.connectionType = connectionType._id
      formData.country = country._id
      formData.manufacturerCode = manufacturer.manufacturerCode
      formData.manufacturer = manufacturer._id
      formData.masterPipes = masterPipes.map(({ _id }) => _id)
      formData.materialType = materialType._id
      formData.productTypeMain = productType.mainCategory ?? ''
      formData.productTypeSub = productType.subCategory ?? ''
    }

    console.log(formData)
    setFormData(formData)
    setShowForm(true)
  }

  const closeForm = () => {
    formik.resetForm()
    setFormData(initialFormData)
    setCountryName('')
    setShowForm(false)
  }

  const rowSearchObj = {
    _id: 'search',
    manufacturer: {
      manufacturerName: '',
      manufacturerCode: '',
    },
    country: {
      name: '',
    },
    productType: {
      mainCategory: '',
      subCategory: '',
    },
    mainRangeName: '',
    subRangeName: '',
    materialType: {
      name: '',
    },
    connectionType: {
      name: '',
    },
    unitType: '',
    masterPipes: []
  }

  const isOptionEqualToValue = (option, value, itemValue) => {
    return !value || option === value || option[itemValue] === value || option[itemValue] === value[itemValue]
  }

  const uniqueMainCategories = useMemo(() => {
    return Array.from(new Set(productTypes.map(item => item.mainCategory)));
  }, [productTypes]);

  const getSubcategoriesForMainCategory = (mainCategory) => [...new Set(
    productTypes
      .filter(item => item.mainCategory === mainCategory)
      .map(item => item.subCategory)
  )]

  const handleMainCategoryselected = async e => {
    if (!e) return ""

    await formik.setFieldValue('productTypeSub', '')
    setSubCategoryArray(getSubcategoriesForMainCategory(e))
  }

  const getSelectedPipes = data => {
    if (!data) return []

    if (data && typeof data[0] == "string") {
      return data
    } else {
      return data.map(item => item._id)
    }
  }


  useEffect(() => {
    fetchProductRanges()
    fetchManufacturersData()
    fetchMaterialTypesData()
    fetchConnectionTypesData()
    fetchProductTypesData()
    fetchMasterPipesData()
  }, [queries])

  return <>
    <div className="table-header">
      Manufacturers List
      <Dialog open={showForm} >
        {
          showForm && <form onSubmit={formik.handleSubmit}><Card
            sx={{ padding: '1.5rem', width: '530px' }}>

            <CardHeader title='Add a Product Range' />

            <CardContent>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'manufacturer'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      options={manufacturers}
                      value={formik.values.manufacturer ? manufacturers.find(({ _id }) => formik.values.manufacturer === _id) : ''}
                      getOptionLabel={(option) => option.manufacturerName || ''}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Manufacturer*'
                          error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                          helperText={formik.touched.manufacturer && formik.errors.manufacturer}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('manufacturer', type === 'clear' ? '' : val._id)
                        await formik.setFieldValue('country', type === 'clear' ? '' : val.country._id)
                        await formik.setFieldValue('manufacturerCode', type === 'clear' ? '' : val.manufacturerCode)
                        setCountryName(type === 'clear' ? '' : val.country.name ?? '')

                      }}
                      onBlur={() => formik.setFieldTouched('manufacturer', true)}

                    />
                    <FormControlLabel
                      name='isManufacturerEnabled'
                      control={<Switch
                        checked={formik.values.isManufacturerEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>

                    <TextField
                      name={'subRangeName'}
                      label={"Range Name - Sub*"}
                      sx={{ flexGrow: 1 }}
                      variant="standard"
                      value={formik.values.subRangeName}
                      error={formik.touched.subRangeName && Boolean(formik.errors.subRangeName)}
                      helperText={formik.touched.subRangeName && formik.errors.subRangeName}
                      onChange={(e) => { formik.handleChange(e) }}
                      onBlur={formik.handleBlur}
                    />

                    <FormControlLabel
                      name='isSubRangeNameEnabled'
                      control={<Switch
                        checked={formik.values.isSubRangeNameEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>

                    <TextField
                      name={'country'}
                      label={"Country*"}
                      sx={{ flexGrow: 1 }}
                      variant="standard"
                      value={countryName}
                      error={formik.touched.manufacturer && Boolean(formik.errors.country)}
                      helperText={formik.touched.manufacturer && formik.errors.country}
                      disabled
                    />

                    <FormControlLabel
                      name='isCountryEnabled'
                      control={<Switch
                        checked={formik.values.isCountryEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'materialType'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      options={materialTypes}
                      value={materialTypes.find(({ _id }) => formik.values.materialType === _id) || ''}
                      getOptionLabel={(option) => option.name ?? ''}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Material Type*'
                          error={formik.touched.materialType && Boolean(formik.errors.materialType)}
                          helperText={formik.touched.materialType && formik.errors.materialType}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('materialType', type === 'clear' ? '' : val._id)
                      }}
                      onBlur={() => formik.setFieldTouched('materialType', true)}

                    />
                    <FormControlLabel
                      name='isMaterialTypeEnabled'
                      control={<Switch
                        checked={formik.values.isMaterialTypeEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>

                    <TextField
                      name={'manufacturerCode'}
                      label={"Manufacture Code*"}
                      sx={{ flexGrow: 1 }}
                      variant="standard"
                      disabled
                      value={formik.values.manufacturerCode}
                      error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                      helperText={formik.touched.manufacturer && formik.errors.manufacturer}
                    />

                    <FormControlLabel
                      name='isManufacturerCodeEnabled'
                      control={<Switch
                        checked={formik.values.isManufacturerCodeEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'connectionType'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      options={connectionTypes}
                      value={connectionTypes.find(({ _id }) => formik.values.connectionType === _id) || ''}
                      getOptionLabel={(option) => option.name ?? ''}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Connection Type*'
                          error={formik.touched.connectionType && Boolean(formik.errors.connectionType)}
                          helperText={formik.touched.connectionType && formik.errors.connectionType}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('connectionType', type === 'clear' ? '' : val._id)
                      }}
                      onBlur={() => formik.setFieldTouched('connectionType', true)}

                    />
                    <FormControlLabel
                      name='isConnectionTypeEnabled'
                      control={<Switch
                        checked={formik.values.isConnectionTypeEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'productTypeMain'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      options={uniqueMainCategories}
                      value={formik.values.productTypeMain}
                      getOptionLabel={(option) =>
                        option || ''}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Product Type - Main*'
                          error={formik.touched.productTypeMain && Boolean(formik.errors.productTypeMain)}
                          helperText={formik.touched.productTypeMain && formik.errors.productTypeMain}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('productTypeMain', type === 'clear' ? '' : val)

                        await handleMainCategoryselected(type === 'clear' ? '' : val)
                      }}
                      onBlur={() => formik.setFieldTouched('productTypeMain', true)}

                    />
                    <FormControlLabel
                      name='isProductTypeSubEnabled'
                      control={<Switch
                        checked={formik.values.isProductTypeSubEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'unitType'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      options={['mm', 'in']}
                      value={formik.values.unitType}
                      getOptionLabel={(option) => option}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Unit Type*'
                          error={formik.touched.unitType && Boolean(formik.errors.unitType)}
                          helperText={formik.touched.unitType && formik.errors.unitType}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('unitType', type === 'clear' ? '' : val)
                        await formik.setFieldValue('masterPipes', []);

                      }}
                      onBlur={() => formik.setFieldTouched('unitType', true)}

                    />
                    <FormControlLabel
                      name='isUnitTypeEnabled'
                      control={<Switch
                        checked={formik.values.isUnitTypeEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'productTypeSub'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      disabled={!formik.values.productTypeMain}
                      options={subCategoryArray}
                      value={formik.values.productTypeSub}
                      getOptionLabel={(option) =>
                        option ?? ''}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Product Type - Sub*'
                          error={formik.touched.productTypeSub && Boolean(formik.errors.productTypeSub)}
                          helperText={formik.touched.productTypeSub && formik.errors.productTypeSub}
                        />)}
                      onChange={async (e, val, type) => {
                        await formik.setFieldValue('productTypeSub', type === 'clear' ? '' : val)
                      }}
                      onBlur={() => formik.setFieldTouched('productTypeMain', true)}

                    />
                    <FormControlLabel
                      name='isProductTypeEnabled'
                      control={<Switch
                        checked={formik.values.isProductTypeEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      name={'masterPipes'}
                      sx={{ flexGrow: 1 }}
                      size="small"
                      readOnly
                      multiple
                      disableClearable
                      disabled={!formik.values.unitType}
                      limitTags={6}
                      value={formik.values.masterPipes}
                      options={masterPipes}
                      getOptionLabel={(option) => {
                        if (!formik.values.unitType) return '';

                        return option[formik.values.unitType === "mm" ? "metricDisplayText" : "imperialDisplayText"]
                      }}
                      isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, '_id')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label='Pipe Sizes Available*'
                          error={formik.touched.masterPipes && Boolean(formik.errors.masterPipes)}
                          helperText={formik.touched.masterPipes && formik.errors.masterPipes}
                        />)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const labelObj = masterPipes.find(({ _id }) => _id === option)
                          const label = formik.values.unitType === 'mm' ? labelObj.metricDisplayText : labelObj.imperialDisplayText
                          return <Chip
                            key={index}
                            variant="outlined"
                            clickable
                            label={label}
                            {...getTagProps({ index })}
                          />
                        }
                        )}
                      onBlur={() => formik.setFieldTouched('masterPipes', true)}
                      onOpen={() => {
                        setShowPipeSizesDialog(true)
                      }}

                    />
                    <Dialog open={showPipeSizesDialog} >
                      <PipeSizesDialog
                        unitType={formik.values.unitType}
                        items={masterPipes}
                        handleClose={() => setShowPipeSizesDialog(false)}
                        selected={getSelectedPipes(formik.values.masterPipes)}
                        handleSubmit={async (data) => {
                          await formik.setFieldValue('masterPipes', data);
                          setShowPipeSizesDialog(false);
                        }}
                      />
                    </Dialog>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      name={'mainRangeName'}
                      label={"Range Name - Main*"}
                      sx={{ flexGrow: 1 }}
                      variant="standard"
                      value={formik.values.mainRangeName}
                      error={formik.touched.mainRangeName && Boolean(formik.errors.mainRangeName)}
                      helperText={formik.touched.mainRangeName && formik.errors.mainRangeName}
                      onChange={(e) => { formik.handleChange(e) }}
                      onBlur={formik.handleBlur}
                    />
                    <FormControlLabel
                      name='isMainRangeNameEnabled'
                      control={<Switch
                        checked={formik.values.isMainRangeNameEnabled}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />}
                    />
                  </Stack>
                </Grid>

              </Grid>

            </CardContent>

            <CardActions sx={{ justifyContent: 'space-around' }}>
              <Button variant="outlined" onClick={closeForm}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </CardActions>

          </Card>
          </form>

        }
      </Dialog>
    </div >
    <Card elevation={4} sx={{ margin: '1rem' }}>
      <>

        {
          createPortal(
            <input
              ref={importFilePicker}
              type="file"
              className="import-input"
              onInput={handleFileImport}
            />,
            document.body
          )
        }

        <div className="table-container">
          <div className="table-header-section">
            <div className="search-and-items-per-page">
              <div className="search-field">
                <TextField
                  value={queries.search}
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  onChange={(e) => dispatchQueries({ type: 'search', payload: e.target.value })}
                />
              </div>
              <div />


            </div><Stack justifyContent={'flex-end'} direction={'row'} spacing={2} flexWrap={'wrap'} className="buttons-wrapper full" >
              <Button
                variant="contained"
                disabled={rowSelectionModel.length === 0}
                startIcon={<MdDelete />}
                onClick={() => handleDeleteAllClicked(rowSelectionModel)}
              >
                DELETE
              </Button>
              <SampleFileBtn tableName={'ProductRanges'} />
              <Button onClick={handleImportClicked} startIcon={<TbTableImport />} >
                IMPORT
              </Button>
              <Button
                id="export-button"
                aria-controls={open ? 'export-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={<TbTableDown />}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                EXPORT
              </Button>
              <Menu
                id="export-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >

                {
                  exportOptions.map(({ title, value }) => {
                    return <MenuItem key={value} onClick={() => exportOptionClicked(value)}>{title} </MenuItem>
                  })
                }

              </Menu>

              <Button variant="contained" onClick={() => openForm()} startIcon={<MdAdd />}>
                ADD PRODUCT RANGE
              </Button>
            </Stack>
          </div>
          <div className="table-wrapper">
            <DataGrid
              sx={{

                '&.MuiDataGrid-root .MuiDataGrid-cell': {
                  whiteSpace: 'normal !important',
                  wordWrap: 'break-word !important',

                  '&:focus-within': {
                    outline: "none !important",
                  }
                }

              }}
              rows={[rowSearchObj, ...items]}
              columns={[...columns, actionColumn]}
              getRowId={(row) => row._id}
              checkboxSelection={!!columns.length}
              isRowSelectable={(params) => params.row._id !== 'search'}
              disableColumnMenu
              disableRowSelectionOnClick
              paginationMode="server"
              sortingMode="server"
              rowCount={rowCount}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              paginationModel={queries.paginationModel}
              onPaginationModelChange={(payload) => dispatchQueries({ type: 'paginationModel', payload })}
              sortModel={queries.sortModel}
              onSortModelChange={(payload) => dispatchQueries({ type: 'sortModel', payload })}
              rowSelectionModel={rowSelectionModel}
              onRowSelectionModelChange={(e) => console.log(e) || setRowSelectionModel(e)}
            />
          </div>
        </div>
      </>
    </Card >
    {/* custom table */}

  </>
}

export default Ranges