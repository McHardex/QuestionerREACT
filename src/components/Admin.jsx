/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import '../assets/stylesheets/admin.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import propTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react';
import Header from './Header';
import Label from './Label';
import { getAllMeetups } from '../actions/meetupActions';
import { getSingleMeetup } from '../actions/meetupDetailsActions';
import {
  createMeetup, clearError, updateMeetup, deleteMeetup,
} from '../actions/adminActions';
import Loader from './Loader';
import EditForm from './EditForm';
import DeleteModal from './DeleteModal';


export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      length: null,
      meetup: null,
      tags: [],
      editable: false,
      showDeleteModal: false,
      showCreateMeetupModal: false,
      deleteId: null,
    };
  }

  handleTagDelete = (i) => {
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

  searchMeetups = (e) => {
    e.preventDefault();
    const searchContent = e.target.value.toLowerCase();
    const { meetups } = this.props;
    const searchResult = meetups.meetups.filter(meetup => (
      meetup.topic.toLowerCase().includes(searchContent)
      || meetup.location.toLowerCase().includes(searchContent)
      || meetup.tags.join(' ').toLowerCase().includes(searchContent)
    ));

    this.setState({
      searchValue: e.target.value,
      length: searchResult.length,
      meetup: searchResult,
    });
  }

  postMeetup = (e) => {
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

    const { createMeetup, getAllMeetups } = this.props;
    createMeetup(data, () => {
      getAllMeetups();
      target.reset();
      this.setState({ tags: [], showCreateMeetupModal: false });
    });
  }

  editMeetup = (id, data) => {
    const { updateMeetup, getAllMeetups } = this.props;
    updateMeetup(id, data, () => {
      getAllMeetups();
      this.closeEditModal();
    });
  }

  openEditModal = async (e) => {
    e.preventDefault();
    this.setState({ editable: true });
    const { getSingleMeetup } = this.props;
    const { id } = e.target;
    await getSingleMeetup(id);
  }

  closeEditModal = () => {
    this.setState({ editable: false });
  }

  openCreateMeetupModal = () => {
    this.setState({ showCreateMeetupModal: true });
  }

  closeCreateMeetupModal = () => {
    this.setState({ showCreateMeetupModal: false });
  }

  deleteMeetup = () => {
    const { deleteId } = this.state;
    const { deleteMeetup, getAllMeetups } = this.props;
    deleteMeetup(deleteId, () => {
      getAllMeetups();
      this.setState({ showDeleteModal: false });
    });
  }

  showDeleteModal = (e) => {
    const { showDeleteModal } = this.state;
    this.setState({
      showDeleteModal: !showDeleteModal,
      deleteId: e.target.id,
    });
  }

  clearError = () => {
    const { clearError } = this.props;
    clearError();
  }

  componentDidMount = () => {
    const { getAllMeetups } = this.props;
    getAllMeetups();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      meetup: nextProps.meetups.meetups,
    });
  }

  render() {
    const { meetups, admin, loader } = this.props;
    const { isLoading } = loader;
    const { meetup: singleMeetup } = meetups;
    const {
      message, postMeetupError,
    } = admin;
    const {
      meetup, length, searchValue, tags, editable, showDeleteModal, showCreateMeetupModal,
    } = this.state;


    return (
      <div className="admin-cont">
        {isLoading && <Loader />}
        {showDeleteModal
          && (
            <DeleteModal
              confirmDelete={this.deleteMeetup}
              closeModal={this.showDeleteModal}
            />
          )}
        <Header />
        <button type="button" className="create-meetup-icon" onClick={this.openCreateMeetupModal}>
          <i className="fas fa-plus" />
        </button>
        <div className="cont">
          <div className="create-meetup-bk">
            <div className="banner-text">
              <h1>Create a new Meetup</h1>
              <p>Enrich lives through open mindset and constructive discussions</p>
            </div>
          </div>
          {showCreateMeetupModal && (
            <div className="cte-meetup-cont">
              <div className="create-form-cont">
                <form className="create-meetup" id="create-meetup" onSubmit={this.postMeetup}>
                  <Label className="label-cte-meetup" htmlFor="topic">Topic</Label>
                  <input className="form-input-cte-meetup" name="topic" type="text" required />
                  <Label className="label-cte-meetup" htmlFor="date">Date</Label>
                  <input className="form-input-cte-meetup empty" name="happeningOn" type="date" required />
                  <Label className="label-cte-meetup" htmlFor="location">Location</Label>
                  <input className="form-input-cte-meetup" name="location" type="text" required />
                  <Label className="label-cte-meetup" htmlFor="tags">Tags</Label>
                  <div className="tags-cont-show">
                    <ReactTags
                      tags={tags}
                      labelField="text"
                      handleDelete={this.handleTagDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      maxLength={12}
                    />
                  </div>
                  <button type="submit" className="submit-form">Create Meetup</button>
                  <button type="button" className="closeCreateMeetup" onClick={this.closeCreateMeetupModal}>X</button>
                </form>
              </div>
            </div>
          )}
          <div className="search-cont">
            <input
              type="text"
              name="search"
              autoComplete="on"
              placeholder="Search meetup by title, location or tags"
              className="search-meetup"
              onChange={this.searchMeetups}
              tabIndex="-2"
            />
          </div>
          <div id="overlay" />
          <div className="meetups" id="meetups" />
        </div>
        {length === 0
          ? (
            <div className="meetups">
              <p className="not-found">
                Sorry, we could not find any meetups matching
                {`"${searchValue}"`}
              </p>
            </div>
          )
          : (
            <div className="meetups" id="meetups">
              {
                meetup && meetup.map(meetup => (
                  <div className="meetup-wrap-landing-page" key={meetup.id}>
                    <Link to={`/meetups/${meetup.id}`} className="link" key={meetup.id}>
                      <div
                        className="meetup-cont"
                        role="presentation"
                        key={meetup.id}
                      >
                        <div className="meetup-text">
                          <div className="meet-img">
                            <img src="https://res.cloudinary.com/mchardex/image/upload/v1558174712/logo.png" alt="questioner-logo" />
                          </div>
                          <p className="date">{new Date(meetup.happeningon).toDateString()}</p>
                          <h3 id={meetup.id} className="meetup-topic">{meetup.topic}</h3>
                          <p className="loctn">{meetup.location}</p>
                          <div className="tags-cont">
                            {meetup.tags.map(tag => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <i
                      role="presentation"
                      className="fas fa-trash"
                      title="delete"
                      onClick={this.showDeleteModal}
                      id={meetup.id}
                    />
                    <i
                      className="far fa-edit"
                      role="presentation"
                      title="edit"
                      id={meetup.id}
                      onClick={this.openEditModal}
                    />
                  </div>
                ))
              }
            </div>
          )
        }
        {editable && (
          <EditForm
            closeEditModal={this.closeEditModal}
            singleMeetup={singleMeetup}
            getAllMeetups={this.getAllMeetups}
            updateMeetup={this.editMeetup}
          />
        )}
        <Confirm
          open={showDeleteModal}
          header="Are you sure you want to delete this meetup?"
          onCancel={this.showDeleteModal}
          onConfirm={this.deleteMeetup}
          confirmButton="Delete Meetup"
        />
      </div>
    );
  }
}

Admin.propTypes = {
  getAllMeetups: propTypes.func.isRequired,
  updateMeetup: propTypes.func.isRequired,
  getSingleMeetup: propTypes.func.isRequired,
  createMeetup: propTypes.func.isRequired,
  deleteMeetup: propTypes.func.isRequired,
  clearError: propTypes.func.isRequired,
  meetups: propTypes.objectOf(propTypes.shape).isRequired,
  admin: propTypes.objectOf(propTypes.shape).isRequired,
  loader: propTypes.objectOf(propTypes.shape).isRequired,
};

const mapStateToProps = ({ admin, meetups, loader }) => ({ admin, meetups, loader });

export default connect(mapStateToProps, {
  getAllMeetups,
  createMeetup,
  clearError,
  getSingleMeetup,
  updateMeetup,
  deleteMeetup,
})(Admin);
