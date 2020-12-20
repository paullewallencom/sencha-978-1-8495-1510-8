new Ext.Application({
  name: 'TouchStart',
  launch: function() {
    var eventPanel = new Ext.Panel({
      fullscreen: true,
      layout: 'auto',
      items: [{
        xtype: 'container',
        width: 40,
        height: 40,
        id: 'tapTarget',
        style: 'background-color: #800000;',
      }],
      id: 'eventPanel',
      listeners: {
        tap: {
          element: 'body',
          fn: function(event, div, listener) {
              var cmp = Ext.getCmp('tapTarget');
              cmp.fireEvent('vikingInvasion');
          }
        }
      }
    });
    this.viewport = eventPanel;
    var cmp = Ext.getCmp('tapTarget');
      cmp.on('vikingInvasion',
      function() {
        Ext.Msg.alert("Man the gates!");
      }, this);

  }
});