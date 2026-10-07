import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import TaskDetailModal from "../components/TaskDetailModal";
import { useDispatch } from "react-redux";
import TaskFormModal from "../components/TaskFormModal";
import { addTask, updateTask, deleteTask } from "../store/taskSlice";
import DeleteTaskModal from "../components/DeleteTaskModal";

const BoardPage = () => {

  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleEdit = () => {
    setEditingTask(selectedTask);
    setSelectedTask(null);
  };

  const handleUpdateTask = (formData) => {
    dispatch(
      updateTask({
        ...editingTask,
        ...formData,
      })
    );

    setEditingTask(null);
  };

  const handleCreateTask = (formData) => {
    const newTask = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));

    setIsCreatingTask(false);
  };

  const handleDeleteClick = () => {
    setDeletingTask(selectedTask);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(deletingTask.id));

    setDeletingTask(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#665875_0%,_#293d66_35%,_#172744_70%,_#101b30_100%)] text-white">
      <div className="mx-auto min-h-screen max-w-[1500px] px-6 py-6 lg:px-10">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl">
              <span className="text-lg font-bold">T</span>
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-wide">
                Taskflow
              </h1>
              <p className="text-xs text-white/45">
                Personal workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden w-72 items-center rounded-full border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-xl md:flex">
              <span className="mr-2 text-white/40">⌕</span>

              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>

            <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white/20">
              S
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm text-white/55">
              Your personal workspace
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              How's your day going?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
              Organize your work, stay focused, and keep track of your progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreatingTask(true)}
            className="w-fit rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400"
          >
            + New Task
          </button>
        </section>

        {/* Kanban */}
        <KanbanBoard onTaskClick={setSelectedTask} />
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {editingTask && (
        <TaskFormModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />
      )}

      {isCreatingTask && (
        <TaskFormModal
          onClose={() => setIsCreatingTask(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onConfirm={handleDeleteTask}
        />
      )}

    </main>
  );
};

export default BoardPage;