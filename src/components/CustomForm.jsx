import { cloneDeep } from "lodash";
import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, CircularProgress, Dialog, FormControl, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PipeSizesDialog from "./PipeSizesDialog";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useDispatch } from "react-redux";



const CustomForm = ({ formConfig, formData, handleCancelClicked, handleSubmitClicked }) => {
  const [formConfigLocal, setFormConfigLocal] = useState(cloneDeep(formConfig))
  const [dependencies, setDependencies] = useState({})
  const [dialogs, setDialogs] = useState([]);
  const [asyncList, setAsyncList] = useState({})
  const [refsList, setRefsList] = useState({})
  const [loaders, setLoaders] = useState({})
  const dispatch = useDispatch()
  const [lastChangedField, setLastChangedField] = useState({ key: '', val: '' })


  const formik = useFormik({
    initialValues: cloneDeep(formData),
    validationSchema: yup.object(formConfigLocal.formValidations),
    onSubmit: (values) => {
      handleSubmitClicked(values)
    },
  });


  const handleCancel = (e) => {
    handleCancelClicked();
  };

  const checkDependency = (key, e, formDataLocal = formik.values) => {
    // console.log(key, e, formDataLocal)
    if (!key) return

    const dependencyKeys = dependencies[key];

    if (!dependencyKeys || dependencyKeys.length <= 0) return;

    // console.log(dependencyKeys)
    dependencyKeys.forEach((dependencyKey) => {
      let config = formConfigLocal.formFields.find(
        (config) => config.key == dependencyKey
      );

      // console.log(config, config.dependencyCondition, key, "dep")

      const checkCondition = config.dependencyCondition[key](
        formDataLocal[key]
      );

      // console.log(checkCondition, formDataLocal, [key])

      let configIndex = formConfigLocal.formFields.findIndex(
        (field) => field.key == config.key
      );

      const dependency = config.dependencyChange[key](e);

      // console.log("dep change", dependency)
      if (!dependency) return;

      if (!checkCondition) {
        dependency.forEach((obj) => {
          const intialValue =
            formConfig.formFields[configIndex][obj.key];

          // console.log(initalformConfig, formConfig)

          setFormConfigLocal((prev) => {
            const updateInitial = { ...prev }
            updateInitial.formFields[configIndex][obj.key] = intialValue

            return updateInitial
          })
        });

        return;
      }

      dependency.forEach((obj) => {

        setFormConfigLocal((prev) => {
          const updatedData = { ...prev }

          updatedData.formFields[configIndex][obj.key] = obj.value

          return updatedData
        })
      });


    })
  }

  const getSelectedPipes = data => {
    if (!data) return []

    console.log(data)
    if (data && typeof data[0] == "string") {
      return data
    } else {
      return data.map(item => item._id)
    }
  }

  const handlePipeSizeDialogClose = (key) => {
    setDialogs(prevState => {
      const updatedDialogs = [...prevState];
      updatedDialogs[key] = false;
      return updatedDialogs;
    })
  }

  const handlePipeSizeSubmit = (key, val) => {
    formik.setFieldValue(key, val);
    setLastChangedField(key, val)
    handlePipeSizeDialogClose(key)
  }

  // intializing neccesary variables
  const initalizeAsynclist = (key) => {
    setAsyncList((prevVal) => {
      return { ...prevVal, [`asyncList__${key}`]: [] };
    })
  }

  const initalizeRefs = (key) => {
    setRefsList((prevVal) => {
      return { ...prevVal, [`refs__${key}`]: null };
    })
  }

  const initalizeLoaders = (key) => {
    setLoaders((prevVal) => {
      return { ...prevVal, [`loader__${key}`]: false };
    })
  };

  const handleApicalls = async (config, e) => {
    if (refsList[`refs__${config.key}`]) {
      clearTimeout(refsList[`refs__${config.key}`]);
      setRefsList((prevVal) => {
        return { ...prevVal, [`refs__${config.key}`]: null }
      })
    }

    setRefsList((prevVal) => {
      return {
        ...prevVal, [`refs__${config.key}`]: setTimeout(async () => {

          setLoaders((prevVal) => {
            return { ...prevVal, [`loader__${config.key}`]: true }
          })

          const result = await dispatch(config.apiCall({
            search: e ?? "",
            ...config.params,
          }));
          if (result) {
            setAsyncList((prevVal) => {
              return {
                ...prevVal,
                [`asyncList__${config.key}`]: result.data.data
              }
            })

            setLoaders((prevVal) => {
              return {
                ...prevVal,
                [`loader__${config.key}`]: false
              }
            })
          }
        }, 300)
      }
    })

  };

  const isOptionEqualToValue = (option, value, itemValue) => {
    return !value || option === value || option[itemValue] === value || option[itemValue] === value[itemValue]
  }

  const handleOnChangeAutocomplete = (e, newVal, type, field) => {
    if (type === 'clear') {
      const val = field.returnObject ? null : '';
      formik.setFieldValue(field.key, val);
      setLastChangedField({ key: field.key, val })
    } else {
      const val = field.returnObject || typeof newVal === 'string' ? newVal : newVal[field.itemValue];
      formik.setFieldValue(field.key, val);
      setLastChangedField({ key: field.key, val })
    }
  }

  const autocompleteInputValue = (val, options, field) => {
    const valType = typeof val
    if (!options || options.length === 0) {
      return ''
    }

    const optionsType = typeof options[0]

    if (optionsType === 'string') {
      return val
    } else if (valType === 'string') {
      const selectedOption = options.find((obj) => obj[field.itemValue] === val)
      return selectedOption ? selectedOption[field.itemText] : ''
    } else {

      return val ? val[field.itemText] : ''
    }

  }

  useEffect(() => {
    formConfigLocal.formFields.forEach((config) => {

      if (config.type == "asyncAutocomplete") {
        initalizeAsynclist(config.key)
        initalizeRefs(config.key)
        initalizeLoaders(config.key)
        handleApicalls(config, formik.values[config.key] && formik.values[config.key][config.itemText] ? formik.values[config.key][config.itemText] : '')
      }

      if (config.dependentKey) {
        config.dependentKey.forEach((key) => {
          setDependencies(prevDependencies => {
            const updatedDependencies = { ...prevDependencies };
            if (updatedDependencies[key]) {
              updatedDependencies[key] = [...updatedDependencies[key], config.key];
            } else {
              updatedDependencies[key] = [config.key];
            }
            return updatedDependencies;
          });
        });
      }

      if (config.type == "pipeSizeCheckBoxes") {
        setDialogs(prevState => {
          const updatedDialogs = [...prevState];
          updatedDialogs[config.key] = false;
          return updatedDialogs;
        });
      }

    });
    // console.log(dependencies)
  }, [])

  useEffect(() => {
    // console.log(dependencies)
    for (const key in dependencies) {
      checkDependency(key, formik.values[key], formik.values);
    }
  }, [dependencies])

  useEffect(() => {
    checkDependency(lastChangedField.key, lastChangedField.val)
  }, [formik.values])


  return (
    <Card sx={{ padding: '1.5rem' }}>
      <form onSubmit={formik.handleSubmit}>

        <CardHeader title={formConfigLocal.formHeader} />
        <CardContent>
          {formConfigLocal.formFields?.map((field, key) => (
            <Box key={key} sx={{ display: 'flex', marginBottom: '1rem' }}>
              {field.type === 'text' ? (
                <TextField
                  name={field.key}
                  label={field.label}
                  sx={{ flexGrow: 1 }}
                  variant="standard"
                  value={formik.values[field.key]}
                  error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                  helperText={formik.touched[field.key] && formik.errors[field.key]}
                  onChange={(e) => { formik.handleChange(e); setLastChangedField({ key: field.key, val: e.target.value }) }}
                  onBlur={formik.handleBlur}
                />
              ) : field.type === 'textarea' ? (
                <TextField
                  name={field.key}
                  label={field.label}
                  sx={{ flexGrow: 1 }}
                  variant="standard"
                  multiline
                  rows={3}
                  value={formik.values[field.key]}
                  error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                  helperText={formik.touched[field.key] && formik.errors[field.key]}
                  onChange={(e) => { formik.handleChange(e); setLastChangedField({ key: field.key, val: e.target.value }) }}
                  onBlur={formik.handleBlur}
                />
              ) : field.type === 'autocomplete' ? (
                <Autocomplete
                  name={field.key}
                  sx={{ flexGrow: 1 }}
                  size="small"
                  options={field.items}
                  value={formik.values[field.key]}
                  getOptionLabel={(option) => typeof option === 'string' ? option : option[field.itemText]}
                  isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, field.itemValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={field.label}
                      error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                      helperText={formik.touched[field.key] && formik.errors[field.key]}
                    />)}
                  onChange={(e, newVal, type) => {
                    handleOnChangeAutocomplete(e, newVal, type, field)
                  }}
                  // inputValue={autocompleteInputValue(formik.values[field.key], field.items, field)}
                  defaultValue={field.defaultValue}
                  onBlur={formik.handleBlur}
                />
              ) : field.type === 'asyncAutocomplete' ? (
                <Autocomplete
                  name={field.key}
                  sx={{ flexGrow: 1 }}
                  size="small"
                  options={asyncList[`asyncList__${field.key}`] || []}
                  loading={loaders[`loader__${field.key}`] ?? false}
                  value={formik.values[field.key]}
                  getOptionLabel={(option) => typeof option === 'string' ? option : option[field.itemText]}
                  isOptionEqualToValue={(val1, val2) => isOptionEqualToValue(val1, val2, field.itemValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={field.label}
                      error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                      helperText={formik.touched[field.key] && formik.errors[field.key]}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loaders[`loader__${field.key}`] ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />)}
                  onInputChange={(ev, newVal) => {
                    handleApicalls(field, newVal)
                  }}
                  onChange={(e, newVal, type) => {
                    console.log(e, newVal, type)
                    handleOnChangeAutocomplete(e, newVal, type, field)
                  }}

                  // inputValue={
                  //   autocompleteInputValue(formik.values[field.key], asyncList[`asyncList__${field.key}`] || [], field)
                  // }
                  defaultValue={field.defaultValue}
                  onBlur={formik.handleBlur}
                />
              ) : field.type === 'pipeSizeCheckBoxes' ? (
                <>
                  <Autocomplete
                    name={field.key}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    disabled={!!field.disabled}
                    readOnly
                    multiple
                    disableClearable
                    limitTags={6}
                    options={field.items}
                    defaultValue={field.defaultValue}
                    value={formik.values[field.key]}
                    isOptionEqualToValue={(option, value) => option._id === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label={field.label}
                        error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                        helperText={formik.touched[field.key] && formik.errors[field.key]}
                      />
                    )}
                    onOpen={() => setDialogs(prevState => {
                      const updatedDialogs = [...prevState];
                      updatedDialogs[field.key] = true;
                      return updatedDialogs;
                    })}

                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const labelObj = field.items.find(({ _id }) => _id === option)
                        const label = formik.values[field.unitTypeKey] === 'mm' ? labelObj.metricDisplayText : labelObj.imperialDisplayText
                        return <Chip
                          variant="outlined"
                          clickable
                          label={label}
                          {...getTagProps({ index })}
                        />
                      }
                      )}
                    onBlur={formik.handleBlur}

                  />

                  <Dialog open={dialogs[field.key] || false} >
                    <PipeSizesDialog
                      unitType={formik.values[field.unitTypeKey]}
                      items={field.items}
                      handleClose={() => handlePipeSizeDialogClose(field.key)}
                      selected={getSelectedPipes(formik.values[field.key])}
                      handleSubmit={(data) => handlePipeSizeSubmit(field.key, data)}
                    />
                  </Dialog>


                </>
              ) : field.type === 'boolean' ? (
                <FormControlLabel
                  name={field.key}
                  control={<Switch
                    checked={formik.values[field.key]}
                    onChange={(e, val) => {
                      formik.handleChange(e);
                      setLastChangedField({ key: field.key, val })
                    }}
                  />}
                  error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                  helperText={formik.touched[field.key] && formik.errors[field.key]}
                  label={field.label} />
              ) : (
                <></>
              )}
            </Box>
          ))}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </CardActions>
      </form>

    </Card >
  );
};

export default CustomForm;



// if (config.default && config.default.length > 0) {
//     // formDataLocal[config.key] = config.default;
// }


// if (config.type == "date") {
//     if (!formDataLocal[config.key]) {
//         formDataLocal[config.key] = null;
//     }
// }