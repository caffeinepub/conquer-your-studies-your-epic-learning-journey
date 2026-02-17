// Single source of truth for all Class 9 chapters across all subjects
export type Subject = 'science' | 'maths' | 'sst';

export interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  category?: string; // For Science: planet name, For SST: kingdom name
  icon: string; // Icon identifier for 3D rendering
}

// Science - THE QUANTUM GALAXY
const scienceChapters: Chapter[] = [
  // Chemistry Planet
  { id: 'sci-chem-matter', title: 'Matter in Our Surroundings', subject: 'science', category: 'Chemistry', icon: 'atom' },
  { id: 'sci-chem-atoms', title: 'Atoms and Molecules', subject: 'science', category: 'Chemistry', icon: 'molecule' },
  { id: 'sci-chem-structure', title: 'Structure of the Atom', subject: 'science', category: 'Chemistry', icon: 'nucleus' },
  
  // Physics Planet
  { id: 'sci-phy-motion', title: 'Motion', subject: 'science', category: 'Physics', icon: 'velocity' },
  { id: 'sci-phy-force', title: 'Force and Laws of Motion', subject: 'science', category: 'Physics', icon: 'force' },
  { id: 'sci-phy-gravitation', title: 'Gravitation', subject: 'science', category: 'Physics', icon: 'gravity' },
  { id: 'sci-phy-work', title: 'Work and Energy', subject: 'science', category: 'Physics', icon: 'energy' },
  { id: 'sci-phy-sound', title: 'Sound', subject: 'science', category: 'Physics', icon: 'wave' },
  
  // Biology Planet
  { id: 'sci-bio-cell', title: 'The Fundamental Unit of Life', subject: 'science', category: 'Biology', icon: 'cell' },
  { id: 'sci-bio-tissues', title: 'Tissues', subject: 'science', category: 'Biology', icon: 'tissue' },
  { id: 'sci-bio-diversity', title: 'Diversity in Living Organisms', subject: 'science', category: 'Biology', icon: 'dna' },
  { id: 'sci-bio-food', title: 'Improvement in Food Resources', subject: 'science', category: 'Biology', icon: 'plant' },
];

// Maths - THE INFINITY DUNGEON (Linear progression)
const mathsChapters: Chapter[] = [
  { id: 'math-number-systems', title: 'Number Systems', subject: 'maths', icon: 'numbers' },
  { id: 'math-polynomials', title: 'Polynomials', subject: 'maths', icon: 'polynomial' },
  { id: 'math-coordinate-geometry', title: 'Coordinate Geometry', subject: 'maths', icon: 'coordinates' },
  { id: 'math-linear-equations', title: 'Linear Equations in Two Variables', subject: 'maths', icon: 'equation' },
  { id: 'math-euclid-geometry', title: "Euclid's Geometry", subject: 'maths', icon: 'euclid' },
  { id: 'math-lines-angles', title: 'Lines and Angles', subject: 'maths', icon: 'angles' },
  { id: 'math-triangles', title: 'Triangles', subject: 'maths', icon: 'triangle' },
  { id: 'math-quadrilaterals', title: 'Quadrilaterals', subject: 'maths', icon: 'quadrilateral' },
  { id: 'math-circles', title: 'Circles', subject: 'maths', icon: 'circle' },
  { id: 'math-heron-formula', title: "Heron's Formula", subject: 'maths', icon: 'heron' },
  { id: 'math-surface-areas', title: 'Surface Areas and Volumes', subject: 'maths', icon: 'cube' },
  { id: 'math-statistics', title: 'Statistics', subject: 'maths', icon: 'stats' },
  { id: 'math-probability', title: 'Probability', subject: 'maths', icon: 'dice' },
];

