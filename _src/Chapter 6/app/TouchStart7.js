new Ext.Application({
name: 'TouchStart',
launch: function() {



Ext.regModel('Contact', {
    fields: [
        {name: 'id', type:'int'},
        {name: 'name', type: 'string'},
        {name: 'email',  type: 'string'}
    ],
    proxy: {
        type: 'localstorage',
        id  : 'myContacts',
        reader: {
          type: 'json'
        }
    }
});

var contactStore = new Ext.data.Store({
    model: 'Contact',
    storeId: 'contactStore',
    proxy: {
        type: 'localstorage',
        id  : 'myContacts'
    },
    autoLoad: true
});

var updateContact = function() {
  var form = this.up('form');
  var rec = contactStore.getById(form.record.data.id);
  form.updateRecord(rec);
  contactStore.sync();
  form.reset();
  this.up('sheet').hide();
};

var addContact = function() {
  var form = this.up('form');
  var record = Ext.ModelMgr.create(form.getValues(), 'Contact');
  contactStore.add(record);
  contactStore.sync();
  form.reset();
  this.up('sheet').hide();
};
var addNewContact = new Ext.Sheet({
  height: 350,
  layout: 'fit',
  stretchX: true,
  enter: 'top',
  exit: 'top',
  items: [{
    xtype: 'formpanel',
    padding: 10,
    id: 'contactForm',
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
    id: 'saveButton',
    height: 20,
    text: 'Save',
    margin: 10,
    handler: updateContact
    }, {
    xtype: 'button',
    height: 20,
    margin: 10,
    text: 'Cancel',
    handler: function() {
      this.up('sheet').hide();
    }}, {
    xtype: 'button',
    height: 20,
    margin: 10,
    text: 'Delete',
    ui: 'decline',
    handler: function() {
      var form = this.up('form');
      contactStore.remove(form.record);
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
              var button = Ext.getCmp('saveButton');
              button.setHandler(addContact);
              button.setText('Add');
              addNewContact.show();
            }
        }]
    }],
    items: [
    {
      xtype: 'list',
      itemTpl: '{name}: {email}',
      store: contactStore,
      listeners: {
        itemTap: {
          fn: function(list,index){
            var rec = list.getStore().getAt(index);
            Ext.getCmp('contactForm').load(rec);
            var button = Ext.getCmp('saveButton');
            button.setHandler(updateContact);
            button.setText('Update');
            addNewContact.show();
          }
        }
      }

    }]
});

}
});
