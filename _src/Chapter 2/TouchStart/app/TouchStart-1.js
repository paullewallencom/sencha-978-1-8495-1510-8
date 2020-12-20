new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var about = new Ext.Panel({
            fullscreen: true,
            title: 'Touch Start',
            html: '<div id="hello">Hello World Panel</div>'
        });

        this.viewport = about;
    }
});
