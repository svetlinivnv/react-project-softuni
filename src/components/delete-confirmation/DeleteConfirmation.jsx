import Modal from "react-modal";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this item?</p>
      <div>
        <button
          onClick={onConfirm}
          className="delete-btn"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
