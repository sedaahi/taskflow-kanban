import TaskModal from "./TaskModal";

const TaskDetailModal = ({
  task,
  onClose,
  onEdit,
  onDelete,
}) => {
  const statusLabels = {
    pending: "Backlog",
    "in-progress": "Active",
    completed: "Completed",
    blocked: "Blocked",
  };

  const statusStyles = {
    pending: "bg-slate-200 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
    blocked: "bg-rose-100 text-rose-700",
  };

  const priorityStyles = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-rose-100 text-rose-700",
  };

  const formatPriority = (priority) => {
    if (!priority) {
      return "";
    }

    return (
      priority.charAt(0).toUpperCase() +
      priority.slice(1)
    );
  };

  return (
    <TaskModal onClose={onClose}>
      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* Badges */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status] ||
                  "bg-slate-200 text-slate-700"
                  }`}
              >
                {statusLabels[task.status] || task.status}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority] ||
                  "bg-slate-200 text-slate-700"
                  }`}
              >
                {formatPriority(task.priority)} Priority
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {task.title}
            </h2>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          {task.description}
        </p>

        {/* Task Information */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Assignee
            </p>

            <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
              {task.assignee}
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Created
            </p>

            <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
              {new Date(
                task.createdAt
              ).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-[var(--border)] bg-[var(--modal-footer)] p-4">
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-400 px-4 py-2 text-sm font-medium text-red-600 transition
    hover:bg-rose-500/15
    dark:border-rose-400/25
    dark:bg-rose-400/10
    dark:text-rose-300
    dark:hover:bg-rose-400/15"
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