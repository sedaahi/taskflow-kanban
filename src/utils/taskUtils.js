export const filterTasksBySearch = (tasks, searchText) => {
  const search = searchText.trim().toLowerCase();

  if (!search) {
    return tasks;
  }

  return tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search) ||
      task.assignee.toLowerCase().includes(search)
    );
  });
};