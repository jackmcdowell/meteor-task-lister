import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
import 'select2';
import 'select2/dist/css/select2.css';

Meteor.startup(function(){
});

Template.task.rendered = function(){

  $('.star').on('click', function () {
    $(this).toggleClass('star-checked');
    console.log('clicked');
  });

};
