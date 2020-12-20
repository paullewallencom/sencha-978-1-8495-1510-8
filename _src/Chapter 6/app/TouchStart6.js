new Ext.Application({
name: 'TouchStart',
launch: function() {

this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'fit',
    items: [{
    xtype: 'formpanel',
    padding: 10,
    id: 'contactForm',
    style: 'color: #FFFFFF',
    items: [
        {
            xtype: 'urlfield',
            name : 'url',
            label: 'URL Field'
        },
        {
            xtype: 'emailfield',
            name : 'email',
            label: 'Email Field'
        },
        {
            xtype: 'numberfield',
            name : 'number',
            label: 'Number Field'
        }
    ]
  }]
});

}
});
