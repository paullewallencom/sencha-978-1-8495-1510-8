new Ext.Application({
    name: 'TouchStart',
    launch: function() {

        Ext.regModel('ListItem', {
            fields: [
                {name: 'id', type: 'int'},
                {name: 'fullname', type: 'string'}
            ]
        });

        this.viewport = new Ext.TabPanel({
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            tabBar:{
                dock: 'bottom',
                ui: 'light',
                layout: {
                    pack: 'center'
                }
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Panel 1',
                    fullscreen: false,
                    html: '<div id="hello">Hello World</div>',
                    items: [
                    {
                      xtype: 'button',
                      text: 'Confirm',
                      ui: 'confirm',
                      width: 100
                    }, {
                      xtype: 'button',
                      text: 'Decline',
                      ui: 'decline',
                      width: 100
                    }
                    ],
                    iconCls: 'info',
                    dockedItems: [
                        {
                            dock: 'top',
                            xtype: 'toolbar',
                            title: 'About TouchStart'
                        },{
                            dock: 'top',
                            xtype: 'toolbar',
                            ui: 'light',
                            items: [
                              {
                                text: 'Back',
                                ui: 'back'
                              }, {
                                text: 'Round',
                                ui: 'round'
                              }, {
                                text: 'Small',
                                ui: 'small'
                              }, {
                                text: 'Normal',
                                ui: 'normal'
                              }, {
                                text: 'Action',
                                ui: 'action'
                              }, {
                                text: 'Forward',
                                ui: 'forward'
                              }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'list',
                    title: 'List',
                    fullscreen: false,
                    iconCls: 'bookmarks',
                    itemTpl: '{id} - {fullname}',
                    store: new Ext.data.Store({
                        model: 'ListItem',
                        data: [
                            {id: 1, fullname: 'Aaron Karp'},
                            {id: 2, fullname: 'Baron Chandler'},
                            {id: 3, fullname: 'Bryan Johnson'},
                            {id: 4, fullname: 'David Evans'},
                            {id: 5, fullname: 'John Clark'},
                            {id: 6, fullname: 'Norbert Taylor'}

                        ]
                    })
                },
                {
                    xtype: 'container',
                    html: 'TouchStart container 3',
                    iconCls: 'favorites',
                    title: 'Panel 3'
                }]
        });


    }
});
