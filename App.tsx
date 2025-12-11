import React, { useState, useEffect } from 'react';
import { WORKOUT_PLANS } from './constants';
import Layout from './components/Layout';
import ExerciseCard from './components/ExerciseCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Dumbbell, CalendarDays, LineChart as ChartIcon } from 'lucide-react';

// Simple types for local storage
type LogEntry = {
  date: string;
  exerciseId: string;
  sets: { reps: number; weight: number }[];
};

const App: React.FC = () => {
  // State
  const [currentWeekId, setCurrentWeekId] = useState<1 | 2>(1);
  const [selectedDayKey, setSelectedDayKey] = useState<string>('Monday');
  const [view, setView] = useState<'workout' | 'stats'>('workout');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('gym_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    
    const savedWeek = localStorage.getItem('current_week');
    if (savedWeek) setCurrentWeekId(parseInt(savedWeek) as 1 | 2);

    // Auto-select today
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    // If today is a workout day, select it, otherwise default to Monday
    const currentPlan = WORKOUT_PLANS.find(p => p.id === (savedWeek ? parseInt(savedWeek) : 1));
    if (currentPlan && currentPlan.days[today]) {
        setSelectedDayKey(today);
    }
  }, []);

  const handleSaveLog = (exerciseId: string, sets: { reps: number; weight: number }[]) => {
    const newEntry: LogEntry = {
      date: new Date().toISOString().split('T')[0],
      exerciseId,
      sets
    };
    
    const newLogs = [...logs.filter(l => !(l.date === newEntry.date && l.exerciseId === exerciseId)), newEntry];
    setLogs(newLogs);
    localStorage.setItem('gym_logs', JSON.stringify(newLogs));
  };

  const toggleWeek = () => {
    const newWeek = currentWeekId === 1 ? 2 : 1;
    setCurrentWeekId(newWeek);
    localStorage.setItem('current_week', newWeek.toString());
  };

  const currentPlan = WORKOUT_PLANS.find(p => p.id === currentWeekId);
  const currentDay = currentPlan?.days[selectedDayKey];
  const dayKeys = ['Monday', 'Tuesday', 'Thursday', 'Friday']; // Hardcoded based on plan structure

  // Stats Logic
  const getStatsData = () => {
    // Aggregate volume (total weight lifted) per day for the last 7 workouts
    const dailyVolume: {[date: string]: number} = {};
    logs.forEach(log => {
      const vol = log.sets.reduce((acc, set) => acc + (set.weight * set.reps), 0);
      dailyVolume[log.date] = (dailyVolume[log.date] || 0) + vol;
    });
    
    return Object.entries(dailyVolume)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .slice(-7)
      .map(([date, volume]) => ({ date: date.slice(5), volume }));
  };

  return (
    <Layout>
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={toggleWeek}
          className="bg-slate-900 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-emerald-950/30 transition-colors"
        >
          <CalendarDays className="w-4 h-4" />
          {currentWeekId === 1 ? "Setmana 1 (Full Body)" : "Setmana 2 (Alt Volum)"}
        </button>

        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
           <button 
            onClick={() => setView('workout')}
            className={`p-2 rounded ${view === 'workout' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
           >
             <Dumbbell className="w-5 h-5"/>
           </button>
           <button 
            onClick={() => setView('stats')}
            className={`p-2 rounded ${view === 'stats' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
           >
             <ChartIcon className="w-5 h-5"/>
           </button>
        </div>
      </div>

      {view === 'workout' && (
        <>
          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
            {dayKeys.map(key => (
              <button
                key={key}
                onClick={() => setSelectedDayKey(key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDayKey === key 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'
                }`}
              >
                {key === 'Monday' ? 'Dl' : key === 'Tuesday' ? 'Dt' : key === 'Thursday' ? 'Dj' : 'Dv'}
              </button>
            ))}
          </div>

          {/* Current Day Header */}
          {currentDay ? (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">{currentDay.title}</h2>
              <p className="text-emerald-400 text-xs uppercase tracking-wider font-semibold border-l-2 border-emerald-500 pl-2">
                {currentDay.focus}
              </p>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">No hay rutina hoy. ¡Descansa!</div>
          )}

          {/* Exercise List */}
          <div className="space-y-4">
            {currentDay?.exercises.map(exercise => {
              // Find last log for this exercise to pre-fill or show history
              const lastLog = logs
                .filter(l => l.exerciseId === exercise.id)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

              return (
                <ExerciseCard 
                  key={exercise.id} 
                  exercise={exercise} 
                  onSave={(sets) => handleSaveLog(exercise.id, sets)}
                  lastLog={lastLog?.sets}
                />
              );
            })}
          </div>
        </>
      )}

      {view === 'stats' && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ChartIcon className="text-emerald-500"/> Progrés de Volum (Total Kg)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getStatsData()}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Bar dataKey="volume" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            Mostrant volum total dels últims 7 dies d'entrenament.
          </p>
          
          <div className="mt-8">
            <h4 className="font-semibold text-slate-300 mb-2">Historial recent</h4>
            <div className="space-y-2">
              {logs.slice(-5).reverse().map((log, i) => {
                 // Very inefficient lookup for demo purposes, in real app normalize state
                 const exName = WORKOUT_PLANS
                    .flatMap(w => Object.values(w.days))
                    .flatMap(d => d.exercises)
                    .find(e => e.id === log.exerciseId)?.name || "Desconocido";

                 return (
                  <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded border border-slate-800/50">
                    <div>
                      <div className="text-sm text-white">{exName}</div>
                      <div className="text-xs text-slate-500">{log.date}</div>
                    </div>
                    <div className="text-emerald-400 font-mono text-sm">
                       {Math.max(...log.sets.map(s => s.weight))}kg max
                    </div>
                  </div>
                 )
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
