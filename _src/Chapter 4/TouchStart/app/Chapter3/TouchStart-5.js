if(Ext.is.Tablet || Ext.is.Desktop) {
	var fontSize = '12px';
	var defaultUI = 'normal';
	var buttonWidth = 100;
} else {
	var fontSize = '16px';
	var defaultUI = 'large';
	var buttonWidth = 200;
}


new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var about = new Ext.Panel({
            fullscreen: true,
            title: 'Touch Start',
            html: 'Changing type sizes based on the device',
            style: 'font-size: '+fontSize+';',
            items: [{
              xtype: 'button',
              text: 'My button',
              ui: defaultUI,
              width: buttonWidth
            }]
        });

        this.viewport = about;
    }
});
