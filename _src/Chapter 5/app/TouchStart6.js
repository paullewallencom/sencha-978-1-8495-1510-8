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
        click: {
          element: 'body',
          fn: function(event, div, listener) {
              var cmp = Ext.getCmp('tapTarget');
              cmp.setWidth(event.xy[0]);
              cmp.setHeight(event.xy[1]);
              console.log(event.xy);
              cmp.fireEvent('resize');
          }
        }
      }
    });
    this.viewport = eventPanel;

      Ext.util.Observable.capture(eventPanel, function() {
	  console.log('The eventPanel fired an Event:', arguments);
      });


    var cmp = Ext.getCmp('tapTarget');
      cmp.on('resize',
      function() {
        var h = cmp.getHeight();
        var w = cmp.getWidth();
       cmp.update('height: '+h+'<br>width: '+w)
      }, this);

  }
});

