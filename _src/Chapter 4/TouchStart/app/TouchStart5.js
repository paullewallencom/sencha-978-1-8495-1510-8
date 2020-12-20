new Ext.Application({
    name: 'TouchStart',
    launch: function() {
        var form = new Ext.form.FormPanel({
          items: [
              {
                  xtype: 'textfield',
                  name : 'first',
                  label: 'First name'
              },
              {
                  xtype: 'textfield',
                  name : 'last',
                  label: 'Last name'
              },
              {
                  xtype: 'emailfield',
                  name : 'email',
                  label: 'Email'
              }
          ]
          });

        this.viewport = new Ext.Carousel({
            fullscreen: true,
            direction: 'horizontal',
            items: [form, {
              layout: 'fit',
              html: 'TouchStart container 2'
            }, {
              layout: 'fit',
              html: 'TouchStart container 3'
            }]
        });
    }
});
