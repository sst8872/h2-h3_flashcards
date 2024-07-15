import React, { useEffect } from 'react';
import { FlashCardArray } from 'react-flashcards';
import flashcards from "./cardData_h2-h3";
import './customStyle.css';

const MyFlashcardComponent = () => {

    useEffect(() => {
        const container = document.querySelector('.FlashcardArrayContainer');
        if (container) {
            container.style.width = '700px'; // Override inline style
            container.style.maxWidth = '100%'; // Ensure it does not overflow
        }

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                container.style.width = '100%'; // Adjust for smaller screens
                container.style.maxWidth = 'none'; // Remove max-width restriction
            } else {
                container.style.width = '700px'; // Reset for larger screens
                container.style.maxWidth = '100%'; // Ensure it does not overflow
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <div className="title" >
            <p className="title_grade">고2 - 고3</p>
            <FlashCardArray
                cards={flashcards}
                controls={true}
                showCount={true}
                showBookMark={true}
                timerDuration={3}
                onCardChange={(id, index) => console.log(`Card change detected: ID ${id}, Index: ${index}`)}
                onCardFlip={(id, index, state) => console.log(`Card flipped: ID ${id}, Index: ${index}, Flipped: ${state}`)}

                // Other props...
            />
        </div>
    );
};

export default MyFlashcardComponent;