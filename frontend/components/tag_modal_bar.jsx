const React = require('react');
const Modal = require('react-modal');
const TagBarItem = require('./tags_bar_item.jsx');
const TagStore = require('../stores/tag_store.js');
const TagActions = require('../actions/tag_actions.js');

const TagModalBar = React.createClass({
  getInitialState: function() {
    return {
      tags: TagStore.allTags(),
      tagEditorOpen: false
    };
  },

  componentDidMount: function() {
    this.tagStoreListener = TagStore.addListener(this.updateTags);
  },

  updateTags: function() {
    this.setState({ tags: TagStore.allTags() });
  },

  componentWillMount: function() {
    TagActions.getAllTags();
  },

  componentWillUnmount: function() {
    this.tagStoreListener.remove();
  },

  handleDisplay: function() {
    if(this.props.tagModalIsOpen) {
      return "block";
    } else {
      return "none";
    }
  },

  openTagCreator: function(e) {
    e.preventDefault();
    // this.props.openTagCreator();
  },

  render: function() {
    const that = this;
    return (
      <div className="notebook-modal-anim" display={this.handleDisplay}>

        <div className="notebook-modal">
          <div className="notebook-header">
            <a className="modal-type">TAGS</a>
            <a onClick={this.openTagCreator}
              className="new-notebook">CREATE NEW</a>
          </div>

          { Object.keys(that.state.tags).map( id => {
              let tag = that.state.tags[id];
              return (
                < TagBarItem key={id}
                    title={tag.title}
                    id={tag.id}
                    changeCardColumnToNotebook={this.props.changeCardColumnToNotebook}
                    changeCardColumnToAllCards={this.props.changeCardColumnToAllCards}
                    changeCardColumnToTag={this.props.changeCardColumnToTag}
                    closeSelectTagModal={this.props.closeSelectTagModal}
                    tags={this.state.tags}
                  />
              );
            })
          }

          <div className="cancel-button">
            <button type="cancel" onClick={this.props.closeSelectTagModal}>Exit</button>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = TagModalBar;
