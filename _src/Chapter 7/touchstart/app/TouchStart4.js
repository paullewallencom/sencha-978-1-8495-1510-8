Ext.setup({
  onReady: function() {

    var mystore = new Ext.data.JsonStore({
      fields: ['month', 'sales'],
      data: [
        {'month': 'June', 'sales': 500},
        {'month': 'July', 'sales': 350},
        {'month': 'August', 'sales': 200},
        {'month': 'September', 'sales': 770},
        {'month': 'October', 'sales': 170}
      ]
    });

    var chartPanel = new Ext.chart.Panel({
      title: 'Pie Chart',
      fullscreen: true,
      items: {
          cls: 'pie1',
          theme: 'Demo',
          store: mystore,
          insetPadding: 20,
          legend: {
              position: {
                  portrait: 'bottom',
                  landscape: 'left'
              }
          },
          series: [{
              type: 'pie',
              field: 'sales',
              showInLegend: true,
              highlight: true,
              label: {
                  field: 'month'
              }
          }]
        }
    });

  }
});
