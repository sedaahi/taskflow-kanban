import TaskModal from "./TaskModal";

const DeleteTaskModal = ({
  task,
  onClose,
  onConfirm,
}) => {
  return (
    <TaskModal onClose={onClose}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Delete Task?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                "{task.title}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            ×
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-[var(--border)] bg-[var(--modal-footer)] p-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </TaskModal>
  );
};

export default DeleteTaskModal;