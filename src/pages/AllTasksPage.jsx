import { useSelector } from "react-redux";

const AllTasksPage = () => {
    
  const tasks = useSelector((state) => state.tasks.tasks);

  const statusLabels = {
    pending: "Backlog",
    "in-progress": "Active",
    completed: "Completed",
    blocked: "Blocked",
  };

  const statusStyles = {
    pending: "bg-slate-500/20 text-slate-200",
    "in-progress": "bg-blue-500/20 text-blue-200",
    completed: "bg-emerald-500/20 text-emerald-200",
    blocked: "bg-red-500/20 text-red-200",
  };

  const priorityStyles = {
    low: "bg-emerald-500/20 text-emerald-200",
    medium: "bg-amber-500/20 text-amber-200",
    high: "bg-red-500/20 text-red-200",
  };

  return (
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
        <div className="mb-8">
        

          <h1 className="text-3xl font-semibold">
            All Tasks
          </h1>

          <p className="mt-2 text-sm text-white/50">
            View and track all tasks in one place.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.05]">
                <tr className="text-xs uppercase tracking-wider text-white/40">
                  <th className="px-5 py-4 font-medium">
                    Task
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Priority
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Assignee
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-white/[0.07] transition last:border-0 hover:bg-white/[0.05]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {task.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-xs text-white/40">
                        {task.description}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          statusStyles[task.status]
                        }`}
                      >
                        {statusLabels[task.status]}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs capitalize ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-white/70">
                      {task.assignee}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/50">
                      {new Date(
                        task.createdAt
                      ).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/40">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in total
        </p>
      </div>
  );
};

export default AllTasksPage;