new Ext.Application({
    name: 'TouchStart',
    launch: function() {

        this.viewport = new Ext.TabPanel({
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            tabBar:{
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            items: [{
                xtype: 'panel',
                title: 'Panel 1',
                fullscreen: false,
                html: '<div id="hello">Hello World</div>',
                iconCls: 'info',
                dockedItems: [
                    {
                        dock: 'top',
                        xtype: 'toolbar',
                        title: 'About TouchStart'
                    }
                ]
            }, {
                xtype: 'container',
                html: 'TouchStart container 2',
                iconCls: 'home',
                title: 'Panel 2'
            }, {
                xtype: 'container',
                html: 'TouchStart container 3',
                iconCls: 'favorites',
                title: 'Panel 3'
            }]
        });


    }
});
