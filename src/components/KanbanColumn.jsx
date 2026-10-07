import { useDispatch } from "react-redux";

import TaskCard from "./TaskCard";
import { updateTaskStatus } from "../store/taskSlice";

const KanbanColumn = ({
  title,
  subtitle,
  dotColor,
  status,
  tasks,
  onTaskClick,
}) => {
  const dispatch = useDispatch();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const taskId = Number(
      event.dataTransfer.getData("taskId")
    );

    dispatch(
      updateTaskStatus({
        taskId,
        status,
      })
    );
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-[500px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl shadow-black/10 backdrop-blur-xl"
    >
      {/* Column Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <span
            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`}
          />

          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">
              {title}
            </h3>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {subtitle}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[var(--surface-strong)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
          />
        ))}
      </div>
    </section>
  );
};

export default KanbanColumn;