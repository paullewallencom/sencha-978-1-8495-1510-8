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

var newContact1 = Ext.ModelMgr.create({
    name: 'David',
    email: 'david@msn.com'
  }, 'Contact');

  var newContact2 = Ext.ModelMgr.create({
    name: 'Bill',
    email: 'bill@yahoo.com'
  }, 'Contact');

var addedUsers = contactStore.add(newContact1, newContact2);
contactStore.sync();
console.log(addedUsers);
console.log(addedUsers[0].data.name+': '+addedUsers[0].data.id);
console.log(addedUsers[1].data.name+': '+addedUsers[1].data.id);

this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'fit',
    items: [
    {
      xtype: 'list',
      itemTpl: '{name}: {email}',
      store: contactStore
    }]
});

}
});
