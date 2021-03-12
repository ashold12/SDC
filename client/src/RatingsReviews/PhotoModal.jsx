import React from 'react';

const RRModal = ({ displayModal, closeModal, image }) => {
  // Pass in whether or not we're displaying the modal with display modal.
  // closeModal is the function to change our display to false.
  // image is the url of the modal image.
  const modalClassName = displayModal ? 'rr-modal rr-display-block' : 'rr-modal rr-display-none';
  if (!displayModal) {
    return <div />;
  }

  if (displayModal) {
    document.getElementById('bod').style.overflow = 'hidden';
  } else {
    document.getElementById('bod').style.overflow = 'auto';
  }

  return (
    <div className={modalClassName}>
      <section className="rr-modal-main">
        <img
          alt="Product shown very large."
          className="rr-modal-image"
          onClick={(e) => {
            document.getElementById('bod').style.overflow = 'auto';
            closeModal(e);
          }}
          src={image}
        />
        {/* <button type="button" onClick={closeModal}>
          Close
        </button> */}
      </section>
    </div>
  );
};

export default RRModal;
