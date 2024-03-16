import {
  deleteAPIResponse,
  downloadAPIResponse,
  getAPIResponse,
  postAPIResponse,
  putAPIResponse,
} from "./base/api"

import { routes } from "./base/apiRoutes"

// ........

const encodedURL = params => "?" + Object.keys(params)
  .map(function (key) {
    if (key === 'filter') return (`filter=${JSON.stringify(params[key])}`)
    else return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(params[key])
    )
  }).join("&")

export const downloadFile = async url => downloadAPIResponse(url)

// ..................

export const getImportLogs = async data => {

  const urlWithQuery = routes.importLogs + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const getProductTypes = async data => {

  const urlWithQuery = routes.productTypes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}


export const addProductTypes = async data => {

  return postAPIResponse(routes.productTypes, data)
}

export const updateProductTypes = async data => {
  const { _id } = data
  const requestRoute = routes.productTypes + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteProductType = async ({ _id }) => {

  const urlWithQuery = routes.productTypes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiProductTypes = async data => {

  const urlWithQuery = routes.productTypes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}

export const getSampleFile = (data) => {
  const urlWithQuery = routes.sampleImportFile + data.tableName
  return getAPIResponse(urlWithQuery)
}

// ........

export const ImportFiles = ({ modalName, file }) => {
  const urlWithQuery = modalName + routes.commonImports

  const formData = new FormData()
  formData.append('file', file)

  return postAPIResponse(urlWithQuery, formData)
}

export const exportFiles = (data) => {
  const urlWithQuery = routes.commonExports + encodedURL(data)
  return downloadAPIResponse(urlWithQuery)
}
// ........

export const getCountry = async data => {

  const urlWithQuery = routes.country + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addCountry = async data => {

  return postAPIResponse(routes.country, data)
}

export const updateCountry = async data => {
  const { _id } = data
  const requestRoute = routes.country + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteCountry = async ({ _id }) => {

  const urlWithQuery = routes.country + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiCountry = async data => {

  const urlWithQuery = routes.country + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}



export const getMasterPipes = async data => {

  const urlWithQuery = routes.MasterPipes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addMasterPipes = async data => {

  return postAPIResponse(routes.MasterPipes, data)
}

export const updateMasterPipes = async data => {
  const { _id } = data
  const requestRoute = routes.MasterPipes + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteMasterPipes = async ({ _id }) => {

  const urlWithQuery = routes.MasterPipes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiMasterPipes = async data => {

  const urlWithQuery = routes.MasterPipes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}



export const getMaterialTypes = async data => {

  const urlWithQuery = routes.MaterialTypes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addMaterialTypes = async data => {

  return postAPIResponse(routes.MaterialTypes, data)
}

export const updateMaterialTypes = async data => {
  const { _id } = data
  const requestRoute = routes.MaterialTypes + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteMaterialTypes = async ({ _id }) => {

  const urlWithQuery = routes.MaterialTypes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiMaterialTypes = async data => {

  const urlWithQuery = routes.MaterialTypes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}



export const getConnectionTypes = async data => {

  const urlWithQuery = routes.ConnectionTypes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addConnectionTypes = async data => {

  return postAPIResponse(routes.ConnectionTypes, data)
}

export const updateConnectionTypes = async data => {
  const { _id } = data
  const requestRoute = routes.ConnectionTypes + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteConnectionTypes = async ({ _id }) => {

  const urlWithQuery = routes.ConnectionTypes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiConnectionTypes = async data => {

  const urlWithQuery = routes.ConnectionTypes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}


export const getGenericPipeSystems = async data => {

  const urlWithQuery = routes.GenericPipeSystems + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addGenericPipeSystems = async data => {

  return postAPIResponse(routes.GenericPipeSystems, data)
}

export const updateGenericPipeSystems = async data => {
  const { _id } = data
  const requestRoute = routes.GenericPipeSystems + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteGenericPipeSystems = async ({ _id }) => {

  const urlWithQuery = routes.GenericPipeSystems + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiGenericPipeSystems = async data => {

  const urlWithQuery = routes.GenericPipeSystems + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}


export const getPipeNetworkTypes = async data => {

  const urlWithQuery = routes.PipeNetworkTypes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addPipeNetworkTypes = async data => {

  return postAPIResponse(routes.PipeNetworkTypes, data)
}

export const updatePipeNetworkTypes = async data => {
  const { _id } = data
  const requestRoute = routes.PipeNetworkTypes + _id

  return putAPIResponse(requestRoute, data)
}

export const deletePipeNetworkTypes = async ({ _id }) => {

  const urlWithQuery = routes.PipeNetworkTypes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiPipeNetworkTypes = async data => {

  const urlWithQuery = routes.PipeNetworkTypes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getCommonProductFields = async data => {

  const urlWithQuery = routes.CommonProductFields + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addCommonProductFields = async data => {

  return postAPIResponse(routes.CommonProductFields, data)
}

export const updateCommonProductFields = async data => {
  const { _id } = data
  const requestRoute = routes.CommonProductFields + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteCommonProductFields = async ({ _id }) => {

  const urlWithQuery = routes.CommonProductFields + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiCommonProductFields = async data => {

  const urlWithQuery = routes.CommonProductFields + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getPipeParameters = async data => {

  const urlWithQuery = routes.PipeParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addPipeParameters = async data => {

  return postAPIResponse(routes.PipeParameters, data)
}

export const updatePipeParameters = async data => {
  const { _id } = data
  const requestRoute = routes.PipeParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deletePipeParameters = async ({ _id }) => {

  const urlWithQuery = routes.PipeParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiPipeParameters = async data => {

  const urlWithQuery = routes.PipeParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getNormalPipeFittingParameters = async data => {

  const urlWithQuery = routes.NormalPipeFittingParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addNormalPipeFittingParameters = async data => {

  return postAPIResponse(routes.NormalPipeFittingParameters, data)
}

export const updateNormalPipeFittingParameters = async data => {
  const { _id } = data
  const requestRoute = routes.NormalPipeFittingParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteNormalPipeFittingParameters = async ({ _id }) => {

  const urlWithQuery = routes.NormalPipeFittingParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiNormalPipeFittingParameters = async data => {

  const urlWithQuery = routes.NormalPipeFittingParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getSpecialPipeFittingParameters = async data => {

  const urlWithQuery = routes.SpecialPipeFittingParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addSpecialPipeFittingParameters = async data => {

  return postAPIResponse(routes.SpecialPipeFittingParameters, data)
}

export const updateSpecialPipeFittingParameters = async data => {
  const { _id } = data
  const requestRoute = routes.SpecialPipeFittingParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteSpecialPipeFittingParameters = async ({ _id }) => {

  const urlWithQuery = routes.SpecialPipeFittingParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiSpecialPipeFittingParameters = async data => {

  const urlWithQuery = routes.SpecialPipeFittingParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getDWVPipeFittingParameters = async data => {

  const urlWithQuery = routes.DWVPipeFittingParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addDWVPipeFittingParameters = async data => {

  return postAPIResponse(routes.DWVPipeFittingParameters, data)
}

export const updateDWVPipeFittingParameters = async data => {
  const { _id } = data
  const requestRoute = routes.DWVPipeFittingParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteDWVPipeFittingParameters = async ({ _id }) => {

  const urlWithQuery = routes.DWVPipeFittingParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiDWVPipeFittingParameters = async data => {

  const urlWithQuery = routes.DWVPipeFittingParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getPipeFittingTypes = async data => {

  const urlWithQuery = routes.PipeFittingTypes + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addPipeFittingTypes = async data => {

  return postAPIResponse(routes.PipeFittingTypes, data)
}

export const updatePipeFittingTypes = async data => {
  const { _id } = data
  const requestRoute = routes.PipeFittingTypes + _id

  return putAPIResponse(requestRoute, data)
}

export const deletePipeFittingTypes = async ({ _id }) => {

  const urlWithQuery = routes.PipeFittingTypes + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiPipeFittingTypes = async data => {

  const urlWithQuery = routes.PipeFittingTypes + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getPlumbingFixtureParameters = async data => {

  const urlWithQuery = routes.PlumbingFixtureParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addPlumbingFixtureParameters = async data => {

  return postAPIResponse(routes.PlumbingFixtureParameters, data)
}

export const updatePlumbingFixtureParameters = async data => {
  const { _id } = data
  const requestRoute = routes.PlumbingFixtureParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deletePlumbingFixtureParameters = async ({ _id }) => {

  const urlWithQuery = routes.PlumbingFixtureParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiPlumbingFixtureParameters = async data => {

  const urlWithQuery = routes.PlumbingFixtureParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getValveParameters = async data => {

  const urlWithQuery = routes.ValveParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addValveParameters = async data => {

  return postAPIResponse(routes.ValveParameters, data)
}

export const updateValveParameters = async data => {
  const { _id } = data
  const requestRoute = routes.ValveParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteValveParameters = async ({ _id }) => {

  const urlWithQuery = routes.ValveParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiValveParameters = async data => {

  const urlWithQuery = routes.ValveParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}




export const getMechanicalEquipmentParameters = async data => {

  const urlWithQuery = routes.MechanicalEquipmentParameters + encodedURL(data)

  return getAPIResponse(urlWithQuery)
}

export const addMechanicalEquipmentParameters = async data => {

  return postAPIResponse(routes.MechanicalEquipmentParameters, data)
}

export const updateMechanicalEquipmentParameters = async data => {
  const { _id } = data
  const requestRoute = routes.MechanicalEquipmentParameters + _id

  return putAPIResponse(requestRoute, data)
}

export const deleteMechanicalEquipmentParameters = async ({ _id }) => {

  const urlWithQuery = routes.MechanicalEquipmentParameters + _id

  return deleteAPIResponse(urlWithQuery)
}

export const deleteMultiMechanicalEquipmentParameters = async data => {

  const urlWithQuery = routes.MechanicalEquipmentParameters + 'delete/multiple'

  return postAPIResponse(urlWithQuery, data)
}
