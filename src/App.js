import React, { useEffect } from 'react';
import { FlashCardArray } from 'react-flashcards';
import flashcards from "./cardData_h2-h3";
import './customStyle.css';

const MyFlashcardComponent = () => {
    useEffect(() => {
        const handleBookmarkClick = (event) => {
            event.stopPropagation();
            console.log('Bookmark button clicked');
            const svg = event.target.closest('button').querySelector('svg');
            if (svg) {
                svg.style.fill = svg.style.fill === 'red' ? 'currentColor' : 'red';
            }
        };

        const addBookmarkListeners = () => {
            const bookmarkButtons = document.querySelectorAll('button[style*="outline: none; border: none; background: none; cursor: pointer;"]');
            bookmarkButtons.forEach((button) => {
                if (!button.dataset.listenerAdded) {
                    button.addEventListener('click', handleBookmarkClick);
                    button.dataset.listenerAdded = 'true';
                }
            });
        };

        const intervalId = setInterval(addBookmarkListeners, 1000);

        return () => {
            clearInterval(intervalId);
            const bookmarkButtons = document.querySelectorAll('button[style*="outline: none; border: none; background: none; cursor: pointer;"]');
            bookmarkButtons.forEach((button) => {
                button.removeEventListener('click', handleBookmarkClick);
            });
        };
    }, []);




  return (
          <FlashCardArray
              label={   <div className="labelContainer">
                  <div>
                      <p style={{ margin: 0 }}>H2 - H3</p>
                  </div>
              </div>}
              width={700}
              cards={flashcards}
              controls={true}
              showCount={true}
              autoPlay={true}
              timerDuration={3}
              onCardChange={(id, index) => console.log(`Card change detected: ID ${id}, Index: ${index}`)}
              onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index: ${index}, Flipped: ${state}`)}

              // Other props...
          />
  );
};

export default MyFlashcardComponent;