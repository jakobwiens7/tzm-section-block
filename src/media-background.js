/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import {
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	mediaPosition,
} from './_shared';


export default function MediaBackground( {
    atts,
    url = atts.url
} ) {

	const {
		backgroundType,
		focalPoint,
		parallaxMode,
		isRepeated,
		alt,
		id,
	} = atts;

	const isImage = IMAGE_BACKGROUND_TYPE === backgroundType;
	const isVideo = VIDEO_BACKGROUND_TYPE === backgroundType;

	const isImgElement = !(isRepeated || parallaxMode == 'fixed');

	const objectPosition = focalPoint && isImgElement
		? mediaPosition(focalPoint)
		: undefined;

	const backgroundImage = url ? `url(${ url })` : undefined;

	const backgroundPosition = mediaPosition( focalPoint );

    const imgClasses = clsx('wp-block-tzm-section__image-background', {
        [ `wp-image-${ id }` ]: id,
        'is-repeated': isRepeated,
        'has-parallax-fixed': parallaxMode == 'fixed'
	} );

    const videoClasses = clsx('wp-block-tzm-section__video-background', {
        [ `wp-video-${ id }` ]: id
    } );


    return (
        <>
            { isImage && url && ( 
                isImgElement ? (
                    <img
                        className={ imgClasses }
                        alt={ alt }
                        src={ url }
                        style={ { objectPosition } }
                    />
                ) : (
                    <div
                        role="img"
                        className={ imgClasses }
                        style={ { backgroundPosition, backgroundImage } }
                    />
                ) 
            ) }
            { isVideo && url && (
                <video
                    className={ videoClasses }
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={ url }
                    style={ { objectPosition } }
                />
            ) }
        </>
    )
}