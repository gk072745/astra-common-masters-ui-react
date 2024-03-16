import manufacturers from './manufacturers'
import productDetails from './product-details'

export default [

  {
    title: 'Import Logs',
    to: { name: 'importLogs' },
    icon: 'mdi-file-import-outline',
  },
  ...productDetails,
  ...manufacturers,
]