// SST - THE CIVILIZATION QUEST
const sstChapters: Chapter[] = [
  // History Portal
  { id: 'sst-hist-french-rev', title: 'The French Revolution', subject: 'sst', category: 'History', icon: 'revolution' },
  { id: 'sst-hist-russian-rev', title: 'Socialism in Europe and the Russian Revolution', subject: 'sst', category: 'History', icon: 'russia' },
  { id: 'sst-hist-nazism', title: 'Nazism and the Rise of Hitler', subject: 'sst', category: 'History', icon: 'war' },
  { id: 'sst-hist-forest', title: 'Forest Society and Colonialism', subject: 'sst', category: 'History', icon: 'forest' },
  { id: 'sst-hist-pastoralists', title: 'Pastoralists in the Modern World', subject: 'sst', category: 'History', icon: 'pastoral' },
  
  // Geography Portal
  { id: 'sst-geo-india-size', title: 'India - Size and Location', subject: 'sst', category: 'Geography', icon: 'map' },
  { id: 'sst-geo-physical', title: 'Physical Features of India', subject: 'sst', category: 'Geography', icon: 'mountain' },
  { id: 'sst-geo-drainage', title: 'Drainage', subject: 'sst', category: 'Geography', icon: 'river' },
  { id: 'sst-geo-climate', title: 'Climate', subject: 'sst', category: 'Geography', icon: 'climate' },
  { id: 'sst-geo-vegetation', title: 'Natural Vegetation and Wildlife', subject: 'sst', category: 'Geography', icon: 'tree' },
  { id: 'sst-geo-population', title: 'Population', subject: 'sst', category: 'Geography', icon: 'people' },
  
  // Civics/Political Science Fortress
  { id: 'sst-civ-democracy', title: 'What is Democracy? Why Democracy?', subject: 'sst', category: 'Civics', icon: 'democracy' },
  { id: 'sst-civ-constitutional', title: 'Constitutional Design', subject: 'sst', category: 'Civics', icon: 'constitution' },
  { id: 'sst-civ-electoral', title: 'Electoral Politics', subject: 'sst', category: 'Civics', icon: 'vote' },
  { id: 'sst-civ-institutions', title: 'Working of Institutions', subject: 'sst', category: 'Civics', icon: 'institution' },
  { id: 'sst-civ-rights', title: 'Democratic Rights', subject: 'sst', category: 'Civics', icon: 'rights' },
  
  // Economics Valley
  { id: 'sst-eco-palampur', title: 'The Story of Village Palampur', subject: 'sst', category: 'Economics', icon: 'village' },
  { id: 'sst-eco-resource', title: 'People as Resource', subject: 'sst', category: 'Economics', icon: 'human' },
  { id: 'sst-eco-poverty', title: 'Poverty as a Challenge', subject: 'sst', category: 'Economics', icon: 'poverty' },
  { id: 'sst-eco-food-security', title: 'Food Security in India', subject: 'sst', category: 'Economics', icon: 'food' },
];

export const allChapters: Chapter[] = [
  ...scienceChapters,
  ...mathsChapters,
  ...sstChapters,
];

export const getChapterById = (id: string): Chapter | undefined => {
  return allChapters.find(ch => ch.id === id);
};

export const getChaptersBySubject = (subject: Subject): Chapter[] => {
  return allChapters.filter(ch => ch.subject === subject);
};

export const getChaptersByCategory = (subject: Subject, category: string): Chapter[] => {
  return allChapters.filter(ch => ch.subject === subject && ch.category === category);
};

// Science planets
export const sciencePlanets = [
  { name: 'Chemistry', icon: 'flask', color: 'from-cyan-500 to-blue-500' },
  { name: 'Physics', icon: 'zap', color: 'from-purple-500 to-pink-500' },
  { name: 'Biology', icon: 'leaf', color: 'from-green-500 to-emerald-500' },
];

// SST kingdoms
export const sstKingdoms = [
  { name: 'History', displayName: 'History Portal', icon: 'scroll', color: 'from-amber-500 to-orange-500' },
  { name: 'Geography', displayName: 'Geography Portal', icon: 'globe', color: 'from-blue-500 to-cyan-500' },
  { name: 'Civics', displayName: 'Civics/Pol Science Fortress', icon: 'landmark', color: 'from-red-500 to-rose-500' },
  { name: 'Economics', displayName: 'Economics Valley', icon: 'coins', color: 'from-yellow-500 to-amber-500' },
];
