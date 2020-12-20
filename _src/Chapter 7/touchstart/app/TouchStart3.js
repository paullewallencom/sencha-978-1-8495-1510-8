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

var myTemplate2 = new Ext.XTemplate(
  '<div style="padding:10px;"><b>{first} {last}</b><br>',
  '<tpl if="this.hasData(address)">',
  '{address}<br>',
  '{city}, {state} {zip}<br>',
  '</tpl>',
  '<a href="mailto:{email}">{email}</a><br>',
  'Birthday: {birthday:date("n/j/Y")}</div>',
  {
    hasData: function(data){
      if(!Ext.isEmpty(data)) {
        return true;
      }
    }
  }
);

var myTemplate = new Ext.XTemplate(
  '<div style="padding:10px;"><b>{first} {last}</b><br>',
  '{address}<br>',
  '{city}, {state} {zip}<br>',
  '<a href="mailto:{email}">{email}</a><br>',
  'Birthday: {birthday:date("n/j/Y")}</div>'
);
var listTemplate = new Ext.XTemplate(
    '<div class="contact-wrap" id="{first}-{last}">',
    '<div class="thumb" style= "float: left;"><img src="http://placekitten.com/36/36" title="{first}"></div>',
    '<span class="x-editable">{first} {last}</span></div>'
);

this.viewport = new Ext.Panel({
    fullscreen: true,
    layout: 'card',
    id: 'cardStack',
    activeItem: 0,
    items: [
    {
      xtype: 'list',
      itemTpl: listTemplate,
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
      tpl: myTemplate,
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
