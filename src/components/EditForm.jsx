import React, { Component } from 'react';
import propTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import Label from './Label';
import '../assets/stylesheets/editForm.css';


export class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    const { tags: tagsInState } = this.state;
    const tags = [...tagsInState];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  updateMeetup = (e) => {
    e.preventDefault();
    const { tags } = this.state;
    const tagInputs = tags.map(tag => tag.text);
    const data = {
      tags: tagInputs,
    };
    const { target } = e;
    const formData = new FormData(target);
    for (const entry of formData.entries()) {
      const [keys, values] = entry;
      data[keys] = values;
    }

    const { updateMeetup } = this.props;
    updateMeetup(e.target.id, data);
    e.target.reset();
    this.setState({ tags: [] });
  }

  handleTag1 = (e) => {
    e.preventDefault();
    this.setState({ tag1: e.target.value });
    const { tags, tag1 } = this.state;
    tags.push(tag1);
  }

  handleTag2 = (e) => {
    e.preventDefault();
    this.setState({ tag2: e.target.value });
    const { tags, tag2 } = this.state;
    tags.push(tag2);
  }

  handleTag3 = (e) => {
    e.preventDefault();
    this.setState({ tag3: e.target.value });
    const { tags, tag3 } = this.state;
    tags.push(tag3);
  }

  render() {
    const { closeEditModal, singleMeetup } = this.props;
    const { tags } = this.state;

    return (
      <div className="edit-form-cont">
        <form className="edit-form" id={singleMeetup[0] && singleMeetup[0].meetupId} onSubmit={this.updateMeetup}>
          <Label htmlFor="topic">Topic</Label>
          <input
            className="edit-input"
            name="topic"
            type="text"
            defaultValue={singleMeetup[0] && singleMeetup[0].topic}
            required
          />
          <Label htmlFor="date">Date</Label>
          <input
            className="edit-input empty"
            name="happeningOn"
            type="date"
            // defaultValue={convertDate.includes('+') ? removeChar : convertDate}
            required
          />
          <Label htmlFor="location">Location</Label>
          <input
            className="edit-input"
            name="location"
            type="text"
            defaultValue={singleMeetup[0] && singleMeetup[0].location}
            required
          />
          <Label htmlFor="tags">Tags</Label>
          <div className="tags-cont">
            <div className="tags-cont-show">
              <ReactTags
                tags={tags}
                labelField="text"
                placeholder="Add tags"
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                maxLength={12}
              />
            </div>
          </div>
          <button type="submit" className="submit-edit">Update Meetup</button>
          <span className="close-edit-tab" onClick={closeEditModal} role="presentation">X</span>
        </form>
      </div>
    );
  }
}

EditForm.defaultProps = {
  singleMeetup: [{}],
};

EditForm.propTypes = {
  closeEditModal: propTypes.func.isRequired,
  updateMeetup: propTypes.func.isRequired,
  singleMeetup: propTypes.arrayOf(propTypes.shape),
};

export default EditForm;
