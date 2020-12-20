new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var eventPanel = new Ext.Panel({
            fullscreen: true,
            layout: 'fit',
            items: [{
              xtype: 'container',
              id: 'hello',
              html: '<div id="helloText">Here I Am!</div>',
                listeners: {
                  show: {
                    fn: function(){
                      Ext.getCmp('showButton').disable();
                      Ext.getCmp('hideButton').enable();
                      }
                  },
                  hide: {
                    fn: function(){
                      Ext.getCmp('showButton').enable();
                      Ext.getCmp('hideButton').disable();
                    }
                  }
                }
              }
            ],
				    id: 'eventPanel',
				    dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Hide Text',
                    disabled: false,
                    id: 'hideButton',
                    handler: function() {
                       Ext.getCmp('hello').hide();
                    }},
                    {
                    text: 'Show Text',
                    disabled: true,
                    id: 'showButton',
                    handler: function() {
                       Ext.getCmp('hello').show();
                    }}
                ]
            }],
            listeners: {
                click: {
                    element: 'body',
                    fn: function(event, div, listener){ console.log(event, div, listener); Ext.Msg.alert('Single Click'); }
                }
            }
        });

        this.viewport = eventPanel;

    }
});

