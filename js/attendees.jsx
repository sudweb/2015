'use strict';

var React = require('react');
var attendees = require('../.attendees.json');

module.exports = React.createClass({
  getDefaultProps: function(){
    return { attendees: attendees };
  },

  render: function(){
    return <ol>{this.renderAttendees()}</ol>;
  },

  renderAttendees: function (){
    return this.props.attendees.map(function(person, i){
      return (<li className="column attendee" key={i}>
        <p className="avatar">
          <img src={person.gravatar} alt=""/>
        </p>

        <h3>{person.name}</h3>

        {this.renderTwitterHandle(person)}
      </li>);
    }, this);
  },

  renderTwitterHandle: function (person){
    if (!person.twitter) {
      return null;
    }

    return (<h4><a href={'https://twitter.com/' + person.twitter}>@{person.twitter}</a></h4>);
  }
});
