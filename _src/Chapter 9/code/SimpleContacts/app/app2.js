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
    url: 'api/contacts.js',
    timeout: 2000,
    listeners: {
      exception: function() {
        Ext.Msg.alert('Offline Mode', 'Network unreachable, we have entered offline mode.');
        var offlineContacts = Ext.StoreMgr.get('OfflineContactStore');
        console.log('2: Offline: %o Online: %o', offlineContacts, this);
      }
    }

  },
  autoLoad: true,
  listeners: {
    load: function() {
      var offlineContacts = Ext.StoreMgr.get('OfflineContactStore');


      offlineContacts.each(function(record) {
        offlineContacts.remove(record);
      });
      offlineContacts.sync();



      this.each(function(record) {
        offlineContacts.add(record.data);
      });
      offlineContacts.sync();
      console.log('1: Offline: %o Online: %o', offlineContacts, this);
    }
  }

});

Ext.regStore('OfflineContactStore', {
  model: 'Contact',
  proxy: {
    type: 'localstorage',
    id: 'contacts-offline'
  },
  autoLoad: true
});


var ContactView = Ext.extend(Ext.List, {
  store: 'OfflineContactStore',
  itemTpl: '{firstname} {lastname} – {email}'
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
