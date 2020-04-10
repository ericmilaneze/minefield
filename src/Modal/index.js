import React from 'react';
import { createPortal } from 'react-dom';

import './index.scss';

export default function Modal({ show, children }) {
    return (
        <>
            {createPortal(
                <div 
                    className={`
                        modal
                        ${show ? 'showing' : ''}
                    `}
                >
                    <div className="modal-content">
                        {children}
                    </div>
                </div>,
                document.body)
            }
        </>
    );
}
