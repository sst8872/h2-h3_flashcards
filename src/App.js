import React from 'react';
import { FlashCardArray } from 'react-flashcards';
import flashcards from "./cardData_h2-h3";
import './customStyle.css';

const MyFlashcardComponent = () => {

  return (
      <FlashCardArray
          cards={flashcards}
          controls={true}
          showCount={true}
          autoPlay={true}
          onCardChange={(id, index) => console.log(`Card change detected: ID ${id}, Index: ${index}`)}
          onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index: ${index}, Flipped: ${state}`)}

          // Other props...
      />
  );
};

export default MyFlashcardComponent;