const Sidebar = () => {
  return (
    <aside className="w-64 bg-background border-r p-4">
      <h2 className="font-semibold mb-4">Dashboard</h2>
      <nav className="space-y-2 text-sm">
        <div className="cursor-pointer">Overview</div>
        <div className="cursor-pointer">Listings</div>
        <div className="cursor-pointer">Queries</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
