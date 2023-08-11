import React from "react";
import Modal from "react-modal";
import { Row,Col } from "react-bootstrap";

Modal.setAppElement("#root");

const Window = ({ show, onClose, item }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            //className="modal"
            overlayClassName={"overlay"}
            style={{
                content: {
                    width: '60vw',
                    margin: 'auto',
                }
              }}
        >
            <Row className={"close-btn-ctn bg-secondary"}>
                <h1 className="col-md-11 text-center">{item.name}</h1>
                <button className="close-btn col-md-1 p-0" onClick={onClose}>X</button>
            </Row>
            <div>
                <h2>Description</h2>
                <p>{item.description}</p>
            </div>
        </Modal>
    );
};

export default Window;