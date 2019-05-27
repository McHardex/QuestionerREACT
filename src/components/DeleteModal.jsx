import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import propTypes from 'prop-types';

const DeleteModal = ({ confirmDelete, closeModal }) => (
  <div className="sweet-alert">
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={confirmDelete}
      onCancel={closeModal}
    >
      You will not be able to recover this Meetup!
    </SweetAlert>
  </div>
);

DeleteModal.propTypes = {
  confirmDelete: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default DeleteModal;
