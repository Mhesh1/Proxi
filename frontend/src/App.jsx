import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-proxi-900 text-slate-300 font-sans selection:bg-proxi-accent/30 selection:text-white flex relative overflow-hidden">
      
      {/* Ambient glowing background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-proxi-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-proxi-neon/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Layout */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden pl-64 relative z-10 transition-all duration-300">
        <Topbar />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
