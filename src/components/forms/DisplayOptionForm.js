import React from 'react';
import './DisplayOptionForm.css';

const DisplayOptionForm = ({ options, onToggleColumn, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>Display Options</h4>
                    <button onClick={onClose} className="close-button">X</button>
                </div>
                <div className="modal-body">
                    {options.map(option => (
                        <div key={option.key} className="option-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={option.visible}
                                    onChange={() => onToggleColumn(option.key)}
                                />
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayOptionForm;
