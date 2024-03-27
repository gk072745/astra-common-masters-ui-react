import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as importLogsReducer } from './importLogs';
import { reducer as uiFeedbackReducer } from './uiFeedback';
import { reducer as productTypesReducer } from './productTypes';
import { reducer as sampleFileReducer } from './sampleFile';
import { reducer as countryReducer } from './country';
import { reducer as MasterPipesReducer } from './masterPipes';
import { reducer as materialTypesReducer } from './materialTypes';
import { reducer as connectionTypesReducer } from './connectionTypes';
import { reducer as genericPipeSystemsReducer } from './genericPipeSystems';
import { reducer as commonProductFieldsReducer } from './commonProductFields';
import { reducer as pipeParametersReducer } from './pipeParameters';
import { reducer as pipeNetworkTypesReducer } from './pipeNetworkTypes';
import { reducer as normalPipeFittingParametersReducer } from './normalPipeFittingParameters';
import { reducer as specialPipeFittingParametersReducer } from './specialPipeFittingParameters';
import { reducer as dwvPipeFittingParametersReducer } from './dwvPipeFittingParameters';
import { reducer as pipeFittingTypesReducer } from './pipeFittingTypes';
import { reducer as plumbingFixtureParametersReducer } from './plumbingFixtureParameters';
import { reducer as valveParametersReducer } from './valveParameters';
import { reducer as mechEquParamsReducer } from './mechanicalEquipmentParameters';
import { reducer as manufacturersReducer } from './manufacturersList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    importLogsReducer, uiFeedbackReducer, productTypesReducer, sampleFileReducer, countryReducer,
    MasterPipesReducer, materialTypesReducer, connectionTypesReducer, genericPipeSystemsReducer,
    pipeNetworkTypesReducer, commonProductFieldsReducer, pipeParametersReducer, normalPipeFittingParametersReducer,
    specialPipeFittingParametersReducer, dwvPipeFittingParametersReducer, pipeFittingTypesReducer,
    plumbingFixtureParametersReducer, valveParametersReducer, mechEquParamsReducer, manufacturersReducer,
});

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
