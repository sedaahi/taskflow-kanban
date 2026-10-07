import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSearchText } from "../store/taskSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const searchText = useSelector(
    (state) => state.tasks.searchText
  );

  const getNavLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm transition ${isActive
      ? "bg-white/10 text-white"
      : "text-white/50 hover:bg-white/[0.06] hover:text-white"
    }`;

  return (
    <header className="border-b border-white/15">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl">
              <span className="text-lg font-bold">T</span>
            </div>

            <div>
              <p className="text-lg font-semibold tracking-wide text-white">
                Taskflow
              </p>

              <p className="text-xs text-white/40">
                Personal workspace
              </p>
            </div>
          </NavLink>

          {/* Navigation */}
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
        <div className="flex items-center gap-3">
          <div className="hidden w-64 items-center rounded-full border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-xl lg:flex">
            <span className="mr-2 text-white/40">
              ⌕
            </span>

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                dispatch(setSearchText(event.target.value))
              }
              placeholder="Search tasks..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-500 text-sm font-medium text-white shadow-lg shadow-blue-950/20">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;