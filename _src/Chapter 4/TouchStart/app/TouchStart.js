new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var hello = new Ext.Container({
            fullscreen: true,
            html: '<div id="hello">Hello World</div>',
				    id: 'helloContainer'
        });

        this.viewport = hello;

        var myContainer = Ext.getCmp('helloContainer');
        myContainer.update('Hello Again!');
    }
});

