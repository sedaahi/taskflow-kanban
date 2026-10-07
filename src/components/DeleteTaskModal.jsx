import TaskModal from "./TaskModal";

const DeleteTaskModal = ({ task, onClose, onConfirm }) => {
  return (
    <TaskModal onClose={onClose}>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Delete Task?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                "{task.title}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-white/10 bg-slate-950/25 p-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
        >
          Delete
        </button>
      </div>
    </TaskModal>
  );
};

export default DeleteTaskModal;