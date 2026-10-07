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

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <TaskModal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {isEditMode ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="mt-1 text-sm text-white/50">
                {isEditMode
                  ? "Update the task information."
                  : "Add a new task to your board."}
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

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                rows="4"
                className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-[#344a6b] px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
                >
                  <option value="pending">Backlog</option>
                  <option value="in-progress">Active</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-[#344a6b] px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Assignee
              </label>

              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                placeholder="Assignee name"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400"
              />
            </div>
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