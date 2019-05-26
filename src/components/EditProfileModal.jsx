import React from 'react';
import propTypes from 'prop-types';
import Label from './Label.jsx';

const EditProfileModal = ({
  firstname,
  lastname,
  username,
  othername,
  closeModal,
  submitForm,
}) => (
  <div className="profile-details">
    <form className="formCont" onSubmit={submitForm} autoComplete="off">
      <div className="wrap-input">
        <Label className="editProfile-label" htmlFor="Firstname">
          Firstname:
        </Label>
        <input
          type="text"
          className="edit-profile"
          name="firstname"
          defaultValue={firstname}
        />
      </div>
      <div className="wrap-input">
        <Label className="editProfile-label" htmlFor="Lastname">
          Lastname:
        </Label>
        <input
          type="text"
          className="edit-profile"
          name="lastname"
          defaultValue={lastname}
        />
      </div>
      <div className="wrap-input">
        <Label className="editProfile-label" htmlFor="Othername">
          Othername:
        </Label>
        <input
          type="text"
          className="edit-profile"
          name="othername"
          defaultValue={othername}
        />
      </div>
      <div className="wrap-input">
        <Label className="editProfile-label" htmlFor="Username">
          Username:
        </Label>
        <input
          type="text"
          className="edit-profile"
          name="username"
          defaultValue={username}
        />
      </div>
      <button type="submit" className="submit-profile-edit">
        Update Profile
      </button>
    </form>
    <button type="button" className="close-edit-profile" onClick={closeModal}>
      X
    </button>
  </div>
);

EditProfileModal.defaultProps = {
  firstname: null,
  lastname: null,
  username: null,
  othername: null,
};

EditProfileModal.propTypes = {
  firstname: propTypes.string,
  lastname: propTypes.string,
  username: propTypes.string,
  othername: propTypes.string,
  closeModal: propTypes.func.isRequired,
  submitForm: propTypes.func.isRequired,
};
export default EditProfileModal;
