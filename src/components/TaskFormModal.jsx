
import { useState } from "react";
import TaskModal from "./TaskModal";

const validStatuses = [
  "pending",
  "in-progress",
  "completed",
  "blocked",
];

const validPriorities = ["low", "medium", "high"];

const validateForm = (data) => {
  const errors = {};

  const title = data.title.trim();
  const description = data.description.trim();
  const assignee = data.assignee.trim();

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (title.length > 100) {
    errors.title = "Title cannot exceed 100 characters.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 10) {
    errors.description =
      "Description must be at least 10 characters.";
  } else if (description.length > 500) {
    errors.description =
      "Description cannot exceed 500 characters.";
  }

  if (!validStatuses.includes(data.status)) {
    errors.status = "Please select a valid status.";
  }

  if (!validPriorities.includes(data.priority)) {
    errors.priority = "Please select a valid priority.";
  }

  if (!assignee) {
    errors.assignee = "Assignee is required.";
  } else if (assignee.length < 2) {
    errors.assignee =
      "Assignee must be at least 2 characters.";
  } else if (assignee.length > 50) {
    errors.assignee =
      "Assignee cannot exceed 50 characters.";
  }

  return errors;
};

const TaskFormModal = ({ task, onClose, onSubmit }) => {
  const isEditMode = Boolean(task);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    assignee: task?.assignee || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // Validate changed fields after first submission
    if (isSubmitted) {
      setErrors(validateForm(updatedData));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitted(true);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      assignee: formData.assignee.trim(),
    });
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-500 ${
      errors[field]
        ? "border-red-500"
        : "border-[var(--border)]"
    }`;

  const renderError = (field) =>
    errors[field] ? (
      <p role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-300">
        {errors[field]}
      </p>
    ) : null;

  return (
    <TaskModal onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="max-h-[75vh] overflow-y-auto p-5">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {isEditMode ? "Edit Task" : "Create New Task"}
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

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="task-title"
                className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
              >
                Title *
              </label>

              <input
                id="task-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                aria-invalid={Boolean(errors.title)}
                className={inputClass("title")}
              />

              {renderError("title")}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="task-description"
                className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
              >
                Description *
              </label>

              <textarea
                id="task-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                rows={4}
                aria-invalid={Boolean(errors.description)}
                className={`${inputClass("description")} resize-none`}
              />

              {renderError("description")}
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-status"
                  className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Status *
                </label>

                <select
                  id="task-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.status)}
                  className={inputClass("status")}
                >
                  <option value="pending">Backlog</option>
                  <option value="in-progress">Active</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>

                {renderError("status")}
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Priority *
                </label>

                <select
                  id="task-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.priority)}
                  className={inputClass("priority")}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                {renderError("priority")}
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label
                htmlFor="task-assignee"
                className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
              >
                Assignee *
              </label>

              <input
                id="task-assignee"
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                placeholder="Assignee name"
                aria-invalid={Boolean(errors.assignee)}
                className={inputClass("assignee")}
              />

              {renderError("assignee")}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-[var(--border)] bg-[var(--modal-footer)] p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400"
          >
            {isEditMode ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </TaskModal>
  );
};

export default TaskFormModal;
