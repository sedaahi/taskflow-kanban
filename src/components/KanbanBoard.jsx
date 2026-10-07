import { useSelector } from "react-redux";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
    const tasks = useSelector((state) => state.tasks.tasks);

    const columns = [
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
            dotColor: "bg-blue-400",
        },
        {
            title: "Completed",
            subtitle: "Successfully completed tasks",
            status: "completed",
            dotColor: "bg-emerald-400",
        },
        {
            title: "Blocked",
            subtitle: "Tasks that need attention",
            status: "blocked",
            dotColor: "bg-rose-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((column) => {
                const columnTasks = tasks.filter(
                    (task) => task.status === column.status
                );

                return (
                    <KanbanColumn
                        key={column.status}
                        title={column.title}
                        subtitle={column.subtitle}
                        dotColor={column.dotColor}
                        status={column.status}
                        tasks={columnTasks}
                    />
                );
            })}
        </div>
    );
};

export default KanbanBoard;