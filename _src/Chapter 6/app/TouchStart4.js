new Ext.Application({
name: 'TouchStart',
launch: function() {



Ext.regModel('Contact', {
    fields: [
        {name: 'id', type:'int'},
        {name: 'name', type: 'string'},
        {name: 'email',  type: 'string'}
    ]
});

var contactStore = new Ext.data.Store({
    model: 'Contact',
    storeId: 'contactStore',
    proxy: {
        type: 'localstorage',
        id  : 'myContacts'
    },
    sorters: [
      {
        property : 'name',
        direction: 'ASC'
      }
    ],
    autoLoad: true
});

var addNewContact = new Ext.Sheet({
  height: 250,
  layout: 'fit',
  stretchX: true,
  enter: 'top',
  exit: 'top',
  items: [{
    xtype: 'formpanel',
    padding: 10,
    id: 'contactForm',
    style: 'color: #FFFFFF',
    items: [
        {
            xtype: 'textfield',
            name : 'name',
            label: 'Name'
        },
        {
            xtype: 'emailfield',
            name : 'email',
            label: 'Email'
        }, {
    xtype: 'button',
    height: 20,
    text: 'Save',
    margin: 10,
    handler: function() {
      var form = this.up('form');
      var record = Ext.ModelMgr.create(form.getValues(), 'Contact');
      contactStore.add(record);
      contactStore.sync();
      form.reset();
      this.up('sheet').hide();
    }
    }, {
    xtype: 'button',
    height: 20,
    margin: 10,
    text: 'Cancel',
    handler: function() {
      this.up('sheet').hide();
    }}
    ]
  }]
});

this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add',
            handler: function() {
              addNewContact.show()
            }
        }]
    }],
    items: [
    {
      xtype: 'list',
      itemTpl: '{name}: {email}',
      store: contactStore
    }]
});

}
});
