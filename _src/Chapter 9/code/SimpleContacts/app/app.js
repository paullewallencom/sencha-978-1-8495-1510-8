Ext.regModel('Contact', {
  fields: [
    {
    name: 'id',
    type: 'int'
  },
    {
    name: 'firstname',
    type: 'string'
  },
    {
    name: 'lastname',
    type: 'string'
  },
    {
    name: 'email',
    type: 'string'
  }
  ]
});

Ext.regStore('ContactStore', {
  model: 'Contact',
  proxy: {
    type: 'scripttag',
    url: 'api/contacts.js'
  },
  autoLoad: true
});

var ContactView = Ext.extend(Ext.List, {
  store: 'ContactStore',
  itemTpl: '{firstname} {lastname} – {email}',
  initComponent: function() {
    ContactView.superclass.initComponent.apply(this, arguments);
    console.log('CV: %o', this);
  }
});

Ext.reg('contactview', ContactView);


/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page. By default we just render the applications Viewport inside the
 * launch method (see app/views/Viewport.js).
 */
SimpleContacts = new Ext.Application({
  name: "SimpleContacts",
  launch: function() {
    this.viewport = new Ext.Panel({
      fullscreen: true,
      layout: 'fit',
      dockedItems: [
        {
        xtype: 'toolbar',
        title: 'Simple Contacts'
      }],
      items: [{
        xtype: 'contactview'
      }]
    });
  }
});
