const TaskCard = ({ task, onClick }) => {
  const priorityStyles = {
    high: {
      backgroundColor: "var(--priority-high-bg)",
      color: "var(--priority-high-text)",
    },
    medium: {
      backgroundColor: "var(--priority-medium-bg)",
      color: "var(--priority-medium-text)",
    },
    low: {
      backgroundColor: "var(--priority-low-bg)",
      color: "var(--priority-low-text)",
    },
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "taskId",
      task.id.toString()
    );
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(task)}
      className="cursor-grab rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:cursor-grabbing"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-medium text-[var(--text-primary)]">
          {task.title}
        </h4>

        <span
          style={priorityStyles[task.priority]}
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--text-muted)]">
        {task.description}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
            {task.assignee?.charAt(0).toUpperCase()}
          </div>

          <span className="text-xs text-[var(--text-secondary)]">
            {task.assignee}
          </span>
        </div>

        <span className="text-xs text-[var(--text-muted)]">
          {new Date(task.createdAt).toLocaleDateString(
            "en-GB"
          )}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;