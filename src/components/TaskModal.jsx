const TaskModal = ({ children, onClose }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--modal-bg)] shadow-2xl backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
};

export default TaskModal;