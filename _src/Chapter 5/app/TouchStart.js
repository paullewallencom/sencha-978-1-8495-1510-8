new Ext.Application({
  name: 'TouchStart',
  launch: function() {
    var eventPanel = new Ext.Panel({
      fullscreen: true,
      layout: 'fit',
      html: 'Tap Me',
      id: 'eventPanel',
      listeners: {
        click: {
          element: 'body',
          fn: function(event, div, listener) {
            console.log(event, div, listener);
          }
        }
      }
    });
    this.viewport = eventPanel;
  }
});

