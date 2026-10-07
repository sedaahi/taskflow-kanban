const TaskCard = ({ task, onClick }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "taskId",
      task.id.toString()
    );
  };
  const priorityStyles = {
    high: "bg-red-500/20 text-red-200",
    medium: "bg-amber-500/20 text-amber-200",
    low: "bg-emerald-500/20 text-emerald-200",
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(task)}
      className="cursor-grab rounded-2xl border border-white/15 bg-white/[0.12] p-4 shadow-lg shadow-black/10 backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.16] active:cursor-grabbing"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white">{task.title}</h3>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]
            }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mb-4 text-sm leading-6 text-white/60">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs text-white/50">
        <span>{task.assignee}</span>

        <span>
          {new Date(task.createdAt).toLocaleDateString("tr-TR")}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;