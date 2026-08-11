export const encouragementMessages = [
  "Good job baket ko 💙",
  "Keep going! 💪💧",
  "You're doing great! ✨",
  "Almost there! 🌟",
  "Stay hydrated! 💧💙",
  "So proud of you! 🥰",
  "Water is life! 🌊",
  "Yay! Keep it up! 🎉",
  "You're amazing baket ko! 💙",
  "Healthy habits! 🌿💧",
];

export const getRandomEncouragement = (): string => {
  const index = Math.floor(Math.random() * encouragementMessages.length);
  return encouragementMessages[index];
};
