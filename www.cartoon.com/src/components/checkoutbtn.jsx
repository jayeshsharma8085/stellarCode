import React, { useState } from 'react';
import '../styles/checkoutButton.css';

const CheckoutBtn = () => {
    const [isSwiped, setIsSwiped] = useState(false);

    const handlePointerDown = (e) => {
        let initialX = e.clientX;

        const handlePointerMove = (moveEvent) => {
            let moveX = moveEvent.clientX - initialX;
            if (moveX > 0) {
                setIsSwiped(true);
                if (moveX >= 200) {
                  
                    for (let i = 0; i < 50; i++) {
                        const confetti = document.createElement('div');
                        confetti.classList.add('confetti');
                        confetti.style.left = Math.random() * window.innerWidth + 'px';
                        confetti.style.top = Math.random() * window.innerHeight + 'px';
                        confetti.style.animationDelay = Math.random() + 's';
                        document.getElementById('confettiContainer').appendChild(confetti);
                    }
                }
            }
        };

        const handlePointerUp = () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <div className={`slide-container ${isSwiped ? 'swiped' : ''}`} id="slideContainer" onMouseDown={handlePointerDown}>
          <svg className="truck-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
            <path fill="currentColor" d="M20,10H4C2.9,10,2,10.9,2,12v5c0,1.1,0.9,2,2,2h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h10v1c0,0.6,0.4,1,1,1h1 c0.6,0,1-0.4,1-1v-1h1c1.1,0,2-0.9,2-2v-5C22,10.9,21.1,10,20,10z M8,17H6v-2h2V17z M10,17h4v-2h-4V17z M14,17h2v-2h-2V17z M6,14 v-1h2v1H6z M10,14H8v-1h2V14z M18,14h-2v-1h2V14z M6.5,12.5h11c0.3,0,0.5-0.2,0.5-0.5v-3c0-0.3-0.2-0.5-0.5-0.5h-11 C6.2,8.5,6,8.7,6,9v3C6,12.3,6.2,12.5,6.5,12.5z"/>
          </svg>
          <div id="confettiContainer"></div>
        </div>
      );
      
};

export default CheckoutBtn;