type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type BossFights = {
  science: Question[];
  maths: Question[];
  sst: Question[];
};

export const bossFights: BossFights = {
  science: [
    {
      question: "What is the smallest unit of matter?",
      options: ["Molecule", "Atom", "Electron", "Proton"],
      correctAnswer: "Atom",
      explanation: "An atom is the smallest unit that retains the properties of an element."
    },
    {
      question: "Which law states energy cannot be created or destroyed?",
      options: ["Newton's First Law", "Conservation of Energy", "Law of Gravity", "Ohm's Law"],
      correctAnswer: "Conservation of Energy",
      explanation: "Energy can only be transformed from one form to another."
    },
    {
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "O2", "H2O2"],
      correctAnswer: "H2O",
      explanation: "Water is composed of two hydrogen atoms and one oxygen atom."
    },
    {
      question: "What force keeps planets in orbit?",
      options: ["Magnetic", "Gravitational", "Nuclear", "Friction"],
      correctAnswer: "Gravitational",
      explanation: "Gravitational force attracts masses and keeps planets in orbit."
    },
    {
      question: "Which element has atomic number 6?",
      options: ["Oxygen", "Nitrogen", "Carbon", "Hydrogen"],
      correctAnswer: "Carbon",
      explanation: "Carbon has 6 protons, giving it atomic number 6."
    }
  ],
  maths: [
    {
      question: "What is the value of π approximately?",
      options: ["2.14", "3.14", "4.14", "5.14"],
      correctAnswer: "3.14",
      explanation: "Pi (π) is approximately 3.14159."
    },
    {
      question: "Sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: "180°",
      explanation: "All interior angles in a triangle sum to 180°."
    },
    {
      question: "If x + 5 = 12, what is x?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      explanation: "x = 12 - 5 = 7"
    },
    {
      question: "Area of a square with side 4?",
      options: ["8", "12", "16", "20"],
      correctAnswer: "16",
      explanation: "Area = side × side = 4 × 4 = 16"
    },
    {
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      correctAnswer: "20",
      explanation: "25% of 80 = 0.25 × 80 = 20"
    }
  ],
  sst: [
    {
      question: "When did the French Revolution begin?",
      options: ["1776", "1789", "1799", "1804"],
      correctAnswer: "1789",
      explanation: "The French Revolution began in 1789 with the storming of the Bastille."
    },
    {
      question: "Which range includes Mount Everest?",
      options: ["Alps", "Andes", "Himalayas", "Rockies"],
      correctAnswer: "Himalayas",
      explanation: "Mount Everest is in the Himalayan mountain range."
    },
    {
      question: "What government did France have before the Revolution?",
      options: ["Democracy", "Republic", "Absolute Monarchy", "Constitutional Monarchy"],
      correctAnswer: "Absolute Monarchy",
      explanation: "France was ruled by an absolute monarchy under King Louis XVI."
    },
    {
      question: "Which river is sacred in India?",
      options: ["Nile", "Amazon", "Ganges", "Mississippi"],
      correctAnswer: "Ganges",
      explanation: "The Ganges River is considered sacred in Hinduism."
    },
    {
      question: "Main slogan of the French Revolution?",
      options: ["Peace and Prosperity", "Liberty, Equality, Fraternity", "Unity and Justice", "Freedom and Democracy"],
      correctAnswer: "Liberty, Equality, Fraternity",
      explanation: "The motto was 'Liberté, Égalité, Fraternité'."
    }
  ]
};
