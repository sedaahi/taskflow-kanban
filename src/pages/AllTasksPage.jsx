import { useSelector } from "react-redux";
import { filterTasksBySearch } from "../utils/taskUtils";

const AllTasksPage = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const searchText = useSelector(
    (state) => state.tasks.searchText
  );

  const filteredTasks = filterTasksBySearch(
    tasks,
    searchText
  );

  const statusLabels = {
    pending: "Backlog",
    "in-progress": "Active",
    completed: "Completed",
    blocked: "Blocked",
  };

  const statusStyles = {
    pending:
      "bg-[var(--badge-backlog-bg)] text-[var(--badge-backlog-text)]",
    "in-progress":
      "bg-[var(--badge-active-bg)] text-[var(--badge-active-text)]",
    completed:
      "bg-[var(--badge-completed-bg)] text-[var(--badge-completed-text)]",
    blocked:
      "bg-[var(--badge-blocked-bg)] text-[var(--badge-blocked-text)]",
  };

  const priorityStyles = {
    low:
      "bg-[var(--badge-low-bg)] text-[var(--badge-low-text)]",
    medium:
      "bg-[var(--badge-medium-bg)] text-[var(--badge-medium-text)]",
    high:
      "bg-[var(--badge-high-bg)] text-[var(--badge-high-text)]",
  };

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
          All Tasks
        </h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          View and track all tasks in one place.
        </p>
      </div>

      {/* =========================
          MOBILE TASK LIST
      ========================== */}
      <div className="space-y-3 md:hidden">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm"
            >
              {/* Title + Priority */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium text-[var(--text-primary)]">
                    {task.title}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-[var(--text-muted)]">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    priorityStyles[task.priority]
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-[var(--border-soft)] pt-3">
                {/* Status */}
                <div className="justify-self-start">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[task.status]
                    }`}
                  >
                    {statusLabels[task.status] ||
                      task.status}
                  </span>
                </div>

                {/* Assignee */}
                <span className="whitespace-nowrap text-center text-xs text-[var(--text-secondary)]">
                  {task.assignee}
                </span>

                {/* Date */}
                <span className="justify-self-end whitespace-nowrap text-xs text-[var(--text-muted)]">
                  {new Date(
                    task.createdAt
                  ).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-10 text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No tasks found.
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================== */}
      <div className="hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/5 backdrop-blur-xl md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-[var(--border-soft)] bg-[var(--surface-strong)]">
              <tr className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
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
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-[var(--border-soft)] transition last:border-0 hover:bg-[var(--surface-hover)]"
                  >
                    {/* Task */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-[var(--text-primary)]">
                        {task.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-xs text-[var(--text-muted)]">
                        {task.description}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[task.status]
                        }`}
                      >
                        {statusLabels[task.status] ||
                          task.status}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Assignee */}
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                      {task.assignee}
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4 text-sm text-[var(--text-muted)]">
                      {new Date(
                        task.createdAt
                      ).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      No tasks found.
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Try searching with a different
                      keyword.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Count */}
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        {searchText.trim()
          ? `${filteredTasks.length} of ${tasks.length} tasks shown`
          : `${tasks.length} ${
              tasks.length === 1 ? "task" : "tasks"
            } in total`}
      </p>
    </div>
  );
};

export default AllTasksPage;