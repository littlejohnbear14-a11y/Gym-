import { WeekRoutine, InventoryItem } from './types';

export const INVENTORY: InventoryItem[] = [
  { name: "Banc de musculació inclinable (amb torre politja, ext. quads/femoral, banc Scott)" },
  { name: "Accesoris tracció torre politja" },
  { name: "Banc abdominals inclinable" },
  { name: "Rack de musculació (sentadillas, elevacions hombro)" },
  { name: "Peses i mancuernas pesos lliures" },
  { name: "Discos diversos" },
  { name: "Barra 1.55m" },
  { name: "Barra 1.20m" },
  { name: "Barra Z" },
  { name: "Barra bomber" },
  { name: "Blocadors de discs" },
  { name: "Chaleco lastrat" },
  { name: "Cinturó de lastre" },
  { name: "Cadira romana (dominades, fondos, abs)" },
  { name: "Bandes elàstiques" },
  { name: "Roda abdominal" },
  { name: "Agafadors flexions (normals, rodetes, equilibri)" },
  { name: "Corretjes tracció" },
  { name: "Lastres turmells" },
  { name: "Lífting strap / canell" },
  { name: "Handgrips ajustables" },
  { name: "Extensor fitness" },
  { name: "Banc lumbars" },
  { name: "Step stepper" },
  { name: "Barres paral·leles mòbils" },
  { name: "Coixí / Plataforma equilibri" },
  { name: "Cuñes sentadillas" },
  { name: "Bodypower abductores" },
  { name: "Foamroller" },
  { name: "Anillas" }
];

