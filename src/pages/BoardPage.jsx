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
    <>
      <div className="mx-auto max-w-[1500px] px-6 pb-10 lg:px-10">
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

    </>
  );
};

export default BoardPage;