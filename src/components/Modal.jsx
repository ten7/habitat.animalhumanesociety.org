import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal" id={props.modalInfo.uuid} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <h1>{props.modalInfo.title}</h1>
                  <div dangerouslySetInnerHTML={{__html: props.modalInfo.body}} />
                </div>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;