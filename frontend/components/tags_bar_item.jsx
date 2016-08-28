const React = require('react');
const TagActions = require('../actions/tag_actions.js');

const TagsBarItem = React.createClass({
  getInitialState: function() {
    return { selected: false };
  },

  handleDestroy: function(e) {
    e.preventDefault();
    // debugger;
    // if(this.state.selected && e.key === "Delete") {
      TagActions.destroyRelationship(this.props.tag.id,
        this.props.currentNote.id);

            // TODO
            // kill it (tag actions)
            // get 1 new note (updated sans tag)
            //   // update notes store (all 3)
            // get 1 new tag (updated sans note)
            //  // update tag store
    // }
  },

  makeSelection: function(e) {
    e.preventDefault();
    this.setState({ selected: true });
  },

  unSelect: function(e) {
    e.preventDefault();
    this.setState({ selected: false });
  },

  render: function() {
    return (
      <li className="current-note-tag"
        >{this.props.title}<p className="tag-relat-delete"
          onClick={this.handleDestroy}>[[X]]</p></li>
    );
  }
});

module.exports = TagsBarItem;
