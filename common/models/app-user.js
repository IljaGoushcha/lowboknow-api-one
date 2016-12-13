'use strict';

module.exports = function(AppUser) {

  AppUser.afterRemote('create', function(context, user, next) {
    console.log('***************');
    console.log(context.args.data);
    console.log('***************');
    console.log(user);
    console.log('***************');

    next();
  });

};
