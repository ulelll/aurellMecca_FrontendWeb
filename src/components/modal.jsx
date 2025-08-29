const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{title}</h2>
        {children}
        <button onClick={onClose} style={{ backgroundColor: '#dc3545', marginTop: '20px' }}>Close</button>
      </div>
    </div>
  );
};

export default Modal;