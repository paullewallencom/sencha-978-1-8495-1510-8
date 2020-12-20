new Ext.Application({
    name: 'TouchStart',
    launch: function() {

        this.viewport = new Ext.Panel({
            fullscreen: true,
	    bodyPadding: 5,
            dockedItems: [
                {
                    dock : 'top',
                    xtype: 'toolbar',
                    title: 'Touch Start'
                },
                {
                    dock : 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'Hello Button'
                        }
                    ]
                }
            ],

            html: 'Hello Panel'

        });
    }
});
