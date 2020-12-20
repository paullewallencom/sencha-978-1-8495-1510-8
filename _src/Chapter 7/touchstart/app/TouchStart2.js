new Ext.Application({
name: 'TouchStart',
launch: function() {

Ext.regModel('Contact', {
    fields: [
        {name: 'first', type: 'string'},
        {name: 'last', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'zip', type: 'int'},
        {name: 'email', type: 'string'},
        {name: 'birthday', type: 'date'}
    ]
});


this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'card',
    id: 'cardStack',
    activeItem: 0,
    items: [
    {
      xtype: 'list',
      itemTpl: '{last}, {first}',
      store: new Ext.data.Store({
       model: 'Contact',
       storeId: 'contactStore',
       proxy: {
        type: 'ajax',
        url  : 'api/contacts.json',
        reader: {
          type: 'json',
          root: 'children'
        }
       },
       autoLoad: true
      }),
      listeners: {
        itemTap: {
          fn: function(list,index){
            var rec = list.getStore().getAt(index);
            Ext.getCmp('detailsPanel').update(rec.data);
            console.log(rec);
            Ext.getCmp('cardStack').setActiveItem(1);
          }
        }
      }
    },
    {
      xtype: 'panel',
      id: 'detailsPanel',
      tpl: '{first} {last}<br>{address}<br>{city}, {state} {zip}<br>{email}<br>{birthday}',
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Back',
            ui: 'back',
            handler: function() {
            Ext.getCmp('cardStack').setActiveItem(0);
            }
        }]
    }]
    }]
});

}
});
