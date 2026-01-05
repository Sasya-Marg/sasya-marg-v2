import Logo from "./Logo";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-background border-r p-4">
      <div className="font-semibold mb-4 flex gap-2 items-center">
        <Logo className={"w-8 h-8"} /> <span>SasyaMarg</span>
      </div>
      <nav className="space-y-2 text-sm">
        <div className="cursor-pointer">Overview</div>
        <div className="cursor-pointer">Listings</div>
        <div className="cursor-pointer">Queries</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
