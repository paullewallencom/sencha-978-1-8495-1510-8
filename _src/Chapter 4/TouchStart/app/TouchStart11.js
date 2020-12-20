new Ext.Application({
name: 'TouchStart',
launch: function() {
var data = {
    text: 'Offices',
    items: [{
    text: 'Atlanta Office',
    items: [{
        text: 'Marketing',
        items: [{
            text: 'David Smith',
            leaf: true
            }, {
            text: 'Alex Wallace',
            leaf: true
            }]
          },{
        text: 'Sales',
        items: [{
            text: 'Candice Adams',
            leaf: true
            }, {
            text: 'Mike White',
            leaf: true
            }]
          }
        ]
    },{
    text: 'Athens Office',
    items: [{
        text: 'IT',
        items: [{
            text: 'Baron Chandler',
            leaf: true
            }, {
            text: 'Aaron Karp',
            leaf: true
            }]
          },{
        text: 'Executive',
        items: [{
            text: 'Bryan Johnson',
            leaf: true
            }, {
            text: 'John Clark',
            leaf: true
            }]
          }
        ]
    }]
};

Ext.regModel('ListItem', {
    fields: [{name: 'text', type: 'string'}]
});
var store = new Ext.data.TreeStore({
    model: 'ListItem',
    root: data,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
var nestedList = new Ext.NestedList({
    fullscreen: true,
    title: 'Minions',
    displayField: 'text',
    store: store
});

}

});