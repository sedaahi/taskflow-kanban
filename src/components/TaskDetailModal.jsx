import TaskModal from "./TaskModal";

const TaskDetailModal = ({ task, onClose, onEdit, onDelete }) => {
  return (
    <TaskModal onClose={onClose}>
      <div className="p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/70">
                {task.status}
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/70">
                {task.priority} priority
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <p className="text-sm leading-6 text-white/60">
          {task.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-white/[0.07] p-4">
          <div>
            <p className="text-xs text-white/40">
              Assignee
            </p>

            <p className="mt-1 text-sm text-white">
              {task.assignee}
            </p>
          </div>

          <div>
            <p className="text-xs text-white/40">
              Created
            </p>

            <p className="mt-1 text-sm text-white">
              {new Date(task.createdAt).toLocaleDateString(
                "en-GB"
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-white/10 bg-slate-950/25 p-4">
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400"
        >
          Edit
        </button>
      </div>
    </TaskModal>
  );
};

export default TaskDetailModal;