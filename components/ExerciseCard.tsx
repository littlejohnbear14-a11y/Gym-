import React, { useState } from 'react';
import { Exercise, MuscleGroup } from '../types';
import MuscleMap from './MuscleMap';
import { getAlternatives } from '../services/geminiService';
import { Loader2, RefreshCw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onSave: (sets: { reps: number; weight: number }[]) => void;
  lastLog?: { reps: number; weight: number }[];
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onSave, lastLog }) => {
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inputs, setInputs] = useState<{ reps: string; weight: string }[]>(
    Array.from({ length: 4 }).map((_, i) => ({
      reps: lastLog?.[i]?.reps.toString() || '',
      weight: lastLog?.[i]?.weight.toString() || ''
    }))
  );
  
  // Alternatives State
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [loadingAlt, setLoadingAlt] = useState(false);

  const handleInputChange = (index: number, field: 'reps' | 'weight', value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [field]: value };
    setInputs(newInputs);
  };

  const handleFinish = () => {
    const validSets = inputs
      .filter(i => i.reps && i.weight)
      .map(i => ({ reps: parseInt(i.reps), weight: parseInt(i.weight) }));
    
    if (validSets.length > 0) {
      onSave(validSets);
      setCompleted(true);
      setExpanded(false);
    }
  };

  const fetchAlternatives = async () => {
    if (alternatives.length > 0) {
      setShowAlternatives(!showAlternatives);
      return;
    }
    setLoadingAlt(true);
    setShowAlternatives(true);
    const alts = await getAlternatives(exercise.name, exercise.muscleGroup);
    setAlternatives(alts);
    setLoadingAlt(false);
  };

  return (
    <div className={`mb-4 rounded-xl border transition-all duration-300 ${completed ? 'bg-slate-900/50 border-emerald-900/50' : 'bg-slate-900 border-slate-800'}`}>
      
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full p-1 flex-shrink-0 border border-slate-700">
             <MuscleMap highlight={exercise.muscleGroup} />
          </div>
          <div>
            <h3 className={`font-semibold ${completed ? 'text-emerald-400 line-through decoration-slate-500' : 'text-slate-100'}`}>
              {exercise.name}
            </h3>
            <div className="text-xs text-slate-400 flex gap-2">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{exercise.sets} Series</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{exercise.reps} Reps</span>
            </div>
          </div>
        </div>
        <div>
          {completed ? <CheckCircle2 className="text-emerald-500 w-6 h-6" /> : (expanded ? <ChevronUp className="text-slate-500"/> : <ChevronDown className="text-slate-500"/>)}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="p-4 pt-0 border-t border-slate-800 mt-2 bg-slate-900/50">
          {exercise.notes && (
            <p className="text-xs text-amber-400 mb-4 mt-2 italic flex items-center gap-1">
              <span>💡</span> {exercise.notes}
            </p>
          )}

          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 text-center">
              <span>Set</span>
              <span>Kg</span>
              <span>Reps</span>
            </div>
            {inputs.map((inp, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <div className="flex items-center justify-center text-slate-500 text-sm font-mono">
                  #{idx + 1}
                </div>
                <input 
                  type="number" 
                  placeholder="Kg"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-center text-white focus:border-emerald-500 focus:outline-none"
                  value={inp.weight}
                  onChange={(e) => handleInputChange(idx, 'weight', e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Reps"
                  className="bg-slate-950 border border-slate-700 rounded p-2 text-center text-white focus:border-emerald-500 focus:outline-none"
                  value={inp.reps}
                  onChange={(e) => handleInputChange(idx, 'reps', e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={fetchAlternatives}
              className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 text-sm hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Alternativas
            </button>
            <button 
              onClick={handleFinish}
              className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              Marcar Fet
            </button>
          </div>

          {/* Alternatives Section */}
          {showAlternatives && (
            <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800">
               <h4 className="text-sm font-bold text-slate-300 mb-2">Alternativas Sugerides (IA):</h4>
               {loadingAlt ? (
                 <div className="flex justify-center py-4"><Loader2 className="animate-spin text-emerald-500"/></div>
               ) : (
                 <ul className="space-y-3">
                   {alternatives.map((alt, i) => (
                     <li key={i} className="text-xs text-slate-400 border-b border-slate-900 last:border-0 pb-2 last:pb-0">
                       <strong className="text-emerald-400 block mb-0.5">{alt.name}</strong>
                       <span className="block mb-1">{alt.reason}</span>
                       <span className="block text-slate-500 italic">config: {alt.setup}</span>
                     </li>
                   ))}
                   {alternatives.length === 0 && <p className="text-xs text-slate-500">No s'han trobat alternatives o error de connexió.</p>}
                 </ul>
               )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
