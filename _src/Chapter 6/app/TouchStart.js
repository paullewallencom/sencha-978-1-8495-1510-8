new Ext.Application({
  name: 'TouchStart',
  launch: function() {
  Ext.regModel('User', {
    fields: [
      {name: 'firstname', type: 'string'},
      {name: 'lastname', type: 'string'},
      {name: 'username', type: 'string'},
      {name: 'age', type: 'int'},
      {name: 'email', type: 'string'},
      {name: 'active', type: 'boolean', defaultValue: true},
    ],
    deactivate: function() {
        if(this.get('active')) {
          this.set('active', false);
        }
    },
    validations: [
          {type: 'presence',  field: 'age'},
          {type: 'exclusion', field: 'username', list: ['Admin', 'Root']},
          {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}
      ],
    proxy: {
        type: 'localstorage',
        id: 'userProxy',
        reader: {
            type: 'json'
        }
    }

  });


  var newUser = Ext.ModelMgr.create({
    firstname: 'Nigel',
    lastname: 'Tufnel',
    username: 'goes211',
    email: 'nigel@spinaltap.com'
  }, 'User');
  var errors = newUser.validate();
  console.log(errors);

  if(!errors.isValid()) {
    alert("The field: "+errors.items[0].field+ " returned an error: "+errors.items[0].message);
  }

  }
});

