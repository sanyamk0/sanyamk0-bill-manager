const App = () => {
  const isLoading = true;

  return (
    <div className="min-h-screen bg-background">
      <main className="py-6">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <p>Dashboard</p>
        )}
      </main>
    </div>
  );
};

export default App;
