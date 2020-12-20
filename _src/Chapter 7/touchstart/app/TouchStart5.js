Ext.setup({
    onReady: function() {
        var mystore = new Ext.data.JsonStore({
            fields: ['month', 'data'],
            data: [
              {'month': 'June', '2008': 500, '2009': 400, '2010': 570},
              {'month': 'July', '2008': 350, '2009': 430, '2010': 270},
              {'month': 'August', '2008': 200, '2009': 300, '2010': 320},
              {'month': 'September', '2008': 770, '2009': 390, '2010': 670},
              {'month': 'October', '2008': 170, '2009': 220, '2010': 360}
            ]
        });

        var chartPanel = new Ext.chart.Panel({
            title: 'Bar Chart',
            fullscreen: true,
            items: {
                cls: 'bar1',
                theme: 'Demo',
                store: mystore,
                animate: true,
                legend: {
                    position: {
                        portrait: 'right',
                        landscape: 'top'
                    },
                    labelFont: '17px Arial'
                },
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['2008', '2009', '2010'],
                    title: 'Sales',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['month'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'bar',
                    xField: 'month',
                    yField: ['2008', '2009', '2010'],
                    axis: 'bottom',
                    highlight: true,
                    showInLegend: true
                }]
            }
        });
    }
});
