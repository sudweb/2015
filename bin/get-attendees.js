'use strict';

var fs = require('fs');
var path = require('path');
var request = require('superagent');
var md5 = require('MD5');

var stream = fs.createWriteStream(path.join(__dirname, '..', '.attendees.json'));
stream.write('[');

request
  .get('https://api.weezevent.com/participants')
  .query({
    access_token: process.env.ACCESS_TOKEN,
    api_key: process.env.API_KEY,
    'id_event[]': process.env.ID_EVENT,
    full: true,
    max: 20,
    page: 1
  })
  .end(function(err, res){
    res.body.participants.forEach(function(attendee){
      stream.write(JSON.stringify({
        name: attendee.owner.first_name + ' ' + attendee.owner.last_name,
        gravatar: 'https://secure.gravatar.com/avatar/' + md5(attendee.owner.email) + '.jpg?s=75&amp;r=g',
        twitter: filterTwitterUsernameFromAnswers(attendee.answers)
      }) + ', ');
    });

    stream.write('{}]');
  });


function filterTwitterUsernameFromAnswers(answers){
  var username = '';

  answers.some(function(answer){
    if (answer.label.match(/twitter/i) && answer.value) {
      username = /([^\/@]+)$/i.exec(answer.value)[1];
      return true;
    }
  });

  return username;
}