export const WORKOUT_PLANS: WeekRoutine[] = [
  {
    id: 1,
    title: "Setmana 1: Full Body Intel·ligent",
    days: {
      Monday: {
        title: "Dilluns",
        focus: "CAMES INTENSES + DELTOIDE MITJÀ",
        exercises: [
          { id: 'w1d1_1', name: "Dominades", sets: "3-4", reps: "6-10", muscleGroup: "back", notes: "Pes extra si pots" },
          { id: 'w1d1_2', name: "Elevacions laterals amb banda", sets: "2-3", reps: "15-20", muscleGroup: "shoulders", notes: "Activació" },
          { id: 'w1d1_3', name: "Hip Thrust", sets: "4", reps: "8-12", muscleGroup: "glutes" },
          { id: 'w1d1_4', name: "Squat amb barra", sets: "3", reps: "6-10", muscleGroup: "legs" },
          { id: 'w1d1_5', name: "Press militar / Arnold press", sets: "3", reps: "8-12", muscleGroup: "shoulders" },
          { id: 'w1d1_6', name: "Rem amb barra o màquina", sets: "3", reps: "10-12", muscleGroup: "back" },
          { id: 'w1d1_7', name: "Pec fly / Dec", sets: "2-3", reps: "12-15", muscleGroup: "chest" }
        ]
      },
      Tuesday: {
        title: "Dimarts",
        focus: "CAMES LLEUGERES + UPPER PESAT",
        exercises: [
          { id: 'w1d2_1', name: "Dominades assistides / rang alt", sets: "3", reps: "8-12", muscleGroup: "back" },
          { id: 'w1d2_2', name: "Elevacions laterals amb banda", sets: "2", reps: "15-20", muscleGroup: "shoulders" },
          { id: 'w1d2_3', name: "Split squat / pre-exhaust unilateral", sets: "3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w1d2_4', name: "Femoral màquina / curl", sets: "3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w1d2_5', name: "Press banca / inclinat", sets: "3-4", reps: "6-10", muscleGroup: "chest" },
          { id: 'w1d2_6', name: "Rem amb barra / mancuerna", sets: "3", reps: "6-10", muscleGroup: "back" },
          { id: 'w1d2_7', name: "Press militar / Arnold press", sets: "3", reps: "6-10", muscleGroup: "shoulders" }
        ]
      },
      Thursday: {
        title: "Dijous",
        focus: "CAMES INTENSES POSTERIOR + DELTOIDE MITJÀ",
        exercises: [
          { id: 'w1d3_1', name: "Dominades", sets: "3-4", reps: "6-10", muscleGroup: "back" },
          { id: 'w1d3_2', name: "Elevacions laterals amb banda", sets: "2-3", reps: "15-20", muscleGroup: "shoulders" },
          { id: 'w1d3_3', name: "Peso muerto / Romanian deadlift", sets: "4", reps: "6-10", muscleGroup: "legs" },
          { id: 'w1d3_4', name: "Hip Thrust", sets: "3", reps: "8-10", muscleGroup: "glutes" },
          { id: 'w1d3_5', name: "Press militar / Arnold press", sets: "3", reps: "8-12", muscleGroup: "shoulders" },
          { id: 'w1d3_6', name: "Rem amb barra / mancuerna", sets: "3", reps: "10-12", muscleGroup: "back" },
          { id: 'w1d3_7', name: "Pec fly / Dec", sets: "2-3", reps: "12-15", muscleGroup: "chest" }
        ]
      },
      Friday: {
        title: "Divendres",
        focus: "CAMES LLEUGERES + UPPER PUMP",
        exercises: [
          { id: 'w1d4_1', name: "Dominades rang alt / assistida", sets: "3", reps: "10-15", muscleGroup: "back" },
          { id: 'w1d4_2', name: "Elevacions laterals amb banda", sets: "2", reps: "15-20", muscleGroup: "shoulders" },
          { id: 'w1d4_3', name: "Split squat / ext. quads / curl fem.", sets: "3", reps: "12-20", muscleGroup: "legs" },
          { id: 'w1d4_4', name: "Press banca / fly / apertures", sets: "3", reps: "12-15", muscleGroup: "chest" },
          { id: 'w1d4_5', name: "Rem amb mancuerna / cable", sets: "3", reps: "12-15", muscleGroup: "back" },
          { id: 'w1d4_6', name: "Elevacions laterals amb manuelles", sets: "3", reps: "12-15", muscleGroup: "shoulders" },
          { id: 'w1d4_7', name: "Ab wheel / core", sets: "2-3", reps: "15-20", muscleGroup: "core" }
        ]
      }
    }
  },
  {
    id: 2,
    title: "Setmana 2: Pla Alt Volum Revisat",
    days: {
      Monday: {
        title: "Dilluns",
        focus: "PART INFERIOR (CAMES INTENSES)",
        exercises: [
          { id: 'w2d1_1', name: "Hip Thrust", sets: "4", reps: "8-12", muscleGroup: "glutes" },
          { id: 'w2d1_2', name: "Squat amb barra", sets: "3", reps: "6-10", muscleGroup: "legs" },
          { id: 'w2d1_3', name: "Split squat unilateral", sets: "3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w2d1_4', name: "Extensió quads / sissy squat", sets: "2-3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w2d1_5', name: "Elevacions de gemelos", sets: "3", reps: "15-20", muscleGroup: "legs" },
          { id: 'w2d1_6', name: "Dominades", sets: "3-4", reps: "6-10", muscleGroup: "back", notes: "Inici sessió upper" },
          { id: 'w2d1_7', name: "Elevacions laterals amb banda", sets: "2-3", reps: "15-20", muscleGroup: "shoulders" }
        ]
      },
      Tuesday: {
        title: "Dimarts",
        focus: "PART SUPERIOR (UPPER PESAT)",
        exercises: [
          { id: 'w2d2_1', name: "Dominades", sets: "4", reps: "8-12", muscleGroup: "back" },
          { id: 'w2d2_2', name: "Rem amb barra / mancuerna", sets: "3", reps: "6-10", muscleGroup: "back" },
          { id: 'w2d2_3', name: "Elevacions laterals amb banda", sets: "2-3", reps: "15-20", muscleGroup: "shoulders" },
          { id: 'w2d2_4', name: "Press banca / inclinat", sets: "3-4", reps: "6-10", muscleGroup: "chest" },
          { id: 'w2d2_5', name: "Pecho aperturas amb banda", sets: "2", reps: "12-15", muscleGroup: "chest" },
          { id: 'w2d2_6', name: "Press militar / Arnold press", sets: "3", reps: "6-10", muscleGroup: "shoulders" },
          { id: 'w2d2_7', name: "Deltoide posterior", sets: "2-3", reps: "12-15", muscleGroup: "shoulders" },
          { id: 'w2d2_8', name: "Ab wheel / core", sets: "2-3", reps: "15-20", muscleGroup: "core" }
        ]
      },
      Thursday: {
        title: "Dijous",
        focus: "PART INFERIOR (ESTÈTICA / VOLUM)",
        exercises: [
          { id: 'w2d3_1', name: "Hip Thrust", sets: "3", reps: "8-10", muscleGroup: "glutes" },
          { id: 'w2d3_2', name: "Squat amb barra", sets: "3", reps: "6-10", muscleGroup: "legs" },
          { id: 'w2d3_3', name: "Split squat unilateral", sets: "3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w2d3_4', name: "Femoral màquina / curl", sets: "3", reps: "12-15", muscleGroup: "legs" },
          { id: 'w2d3_5', name: "Extensió de quads / sissy squat", sets: "2", reps: "12-15", muscleGroup: "legs" },
          { id: 'w2d3_6', name: "Elevacions de gemelos", sets: "3", reps: "15-20", muscleGroup: "legs" },
          { id: 'w2d3_7', name: "Dominades", sets: "3", reps: "8-12", muscleGroup: "back" },
          { id: 'w2d3_8', name: "Elevacions laterals amb banda", sets: "2", reps: "15-20", muscleGroup: "shoulders" }
        ]
      },
      Friday: {
        title: "Divendres",
        focus: "PART SUPERIOR (GLUTI + DELTOIDE)",
        exercises: [
          { id: 'w2d4_1', name: "Dominades", sets: "3-4", reps: "6-10", muscleGroup: "back" },
          { id: 'w2d4_2', name: "Elevacions laterals amb banda", sets: "2-3", reps: "15-20", muscleGroup: "shoulders" },
          { id: 'w2d4_3', name: "Peso muerto / RDL", sets: "4", reps: "6-10", muscleGroup: "legs" },
          { id: 'w2d4_4', name: "Rem amb barra / mancuerna", sets: "3", reps: "10-12", muscleGroup: "back" },
          { id: 'w2d4_5', name: "Press de bíceps barra Z / Scott", sets: "2-3", reps: "10-12", muscleGroup: "arms" },
          { id: 'w2d4_6', name: "Pec fly / dec", sets: "2-3", reps: "12-15", muscleGroup: "chest" },
          { id: 'w2d4_7', name: "Ab wheel / core", sets: "2-3", reps: "15-20", muscleGroup: "core" }
        ]
      }
    }
  }
];
