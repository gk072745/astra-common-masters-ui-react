import ImportLogs from "../pages/ImportLogs";
import Login from "../pages/Login";
import List from "../pages/manufacturers/List";
import CommonProductFields from "../pages/projectDetails/CommonProductFields";
import ConnectionTypes from "../pages/projectDetails/ConnectionTypes";
import Country from "../pages/projectDetails/Country";
import DWVPipeFittingParameters from "../pages/projectDetails/DWVPipeFittingParameters";
import GenericPipeSystems from "../pages/projectDetails/GenericPipeSystems";
import MasterPipes from "../pages/projectDetails/MasterPipes";
import MaterialTypes from "../pages/projectDetails/MaterialTypes";
import MechEquParams from "../pages/projectDetails/MechEquParams";
import NormalPipeFittingParameters from "../pages/projectDetails/NormalPipeFittingParameters";
import PipeFittingTypes from "../pages/projectDetails/PipeFittingTypes";
import PipeNetworkType from "../pages/projectDetails/PipeNetworkType";
import PipeParameters from "../pages/projectDetails/PipeParameters";
import PlumbingFixtureParameters from "../pages/projectDetails/PlumbingFixtureParameters";
import ProductTypes from "../pages/projectDetails/ProductTypes";
import SpecialPipeFittingParameters from "../pages/projectDetails/SpecialPipeFittingParameters";
import ValveParameters from "../pages/projectDetails/ValveParameters";


export const routes = [
    {
        path: '/login',
        isPrivate: false,
        Component: Login
    },
    {
        path: '/importLogs',
        isPrivate: true,
        Component: ImportLogs
    },
    {
        path: '/product-details-product-types',
        isPrivate: true,
        Component: ProductTypes
    },
    {
        path: '/product-details-country',
        isPrivate: true,
        Component: Country
    },
    {
        path: '/product-details-master-list',
        isPrivate: true,
        Component: MasterPipes
    },
    {
        path: '/product-details-material-types',
        isPrivate: true,
        Component: MaterialTypes
    },
    {
        path: '/product-details-connection-types',
        isPrivate: true,
        Component: ConnectionTypes
    },
    {
        path: '/product-details-generic-pipe',
        isPrivate: true,
        Component: GenericPipeSystems
    },
    {
        path: '/product-details-pipe-network-types',
        isPrivate: true,
        Component: PipeNetworkType
    },
    {
        path: '/product-details-common-fields',
        isPrivate: true,
        Component: CommonProductFields
    },
    {
        path: '/product-details-pipe-prms',
        isPrivate: true,
        Component: PipeParameters
    },
    {
        path: '/product-details-normal-pipe-fitt-prms',
        isPrivate: true,
        Component: NormalPipeFittingParameters
    },
    {
        path: '/product-details-special-pipe-fitt-prms',
        isPrivate: true,
        Component: SpecialPipeFittingParameters
    },
    {
        path: '/product-details-dwv-pipe-fitt-prms',
        isPrivate: true,
        Component: DWVPipeFittingParameters
    },
    {
        path: '/product-details-pipe-fitt-types',
        isPrivate: true,
        Component: PipeFittingTypes
    },
    {
        path: '/product-details-plbg-fixs-prms',
        isPrivate: true,
        Component: PlumbingFixtureParameters
    },
    {
        path: '/product-details-valves-prms',
        isPrivate: true,
        Component: ValveParameters
    },
    {
        path: '/product-details-mech-equip-prms',
        isPrivate: true,
        Component: MechEquParams
    },
    {
        path: '/manufacturers-list',
        isPrivate: true,
        Component: List
    },
]