import { useState } from "react";
import TaskModal from "./TaskModal";

const TaskFormModal = ({ task, onClose, onSubmit }) => {
  const isEditMode = Boolean(task);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    assignee: task?.assignee || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      return;
    }

    onSubmit(formData);
  };

  const inputClassName =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

  const selectClassName =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

  return (
    <TaskModal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-5">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {isEditMode
                  ? "Edit Task"
                  : "Create New Task"}
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {isEditMode
                  ? "Update the task information."
                  : "Add a new task to your board."}
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

          {/* Form */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className={inputClassName}
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                rows="4"
                className={`${inputClassName} resize-none`}
              />
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Status */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                >
                  <option value="pending">Backlog</option>
                  <option value="in-progress">Active</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                Assignee
              </label>

              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                placeholder="Assignee name"
                className={inputClassName}
              />
            </div>
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
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600"
          >
            {isEditMode
              ? "Save Changes"
              : "Create Task"}
          </button>
        </div>
      </form>
    </TaskModal>
  );
};

export default TaskFormModal;