/**
 * Created by ig on 11/29/16.
 */
var async = require('async');

module.exports = function(app) {

  //data sources
  var postgresDs = app.dataSources.postgreSQL;

  //create all models
  async.parallel({
    userTypes: async.apply(createUserTypes),
    appRoles: async.apply(createAppRoles),
    areasOfLaws: async.apply(createAreasOfLaw),
    questionsStatements: async.apply(createQuestionsStatements),
    appUsers: async.apply(createAppUsers),
    addresses: async.apply(createAddresses),
    legalInterests: async.apply(createLegalInterests)
  }, function(err, results) {
    if (err) throw err;

    console.log('> models created sucessfully');
    console.log(results);
    linkPrimaryKeys();

  });

  function linkPrimaryKeys() {
    console.log('***************');
    async.series([function(cb) {
      app.models.AppUser.find({filter: {where: {email: 'oleggou@yahoo.com'}}}, function(err, appUser) {
        // console.log('***************');
        // console.log('appUser', appUser);
        // console.log('***************');
        cb(null, appUser)
      });
    }, function(cb) {
      app.models.Address.find({filter: {where: {lineOne: '21 Nopalitos Way'}}}, function(err, address) {
        // console.log('***************');
        // console.log('address', address);
        // console.log('***************');
        cb(null, address)
      });
    }], function(err, results) {
      if (err) throw err;
      console.log(results);
    });

  }

  //create userTypes
  function createUserTypes(cb) {
    postgresDs.automigrate('UserType', function(err) {
      if (err) return cb(err);
      var UserType = app.models.UserType;
      UserType.create([{
        value: 'admin',
        id: 1
      }, {
        value: 'client',
        id: 2
      }, {
        value: 'attorney',
        id: 3
      }, {
        value: 'paralegal',
        id: 4
      }, {
        value: 'prospect-attorney',
        id: 5
      }, {
        value: 'prospect-client',
        id: 6
      }, {
        value: 'student',
        id: 7
      }], cb);
    });
  }


  //create appRoles
  function createAppRoles(cb) {
    postgresDs.automigrate('AppRole', function(err) {
      if (err) return cb(err);
      var AppRole = app.models.AppRole;
      AppRole.create([{
        value: 'case-author',
        id: 1
      }, {
        value: 'lead-attorney-proboknow',
        id: 2
      }, {
        value: 'lead-attorney-lowboknow',
        id: 3
      }, {
        value: 'mentor',
        id: 4
      }], cb);
    });
  }

  //create areasOfLaw
  function createAreasOfLaw(cb) {
    postgresDs.automigrate('AreaOfLaw', function(err) {
      if (err) return cb(err);
      var AreaOfLaw = app.models.AreaOfLaw;
      AreaOfLaw.create([{
        value: 'bankruptcy-law',
        id: 1
      }, {
        value: 'consumer-law',
        id: 2
      }, {
        value: 'employment-law',
        id: 3
      }, {
        value: 'estate-law',
        id: 4
      }, {
        value: 'family-law',
        id: 5
      }, {
        value: 'health-law',
        id: 6
      }, {
        value: 'housing-law',
        id: 7
      }, {
        value: 'immigration-law',
        id: 8
      }, {
        value: 'tax-law',
        id: 9
      }, {
        value: 'tort-law',
        id: 10
      }, {
        value: 'other',
        id: 11
      }], cb);
    });
  }

  //create questionsStatements
  function createQuestionsStatements(cb) {
    postgresDs.automigrate('QuestionStatement', function(err) {
      if (err) return cb(err);
      var QuestionStatement = app.models.QuestionStatement;
      QuestionStatement.create([{
        value: 'I certify that these figures are accurate, and agree to provide proof of them if requested by an attorney considering representing me.',
        id: 1
      }, {
        value: 'I further understand that Proboknow is neither a lawyer referral service nor a law firm – it neither recommends any particular attorney, nor provides representation itself. As such, Proboknow cannot, and does not, guarantee case outcomes or make any guarantees regarding representation.',
        id: 2
      }, {
        value: 'Are you an active member of the California state bar, in good standing?',
        id: 3
      }, {
        value: 'I certify that I have read, understand, and agree to the Terms of Use and Privacy Policy.',
        id: 4
      }], cb);
    });
  }

  //create appUsers
  function createAppUsers(cb) {
    postgresDs.automigrate('AppUser', function(err) {
      if (err) return cb(err);
      var AppUser = app.models.AppUser;
      AppUser.create([{
        firstName: 'Oleg',
        lastName: 'Goushcha',
        middleName: 'O',
        dateOfBirth: '02/17/1985',
        gender: 'male',
        email: 'oleggou@yahoo.com',
        emailVerified: true,
        username: 'oleggou',
        password: '1234',
        phoneNumber: '7145958682',
        phoneNumberPrivate: true,
        primaryLanguage: 'English',
        secondaryLanguage: 'Ukrainian',
        barNumber: '123412341234',
        barYear: '2011',
        biography: 'Right now I teach at Manhattan Colledge.',
        userTypeId: 3,
        id: 1
      }], cb);
    });
  }

  //create Addresses
  function createAddresses(cb) {
    postgresDs.automigrate('Address', function(err) {
      if (err) return cb(err);
      var Address = app.models.Address;
      Address.create([{
        isShipping: true,
        isBilling: false,
        lineOne: '21 Nopalitos Way',
        city: 'Aliso Viejo',
        countyProvince: 'Orange',
        zipCode: '92656',
        appUserId: 1,
        id: 1
      }], cb);
    });
  }

  //create Legal Interests
  function createLegalInterests(cb) {
    postgresDs.automigrate('LegalInterest', function(err) {
      if (err) return cb(err);
      var LegalInterest = app.models.LegalInterest;
      LegalInterest.create([{
        appUserId: 1,
        areaOfLawId: 1,
        id: 1
      }, {
        appUserId: 1,
        areaOfLawId: 2,
        id: 2
      }, {
        appUserId: 1,
        areaOfLawId: 3,
        id: 3
      }], cb);
    });
  }

};
