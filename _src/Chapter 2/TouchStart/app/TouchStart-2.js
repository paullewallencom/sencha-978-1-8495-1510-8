new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var hello = new Ext.Container({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
              {
                  xtype: 'container',
                  flex: 2,
                  html: '<div id="hello">Hello World Top</div>',
                  cls: 'blueBox',
                  border: 1
              }, {
                  xtype: 'container',
                  flex: 1,
                  html: '<div id="hello">Hello World Bottom</div>',
                  cls: 'redBox',
                  border: 1
              }, {
                  xtype: 'container',
                  height: 50,
                  html: '<div id="footer">Footer</div>',
                  cls: 'greenBox'
              }

            ]
        });

        this.viewport = hello;
    }
});
