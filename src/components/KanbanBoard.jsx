import { useSelector } from "react-redux";

import KanbanColumn from "./KanbanColumn";
import { filterTasksBySearch } from "../utils/taskUtils";

const COLUMNS = [
  {
    title: "Backlog",
    subtitle: "Tasks waiting to be started",
    status: "pending",
    dotColor: "bg-slate-400",
  },
  {
    title: "Active",
    subtitle: "Tasks currently in progress",
    status: "in-progress",
    dotColor: "bg-blue-500",
  },
  {
    title: "Completed",
    subtitle: "Successfully completed tasks",
    status: "completed",
    dotColor: "bg-emerald-500",
  },
  {
    title: "Blocked",
    subtitle: "Tasks that need attention",
    status: "blocked",
    dotColor: "bg-rose-500",
  },
];

const KanbanBoard = ({ onTaskClick }) => {
  const tasks = useSelector(
    (state) => state.tasks.tasks
  );

  const searchText = useSelector(
    (state) => state.tasks.searchText
  );

  const filteredTasks = filterTasksBySearch(
    tasks,
    searchText
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((column) => {
        const columnTasks = filteredTasks.filter(
          (task) => task.status === column.status
        );

        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            subtitle={column.subtitle}
            status={column.status}
            dotColor={column.dotColor}
            tasks={columnTasks}
            onTaskClick={onTaskClick}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;