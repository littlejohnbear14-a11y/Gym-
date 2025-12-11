import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <header className="w-full max-w-md p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl font-bold text-emerald-400 tracking-tight">GymTracker <span className="text-slate-400 font-light">Pro</span></h1>
      </header>
      <main className="w-full max-w-md flex-1 p-4 pb-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
