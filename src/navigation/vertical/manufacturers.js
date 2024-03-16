export default {
  title: 'Manufacturers',
  icon: 'mdi-alpha-m-box-outline',
  children: [
    { title: 'List', to: 'manufacturers-list' },
    {
      title: 'Products',
      children: [
        { title: 'Range', to: 'manufacturers-product-ranges' },
        { title: 'Pipe', to: { name: 'manufacturers-product-ranges-pipe-id', params: { id: 'all' } } },
        { title: 'Normal Pipe Fittings ', to: { name: 'manufacturers-product-ranges-normal-pipe-fittings-id', params: { id: 'all' } } },
        { title: 'Special Pipe Fittings ', to: { name: 'manufacturers-product-ranges-special-pipe-fititngs-id', params: { id: 'all' } } },
        { title: 'DWV Pipe Fittings ', to: { name: 'manufacturers-product-ranges-dwv-pipe-fittings-id', params: { id: 'all' } } },
        { title: 'Plbg Fixtures', to: { name: 'manufacturers-product-ranges-plbg-fixtures-id', params: { id: 'all' } } },
        { title: 'Valves', to: { name: 'manufacturers-product-ranges-valves-id', params: { id: 'all' } } },
        { title: 'Mech Equip', to: { name: 'manufacturers-product-ranges-mech-equip-id', params: { id: 'all' } } },
      ]
    },
  ],
}

