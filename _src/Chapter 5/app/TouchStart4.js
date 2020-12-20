new Ext.Application({
  name: 'TouchStart',
  launch: function() {
    var eventPanel = new Ext.Panel({
      fullscreen: true,
      layout: 'fit',
      html: 'Tap Me',
      id: 'eventPanel',
      listeners: {
        afterRender: function() {
          this.mon(this.el, {
          touchcancel: this.event2Console
          });
        }
      },
      event2Console: function(e) {
        console.log(e);
        this.update(e.type+':'+e.direction+':'+e.distance);
      }
    });
    this.viewport = eventPanel;
  }
});