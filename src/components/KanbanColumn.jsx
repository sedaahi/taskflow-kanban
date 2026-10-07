import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../store/taskSlice";
import TaskCard from "./TaskCard";

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
            className="min-h-[500px] rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-xl shadow-black/10 backdrop-blur-xl"
        >                <div className="mb-5 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${dotColor}`}
                        />

                        <h2 className="font-semibold text-white">
                            {title}
                        </h2>
                    </div>

                    <p className="ml-[18px] mt-1 text-xs text-white/40">
                        {subtitle}
                    </p>
                </div>

                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70">
                    {tasks.length}
                </span>
            </div>

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