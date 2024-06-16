import React from 'react'
import './Loader.css';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary z-50 loaderMain" style={{
        background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
     boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      }}>
    <div class="preloader">
    <svg class="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
		<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
			<g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
				<polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
				<circle cx="43" cy="111" r="13" />
				<circle cx="102" cy="111" r="13" />
			</g>
			<g class="cart__lines" stroke="currentColor">
				<polyline class="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
				<g class="cart__wheel1" transform="rotate(-90,43,111)">
					<circle class="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
				</g>
				<g class="cart__wheel2" transform="rotate(90,102,111)">
					<circle class="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
				</g>
			</g>
		</g>
	</svg>
    <div class="preloader__text">
        <p class="preloader__msg">Bringing you the goods...</p>
        <p class="preloader__msg preloader__msg--last">
            This is taking long. Something's wrong.</p>
    </div>
   </div>
   </div>
  )
}

export default Loader
