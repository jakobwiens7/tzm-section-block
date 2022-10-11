import { jarallax, jarallaxVideo } from 'jarallax';
jarallaxVideo(); // Optional video extension

const { useRef, useEffect } = wp.element;

export default function Jarallax({ className = '', children, ...props }) {
	const $el = useRef();

	// Init Jarallax.
	useEffect(() => {
		if ($el.current) {
			jarallax($el.current, props);
		}

		// Destroy Jarallax.
		return function destroy() {
			if ($el.current) {
				jarallax($el.current, 'destroy');
			}
		};
	}, []);

	// Update options.
	useEffect(() => {
		if ($el.current) {
			jarallax($el.current, 'destroy');
			jarallax($el.current, props);
		}
	}, [props]);

	return (
		<div ref={$el} className={`jarallax-wrapper ${className}`}>
			{children}
		</div>
	);
}
