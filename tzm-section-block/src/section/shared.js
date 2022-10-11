/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SVG, Path, Polygon, G } from '@wordpress/primitives';
import { getBlobTypeByURL, isBlobURL } from '@wordpress/blob';

export const IMAGE_BACKGROUND_TYPE = 'image';
export const VIDEO_BACKGROUND_TYPE = 'video';
export const SECTION_MIN_HEIGHT = 50;
export const SECTION_MAX_HEIGHT = 5000;
export const SECTION_DEFAULT_HEIGHT = 300;
export const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };
export const ALLOWED_MEDIA_TYPES = ['image', 'video'];

export function mediaPosition({ x, y } = DEFAULT_FOCAL_POINT) {
	return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

export function dimRatioToClass(ratio) {
	return ratio === 50 || !ratio === undefined
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

export function attributesFromMedia(setAttributes) {
	return (media) => {
		if (!media || !media.url) {
			setAttributes({ url: undefined, id: undefined });
			return;
		}

		if (isBlobURL(media.url)) {
			media.type = getBlobTypeByURL(media.url);
		}

		let mediaType;

		// For media selections originated from a file upload.
		if (media.media_type) {
			if (media.media_type === IMAGE_BACKGROUND_TYPE) {
				mediaType = IMAGE_BACKGROUND_TYPE;
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// Videos contain the media type of 'file' in the object returned from the rest api.
				mediaType = VIDEO_BACKGROUND_TYPE;
			}
		} else {
			// For media selections originated from existing files in the media library.
			if (
				media.type !== IMAGE_BACKGROUND_TYPE &&
				media.type !== VIDEO_BACKGROUND_TYPE
			) {
				return;
			}
			mediaType = media.type;
		}

		setAttributes({
			url: media.url,
			id: media.id,
			alt: media?.alt,
			backgroundType: mediaType,
			...(mediaType === VIDEO_BACKGROUND_TYPE
				? { focalPoint: undefined, parallaxMode: undefined }
				: {}),
		});
	};
}

export function getDividerItem(shape, key = false) {
	const match = SVG_SHAPE_OPTIONS.filter((item) => item.key === shape);

	if (match.length > 0) {
		if (!key) {
			return match[0];
		} else if (key && match[0].hasOwnProperty(key)) {
			return match[0][key];
		}
	}
	return null;
}

export const SvgDivider = ({ divider, position = 'bottom', height = 30 }) => {
	// Bail if no divider object or shape provided
	if (!divider || !divider.shape || !getDividerItem(divider.shape)) {
		return null;
	}

	const svgData = getDividerItem(divider.shape, 'data');

	const classes = classnames(
		'wp-block-tzm-section__divider-shape',
		`has-${position}-position`,
		`has-${divider.shape}-shape`,
		{ 'is-flipped': divider.flipped }
	);

	function svgElements(entries) {
		if (!entries) {
			return null;
		}
		const elements = [];

		entries.forEach((entry) => {
			switch (entry.el) {
				case 'polygon':
					elements.push(<Polygon {...entry.attr} />);
					break;

				case 'path':
					elements.push(<Path {...entry.attr} />);
					break;

				case 'g':
					const inner = svgElements(entry.inner);
					elements.push(<G {...entry.attr}>{inner}</G>);
					break;
			}
		});
		return elements;
	}

	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 1600 140"
			preserveAspectRatio="none"
			width="100%"
			height={height + 'vw'}
			fill={divider.color}
			className={classes}
		>
			{svgElements(svgData)}
		</SVG>
	);
};

export const SVG_SHAPE_OPTIONS = [
	{
		key: '',
		name: __('- Disabled -', 'tzm-section-block'),
	},
	{
		key: 'tilt',
		name: __('Tilt', 'tzm-section-block'),
		className: 'preview tilt',
		data: [
			{ el: 'polygon', attr: { points: '0,135 0,140 1600,140 1600,0' } },
		],
	},
	{
		key: 'tilt-double',
		name: __('Tilt double', 'tzm-section-block'),
		className: 'preview tilt-double',
		data: [
			{ el: 'polygon', attr: { points: '0,135 0,140 1600,140 1600,0' } },
			{
				el: 'polygon',
				attr: { opacity: '0.5', points: '0,75 0,140 1600,140 1600,0' },
			},
		],
	},
	{
		key: 'small-triangle-in',
		name: __('Small triangle In', 'tzm-section-block'),
		className: 'preview small-triangle-in',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1600,140 1600,30 900,30 800,135 700,30 0,30 0,140',
				},
			},
		],
	},
	{
		key: 'small-triangle-out',
		name: __('Small triangle Out', 'tzm-section-block'),
		className: 'preview small-triangle-out',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1600,105 900,105 800,0 700,105 0,105 0,140 1600,140',
				},
			},
		],
	},
	{
		key: 'big-triangle-in',
		name: __('Big triangle In', 'tzm-section-block'),
		className: 'preview big-triangle-in',
		data: [
			{
				el: 'polygon',
				attr: { points: '1600,140 1600,5 800,135 0,5 0,140' },
			},
		],
	},
	{
		key: 'big-triangle-out',
		name: __('Big triangle Out', 'tzm-section-block'),
		className: 'preview big-triangle-out',
		data: [
			{
				el: 'polygon',
				attr: { points: '0,135 800,0 1600,135 1600,140 0,140' },
			},
		],
	},
	{
		key: 'offset-triangle-in',
		name: __('Offset triangle In', 'tzm-section-block'),
		className: 'preview offset-triangle-in',
		data: [
			{
				el: 'polygon',
				attr: { points: '0,0 1080,135 1600,50 1600,140 0,140' },
			},
		],
	},
	{
		key: 'offset-triangle-out',
		name: __('Offset triangle Out', 'tzm-section-block'),
		className: 'preview offset-triangle-out',
		data: [
			{
				el: 'polygon',
				attr: { points: '0,140 1080,10 1600,90 1600,140' },
			},
		],
	},
	{
		key: 'sawtooth',
		name: __('Sawtooth', 'tzm-section-block'),
		className: 'preview sawtooth',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '100,40 100,130 200,40 200,130 300,40 300,130 400,40 400,130 500,40 500,130 600,40 600,130 700,40 700,130 800,40 800,130 900,40 900,130 1000,40 1000,130 1100,40 1100,130 1200,40 1200,130 1300,40 1300,130 1400,40 1400,130 1500,40 1500,130 1600,40 1600,140 0,140 0,130',
				},
			},
		],
	},
	{
		key: 'small-zigzag',
		name: __('Small zigzag', 'tzm-section-block'),
		className: 'preview small-zigzag',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1550,58 1500,30 1450,58 1400,30 1350,58 1300,30 1250,58 1200,30 1150,58 1100,30 1050,58 1000,30 950,58 900,30 850,58 800,30 750,58 700,30 650,58 600,30 550,58 500,30 450,58 400,30 350,58 300,30 250,58 200,30 150,58 100,30 50,58 0,30 0,140 1600,140 1600,30',
				},
			},
		],
	},
	{
		key: 'zigzag',
		name: __('Zigzag', 'tzm-section-block'),
		className: 'preview zigzag',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1600,40 1500,80 1400,40 1300,80 1200,40 1100,80 1000,40 900,80 800,40 700,80 600,40 500,80 400,40 300,80 200,40 200,40 200,40 100,80 0,40 0,140 1600,140',
				},
			},
		],
	},
	{
		key: 'spikes',
		name: __('Spikes', 'tzm-section-block'),
		className: 'preview spikes',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1600,100 980,100 920,40 860,100 800,40 740,100 680,40 620,100 0,100 0,140 1600,140',
				},
			},
		],
	},
	{
		key: 'blocks',
		name: __('Blocks', 'tzm-section-block'),
		className: 'preview blocks',
		data: [
			{
				el: 'polygon',
				attr: {
					points: '1550,20 1550,100 1450,100 1450,20 1350,20 1350,100 1250,100 1250,20 1150,20 1150,100 1050,100 1050,20 950,20 950,100 850,100 850,20 750,20 750,100 650,100 650,20 550,20 550,100 450,100 450,20 350,20 350,100 250,100 250,20 150,20 150,100 50,100 50,20 0,20 0,140 0,140 1600,140 1600,20',
				},
			},
		],
	},
	{
		key: 'halfcircle-in',
		name: __('Half-circle In', 'tzm-section-block'),
		className: 'preview halfcircle-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140V25H920c-7.089,66.389-64.801,110-120,110c-55.201,0-112.078-43.611-120-110H0v115H1600z',
				},
			},
		],
	},
	{
		key: 'halfcircle-out',
		name: __('Half-circle Out', 'tzm-section-block'),
		className: 'preview halfcircle-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M920,115C912.078,48.612,855.201,5,800,5c-55.199,0-112.911,43.611-120,110H0v25h1600v-25H920z',
				},
			},
		],
	},
	{
		key: 'curve-in',
		name: __('Curve In', 'tzm-section-block'),
		className: 'preview curve-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140V5c0,0-344.4,130-800,130C344.399,135,0,5,0,5v135H1600z',
				},
			},
		],
	},
	{
		key: 'curve-out',
		name: __('Curve Out', 'tzm-section-block'),
		className: 'preview curve-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M0,135C0,135,344.4,5,800,5c455.601,0,800,130,800,130v5H0V135z',
				},
			},
		],
	},
	{
		key: 'asymmetric-curve-in',
		name: __('Asymmetric curve In', 'tzm-section-block'),
		className: 'preview asymmetric-curve-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M-0.001,140V40c0,0,144.4,90,600,90c455.6,0,1000-125,1000-125v135H-0.001z',
				},
			},
		],
	},
	{
		key: 'asymmetric-curve-out',
		name: __('Asymmetric curve Out', 'tzm-section-block'),
		className: 'preview asymmetric-curve-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M0,100c0,0,144.4-90,600-90c455.601,0,1000,125,1000,125v5H0V100z',
				},
			},
		],
	},
	{
		key: 'double-curve',
		name: __('Double curve', 'tzm-section-block'),
		className: 'preview double-curve',
		data: [
			{
				el: 'path',
				attr: {
					opacity: '0.5',
					d: 'M400,0c400,0,400,85,800,85c299.419,0,400-75,400-75v130H0C0,140,149.486,0,400,0z',
				},
			},
			{
				el: 'path',
				attr: {
					d: 'M385,10c329.457,0,415,110,815,110c300.919,0,400-60,400-60v80H0v-20C0,120,184.983,10,385,10z',
				},
			},
		],
	},
	{
		key: 'waves',
		name: __('Waves', 'tzm-section-block'),
		className: 'preview waves',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M0,100c0,0,45.508-60,200-60c127.494,0,127.005,40,235,40c103.495,0,91.508-55,240-55c115.495,0,139.504,75.001,225,75c106.827-0.001,141.005-65,240-65c127.494,0,158.752,50,240,50c130.493,0,220-34.892,220-34.892V140H0V100z',
				},
			},
		],
	},
	{
		key: 'rounded-in',
		name: __('Rounded In', 'tzm-section-block'),
		className: 'preview rounded-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140V0c0,0,0,100-100,100H100C0,100,0,0,0,0v140H1600z',
				},
			},
		],
	},
	{
		key: 'rounded-out',
		name: __('Rounded Out', 'tzm-section-block'),
		className: 'preview rounded-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1500,40H100C0,40,0,140,0,140h1600C1600,140,1600,40,1500,40z',
				},
			},
		],
	},
	{
		key: 'split-in',
		name: __('Split In', 'tzm-section-block'),
		className: 'preview split-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140V35H900c-80,0-100,100-100,100S780,35,700,35H0v105H1600z',
				},
			},
		],
	},
	{
		key: 'split-out',
		name: __('Split Out', 'tzm-section-block'),
		className: 'preview split-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,105H900C820,105,800,0,800,0s-20,105-100,105H0v35h1600V105z',
				},
			},
		],
	},
	{
		key: 'book-in',
		name: __('Book In', 'tzm-section-block'),
		className: 'preview book-in',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140V35c0,0-119.062,5-240,5s-260-10-260-10c-180.422,0-300,105-300,105S681.09,30,500,30c0,0-138.618,10-260,10S0,35,0,35v105H1600z',
				},
			},
		],
	},
	{
		key: 'book-out',
		name: __('Book Out', 'tzm-section-block'),
		className: 'preview book-out',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,105c0,0-119.561-5-240-5s-260,10-260,10C918.5,110,800,0,800,0S681.5,110,500,110c0,0-139.727-10-260-10S0,105,0,105v35h1600V105z',
				},
			},
		],
	},
	{
		key: 'paint',
		name: __('Paint', 'tzm-section-block'),
		className: 'preview paint',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M0,140h1600V50c-16.496-0.171-38.961-29.683-60-30c-40.564-4.291-94.115-4.33-100-4c-53.5,3,11.75,6,20,9c49.667,25-38.75,12.5-80,22c-74.94,17.259,50.25-24.25-70,3c-41.528,9.411-72.385,6.142-102-5C1056.5-5.5,421.887,19.239,550,35c-1.823,1.764-20.152,0.684-35,0c-14.245-0.655-29.071-0.899-45,0c-38.758-2.661-53.75,47.5-150,30c-2.757,0.976-7.309,6.933,15,8c8.788,0.42,35.27,4.467,45,5c-26.75,20.75-173.786-31.431-200-42C149.631,23.755,47.804,36.662,0,48V140z M825,30c48.541-5.473,150-15,205,2c11.582,1.515,29.381,5.594,10,6c-11.59,0.242-64.259-8.949-80-10c-17.952,0.764-50.166,0.651-70,2C864.764,31.717,822.25,36.5,825,30z',
				},
			},
		],
	},
	{
		key: 'ragged',
		name: __('Ragged', 'tzm-section-block'),
		className: 'preview ragged',
		data: [
			{
				el: 'path',
				attr: {
					d: 'M1600,140H0c0,0,0-46.7,0-60 c13.5-2.4,26.5-2.6,40-5c5.7,4.9,11.3,9.1,17,14c58-1.7,45.6-10,77-10c10.4,5,20.6,9,31,14c0,0,17-5.3,29-8c12-2.7,40-2,40-2 c16.7-1.5,33.3-3.5,50-5c8,2.4,16,5.6,24,8c3.2-5.4,6.8-10.6,10-16c7.2,6,14.7,12,21.9,18c5.6,1.5,10.5,2.5,16.1,4 c8,1.2,17,2.8,25,4c3.2-2.7,5.8-5.3,9-8c4.8-2.7,9.2-5.3,14-8c5.6,1.5,11.4,2.5,17,4c4-3.3,8-5.7,12-9c5.6-0.3,11.4-0.7,17-1 c5.6,1.8,10.4,3.2,16,5c23.8,3,49,5.3,73,8c27.1,21.2,59.4,0.5,81,6c6.4,1.6,12.6,3.4,19,5c4,0.6,8,1.4,12,2c4.8,0.9,9.2,1.1,14,2 c4,0.6,8,1.4,12,2c28.2-12.3,62.9-15.1,81,1c8.8-1.2,17.2-2.8,26-4c8-3,16-6,24-9c6.4,3,13.6,6,20,9c9.6,0.9,18.4,2.1,28,3 c0,0,7.7-5.1,22-6c64.9-4.1,63.2-8.3,108,7c46.9-23.1,16.4,3.3,105-10c9.8,3.4,19.2,5.6,29,9c104-8,35.3-6.4,82,1 c14.9-3.2,29.1-6.8,44-10c67.9-7.2,75.2,1,138,1c2.4,3,5.6,6,8,9c4.8-2.4,9.2-5.6,14-8c2.4-2.4,4.6-4.6,7-7c18.1,0.8,60,10.1,60,2 c0-8.1,9-12,9-12c32.5,7.6,47.2,22.4,118,20C1600,105.1,1600,140,1600,140z',
				},
			},
		],
	},
	{
		key: 'clouds',
		name: __('Clouds', 'tzm-section-block'),
		className: 'preview clouds',
		data: [
			{
				el: 'g',
				attr: { opacity: '0.5' },
				inner: [
					{
						el: 'path',
						attr: {
							d: 'M716,42c-221.6-16.4-419.7,24.5-530,98h920 C1003.7,89.8,868.1,53.2,716,42z',
						},
					},
				],
			},
			{
				el: 'g',
				attr: { opacity: '0.75' },
				inner: [
					{
						el: 'path',
						attr: {
							d: 'M916,24c-81.3,6-155.7,25.6-212,52 c-38.8,18.2-68.4,40.1-88,64h650C1239.6,62.7,1090.4,11.2,916,24z',
						},
					},
					{
						el: 'path',
						attr: {
							d: 'M394,96C297.3,52.1,156.8,26.4,0,28v112h466 C445.5,123.9,422.8,109.1,394,96z',
						},
					},
					{
						el: 'path',
						attr: {
							d: 'M748,58c0,0-123.4,59.9-206,66c-82.6,6.1-178-40-178-40 l-42,56h472L748,58z',
						},
					},
				],
			},
			{
				el: 'g',
				attr: {},
				inner: [
					{
						el: 'path',
						attr: {
							d: 'M615.8,103.3C542.4,81.2,448.8,68,346.7,68 C203.7,68,77.5,94.8,0,134v6h704C679.7,126.1,650.4,113.7,615.8,103.3z',
						},
					},
					{
						el: 'path',
						attr: {
							d: 'M1600,0c-241.1,0.1-455.5,39.9-592,100 c-28.2,12.4-52.9,25.9-74,40h666V0z',
						},
					},
					{
						el: 'path',
						attr: {
							d: 'M1041,86c0,0-112.3,50-216,50S560,90,560,90l-29.2,49.9h570.8 L1041,86z',
						},
					},
				],
			},
		],
	},
];
