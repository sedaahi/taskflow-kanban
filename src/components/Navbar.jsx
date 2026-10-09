import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSearchText } from "../store/taskSlice";

const Navbar = ({ theme, onToggleTheme }) => {
  const dispatch = useDispatch();

  const searchText = useSelector(
    (state) => state.tasks.searchText
  );

  const getNavLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm transition ${isActive
      ? "bg-[var(--surface-strong)] text-[var(--text-primary)]"
      : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <header className="border-b border-[var(--border)]">
      {/* Main Navbar */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl sm:h-11 sm:w-11">
              <span className="text-lg font-bold text-[var(--text-primary)]">
                <img
                  src="/t-logo.png"
                  alt="TaskFlow Nexus"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </span>
            </div>

            <div>
              <p className="text-base font-semibold tracking-wide text-[var(--text-primary)] sm:text-lg">
                Taskflow
              </p>

              <p className="text-[11px] text-[var(--text-muted)] sm:text-xs">
                Personal workspace
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/"
              end
              className={getNavLinkClass}
            >
              Board
            </NavLink>

            <NavLink
              to="/tasks"
              className={getNavLinkClass}
            >
              All Tasks
            </NavLink>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Search */}
          <div className="hidden w-64 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 backdrop-blur-xl lg:flex">
            <span className="mr-2 text-[var(--text-muted)]">
              ⌕
            </span>

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                dispatch(
                  setSearchText(event.target.value)
                )
              }
              placeholder="Search tasks..."
              className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-lg backdrop-blur-xl transition hover:bg-[var(--surface-hover)]"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Avatar */}
          {/* <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500 text-sm font-medium text-white shadow-lg shadow-blue-950/20">
            S
          </div> */}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="mx-auto flex max-w-[1500px] gap-1 px-6 pb-3 md:hidden">
        <NavLink
          to="/"
          end
          className={getNavLinkClass}
        >
          Board
        </NavLink>

        <NavLink
          to="/tasks"
          className={getNavLinkClass}
        >
          All Tasks
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;