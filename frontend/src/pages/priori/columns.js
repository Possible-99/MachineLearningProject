export const columns = [
    {
      title: 'Rule',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: items => { return items.map(item=>(`${item} | `))},
      responsive: ['md'],
    },
    {
      title: 'Support',
      dataIndex: 'support',
      key: 'support',
      responsive: ['lg'],
    },
    {
        title: 'Confidence',
        dataIndex: 'confidence',
        key: 'confidence',
        responsive: ['lg'],
      },
      {
        title: 'Lift',
        dataIndex: 'lift',
        key: 'lift',
        responsive: ['lg'],
      },
  ];