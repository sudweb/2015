'use strict';

var fs = require('fs');
var path = require('path');
var request = require('superagent');
var md5 = require('MD5');

var maxPerPage = 20;

if (!process.env.ACCESS_TOKEN || !process.env.API_KEY) {
  console.log('ACCESS_TOKEN or API_KEY are missing. Skipping this step…');
  process.exit(0);
}

var stream = fs.createWriteStream(path.join(__dirname, '..', '.attendees.json'));
stream.write('[', paginate.bind(null, 1));

function paginate(page) {
  request
    .get('https://api.weezevent.com/participants')
    .query({
      access_token:   process.env.ACCESS_TOKEN,
      api_key:        process.env.API_KEY,
      'id_event[]':   process.env.ID_EVENT,
      include_unpaid: true,
      full:           true,
      max:            maxPerPage,
      page:           page
    })
    .end(function (err, res) {
      console.log('Receiving page #%d results…', page);

      res.body.participants.forEach(function (attendee) {
        stream.write(JSON.stringify({
	  date: attendee.create_date,
	  first_name: attendee.owner.first_name,
	  last_name: formatLastName(attendee.owner.last_name),
	  gravatar: 'https://secure.gravatar.com/avatar/' + md5(attendee.owner.email) + '.jpg',
          twitter:  filterTwitterUsernameFromAnswers(attendee.answers)
        }) + ', ');
      });


      if (res.body.participants.length < maxPerPage) {
        return stream.write('{}]');
      }
      else {
        return paginate(page + 1);
      }
    });
}

function formatLastName(last_name) {
  return last_name
    .toLocaleLowerCase()
    .split(' ')
    .map(function(word){
      return word[0].toLocaleUpperCase() + word.slice(1);
    })
    .join(' ');
}


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


