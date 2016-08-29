const React = require('react');
const Modal = require('react-modal');
const TagModalCard = require('./tag_modal_card.jsx');
const TagStore = require('../stores/tag_store.js');
const TagActions = require('../actions/tag_actions.js');

const TagModalBar = React.createClass({
  getInitialState: function() {
    return {
      tags: TagStore.allTags(),
      tagEditorOpen: false
    };
  },

  // componentDidMount: function() {
  //   // this.tagStoreListener = TagStore.addListener(this.updateTags);
  // },

  // updateTags: function() {
  //   this.setState({ tags: TagStore.allTags() });
  // },

  // componentWillMount: function() {
  //   TagActions.getAllTags();
  // },

  // componentWillUnmount: function() {
  //   // this.tagStoreListener.remove();
  // },

  handleDisplay: function() {
    if(this.props.tagModalIsOpen) {
      return "block";
    } else {
      return "none";
    }
  },

  openTagCreator: function(e) {
    e.preventDefault();
    this.props.openTagCreator();
  },

  render: function() {
    const that = this;
    return (
      <div className="tag-modal-anim" display={this.handleDisplay}>

        <div className="tag-modal">
          <div className="tag-header">
            <a className="modal-type">TAGS</a>

            <div className="tag-line-break" />
          </div>

          <div className="tag-modal-body">

          { Object.keys(that.props.tags).map( id => {
              let tag = that.props.tags[id];
              return (
                < TagModalCard key={id}
                    title={tag.title}
                    id={tag.id}
                    changeCardColumnToNotebook={this.props.changeCardColumnToNotebook}
                    changeCardColumnToAllCards={this.props.changeCardColumnToAllCards}
                    changeCardColumnToTag={this.props.changeCardColumnToTag}
                    closeSelectTagModal={this.props.closeSelectTagModal}
                    tag={tag}
                    selectCurrentTag={this.props.selectCurrentTag}
                  />
              );
            })
          }

        </div>

        </div>
      </div>
    );
  }
});

module.exports = TagModalBar;
