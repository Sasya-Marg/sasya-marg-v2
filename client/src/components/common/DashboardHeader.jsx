const DashboardHeader = () => {
  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="text-sm text-muted-foreground">User</div>
    </header>
  );
};

export default DashboardHeader;
