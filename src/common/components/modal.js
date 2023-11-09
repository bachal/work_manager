import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { modalOpen } from '@/store/features/modal/modalSlice';

const ModalPopUp=({children})=> {
  const isOpen = useSelector((state) => state.modalAction.isOpen)
  const dispatch = useDispatch()


  const [show, setShow] = useState(false);
  const handleClose = () => dispatch(modalOpen(false));
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Body>
          {children}
        </Modal.Body>
       </Modal>
    </>
  );
}

export default ModalPopUp;