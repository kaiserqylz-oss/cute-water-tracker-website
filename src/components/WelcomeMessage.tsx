import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center pt-8 pb-4 animate-fade-in-up">
      <div className="text-5xl mb-4 animate-float">💧</div>
      <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-2">
        Hi baket ko 💙
      </h1>
      <p className="text-lg sm:text-xl text-sky-500 font-medium">
        Don't forget to drink water today.
      </p>
    </div>
  );
};

export default WelcomeMessage;
