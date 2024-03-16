import { cloneDeep } from "lodash";
import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Dialog, FormControl, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PipeSizesDialog from "./PipeSizesDialog";

const CustomForm = ({ formConfig, formData, handleCancelClicked, handleSubmitClicked }) => {
  const [formConfigLocal, setFormConfigLocal] = useState(cloneDeep(formConfig))
  const [formDataLocal, setFormDataLocal] = useState(cloneDeep(formData))
  const [dependencies, setDependencies] = useState({})
  const [dialogs, setDialogs] = useState([]);

  // console.log(formConfig, formData, formConfigLocal, formDataLocal, initalformConfig)
  const handleCancel = (e) => {
    handleCancelClicked();
  };

  const handleSubmit = (e) => {
    // console.log(formDataLocal)
    handleSubmitClicked(formDataLocal);
  };

  const handleFieldChange = (key, val) => {
    // console.log(key, val)
    setFormDataLocal(data => {
      const updatedData = { ...data, [key]: val };
      checkDependency(key, val, updatedData);
      return updatedData;
    })
  }

  const checkDependency = (key, e, formDataLocal) => {
    // console.log(key, e, formDataLocal)

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

  const getSelectedPipes = (data => {
    if (!data) return []

    console.log(data)
    if (data && typeof data[0] == "string") {
      return data
    } else {
      return data.map(item => item._id)
    }
  })

  useEffect(() => {
    formConfigLocal.formFields.forEach(async (config) => {
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
      checkDependency(key, formDataLocal[key], formDataLocal);
    }
  }, [dependencies])


  const handlePipeSizeDialogClose = (key) => {
    setDialogs(prevState => {
      const updatedDialogs = [...prevState];
      updatedDialogs[key] = false;
      return updatedDialogs;
    })
  }

  const handlePipeSizeSubmit = (key, val) => {
    handleFieldChange(key, val)
    handlePipeSizeDialogClose(key)
  }


  return (
    <Card sx={{ padding: '1.5rem' }}>
      <CardHeader title={formConfigLocal.formHeader} />
      <CardContent>
        <FormControl fullWidth>
          {formConfigLocal.formFields?.map((field, key) => (
            <Box key={key} sx={{ display: 'flex', marginBottom: '1rem' }}>
              {field.type === 'text' ? (
                <TextField
                  sx={{ flexGrow: 1 }}
                  label={field.label}
                  variant="standard"
                  value={formDataLocal[field.key]}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                />
              ) : field.type === 'textarea' ? (
                <TextField
                  sx={{ flexGrow: 1 }}
                  label={field.label}
                  variant="standard"
                  value={formDataLocal[field.key]}
                  multiline
                  rows={3}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                />
              ) : field.type === 'autocomplete' ? (
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  size="small"
                  options={field.items}
                  value={formDataLocal[field.key]}
                  isOptionEqualToValue={(option, value) => !value || option === value || option[field.itemValue] === value || option[field.itemValue] === value[field.itemValue]}
                  getOptionLabel={(option) => typeof option === 'string' ? option : option[field.itemText]}
                  renderInput={(params) => <TextField variant="standard"  {...params} label={field.label} />}
                  onChange={(e, newVal) => handleFieldChange(field.key, typeof newVal === 'string' ? newVal : newVal[field.itemValue])}
                  defaultValue={field.defaultValue}
                />
              ) : field.type === 'pipeSizeCheckBoxes' ? (
                <>
                  <Autocomplete
                    sx={{ flexGrow: 1 }}
                    size="small"
                    disabled={!!field.disabled}
                    readOnly
                    multiple
                    limitTags={6}
                    options={field.items}
                    defaultValue={field.defaultValue}
                    value={formDataLocal[field.key]}
                    isOptionEqualToValue={(option, value) => option._id === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={field.label}
                        variant="standard"
                      />
                    )}
                    onOpen={() => setDialogs(prevState => {
                      const updatedDialogs = [...prevState];
                      updatedDialogs[field.key] = true;
                      return updatedDialogs;
                    })}
                    // onChange={(e, newVal) => handleFieldChange(field.key, newVal)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const labelObj = field.items.find(({ _id }) => _id === option)
                        const label = formDataLocal[field.unitTypeKey] === 'mm' ? labelObj.metricDisplayText : labelObj.imperialDisplayText
                        return <Chip
                          variant="outlined"
                          clickable
                          label={label}
                          {...getTagProps({ index })} />
                      }
                      )}

                  />

                  <Dialog open={dialogs[field.key] || false} >
                    <PipeSizesDialog
                      unitType={formDataLocal[field.unitTypeKey]}
                      items={field.items}
                      handleClose={() => handlePipeSizeDialogClose(field.key)}
                      selected={getSelectedPipes(formDataLocal[field.key])}
                      handleSubmit={(data) => handlePipeSizeSubmit(field.key, data)}
                    />
                  </Dialog>


                </>
              ) : field.type === 'boolean' ? (
                <FormControlLabel
                  control={<Switch
                    checked={formDataLocal[field.key]}
                    onChange={(e, newVal) => handleFieldChange(field.key, newVal)}
                  />}
                  label={field.label} />
              ) : (
                <></>
              )}
            </Box>
          ))}
        </FormControl>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around' }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card >
  );
};

export default CustomForm;


// const [asyncList, setAsyncList] = useState({})
// const [refsList, setRefsList] = useState({})
// const [loaders, setLoaders] = useState({})

// intializing neccesary variables
// const initalizeAsynclist = (key) => {
//     setAsyncList((prevVal) => {
//         return { ...prevVal, [`asyncList__${key}`]: [] };
//     })
// }

// const initalizeRefs = (key) => {
//     setRefsList((prevVal) => {
//         return { ...prevVal, [`refs__${key}`]: null };
//     })
// }

// const initalizeLoaders = (key) => {
//     setLoaders((prevVal) => {
//         return { ...prevVal, [`loader__${key}`]: false };
//     })
// };

// const handleApicalls = async (config, e) => {
//     if (refsList[`refs__${config.key}`]) {
//         clearTimeout(refsList[`refs__${config.key}`]);
//         setRefsList((prevVal) => {
//             return { ...prevVal, [`refs__${config.key}`]: null }
//         })
//     }

//     setRefsList((prevVal) => {
//         return {
//             ...prevVal, [`refs__${config.key}`]: setTimeout(async () => {

//                 setLoaders((prevVal) => {
//                     return { ...prevVal, [`loader__${config.key}`]: true }
//                 })

//                 const result = await config.apiCall({
//                     search: e ?? "",
//                     ...config.params,
//                 });
//                 if (result) {
//                     setAsyncList((prevVal) => {
//                         return {
//                             ...prevVal,
//                             [`asyncList__${config.key}`]: result.data
//                         }
//                     })

//                     setLoaders((prevVal) => {
//                         return {
//                             ...prevVal,
//                             [`loader__${config.key}`]: false
//                         }
//                     })
//                 }
//             }, 300)
//         }
//     })

// };



// if (config.type == "asyncAutocomplete") {
//     // initalizeAsynclist(config.key);
//     // initalizeRefs(config.key);
//     // initalizeLoaders(config.key);
//     // handleApicalls(
//     //     config,
//     //     formDataLocal[config.key] &&
//     //         formDataLocal[config.key][config.itemText]
//     //         ? formDataLocal[config.key][config.itemText]
//     //         : ""
//     // );
// }




// if (config.default && config.default.length > 0) {
//     // formDataLocal[config.key] = config.default;
// }


// if (config.type == "date") {
//     if (!formDataLocal[config.key]) {
//         formDataLocal[config.key] = null;
//     }
// }


