new Ext.Application({
name: 'TouchStart',
launch: function() {



Ext.regModel('Contact', {
    fields: [
        'id',
        {name: 'name', mapping: 1},
        {name: 'email', mapping: 2}
    ],
    proxy: {
      type: 'memory',
      reader: {
        type: 'array'
      }
    }
});


var myData = [
  [1, 'David', 'david@gmail.com'],
  [2, 'Nancy', 'nancy@skynet.com'],
  [3, 'Henry', 'henry8@yahoo.com']
];

this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'fit',
    items: [
    {
      xtype: 'list',
      itemTpl: '{name}: {email}',
      store: new Ext.data.Store({
        model: 'Contact',
        data: myData
      })
    }]
});

}
});
