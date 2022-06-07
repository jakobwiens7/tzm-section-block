/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/post-featured-image.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/post-featured-image.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const postFeaturedImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 3H5c-.6 0-1 .4-1 1v7c0 .5.4 1 1 1h14c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1zM5.5 10.5v-.4l1.8-1.3 1.3.8c.3.2.7.2.9-.1L11 8.1l2.4 2.4H5.5zm13 0h-2.9l-4-4c-.3-.3-.8-.3-1.1 0L8.9 8l-1.2-.8c-.3-.2-.6-.2-.9 0l-1.3 1V4.5h13v6zM4 20h9v-1.5H4V20zm0-4h16v-1.5H4V16z"
}));
/* harmony default export */ __webpack_exports__["default"] = (postFeaturedImage);
//# sourceMappingURL=post-featured-image.js.map

/***/ }),

/***/ "./src/section/edit/block-controls.js":
/*!********************************************!*\
  !*** ./src/section/edit/block-controls.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SectionBlockControls; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/post-featured-image.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "./src/section/shared.js");


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */


function SectionBlockControls(_ref) {
  let {
    attributes,
    setAttributes,
    onSelectMedia,
    currentSettings
  } = _ref;
  const {
    verticalAlignment,
    id,
    useFeaturedImage,
    dimRatio,
    minHeight,
    minHeightUnit
  } = attributes;
  const {
    hasInnerBlocks,
    url
  } = currentSettings;
  /* WIP: Shared variables START */

  const [prevMinHeightValue, setPrevMinHeightValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(minHeight);
  const [prevMinHeightUnit, setPrevMinHeightUnit] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(minHeightUnit);
  const isMinFullHeight = minHeightUnit === 'vh' && minHeight === 100;

  const toggleMinFullHeight = () => {
    if (isMinFullHeight) {
      // If there aren't previous values, take the default ones.
      if (prevMinHeightUnit === 'vh' && prevMinHeightValue === 100) {
        return setAttributes({
          minHeight: undefined,
          minHeightUnit: undefined
        });
      } // Set the previous values of height.


      return setAttributes({
        minHeight: prevMinHeightValue,
        minHeightUnit: prevMinHeightUnit
      });
    }

    setPrevMinHeightValue(minHeight);
    setPrevMinHeightUnit(minHeightUnit); // Set full height.

    return setAttributes({
      minHeight: 100,
      minHeightUnit: 'vh'
    });
  };

  const toggleUseFeaturedImage = () => {
    setAttributes({
      id: undefined,
      url: undefined,
      useFeaturedImage: !useFeaturedImage,
      dimRatio: dimRatio === 100 ? 50 : dimRatio,
      backgroundType: useFeaturedImage ? _shared__WEBPACK_IMPORTED_MODULE_4__.IMAGE_BACKGROUND_TYPE : undefined
    });
  };
  /* WIP: Shared variables END */


  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, {
    group: "block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockVerticalAlignmentToolbar, {
    value: verticalAlignment,
    onChange: nextPosition => {
      setAttributes({
        verticalAlignment: nextPosition
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalBlockFullHeightAligmentControl, {
    isActive: isMinFullHeight,
    onToggle: toggleMinFullHeight,
    isDisabled: !hasInnerBlocks
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, {
    group: "other"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use featured image'),
    isPressed: useFeaturedImage,
    onClick: toggleUseFeaturedImage
  }), !useFeaturedImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaReplaceFlow, {
    mediaId: id,
    mediaURL: url,
    allowedTypes: _shared__WEBPACK_IMPORTED_MODULE_4__.ALLOWED_MEDIA_TYPES,
    accept: "image/*,video/*",
    onSelect: onSelectMedia,
    name: !url ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Media') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Replace')
  })));
}

/***/ }),

/***/ "./src/section/edit/index.js":
/*!***********************************!*\
  !*** ./src/section/edit/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var colord_plugins_names__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! colord/plugins/names */ "./node_modules/colord/plugins/names.mjs");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared */ "./src/section/shared.js");
/* harmony import */ var _use_section_is_dark__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./use-section-is-dark */ "./src/section/edit/use-section-is-dark.js");
/* harmony import */ var _inspector_controls__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./inspector-controls */ "./src/section/edit/inspector-controls.js");
/* harmony import */ var _block_controls__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./block-controls */ "./src/section/edit/block-controls.js");
/* harmony import */ var _resizable_section__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resizable-section */ "./src/section/edit/resizable-section.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../editor.scss */ "./src/section/editor.scss");



/**
 * External dependencies
 */



/**
 * WordPress dependencies
 */










/**
 * Internal dependencies
 */






/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


(0,colord__WEBPACK_IMPORTED_MODULE_17__.extend)([colord_plugins_names__WEBPACK_IMPORTED_MODULE_18__["default"]]);

function getInnerBlocksTemplate(attributes) {
  return [['core/paragraph', {
    align: 'center',
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Write title…'),
    ...attributes
  }]];
}
/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily while
 * the media (image or video) is being uploaded and will not have an id allocated yet.
 *
 * @param {number} id  The id of the media.
 * @param {string} url The url of the media.
 *
 * @return {boolean} Is the URL a Blob URL.
 */


const isTemporaryMedia = (id, url) => !id && (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_9__.isBlobURL)(url);

function SectionEdit(_ref) {
  var _useSetting;

  let {
    attributes,
    clientId,
    isSelected,
    overlayColor,
    setAttributes,
    setOverlayColor,
    toggleSelection,
    context: {
      postId,
      postType
    }
  } = _ref;
  const {
    verticalAlignment,
    id,
    useFeaturedImage,
    dimRatio,
    focalPoint,
    parallaxMode,
    isDark,
    isRepeated,
    minHeight,
    minHeightUnit,
    //minHeightSelector,
    alt,
    dividerTop,
    dividerBottom,
    dividerHeight,
    allowedBlocks,
    templateLock
  } = attributes;
  const [featuredImage] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', postType, 'featured_media', postId);
  const media = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useSelect)(select => featuredImage && select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getMedia(featuredImage, {
    context: 'view'
  }), [featuredImage]);
  const mediaUrl = media === null || media === void 0 ? void 0 : media.source_url; // instead of destructuring the attributes
  // we define the url and background type
  // depending on the value of the useFeaturedImage flag
  // to preview in edit the dynamic featured image

  const url = useFeaturedImage ? mediaUrl : attributes.url;
  const backgroundType = useFeaturedImage ? _shared__WEBPACK_IMPORTED_MODULE_11__.IMAGE_BACKGROUND_TYPE : attributes.backgroundType;
  const {
    __unstableMarkNextChangeAsNotPersistent
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    createErrorNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_10__.store);

  const {
    gradientClass,
    gradientValue
  } = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.__experimentalUseGradient)();

  const onSelectMedia = (0,_shared__WEBPACK_IMPORTED_MODULE_11__.attributesFromMedia)(setAttributes, dimRatio);
  const isUploadingMedia = isTemporaryMedia(id, url);

  const onUploadError = message => {
    createErrorNotice(message, {
      type: 'snackbar'
    });
  };

  const mediaElement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const isSectionDark = (0,_use_section_is_dark__WEBPACK_IMPORTED_MODULE_12__["default"])(url, dimRatio, overlayColor.color, mediaElement);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // This side-effect should not create an undo level.
    __unstableMarkNextChangeAsNotPersistent();

    setAttributes({
      isDark: isSectionDark
    });
  }, [isSectionDark]);
  const isImageBackground = _shared__WEBPACK_IMPORTED_MODULE_11__.IMAGE_BACKGROUND_TYPE === backgroundType;
  const isVideoBackground = _shared__WEBPACK_IMPORTED_MODULE_11__.VIDEO_BACKGROUND_TYPE === backgroundType;
  const minHeightWithUnit = minHeight && minHeightUnit ? `${minHeight}${minHeightUnit}` : minHeight;
  const isImgElement = !isRepeated;
  const style = {
    minHeight: minHeightWithUnit || undefined
  };
  const backgroundImage = url ? `url(${url})` : undefined;
  const backgroundPosition = (0,_shared__WEBPACK_IMPORTED_MODULE_11__.mediaPosition)(focalPoint);
  const bgStyle = {
    backgroundColor: overlayColor.color
  };
  const mediaStyle = {
    objectPosition: focalPoint && isImgElement ? (0,_shared__WEBPACK_IMPORTED_MODULE_11__.mediaPosition)(focalPoint) : undefined
  };
  const hasInnerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store).getBlock(clientId).innerBlocks.length > 0, [clientId]);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useBlockProps)({
    ref
  }); // Check for fontSize support before we pass a fontSize attribute to the innerBlocks.

  const hasFontSizes = !!((_useSetting = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useSetting)('typography.fontSizes')) !== null && _useSetting !== void 0 && _useSetting.length);
  const innerBlocksTemplate = getInnerBlocksTemplate({
    fontSize: hasFontSizes ? 'large' : undefined
  });
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useInnerBlocksProps)({
    className: 'wp-block-tzm-section__inner-container'
  }, {
    template: innerBlocksTemplate,
    templateInsertUpdatesSelection: true,
    allowedBlocks,
    templateLock
  });
  const currentSettings = {
    isVideoBackground,
    isImageBackground,
    mediaElement,
    hasInnerBlocks,
    url,
    isImgElement,
    overlayColor
  };
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
    'is-dark-theme': isDark,
    'is-light': !isDark,
    'is-transient': isUploadingMedia,
    'is-repeated': isRepeated,
    [`has-parallax-${parallaxMode}`]: parallaxMode && (isVideoBackground || isImgElement),
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
  });
  const imgClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()('wp-block-tzm-section__image-background', {
    'jarallax-img': parallaxMode && isImageBackground && isImgElement,
    [`has-parallax-${parallaxMode}`]: parallaxMode && isImageBackground && !isImgElement
  });
  const urlExt = url === null || url === void 0 ? void 0 : url.split(/[#?]/)[0].split('.').pop().trim();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_block_controls__WEBPACK_IMPORTED_MODULE_14__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    onSelectMedia: onSelectMedia,
    currentSettings: currentSettings
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_inspector_controls__WEBPACK_IMPORTED_MODULE_13__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    clientId: clientId,
    setOverlayColor: setOverlayColor,
    sectionRef: ref,
    currentSettings: currentSettings
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("section", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes, blockProps.className),
    style: { ...style,
      ...blockProps.style
    },
    "data-url": url,
    "data-video-src": parallaxMode && isVideoBackground && url ? urlExt + ':' + url : undefined
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_resizable_section__WEBPACK_IMPORTED_MODULE_15__["default"], {
    className: "tzm-section__resize-container",
    onResizeStart: () => {
      setAttributes({
        minHeightUnit: 'px'
      });
      toggleSelection(false);
    },
    onResize: value => {
      setAttributes({
        minHeight: value
      });
    },
    onResizeStop: newMinHeight => {
      toggleSelection(true);
      setAttributes({
        minHeight: newMinHeight
      });
    },
    showHandle: isSelected
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    "aria-hidden": "true",
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('wp-block-tzm-section__background', (0,_shared__WEBPACK_IMPORTED_MODULE_11__.dimRatioToClass)(dimRatio), {
      [overlayColor.class]: overlayColor.class,
      'has-background-dim': dimRatio !== undefined,
      // For backwards compatibility. Former versions of the Cover Block applied
      // `.wp-block-cover__gradient-background` in the presence of
      // media, a gradient and a dim.
      'wp-block-tzm-section__gradient-background': url && gradientValue && dimRatio !== 0,
      'has-background-gradient': gradientValue,
      [gradientClass]: gradientClass
    }),
    style: {
      backgroundImage: gradientValue,
      ...bgStyle
    }
  }), url && isImageBackground && (isImgElement ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    ref: mediaElement,
    className: imgClasses,
    alt: alt,
    src: url,
    style: mediaStyle
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    ref: mediaElement,
    role: "img",
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes, 'wp-block-tzm-section__image-background'),
    style: {
      backgroundImage,
      backgroundPosition
    },
    "data-img-size": parallaxMode && isRepeated ? 'contain' : undefined,
    "data-img-repeat": parallaxMode && isRepeated ? 'repeat' : undefined
  })), url && isVideoBackground && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("video", {
    ref: mediaElement,
    className: "wp-block-tzm-section__video-background",
    autoPlay: true,
    muted: true,
    loop: true,
    src: url,
    style: mediaStyle
  }), isUploadingMedia && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), !!dividerTop.shape && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_shared__WEBPACK_IMPORTED_MODULE_11__.SvgDivider, {
    divider: dividerTop,
    position: "top",
    height: dividerHeight
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", innerBlocksProps), !!dividerBottom.shape && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_shared__WEBPACK_IMPORTED_MODULE_11__.SvgDivider, {
    divider: dividerBottom,
    position: "bottom",
    height: dividerHeight
  })));
}

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.compose)([(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.withColors)({
  overlayColor: 'background-color'
})])(SectionEdit));

/***/ }),

/***/ "./src/section/edit/inspector-controls.js":
/*!************************************************!*\
  !*** ./src/section/edit/inspector-controls.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SectionInspectorControls; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared */ "./src/section/shared.js");


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */



function SectionHeightInput(_ref) {
  let {
    onChange,
    onUnitChange,
    unit = 'px',
    value = ''
  } = _ref;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useInstanceId)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl);
  const inputId = `block-section-height-input-${instanceId}`;
  const isPx = unit === 'px';
  const units = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseCustomUnits)({
    availableUnits: (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useSetting)('spacing.units') || ['px', 'em', 'rem', 'vw', 'vh'],
    defaultValues: {
      px: 430,
      '%': 20,
      em: 20,
      rem: 20,
      vw: 20,
      vh: 50
    }
  });

  const handleOnChange = unprocessedValue => {
    const inputValue = unprocessedValue !== '' ? parseFloat(unprocessedValue) : undefined;

    if (isNaN(inputValue) && inputValue !== undefined) {
      return;
    }

    onChange(inputValue);
  };

  const computedValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const [parsedQuantity] = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalParseQuantityAndUnitFromRawValue)(value);
    return [parsedQuantity, unit].join('');
  }, [unit, value]);
  const min = isPx ? _shared__WEBPACK_IMPORTED_MODULE_6__.SECTION_MIN_HEIGHT : 0;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Minimum height of section'),
    id: inputId
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
    id: inputId,
    isResetValueOnUnitChange: true,
    min: min,
    onChange: handleOnChange,
    onUnitChange: onUnitChange,
    style: {
      maxWidth: 80
    },
    units: units,
    value: computedValue
  }));
}

function SectionInspectorControls(_ref2) {
  let {
    attributes,
    setAttributes,
    clientId,
    setOverlayColor,
    sectionRef,
    currentSettings
  } = _ref2;
  const {
    useFeaturedImage,
    dimRatio,
    focalPoint,
    parallaxMode,
    isRepeated,
    minHeight,
    minHeightUnit,
    minHeightSelector,
    alt,
    dividerTop,
    dividerBottom,
    dividerHeight
  } = attributes;
  const {
    //isVideoBackground,
    isImageBackground,
    mediaElement,
    url,
    isImgElement,
    overlayColor
  } = currentSettings;

  const {
    gradientValue,
    setGradient
  } = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__experimentalUseGradient)();
  /* WIP: Shared variables START */


  const [prevMinHeightValue, setPrevMinHeightValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(minHeight);
  const [prevMinHeightUnit, setPrevMinHeightUnit] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(minHeightUnit);
  const isMinFullHeight = minHeightUnit === 'vh' && minHeight === 100;

  const toggleMinFullHeight = () => {
    if (isMinFullHeight) {
      // If there aren't previous values, take the default ones.
      if (prevMinHeightUnit === 'vh' && prevMinHeightValue === 100) {
        return setAttributes({
          minHeight: undefined,
          minHeightUnit: undefined
        });
      } // Set the previous values of height.


      return setAttributes({
        minHeight: prevMinHeightValue,
        minHeightUnit: prevMinHeightUnit
      });
    }

    setPrevMinHeightValue(minHeight);
    setPrevMinHeightUnit(minHeightUnit); // Set full height.

    return setAttributes({
      minHeight: 100,
      minHeightUnit: 'vh'
    });
  };
  /* WIP: Shared variables END */


  const imperativeFocalPointPreview = value => {
    const [styleOfRef, property] = mediaElement.current ? [mediaElement.current.style, 'objectPosition'] : [sectionRef.current.style, 'backgroundPosition'];
    styleOfRef[property] = (0,_shared__WEBPACK_IMPORTED_MODULE_6__.mediaPosition)(value);
  };
  /* Shape - Indicators */


  const DividerPanelHeader = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "block-editor-panel-divider__panel-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Shape Dividers', 'tzm-section-block'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Top shape:', 'tzm-section-block') + ' ' + (0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerTop.shape, 'name'),
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('component-color-indicator', 'indicator-divider-top', {
      [(0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerTop.shape, 'className')]: (0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerTop.shape, 'className'),
      'divider-flipped': dividerTop.flipped
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Bottom shape:', 'tzm-section-block') + ' ' + (0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerBottom.shape, 'name'),
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('component-color-indicator', 'indicator-divider-bottom', {
      [(0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerBottom.shape, 'className')]: (0,_shared__WEBPACK_IMPORTED_MODULE_6__.getDividerItem)(dividerBottom.shape, 'className'),
      'divider-flipped': dividerBottom.flipped
    })
  }));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, !!(url || useFeaturedImage) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Media settings')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    className: "block-editor-control-select image-parallax",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Image Parallax', 'tzm-section-block'),
    value: parallaxMode,
    onChange: next => {
      setAttributes({
        parallaxMode: next
      });
    },
    options: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('- No parallax -', 'tzm-section-block')
    }, {
      value: 'fixed',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Fixed', 'tzm-section-block')
    }, {
      value: 'slow',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parallax (slow)', 'tzm-section-block')
    }, {
      value: 'medium',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parallax (medium)', 'tzm-section-block')
    }, {
      value: 'fast',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parallax (fast)', 'tzm-section-block')
    }]
  }), isImageBackground && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    className: "block-editor-control-toggle image-repeat",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Repeated background'),
    checked: isRepeated,
    onChange: next => {
      setAttributes({
        isRepeated: next
      });
    }
  }), !parallaxMode && !isRepeated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FocalPointPicker, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Focal point picker'),
    url: url,
    value: focalPoint,
    onDragStart: imperativeFocalPointPreview,
    onDrag: imperativeFocalPointPreview,
    onChange: newFocalPoint => setAttributes({
      focalPoint: newFocalPoint
    })
  }), !useFeaturedImage && isImageBackground && isImgElement && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Alt text (alternative text)'),
    value: alt,
    onChange: newAlt => setAttributes({
      alt: newAlt
    }),
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
      href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Describe the purpose of the image')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Leave empty if the image is purely decorative.'))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "tzm-section__reset-button",
    variant: "secondary",
    isSmall: true,
    onClick: () => setAttributes({
      url: undefined,
      id: undefined,
      backgroundType: undefined,
      focalPoint: undefined,
      parallaxMode: undefined,
      isRepeated: undefined,
      useFeaturedImage: false
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Clear Media')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__experimentalPanelColorGradientSettings, {
    __experimentalHasMultipleOrigins: true,
    __experimentalIsRenderedInSidebar: true,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Overlay'),
    initialOpen: true,
    settings: [{
      colorValue: overlayColor.color,
      gradientValue,
      onColorChange: setOverlayColor,
      onGradientChange: setGradient,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Color')
    }]
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Opacity'),
    value: dimRatio,
    onChange: newDimRation => setAttributes({
      dimRatio: newDimRation
    }),
    min: 0,
    max: 100,
    step: 10,
    required: true
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    className: 'block-editor-panel-divider',
    title: DividerPanelHeader,
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('control-divider-top-shape', {
      'divider-flipped': dividerTop.flipped
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Top Divider', 'tzm-section-block'),
    options: _shared__WEBPACK_IMPORTED_MODULE_6__.SVG_SHAPE_OPTIONS,
    onChange: _ref3 => {
      let {
        selectedItem
      } = _ref3;
      setAttributes({
        dividerTop: { ...dividerTop,
          shape: selectedItem.key
        }
      });
    },
    value: _shared__WEBPACK_IMPORTED_MODULE_6__.SVG_SHAPE_OPTIONS.find(option => option.key === dividerTop.shape)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    className: 'control-divider-top-flipped',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Flip divider shape', 'tzm-section-block'),
    checked: !!dividerTop.flipped,
    onChange: newFlipped => {
      setAttributes({
        dividerTop: { ...dividerTop,
          flipped: newFlipped
        }
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    className: "block-editor-control-color-palette divider-color",
    value: dividerTop.color,
    onChange: nextColor => {
      setAttributes({
        dividerTop: { ...dividerTop,
          color: nextColor
        }
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('control-divider-bottom-shape', {
      'divider-flipped': dividerBottom.flipped
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Bottom Divider', 'tzm-section-block'),
    options: _shared__WEBPACK_IMPORTED_MODULE_6__.SVG_SHAPE_OPTIONS,
    onChange: _ref4 => {
      let {
        selectedItem
      } = _ref4;
      setAttributes({
        dividerBottom: { ...dividerBottom,
          shape: selectedItem.key
        }
      });
    },
    value: _shared__WEBPACK_IMPORTED_MODULE_6__.SVG_SHAPE_OPTIONS.find(option => option.key === dividerBottom.shape)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    className: 'control-divider-bottom-flipped',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Flip divider shape', 'tzm-section-block'),
    checked: !!dividerBottom.flipped,
    onChange: newFlipped => {
      setAttributes({
        dividerBottom: { ...dividerBottom,
          flipped: newFlipped
        }
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    className: "block-editor-control-color-palette divider-color",
    value: dividerBottom.color,
    onChange: nextColor => {
      setAttributes({
        dividerBottom: { ...dividerBottom,
          color: nextColor
        }
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    className: 'block-editor-control-range divider-height',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Divider height', 'tzm-section-block'),
    value: dividerHeight * 4,
    onChange: nextHeight => {
      setAttributes({
        dividerHeight: nextHeight * 0.25
      });
    },
    step: 5,
    min: 5,
    max: 100
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
    __experimentalGroup: "dimensions"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => !!minHeight,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Minimum height'),
    onDeselect: () => setAttributes({
      minHeight: undefined,
      minHeightUnit: undefined
    }),
    resetAllFilter: () => ({
      minHeight: undefined,
      minHeightUnit: undefined
    }),
    isShownByDefault: true,
    panelId: clientId
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SectionHeightInput, {
    value: minHeight,
    unit: minHeightUnit,
    onChange: newMinHeight => setAttributes({
      minHeight: newMinHeight
    }),
    onUnitChange: nextUnit => setAttributes({
      minHeightUnit: nextUnit
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    className: "block-editor-control-toggle full-height",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Toggle full height'),
    checked: isMinFullHeight,
    onChange: toggleMinFullHeight
  })), !!isMinFullHeight && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "block-editor-control-text height-selector",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('CSS selector (experimental)', 'tzm-section-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Define an element to subtract its height from your full height section (e.g. '#navigation' or '.primary-menu')", 'tzm-section-block'),
    value: minHeightSelector,
    onChange: newHeightSelector => {
      setAttributes({
        minHeightSelector: newHeightSelector
      });
    }
  })))));
}

/***/ }),

/***/ "./src/section/edit/resizable-section.js":
/*!***********************************************!*\
  !*** ./src/section/edit/resizable-section.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ResizableSection; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



const RESIZABLE_BOX_ENABLE_OPTION = {
  top: false,
  right: false,
  bottom: true,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false
};
function ResizableSection(_ref) {
  let {
    className,
    onResizeStart,
    onResize,
    onResizeStop,
    ...props
  } = _ref;
  const [isResizing, setIsResizing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ResizableBox, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, {
      'is-resizing': isResizing
    }),
    enable: RESIZABLE_BOX_ENABLE_OPTION,
    onResizeStart: (_event, _direction, elt) => {
      onResizeStart(elt.clientHeight);
      onResize(elt.clientHeight);
    },
    onResize: (_event, _direction, elt) => {
      onResize(elt.clientHeight);

      if (!isResizing) {
        setIsResizing(true);
      }
    },
    onResizeStop: (_event, _direction, elt) => {
      onResizeStop(elt.clientHeight);
      setIsResizing(false);
    }
  }, props));
}

/***/ }),

/***/ "./src/section/edit/use-section-is-dark.js":
/*!*************************************************!*\
  !*** ./src/section/edit/use-section-is-dark.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useSectionIsDark; }
/* harmony export */ });
/* harmony import */ var fast_average_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-average-color */ "./node_modules/fast-average-color/dist/index.esm.js");
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



function retrieveFastAverageColor() {
  if (!retrieveFastAverageColor.fastAverageColor) {
    retrieveFastAverageColor.fastAverageColor = new fast_average_color__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  return retrieveFastAverageColor.fastAverageColor;
}
/**
 * useSectionIsDark is a hook that returns a boolean variable specifying if the section
 * background is dark or not.
 *
 * @param {?string} url          Url of the media background.
 * @param {?number} dimRatio     Transparency of the overlay color. If an image and
 *                               color are set, dimRatio is used to decide what is used
 *                               for background darkness checking purposes.
 * @param {?string} overlayColor String containing the overlay color value if one exists.
 * @param {?Object} elementRef   If a media background is set, elementRef should contain a reference to a
 *                               dom element that renders that media.
 *
 * @return {boolean} True if the section background is considered "dark" and false otherwise.
 */


function useSectionIsDark(url) {
  let dimRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  let overlayColor = arguments.length > 2 ? arguments[2] : undefined;
  let elementRef = arguments.length > 3 ? arguments[3] : undefined;
  const [isDark, setIsDark] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // If opacity is lower than 50 the dominant color is the image or video color,
    // so use that color for the dark mode computation.
    if (url && dimRatio <= 50 && elementRef.current) {
      retrieveFastAverageColor().getColorAsync(elementRef.current, color => {
        setIsDark(color.isDark);
      });
    }
  }, [url, url && dimRatio <= 50 && elementRef.current, setIsDark]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // If opacity is greater than 50 the dominant color is the overlay color,
    // so use that color for the dark mode computation.
    if (dimRatio > 50 || !url) {
      if (!overlayColor) {
        // If no overlay color exists the overlay color is black (isDark )
        setIsDark(true);
        return;
      }

      setIsDark((0,colord__WEBPACK_IMPORTED_MODULE_2__.colord)(overlayColor).isDark());
    }
  }, [overlayColor, dimRatio > 50 || !url, setIsDark]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!url && !overlayColor) {
      // Reset isDark.
      setIsDark(false);
    }
  }, [!url && !overlayColor, setIsDark]);
  return isDark;
}

/***/ }),

/***/ "./src/section/index.js":
/*!******************************!*\
  !*** ./src/section/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "metadata": function() { return /* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_4__; },
/* harmony export */   "name": function() { return /* binding */ name; },
/* harmony export */   "settings": function() { return /* binding */ settings; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/section/edit/index.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/section/block.json");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/section/save.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transforms */ "./src/section/transforms.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/section/style.scss");


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */
//import deprecated from './deprecated';





/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_4__;

const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
  d: "M17.3,12.35l-4.73,3.605c-0.486,0.315-0.914,0.258-1.319,0.045l-4-2L2,17.15V18c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2v-2L17.3,12.35z"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.Path, {
  d: "M6.525,12.642c0.412-0.292,0.921-0.104,1.325,0.108l3.9,2l4.85-3.6c0.358-0.316,0.996-0.32,1.4,0l4,3.05V6c0-1.104-0.896-2-2-2H4C2.896,4,2,4.896,2,6v9.5L6.525,12.642z"
}));
const settings = {
  icon,
  example: {
    attributes: {
      customOverlayColor: '#ffffff',
      dimRatio: 20,
      url: 'https://picsum.photos/id/1056/600/400',
      dividerTop: {
        shape: 'double-curve',
        color: '#ffffff'
      },
      dividerBottom: {
        shape: 'double-curve',
        color: '#ffffff'
      },
      dividerHeight: 10
    },
    innerBlocks: [{
      name: 'core/paragraph',
      attributes: {
        customFontSize: 48,
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('<strong>Aim high</strong>', 'tzm-section-block'),
        align: 'center',
        style: {
          color: {
            text: '#fc5b0e'
          }
        }
      }
    }]
  },
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_6__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"] //deprecated,

};

/***/ }),

/***/ "./src/section/save.js":
/*!*****************************!*\
  !*** ./src/section/save.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared */ "./src/section/shared.js");



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


function save(_ref) {
  let {
    attributes
  } = _ref;
  const {
    backgroundType,
    gradient,
    verticalAlignment,
    customGradient,
    customOverlayColor,
    dimRatio,
    focalPoint,
    useFeaturedImage,
    parallaxMode,
    isDark,
    isRepeated,
    overlayColor,
    url,
    alt,
    id,
    minHeight: minHeightProp,
    minHeightUnit,
    minHeightSelector,
    dividerTop,
    dividerBottom,
    dividerHeight
  } = attributes;
  const overlayColorClass = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.getColorClassName)('background-color', overlayColor);

  const gradientClass = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalGetGradientClass)(gradient);

  const minHeight = minHeightProp && minHeightUnit ? `${minHeightProp}${minHeightUnit}` : minHeightProp;
  const isImageBackground = _shared__WEBPACK_IMPORTED_MODULE_4__.IMAGE_BACKGROUND_TYPE === backgroundType;
  const isVideoBackground = _shared__WEBPACK_IMPORTED_MODULE_4__.VIDEO_BACKGROUND_TYPE === backgroundType;
  const isImgElement = !isRepeated;
  const style = {
    minHeight: !minHeightSelector && minHeight || undefined
  };
  const bgStyle = {
    backgroundColor: !overlayColorClass ? customOverlayColor : undefined,
    background: customGradient ? customGradient : undefined
  };
  const objectPosition = // prettier-ignore
  focalPoint && isImgElement ? (0,_shared__WEBPACK_IMPORTED_MODULE_4__.mediaPosition)(focalPoint) : undefined;
  const backgroundImage = url ? `url(${url})` : undefined;
  const backgroundPosition = (0,_shared__WEBPACK_IMPORTED_MODULE_4__.mediaPosition)(focalPoint);
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
    'is-light': !isDark,
    'is-repeated': isRepeated,
    [`has-parallax-${parallaxMode}`]: parallaxMode && (isVideoBackground || isImgElement),
    [`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
  });
  const imgClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()('wp-block-tzm-section__image-background', id ? `wp-image-${id}` : null, {
    'is-repeated': isRepeated,
    'jarallax-img': parallaxMode && isImageBackground && isImgElement,
    [`has-parallax-${parallaxMode}`]: parallaxMode && isImageBackground && !isImgElement
  });
  const gradientValue = gradient || customGradient;
  const urlExt = url === null || url === void 0 ? void 0 : url.split(/[#?]/)[0].split('.').pop().trim();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("section", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
    className: classes,
    style
  }), {
    "data-height-selector": minHeight === '100vh' && minHeightSelector ? minHeightSelector : undefined,
    "data-video-src": parallaxMode && isVideoBackground && url ? urlExt + ':' + url : undefined
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    "aria-hidden": "true",
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('wp-block-tzm-section__background', overlayColorClass, (0,_shared__WEBPACK_IMPORTED_MODULE_4__.dimRatioToClass)(dimRatio), {
      'has-background-dim': dimRatio !== undefined,
      // For backwards compatibility. Former versions of the Section Block applied
      // `.wp-block-cover__gradient-background` in the presence of
      // media, a gradient and a dim.
      'wp-block-tzm-section__gradient-background': url && gradientValue && dimRatio !== 0,
      'has-background-gradient': gradientValue,
      [gradientClass]: gradientClass
    }),
    style: bgStyle
  }), !useFeaturedImage && isImageBackground && url && (isImgElement ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    className: imgClasses,
    alt: alt,
    src: url,
    style: {
      objectPosition
    },
    "data-object-fit": "cover",
    "data-object-position": objectPosition
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    role: "img",
    className: imgClasses,
    style: {
      backgroundPosition,
      backgroundImage
    },
    "data-img-size": parallaxMode && isRepeated ? 'auto' : undefined,
    "data-img-repeat": parallaxMode && isRepeated ? 'repeat' : undefined
  })), isVideoBackground && url && !parallaxMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("video", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('wp-block-tzm-section__video-background', 'intrinsic-ignore'),
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    src: url,
    style: {
      objectPosition
    },
    "data-object-fit": "cover",
    "data-object-position": objectPosition
  }), !!dividerTop.shape && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_shared__WEBPACK_IMPORTED_MODULE_4__.SvgDivider, {
    divider: dividerTop,
    position: "top",
    height: dividerHeight
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps.save({
    className: 'wp-block-tzm-section__inner-container'
  })), !!dividerBottom.shape && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_shared__WEBPACK_IMPORTED_MODULE_4__.SvgDivider, {
    divider: dividerBottom,
    position: "bottom",
    height: dividerHeight
  }));
}

/***/ }),

/***/ "./src/section/shared.js":
/*!*******************************!*\
  !*** ./src/section/shared.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMAGE_BACKGROUND_TYPE": function() { return /* binding */ IMAGE_BACKGROUND_TYPE; },
/* harmony export */   "VIDEO_BACKGROUND_TYPE": function() { return /* binding */ VIDEO_BACKGROUND_TYPE; },
/* harmony export */   "SECTION_MIN_HEIGHT": function() { return /* binding */ SECTION_MIN_HEIGHT; },
/* harmony export */   "SECTION_MAX_HEIGHT": function() { return /* binding */ SECTION_MAX_HEIGHT; },
/* harmony export */   "SECTION_DEFAULT_HEIGHT": function() { return /* binding */ SECTION_DEFAULT_HEIGHT; },
/* harmony export */   "DEFAULT_FOCAL_POINT": function() { return /* binding */ DEFAULT_FOCAL_POINT; },
/* harmony export */   "ALLOWED_MEDIA_TYPES": function() { return /* binding */ ALLOWED_MEDIA_TYPES; },
/* harmony export */   "mediaPosition": function() { return /* binding */ mediaPosition; },
/* harmony export */   "dimRatioToClass": function() { return /* binding */ dimRatioToClass; },
/* harmony export */   "attributesFromMedia": function() { return /* binding */ attributesFromMedia; },
/* harmony export */   "getDividerItem": function() { return /* binding */ getDividerItem; },
/* harmony export */   "SvgDivider": function() { return /* binding */ SvgDivider; },
/* harmony export */   "SVG_SHAPE_OPTIONS": function() { return /* binding */ SVG_SHAPE_OPTIONS; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_4__);


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



 //import { useState } from '@wordpress/element';

const IMAGE_BACKGROUND_TYPE = 'image';
const VIDEO_BACKGROUND_TYPE = 'video';
const SECTION_MIN_HEIGHT = 50;
const SECTION_MAX_HEIGHT = 5000;
const SECTION_DEFAULT_HEIGHT = 300;
const DEFAULT_FOCAL_POINT = {
  x: 0.5,
  y: 0.5
};
const ALLOWED_MEDIA_TYPES = ['image', 'video'];
function mediaPosition() {
  let {
    x,
    y
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FOCAL_POINT;
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}
function dimRatioToClass(ratio) {
  return ratio === 50 || !ratio === undefined ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}
function attributesFromMedia(setAttributes, dimRatio) {
  return media => {
    if (!media || !media.url) {
      setAttributes({
        url: undefined,
        id: undefined
      });
      return;
    }

    if ((0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_4__.isBlobURL)(media.url)) {
      media.type = (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_4__.getBlobTypeByURL)(media.url);
    }

    let mediaType; // For media selections originated from a file upload.

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
      if (media.type !== IMAGE_BACKGROUND_TYPE && media.type !== VIDEO_BACKGROUND_TYPE) {
        return;
      }

      mediaType = media.type;
    }

    setAttributes({
      dimRatio: dimRatio === 100 ? 50 : dimRatio,
      url: media.url,
      id: media.id,
      alt: media === null || media === void 0 ? void 0 : media.alt,
      backgroundType: mediaType,
      ...(mediaType === VIDEO_BACKGROUND_TYPE ? {
        focalPoint: undefined,
        parallaxMode: undefined
      } : {})
    });
  };
}
function getDividerItem(shape) {
  let key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const match = SVG_SHAPE_OPTIONS.filter(item => item.key === shape);

  if (match.length > 0) {
    if (!key) {
      return match[0];
    } else if (key && match[0].hasOwnProperty(key)) {
      return match[0][key];
    }
  }

  return null;
}
const SvgDivider = _ref => {
  let {
    divider,
    position = 'bottom',
    height = 30
  } = _ref;

  // Bail if no divider object or shape provided
  if (!divider || !divider.shape || !getDividerItem(divider.shape)) {
    return null;
  }

  const svgData = getDividerItem(divider.shape, 'data');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()('wp-block-tzm-section__divider-shape', `has-${position}-position`, `has-${divider.shape}-shape`, {
    'is-flipped': divider.flipped
  });

  function svgElements(entries) {
    if (!entries) {
      return null;
    }

    const elements = [];
    entries.forEach(entry => {
      switch (entry.el) {
        case 'polygon':
          elements.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__.Polygon, entry.attr));
          break;

        case 'path':
          elements.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__.Path, entry.attr));
          break;

        case 'g':
          const inner = svgElements(entry.inner);
          elements.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__.G, entry.attr, inner));
          break;
      }
    });
    return elements;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_3__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 1600 140",
    preserveAspectRatio: "none",
    width: "100%",
    height: height + 'vw',
    fill: divider.color,
    className: classes
  }, svgElements(svgData));
};
const SVG_SHAPE_OPTIONS = [{
  key: '',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('- Disabled -', 'tzm-section-block')
}, {
  key: 'tilt',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tilt', 'tzm-section-block'),
  className: 'preview tilt',
  data: [{
    el: 'polygon',
    attr: {
      points: '0,135 0,140 1600,140 1600,0'
    }
  }]
}, {
  key: 'tilt-double',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tilt double', 'tzm-section-block'),
  className: 'preview tilt-double',
  data: [{
    el: 'polygon',
    attr: {
      points: '0,135 0,140 1600,140 1600,0'
    }
  }, {
    el: 'polygon',
    attr: {
      opacity: '0.5',
      points: '0,75 0,140 1600,140 1600,0'
    }
  }]
}, {
  key: 'small-triangle-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Small triangle In', 'tzm-section-block'),
  className: 'preview small-triangle-in',
  data: [{
    el: 'polygon',
    attr: {
      points: '1600,140 1600,30 900,30 800,135 700,30 0,30 0,140'
    }
  }]
}, {
  key: 'small-triangle-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Small triangle Out', 'tzm-section-block'),
  className: 'preview small-triangle-out',
  data: [{
    el: 'polygon',
    attr: {
      points: '1600,105 900,105 800,0 700,105 0,105 0,140 1600,140'
    }
  }]
}, {
  key: 'big-triangle-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Big triangle In', 'tzm-section-block'),
  className: 'preview big-triangle-in',
  data: [{
    el: 'polygon',
    attr: {
      points: '1600,140 1600,5 800,135 0,5 0,140'
    }
  }]
}, {
  key: 'big-triangle-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Big triangle Out', 'tzm-section-block'),
  className: 'preview big-triangle-out',
  data: [{
    el: 'polygon',
    attr: {
      points: '0,135 800,0 1600,135 1600,140 0,140'
    }
  }]
}, {
  key: 'offset-triangle-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Offset triangle In', 'tzm-section-block'),
  className: 'preview offset-triangle-in',
  data: [{
    el: 'polygon',
    attr: {
      points: '0,0 1080,135 1600,50 1600,140 0,140'
    }
  }]
}, {
  key: 'offset-triangle-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Offset triangle Out', 'tzm-section-block'),
  className: 'preview offset-triangle-out',
  data: [{
    el: 'polygon',
    attr: {
      points: '0,140 1080,10 1600,90 1600,140'
    }
  }]
}, {
  key: 'sawtooth',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sawtooth', 'tzm-section-block'),
  className: 'preview sawtooth',
  data: [{
    el: 'polygon',
    attr: {
      points: '100,40 100,130 200,40 200,130 300,40 300,130 400,40 400,130 500,40 500,130 600,40 600,130 700,40 700,130 800,40 800,130 900,40 900,130 1000,40 1000,130 1100,40 1100,130 1200,40 1200,130 1300,40 1300,130 1400,40 1400,130 1500,40 1500,130 1600,40 1600,140 0,140 0,130'
    }
  }]
}, {
  key: 'small-zigzag',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Small zigzag', 'tzm-section-block'),
  className: 'preview small-zigzag',
  data: [{
    el: 'polygon',
    attr: {
      points: '1550,58 1500,30 1450,58 1400,30 1350,58 1300,30 1250,58 1200,30 1150,58 1100,30 1050,58 1000,30 950,58 900,30 850,58 800,30 750,58 700,30 650,58 600,30 550,58 500,30 450,58 400,30 350,58 300,30 250,58 200,30 150,58 100,30 50,58 0,30 0,140 1600,140 1600,30'
    }
  }]
}, {
  key: 'zigzag',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Zigzag', 'tzm-section-block'),
  className: 'preview zigzag',
  data: [{
    el: 'polygon',
    attr: {
      points: '1600,40 1500,80 1400,40 1300,80 1200,40 1100,80 1000,40 900,80 800,40 700,80 600,40 500,80 400,40 300,80 200,40 200,40 200,40 100,80 0,40 0,140 1600,140'
    }
  }]
}, {
  key: 'spikes',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spikes', 'tzm-section-block'),
  className: 'preview spikes',
  data: [{
    el: 'polygon',
    attr: {
      points: '1600,100 980,100 920,40 860,100 800,40 740,100 680,40 620,100 0,100 0,140 1600,140'
    }
  }]
}, {
  key: 'blocks',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Blocks', 'tzm-section-block'),
  className: 'preview blocks',
  data: [{
    el: 'polygon',
    attr: {
      points: '1550,20 1550,100 1450,100 1450,20 1350,20 1350,100 1250,100 1250,20 1150,20 1150,100 1050,100 1050,20 950,20 950,100 850,100 850,20 750,20 750,100 650,100 650,20 550,20 550,100 450,100 450,20 350,20 350,100 250,100 250,20 150,20 150,100 50,100 50,20 0,20 0,140 0,140 1600,140 1600,20'
    }
  }]
}, {
  key: 'halfcircle-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Half-circle In', 'tzm-section-block'),
  className: 'preview halfcircle-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140V25H920c-7.089,66.389-64.801,110-120,110c-55.201,0-112.078-43.611-120-110H0v115H1600z'
    }
  }]
}, {
  key: 'halfcircle-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Half-circle Out', 'tzm-section-block'),
  className: 'preview halfcircle-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M920,115C912.078,48.612,855.201,5,800,5c-55.199,0-112.911,43.611-120,110H0v25h1600v-25H920z'
    }
  }]
}, {
  key: 'curve-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Curve In', 'tzm-section-block'),
  className: 'preview curve-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140V5c0,0-344.4,130-800,130C344.399,135,0,5,0,5v135H1600z'
    }
  }]
}, {
  key: 'curve-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Curve Out', 'tzm-section-block'),
  className: 'preview curve-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M0,135C0,135,344.4,5,800,5c455.601,0,800,130,800,130v5H0V135z'
    }
  }]
}, {
  key: 'asymmetric-curve-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Asymmetric curve In', 'tzm-section-block'),
  className: 'preview asymmetric-curve-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M-0.001,140V40c0,0,144.4,90,600,90c455.6,0,1000-125,1000-125v135H-0.001z'
    }
  }]
}, {
  key: 'asymmetric-curve-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Asymmetric curve Out', 'tzm-section-block'),
  className: 'preview asymmetric-curve-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M0,100c0,0,144.4-90,600-90c455.601,0,1000,125,1000,125v5H0V100z'
    }
  }]
}, {
  key: 'double-curve',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Double curve', 'tzm-section-block'),
  className: 'preview double-curve',
  data: [{
    el: 'path',
    attr: {
      opacity: '0.5',
      d: 'M400,0c400,0,400,85,800,85c299.419,0,400-75,400-75v130H0C0,140,149.486,0,400,0z'
    }
  }, {
    el: 'path',
    attr: {
      d: 'M385,10c329.457,0,415,110,815,110c300.919,0,400-60,400-60v80H0v-20C0,120,184.983,10,385,10z'
    }
  }]
}, {
  key: 'waves',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Waves', 'tzm-section-block'),
  className: 'preview waves',
  data: [{
    el: 'path',
    attr: {
      d: 'M0,100c0,0,45.508-60,200-60c127.494,0,127.005,40,235,40c103.495,0,91.508-55,240-55c115.495,0,139.504,75.001,225,75c106.827-0.001,141.005-65,240-65c127.494,0,158.752,50,240,50c130.493,0,220-34.892,220-34.892V140H0V100z'
    }
  }]
}, {
  key: 'rounded-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rounded In', 'tzm-section-block'),
  className: 'preview rounded-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140V0c0,0,0,100-100,100H100C0,100,0,0,0,0v140H1600z'
    }
  }]
}, {
  key: 'rounded-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rounded Out', 'tzm-section-block'),
  className: 'preview rounded-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M1500,40H100C0,40,0,140,0,140h1600C1600,140,1600,40,1500,40z'
    }
  }]
}, {
  key: 'split-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Split In', 'tzm-section-block'),
  className: 'preview split-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140V35H900c-80,0-100,100-100,100S780,35,700,35H0v105H1600z'
    }
  }]
}, {
  key: 'split-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Split Out', 'tzm-section-block'),
  className: 'preview split-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,105H900C820,105,800,0,800,0s-20,105-100,105H0v35h1600V105z'
    }
  }]
}, {
  key: 'book-in',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Book In', 'tzm-section-block'),
  className: 'preview book-in',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140V35c0,0-119.062,5-240,5s-260-10-260-10c-180.422,0-300,105-300,105S681.09,30,500,30c0,0-138.618,10-260,10S0,35,0,35v105H1600z'
    }
  }]
}, {
  key: 'book-out',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Book Out', 'tzm-section-block'),
  className: 'preview book-out',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,105c0,0-119.561-5-240-5s-260,10-260,10C918.5,110,800,0,800,0S681.5,110,500,110c0,0-139.727-10-260-10S0,105,0,105v35h1600V105z'
    }
  }]
}, {
  key: 'paint',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Paint', 'tzm-section-block'),
  className: 'preview paint',
  data: [{
    el: 'path',
    attr: {
      d: 'M0,140h1600V50c-16.496-0.171-38.961-29.683-60-30c-40.564-4.291-94.115-4.33-100-4c-53.5,3,11.75,6,20,9c49.667,25-38.75,12.5-80,22c-74.94,17.259,50.25-24.25-70,3c-41.528,9.411-72.385,6.142-102-5C1056.5-5.5,421.887,19.239,550,35c-1.823,1.764-20.152,0.684-35,0c-14.245-0.655-29.071-0.899-45,0c-38.758-2.661-53.75,47.5-150,30c-2.757,0.976-7.309,6.933,15,8c8.788,0.42,35.27,4.467,45,5c-26.75,20.75-173.786-31.431-200-42C149.631,23.755,47.804,36.662,0,48V140z M825,30c48.541-5.473,150-15,205,2c11.582,1.515,29.381,5.594,10,6c-11.59,0.242-64.259-8.949-80-10c-17.952,0.764-50.166,0.651-70,2C864.764,31.717,822.25,36.5,825,30z'
    }
  }]
}, {
  key: 'ragged',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ragged', 'tzm-section-block'),
  className: 'preview ragged',
  data: [{
    el: 'path',
    attr: {
      d: 'M1600,140H0c0,0,0-46.7,0-60 c13.5-2.4,26.5-2.6,40-5c5.7,4.9,11.3,9.1,17,14c58-1.7,45.6-10,77-10c10.4,5,20.6,9,31,14c0,0,17-5.3,29-8c12-2.7,40-2,40-2 c16.7-1.5,33.3-3.5,50-5c8,2.4,16,5.6,24,8c3.2-5.4,6.8-10.6,10-16c7.2,6,14.7,12,21.9,18c5.6,1.5,10.5,2.5,16.1,4 c8,1.2,17,2.8,25,4c3.2-2.7,5.8-5.3,9-8c4.8-2.7,9.2-5.3,14-8c5.6,1.5,11.4,2.5,17,4c4-3.3,8-5.7,12-9c5.6-0.3,11.4-0.7,17-1 c5.6,1.8,10.4,3.2,16,5c23.8,3,49,5.3,73,8c27.1,21.2,59.4,0.5,81,6c6.4,1.6,12.6,3.4,19,5c4,0.6,8,1.4,12,2c4.8,0.9,9.2,1.1,14,2 c4,0.6,8,1.4,12,2c28.2-12.3,62.9-15.1,81,1c8.8-1.2,17.2-2.8,26-4c8-3,16-6,24-9c6.4,3,13.6,6,20,9c9.6,0.9,18.4,2.1,28,3 c0,0,7.7-5.1,22-6c64.9-4.1,63.2-8.3,108,7c46.9-23.1,16.4,3.3,105-10c9.8,3.4,19.2,5.6,29,9c104-8,35.3-6.4,82,1 c14.9-3.2,29.1-6.8,44-10c67.9-7.2,75.2,1,138,1c2.4,3,5.6,6,8,9c4.8-2.4,9.2-5.6,14-8c2.4-2.4,4.6-4.6,7-7c18.1,0.8,60,10.1,60,2 c0-8.1,9-12,9-12c32.5,7.6,47.2,22.4,118,20C1600,105.1,1600,140,1600,140z'
    }
  }]
}, {
  key: 'clouds',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clouds', 'tzm-section-block'),
  className: 'preview clouds',
  data: [{
    el: 'g',
    attr: {
      opacity: '0.5'
    },
    inner: [{
      el: 'path',
      attr: {
        d: 'M716,42c-221.6-16.4-419.7,24.5-530,98h920 C1003.7,89.8,868.1,53.2,716,42z'
      }
    }]
  }, {
    el: 'g',
    attr: {
      opacity: '0.75'
    },
    inner: [{
      el: 'path',
      attr: {
        d: 'M916,24c-81.3,6-155.7,25.6-212,52 c-38.8,18.2-68.4,40.1-88,64h650C1239.6,62.7,1090.4,11.2,916,24z'
      }
    }, {
      el: 'path',
      attr: {
        d: 'M394,96C297.3,52.1,156.8,26.4,0,28v112h466 C445.5,123.9,422.8,109.1,394,96z'
      }
    }, {
      el: 'path',
      attr: {
        d: 'M748,58c0,0-123.4,59.9-206,66c-82.6,6.1-178-40-178-40 l-42,56h472L748,58z'
      }
    }]
  }, {
    el: 'g',
    attr: {},
    inner: [{
      el: 'path',
      attr: {
        d: 'M615.8,103.3C542.4,81.2,448.8,68,346.7,68 C203.7,68,77.5,94.8,0,134v6h704C679.7,126.1,650.4,113.7,615.8,103.3z'
      }
    }, {
      el: 'path',
      attr: {
        d: 'M1600,0c-241.1,0.1-455.5,39.9-592,100 c-28.2,12.4-52.9,25.9-74,40h666V0z'
      }
    }, {
      el: 'path',
      attr: {
        d: 'M1041,86c0,0-112.3,50-216,50S560,90,560,90l-29.2,49.9h570.8 L1041,86z'
      }
    }]
  }]
}];

/***/ }),

/***/ "./src/section/transforms.js":
/*!***********************************!*\
  !*** ./src/section/transforms.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared */ "./src/section/shared.js");
/* harmony import */ var _utils_clean_empty_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/clean-empty-object */ "./src/utils/clean-empty-object.js");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */



const transforms = {
  from: [{
    type: 'block',
    blocks: ['core/cover'],
    transform: (_ref, innerBlocks) => {
      let {
        url,
        alt,
        align,
        id,
        anchor,
        style,
        isRepeated,
        hasParallax,
        dimRatio,
        overlayColor,
        customOverlayColor,
        backgroundType,
        focalPoint,
        minHeight,
        minHeightUnit,
        gradient,
        customGradient,
        contentPosition
      } = _ref;
      // Vertical Alignment
      let newVerticalAlignment = 'center';

      if (contentPosition) {
        if (contentPosition.includes('top')) {
          newVerticalAlignment = 'top';
        } else if (contentPosition.includes('bottom')) {
          newVerticalAlignment = 'bottom';
        }
      }

      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('tzm/section', {
        verticalAlignment: newVerticalAlignment,
        minHeight,
        minHeightUnit,
        overlayColor,
        customOverlayColor,
        parallaxMode: hasParallax ? 'fixed' : null,
        isRepeated,
        gradient,
        customGradient,
        focalPoint,
        dimRatio,
        url,
        alt,
        align,
        id,
        anchor,
        style,
        backgroundType
      }, innerBlocks);
    }
  }, {
    type: 'block',
    blocks: ['core/image'],
    transform: _ref2 => {
      var _style$color;

      let {
        caption,
        url,
        alt,
        align,
        id,
        anchor,
        style
      } = _ref2;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('tzm/section', {
        dimRatio: 50,
        url,
        alt,
        align,
        id,
        anchor,
        style: {
          color: {
            duotone: style === null || style === void 0 ? void 0 : (_style$color = style.color) === null || _style$color === void 0 ? void 0 : _style$color.duotone
          }
        }
      }, [(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/paragraph', {
        content: caption,
        fontSize: 'large',
        align: 'center'
      })]);
    }
  }, {
    type: 'block',
    blocks: ['core/video'],
    transform: _ref3 => {
      let {
        caption,
        src,
        align,
        id,
        anchor
      } = _ref3;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('tzm/section', {
        dimRatio: 50,
        url: src,
        align,
        id,
        backgroundType: _shared__WEBPACK_IMPORTED_MODULE_1__.VIDEO_BACKGROUND_TYPE,
        anchor
      }, [(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/paragraph', {
        content: caption,
        fontSize: 'large',
        align: 'center'
      })]);
    }
  }, {
    type: 'block',
    blocks: ['core/group'],
    transform: (attributes, innerBlocks) => {
      var _innerBlocks$, _style$color2, _style$color3, _style$color4, _style$color5;

      const {
        align,
        anchor,
        backgroundColor,
        gradient,
        style
      } = attributes; // If the Group block being transformed has a Section block as its
      // only child return that Section block.

      if ((innerBlocks === null || innerBlocks === void 0 ? void 0 : innerBlocks.length) === 1 && ((_innerBlocks$ = innerBlocks[0]) === null || _innerBlocks$ === void 0 ? void 0 : _innerBlocks$.name) === 'tzm/section') {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('tzm/section', innerBlocks[0].attributes, innerBlocks[0].innerBlocks);
      } // If no background or gradient color is provided, default to 50% opacity.
      // This matches the styling of a Section block with a background image,
      // in the state where a background image has been removed.


      const dimRatio = backgroundColor || gradient || style !== null && style !== void 0 && (_style$color2 = style.color) !== null && _style$color2 !== void 0 && _style$color2.background || style !== null && style !== void 0 && (_style$color3 = style.color) !== null && _style$color3 !== void 0 && _style$color3.gradient ? undefined : 50; // Move the background or gradient color to the parent Section block.

      const parentAttributes = {
        align,
        anchor,
        dimRatio,
        overlayColor: backgroundColor,
        customOverlayColor: style === null || style === void 0 ? void 0 : (_style$color4 = style.color) === null || _style$color4 === void 0 ? void 0 : _style$color4.background,
        gradient,
        customGradient: style === null || style === void 0 ? void 0 : (_style$color5 = style.color) === null || _style$color5 === void 0 ? void 0 : _style$color5.gradient
      };
      const attributesWithoutBackgroundColors = { ...attributes,
        backgroundColor: undefined,
        gradient: undefined,
        style: (0,_utils_clean_empty_object__WEBPACK_IMPORTED_MODULE_2__["default"])({ ...(attributes === null || attributes === void 0 ? void 0 : attributes.style),
          color: style !== null && style !== void 0 && style.color ? { ...(style === null || style === void 0 ? void 0 : style.color),
            background: undefined,
            gradient: undefined
          } : undefined
        })
      }; // Preserve the block by nesting it within the Section block,
      // instead of converting the Group block directly to the Section block.

      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('tzm/section', parentAttributes, [(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/group', attributesWithoutBackgroundColors, innerBlocks)]);
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/cover'],
    transform: (_ref4, innerBlocks) => {
      let {
        url,
        alt,
        align,
        id,
        anchor,
        style,
        verticalAlignment,
        minHeight,
        minHeightUnit,
        overlayColor,
        customOverlayColor,
        gradient,
        customGradient,
        isRepeated,
        parallaxMode,
        dimRatio,
        useFeaturedImage,
        backgroundType
      } = _ref4;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/cover', {
        url,
        alt,
        align,
        id,
        anchor,
        style,
        minHeight,
        minHeightUnit,
        contentPosition: verticalAlignment + ' center',
        overlayColor,
        customOverlayColor,
        gradient,
        customGradient,
        hasParallax: parallaxMode,
        dimRatio,
        isRepeated,
        useFeaturedImage,
        backgroundType
      }, innerBlocks);
    }
  }, {
    type: 'block',
    blocks: ['core/image'],
    isMatch: _ref5 => {
      let {
        backgroundType,
        url,
        overlayColor,
        customOverlayColor,
        gradient,
        customGradient
      } = _ref5;

      if (url) {
        // If a url exists the transform could happen if that URL represents an image background.
        return backgroundType === _shared__WEBPACK_IMPORTED_MODULE_1__.IMAGE_BACKGROUND_TYPE;
      } // If a url is not set the transform could happen if the section has no background color or gradient;


      return !overlayColor && !customOverlayColor && !gradient && !customGradient;
    },
    transform: _ref6 => {
      var _style$color6;

      let {
        title,
        url,
        alt,
        align,
        id,
        anchor,
        style
      } = _ref6;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/image', {
        caption: title,
        url,
        alt,
        align,
        id,
        anchor,
        style: {
          color: {
            duotone: style === null || style === void 0 ? void 0 : (_style$color6 = style.color) === null || _style$color6 === void 0 ? void 0 : _style$color6.duotone
          }
        }
      });
    }
  }, {
    type: 'block',
    blocks: ['core/video'],
    isMatch: _ref7 => {
      let {
        backgroundType,
        url,
        overlayColor,
        customOverlayColor,
        gradient,
        customGradient
      } = _ref7;

      if (url) {
        // If a url exists the transform could happen if that URL represents a video background.
        return backgroundType === _shared__WEBPACK_IMPORTED_MODULE_1__.VIDEO_BACKGROUND_TYPE;
      } // If a url is not set the transform could happen if the section has no background color or gradient;


      return !overlayColor && !customOverlayColor && !gradient && !customGradient;
    },
    transform: _ref8 => {
      let {
        title,
        url,
        align,
        id,
        anchor
      } = _ref8;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/video', {
        caption: title,
        src: url,
        id,
        align,
        anchor
      });
    }
  }, {
    type: 'block',
    blocks: ['core/group'],
    isMatch: _ref9 => {
      let {
        url
      } = _ref9;

      // If the Section block uses background media, skip this transform,
      // and instead use the Group block's default transform.
      if (url) {
        return false;
      }

      return true;
    },
    transform: (attributes, innerBlocks) => {
      var _attributes$style, _attributes$style2, _innerBlocks$2;

      // Convert Section overlay colors to comparable Group background colors.
      const transformedColorAttributes = {
        backgroundColor: attributes === null || attributes === void 0 ? void 0 : attributes.overlayColor,
        gradient: attributes === null || attributes === void 0 ? void 0 : attributes.gradient,
        style: (0,_utils_clean_empty_object__WEBPACK_IMPORTED_MODULE_2__["default"])({ ...(attributes === null || attributes === void 0 ? void 0 : attributes.style),
          color: attributes !== null && attributes !== void 0 && attributes.customOverlayColor || attributes !== null && attributes !== void 0 && attributes.customGradient || attributes !== null && attributes !== void 0 && (_attributes$style = attributes.style) !== null && _attributes$style !== void 0 && _attributes$style.color ? {
            background: attributes === null || attributes === void 0 ? void 0 : attributes.customOverlayColor,
            gradient: attributes === null || attributes === void 0 ? void 0 : attributes.customGradient,
            ...(attributes === null || attributes === void 0 ? void 0 : (_attributes$style2 = attributes.style) === null || _attributes$style2 === void 0 ? void 0 : _attributes$style2.color)
          } : undefined
        })
      }; // If the Section block contains only a single Group block as a direct child,
      // then attempt to merge the Section's background colors with the child Group block,
      // and remove the Section block as the wrapper.

      if ((innerBlocks === null || innerBlocks === void 0 ? void 0 : innerBlocks.length) === 1 && ((_innerBlocks$2 = innerBlocks[0]) === null || _innerBlocks$2 === void 0 ? void 0 : _innerBlocks$2.name) === 'core/group') {
        var _groupAttributes$styl, _groupAttributes$styl2, _groupAttributes$styl3, _groupAttributes$styl4, _transformedColorAttr, _groupAttributes$styl5, _transformedColorAttr2, _groupAttributes$styl6, _innerBlocks$4;

        const groupAttributes = (0,_utils_clean_empty_object__WEBPACK_IMPORTED_MODULE_2__["default"])(innerBlocks[0].attributes || {}); // If the Group block contains any kind of background color or gradient,
        // skip merging Section background colors, and preserve the Group block's colors.

        if (groupAttributes !== null && groupAttributes !== void 0 && groupAttributes.backgroundColor || groupAttributes !== null && groupAttributes !== void 0 && groupAttributes.gradient || groupAttributes !== null && groupAttributes !== void 0 && (_groupAttributes$styl = groupAttributes.style) !== null && _groupAttributes$styl !== void 0 && (_groupAttributes$styl2 = _groupAttributes$styl.color) !== null && _groupAttributes$styl2 !== void 0 && _groupAttributes$styl2.background || groupAttributes !== null && groupAttributes !== void 0 && (_groupAttributes$styl3 = groupAttributes.style) !== null && _groupAttributes$styl3 !== void 0 && (_groupAttributes$styl4 = _groupAttributes$styl3.color) !== null && _groupAttributes$styl4 !== void 0 && _groupAttributes$styl4.gradient) {
          var _innerBlocks$3;

          return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/group', groupAttributes, (_innerBlocks$3 = innerBlocks[0]) === null || _innerBlocks$3 === void 0 ? void 0 : _innerBlocks$3.innerBlocks);
        }

        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/group', { ...transformedColorAttributes,
          ...groupAttributes,
          style: (0,_utils_clean_empty_object__WEBPACK_IMPORTED_MODULE_2__["default"])({ ...(groupAttributes === null || groupAttributes === void 0 ? void 0 : groupAttributes.style),
            color: transformedColorAttributes !== null && transformedColorAttributes !== void 0 && (_transformedColorAttr = transformedColorAttributes.style) !== null && _transformedColorAttr !== void 0 && _transformedColorAttr.color || groupAttributes !== null && groupAttributes !== void 0 && (_groupAttributes$styl5 = groupAttributes.style) !== null && _groupAttributes$styl5 !== void 0 && _groupAttributes$styl5.color ? { ...(transformedColorAttributes === null || transformedColorAttributes === void 0 ? void 0 : (_transformedColorAttr2 = transformedColorAttributes.style) === null || _transformedColorAttr2 === void 0 ? void 0 : _transformedColorAttr2.color),
              ...(groupAttributes === null || groupAttributes === void 0 ? void 0 : (_groupAttributes$styl6 = groupAttributes.style) === null || _groupAttributes$styl6 === void 0 ? void 0 : _groupAttributes$styl6.color)
            } : undefined
          })
        }, (_innerBlocks$4 = innerBlocks[0]) === null || _innerBlocks$4 === void 0 ? void 0 : _innerBlocks$4.innerBlocks);
      } // In all other cases, transform the Section block directly to a Group block.


      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/group', { ...attributes,
        ...transformedColorAttributes
      }, innerBlocks);
    }
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (transforms);

/***/ }),

/***/ "./src/tzm-section.js":
/*!****************************!*\
  !*** ./src/tzm-section.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./section */ "./src/section/index.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


const blocks = [_section__WEBPACK_IMPORTED_MODULE_1__];
/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */

const registerBlock = block => {
  if (!block) {
    return;
  }

  const {
    metadata,
    settings,
    name
  } = block;

  if (metadata) {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unstable__bootstrapServerSideBlockDefinitions)({
      [name]: metadata
    });
  }

  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, settings);
};

blocks.forEach(registerBlock);

/***/ }),

/***/ "./src/utils/clean-empty-object.js":
/*!*****************************************!*\
  !*** ./src/utils/clean-empty-object.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */

/**
 * Removed empty nodes from nested objects.
 *
 * @param {Object} object
 * @return {Object} Object cleaned from empty nodes.
 */

const cleanEmptyObject = object => {
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isObject)(object) || Array.isArray(object)) {
    return object;
  }

  const cleanedNestedObjects = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pickBy)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.mapValues)(object, cleanEmptyObject), lodash__WEBPACK_IMPORTED_MODULE_0__.identity);
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(cleanedNestedObjects) ? undefined : cleanedNestedObjects;
};

/* harmony default export */ __webpack_exports__["default"] = (cleanEmptyObject);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/fast-average-color/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/fast-average-color/dist/index.esm.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FastAverageColor; }
/* harmony export */ });
/*! Fast Average Color | © 2022 Denis Seleznev | MIT License | https://github.com/fast-average-color/fast-average-color */
function toHex(num) {
    var str = num.toString(16);
    return str.length === 1 ? '0' + str : str;
}
function arrayToHex(arr) {
    return '#' + arr.map(toHex).join('');
}
function isDark(color) {
    // http://www.w3.org/TR/AERT#color-contrast
    var result = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
    return result < 128;
}
function prepareIgnoredColor(color) {
    if (!color) {
        return [];
    }
    return isRGBArray(color) ? color : [color];
}
function isRGBArray(value) {
    return Array.isArray(value[0]);
}
function isIgnoredColor(data, index, ignoredColor) {
    for (var i = 0; i < ignoredColor.length; i++) {
        if (isIgnoredColorAsNumbers(data, index, ignoredColor[i])) {
            return true;
        }
    }
    return false;
}
function isIgnoredColorAsNumbers(data, index, ignoredColor) {
    switch (ignoredColor.length) {
        case 3:
            // [red, green, blue]
            if (isIgnoredRGBColor(data, index, ignoredColor)) {
                return true;
            }
            break;
        case 4:
            // [red, green, blue, alpha]
            if (isIgnoredRGBAColor(data, index, ignoredColor)) {
                return true;
            }
            break;
        case 5:
            // [red, green, blue, alpha, threshold]
            if (isIgnoredRGBAColorWithThreshold(data, index, ignoredColor)) {
                return true;
            }
            break;
        default:
            return false;
    }
}
function isIgnoredRGBColor(data, index, ignoredColor) {
    // Ignore if the pixel are transparent.
    if (data[index + 3] !== 255) {
        return true;
    }
    if (data[index] === ignoredColor[0] &&
        data[index + 1] === ignoredColor[1] &&
        data[index + 2] === ignoredColor[2]) {
        return true;
    }
    return false;
}
function isIgnoredRGBAColor(data, index, ignoredColor) {
    if (data[index + 3] && ignoredColor[3]) {
        return data[index] === ignoredColor[0] &&
            data[index + 1] === ignoredColor[1] &&
            data[index + 2] === ignoredColor[2] &&
            data[index + 3] === ignoredColor[3];
    }
    // Ignore rgb components if the pixel are fully transparent.
    return data[index + 3] === ignoredColor[3];
}
function inRange(colorComponent, ignoredColorComponent, value) {
    return colorComponent >= (ignoredColorComponent - value) &&
        colorComponent <= (ignoredColorComponent + value);
}
function isIgnoredRGBAColorWithThreshold(data, index, ignoredColor) {
    var redIgnored = ignoredColor[0];
    var greenIgnored = ignoredColor[1];
    var blueIgnored = ignoredColor[2];
    var alphaIgnored = ignoredColor[3];
    var threshold = ignoredColor[4];
    var alphaData = data[index + 3];
    var alphaInRange = inRange(alphaData, alphaIgnored, threshold);
    if (!alphaIgnored) {
        return alphaInRange;
    }
    if (!alphaData && alphaInRange) {
        return true;
    }
    if (inRange(data[index], redIgnored, threshold) &&
        inRange(data[index + 1], greenIgnored, threshold) &&
        inRange(data[index + 2], blueIgnored, threshold) &&
        alphaInRange) {
        return true;
    }
    return false;
}

function dominantAlgorithm(arr, len, options) {
    var colorHash = {};
    var divider = 24;
    var ignoredColor = options.ignoredColor;
    var step = options.step;
    var max = [0, 0, 0, 0, 0];
    for (var i = 0; i < len; i += step) {
        var red = arr[i];
        var green = arr[i + 1];
        var blue = arr[i + 2];
        var alpha = arr[i + 3];
        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }
        var key = Math.round(red / divider) + ',' +
            Math.round(green / divider) + ',' +
            Math.round(blue / divider);
        if (colorHash[key]) {
            colorHash[key] = [
                colorHash[key][0] + red * alpha,
                colorHash[key][1] + green * alpha,
                colorHash[key][2] + blue * alpha,
                colorHash[key][3] + alpha,
                colorHash[key][4] + 1
            ];
        }
        else {
            colorHash[key] = [red * alpha, green * alpha, blue * alpha, alpha, 1];
        }
        if (max[4] < colorHash[key][4]) {
            max = colorHash[key];
        }
    }
    var redTotal = max[0];
    var greenTotal = max[1];
    var blueTotal = max[2];
    var alphaTotal = max[3];
    var count = max[4];
    return alphaTotal ? [
        Math.round(redTotal / alphaTotal),
        Math.round(greenTotal / alphaTotal),
        Math.round(blueTotal / alphaTotal),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function simpleAlgorithm(arr, len, options) {
    var redTotal = 0;
    var greenTotal = 0;
    var blueTotal = 0;
    var alphaTotal = 0;
    var count = 0;
    var ignoredColor = options.ignoredColor;
    var step = options.step;
    for (var i = 0; i < len; i += step) {
        var alpha = arr[i + 3];
        var red = arr[i] * alpha;
        var green = arr[i + 1] * alpha;
        var blue = arr[i + 2] * alpha;
        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }
        redTotal += red;
        greenTotal += green;
        blueTotal += blue;
        alphaTotal += alpha;
        count++;
    }
    return alphaTotal ? [
        Math.round(redTotal / alphaTotal),
        Math.round(greenTotal / alphaTotal),
        Math.round(blueTotal / alphaTotal),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function sqrtAlgorithm(arr, len, options) {
    var redTotal = 0;
    var greenTotal = 0;
    var blueTotal = 0;
    var alphaTotal = 0;
    var count = 0;
    var ignoredColor = options.ignoredColor;
    var step = options.step;
    for (var i = 0; i < len; i += step) {
        var red = arr[i];
        var green = arr[i + 1];
        var blue = arr[i + 2];
        var alpha = arr[i + 3];
        if (ignoredColor && isIgnoredColor(arr, i, ignoredColor)) {
            continue;
        }
        redTotal += red * red * alpha;
        greenTotal += green * green * alpha;
        blueTotal += blue * blue * alpha;
        alphaTotal += alpha;
        count++;
    }
    return alphaTotal ? [
        Math.round(Math.sqrt(redTotal / alphaTotal)),
        Math.round(Math.sqrt(greenTotal / alphaTotal)),
        Math.round(Math.sqrt(blueTotal / alphaTotal)),
        Math.round(alphaTotal / count)
    ] : options.defaultColor;
}

function getDefaultColor(options) {
    return getOption(options, 'defaultColor', [0, 0, 0, 0]);
}
function getOption(options, name, defaultValue) {
    return (options[name] === undefined ? defaultValue : options[name]);
}

var MIN_SIZE = 10;
var MAX_SIZE = 100;
function isSvg(filename) {
    return filename.search(/\.svg(\?|$)/i) !== -1;
}
function getOriginalSize(resource) {
    if (resource instanceof HTMLImageElement) {
        var width = resource.naturalWidth;
        var height = resource.naturalHeight;
        // For SVG images with only viewBox attr.
        if (!resource.naturalWidth && isSvg(resource.src)) {
            width = height = MAX_SIZE;
        }
        return {
            width: width,
            height: height,
        };
    }
    if (resource instanceof HTMLVideoElement) {
        return {
            width: resource.videoWidth,
            height: resource.videoHeight
        };
    }
    return {
        width: resource.width,
        height: resource.height
    };
}
function getSrc(resource) {
    return resource instanceof HTMLCanvasElement ? 'canvas' : resource.src;
}
function prepareSizeAndPosition(originalSize, options) {
    var srcLeft = getOption(options, 'left', 0);
    var srcTop = getOption(options, 'top', 0);
    var srcWidth = getOption(options, 'width', originalSize.width);
    var srcHeight = getOption(options, 'height', originalSize.height);
    var destWidth = srcWidth;
    var destHeight = srcHeight;
    if (options.mode === 'precision') {
        return {
            srcLeft: srcLeft,
            srcTop: srcTop,
            srcWidth: srcWidth,
            srcHeight: srcHeight,
            destWidth: destWidth,
            destHeight: destHeight
        };
    }
    var factor;
    if (srcWidth > srcHeight) {
        factor = srcWidth / srcHeight;
        destWidth = MAX_SIZE;
        destHeight = Math.round(destWidth / factor);
    }
    else {
        factor = srcHeight / srcWidth;
        destHeight = MAX_SIZE;
        destWidth = Math.round(destHeight / factor);
    }
    if (destWidth > srcWidth || destHeight > srcHeight ||
        destWidth < MIN_SIZE || destHeight < MIN_SIZE) {
        destWidth = srcWidth;
        destHeight = srcHeight;
    }
    return {
        srcLeft: srcLeft,
        srcTop: srcTop,
        srcWidth: srcWidth,
        srcHeight: srcHeight,
        destWidth: destWidth,
        destHeight: destHeight
    };
}
function makeCanvas() {
    return typeof window === 'undefined' ?
        new OffscreenCanvas(1, 1) :
        document.createElement('canvas');
}

var ERROR_PREFIX = 'FastAverageColor: ';
function outputError(message, silent, error) {
    if (!silent) {
        console.error(ERROR_PREFIX + message);
        if (error) {
            console.error(error);
        }
    }
}
function getError(text) {
    return Error(ERROR_PREFIX + text);
}

var FastAverageColor = /** @class */ (function () {
    function FastAverageColor() {
        this.canvas = null;
        this.ctx = null;
    }
    /**
     * Get asynchronously the average color from not loaded image.
     */
    FastAverageColor.prototype.getColorAsync = function (resource, options) {
        var _a;
        if (!resource) {
            return Promise.reject(getError('call .getColorAsync() without resource.'));
        }
        if (typeof resource === 'string') {
            var img = new Image();
            img.crossOrigin = (_a = options === null || options === void 0 ? void 0 : options.crossOrigin) !== null && _a !== void 0 ? _a : '';
            img.src = resource;
            return this.bindImageEvents(img, options);
        }
        else if (resource instanceof Image && !resource.complete) {
            return this.bindImageEvents(resource, options);
        }
        else {
            var result = this.getColor(resource, options);
            return result.error ? Promise.reject(result.error) : Promise.resolve(result);
        }
    };
    /**
     * Get the average color from images, videos and canvas.
     */
    FastAverageColor.prototype.getColor = function (resource, options) {
        options = options || {};
        var defaultColor = getDefaultColor(options);
        if (!resource) {
            outputError('call .getColor(null) without resource.', options.silent);
            return this.prepareResult(defaultColor);
        }
        var originalSize = getOriginalSize(resource);
        var size = prepareSizeAndPosition(originalSize, options);
        if (!size.srcWidth || !size.srcHeight || !size.destWidth || !size.destHeight) {
            outputError("incorrect sizes for resource \"".concat(getSrc(resource), "\"."), options.silent);
            return this.prepareResult(defaultColor);
        }
        if (!this.canvas) {
            this.canvas = makeCanvas();
        }
        if (!this.ctx) {
            this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
            if (!this.ctx) {
                outputError('Canvas Context 2D is not supported in this browser.', options.silent);
                return this.prepareResult(defaultColor);
            }
        }
        this.canvas.width = size.destWidth;
        this.canvas.height = size.destHeight;
        var value = defaultColor;
        try {
            this.ctx.clearRect(0, 0, size.destWidth, size.destHeight);
            this.ctx.drawImage(resource, size.srcLeft, size.srcTop, size.srcWidth, size.srcHeight, 0, 0, size.destWidth, size.destHeight);
            var bitmapData = this.ctx.getImageData(0, 0, size.destWidth, size.destHeight).data;
            value = this.getColorFromArray4(bitmapData, options);
        }
        catch (e) {
            outputError("security error (CORS) for resource ".concat(getSrc(resource), ".\nDetails: https://developer.mozilla.org/en/docs/Web/HTML/CORS_enabled_image"), options.silent, e);
        }
        return this.prepareResult(value);
    };
    /**
     * Get the average color from a array when 1 pixel is 4 bytes.
     */
    FastAverageColor.prototype.getColorFromArray4 = function (arr, options) {
        options = options || {};
        var bytesPerPixel = 4;
        var arrLength = arr.length;
        var defaultColor = getDefaultColor(options);
        if (arrLength < bytesPerPixel) {
            return defaultColor;
        }
        var len = arrLength - arrLength % bytesPerPixel;
        var step = (options.step || 1) * bytesPerPixel;
        var algorithm;
        switch (options.algorithm || 'sqrt') {
            case 'simple':
                algorithm = simpleAlgorithm;
                break;
            case 'sqrt':
                algorithm = sqrtAlgorithm;
                break;
            case 'dominant':
                algorithm = dominantAlgorithm;
                break;
            default:
                throw getError("".concat(options.algorithm, " is unknown algorithm."));
        }
        return algorithm(arr, len, {
            defaultColor: defaultColor,
            ignoredColor: prepareIgnoredColor(options.ignoredColor),
            step: step
        });
    };
    /**
     * Get color data from value ([r, g, b, a]).
     */
    FastAverageColor.prototype.prepareResult = function (value) {
        var rgb = value.slice(0, 3);
        var rgba = [value[0], value[1], value[2], value[3] / 255];
        var isDarkColor = isDark(value);
        return {
            value: [value[0], value[1], value[2], value[3]],
            rgb: 'rgb(' + rgb.join(',') + ')',
            rgba: 'rgba(' + rgba.join(',') + ')',
            hex: arrayToHex(rgb),
            hexa: arrayToHex(value),
            isDark: isDarkColor,
            isLight: !isDarkColor
        };
    };
    /**
     * Destroy the instance.
     */
    FastAverageColor.prototype.destroy = function () {
        this.canvas = null;
        this.ctx = null;
    };
    FastAverageColor.prototype.bindImageEvents = function (resource, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var onload = function () {
                unbindEvents();
                var result = _this.getColor(resource, options);
                if (result.error) {
                    reject(result.error);
                }
                else {
                    resolve(result);
                }
            };
            var onerror = function () {
                unbindEvents();
                reject(getError("Error loading image \"".concat(resource.src, "\".")));
            };
            var onabort = function () {
                unbindEvents();
                reject(getError("Image \"".concat(resource.src, "\" loading aborted.")));
            };
            var unbindEvents = function () {
                resource.removeEventListener('load', onload);
                resource.removeEventListener('error', onerror);
                resource.removeEventListener('abort', onabort);
            };
            resource.addEventListener('load', onload);
            resource.addEventListener('error', onerror);
            resource.addEventListener('abort', onabort);
        });
    };
    return FastAverageColor;
}());




/***/ }),

/***/ "./src/section/editor.scss":
/*!*********************************!*\
  !*** ./src/section/editor.scss ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/section/style.scss":
/*!********************************!*\
  !*** ./src/section/style.scss ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/blob":
/*!******************************!*\
  !*** external ["wp","blob"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blob"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/colord/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/colord/index.mjs ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Colord": function() { return /* binding */ j; },
/* harmony export */   "colord": function() { return /* binding */ w; },
/* harmony export */   "extend": function() { return /* binding */ k; },
/* harmony export */   "getFormat": function() { return /* binding */ I; },
/* harmony export */   "random": function() { return /* binding */ E; }
/* harmony export */ });
var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return"string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return{r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return{r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return{h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return{r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return{h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return{h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e},c=function(r){return{h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return{h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return[e,t[n][1]]}return[null,void 0]},x=function(r){return"string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},I=function(r){return x(r)[1]},M=function(r,t){var n=c(r);return{h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c(r);return{h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r},r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return"number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t},r.prototype.hue=function(r){var t=c(this.rgba);return"number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)},S=[],k=function(r){r.forEach(function(r){S.indexOf(r)<0&&(r(j,y),S.push(r))})},E=function(){return new j({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};


/***/ }),

/***/ "./node_modules/colord/plugins/names.mjs":
/*!***********************************************!*\
  !*** ./node_modules/colord/plugins/names.mjs ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e,f){var a={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var d in a)r[a[d]]=d;var l={};e.prototype.toName=function(f){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var d,i,n=r[this.toHex()];if(n)return n;if(null==f?void 0:f.closest){var o=this.toRgb(),t=1/0,b="black";if(!l.length)for(var c in a)l[c]=new e(a[c]).toRgb();for(var g in a){var u=(d=o,i=l[g],Math.pow(d.r-i.r,2)+Math.pow(d.g-i.g,2)+Math.pow(d.b-i.b,2));u<t&&(t=u,b=g)}return b}};f.string.push([function(f){var r=f.toLowerCase(),d="transparent"===r?"#0000":a[r];return d?new e(d).toRgb():null},"name"])}


/***/ }),

/***/ "./src/section/block.json":
/*!********************************!*\
  !*** ./src/section/block.json ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"tzm/section","title":"Section","category":"design","description":"Display your content in a section block - great for eye-catching headers and sections.","textdomain":"tzm-section-block","attributes":{"url":{"type":"string"},"useFeaturedImage":{"type":"boolean","default":false},"id":{"type":"number"},"alt":{"type":"string","source":"attribute","selector":"img","attribute":"alt","default":""},"parallaxMode":{"type":"string"},"isRepeated":{"type":"boolean","default":false},"dimRatio":{"type":"number","default":10},"overlayColor":{"type":"string"},"customOverlayColor":{"type":"string"},"backgroundType":{"type":"string","default":"image"},"focalPoint":{"type":"object"},"minHeight":{"type":"number"},"minHeightUnit":{"type":"string"},"minHeightSelector":{"type":"string"},"gradient":{"type":"string"},"customGradient":{"type":"string"},"verticalAlignment":{"type":"string"},"isDark":{"type":"boolean","default":true},"dividerTop":{"type":"object","default":{"shape":"","flipped":false,"color":"#ffffff"}},"dividerBottom":{"type":"object","default":{"shape":"","flipped":false,"color":"#ffffff"}},"dividerHeight":{"type":"number","default":10},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}},"usesContext":["postId","postType"],"supports":{"anchor":true,"align":["wide","full"],"html":false,"spacing":{"padding":true,"margin":["top","bottom"]},"color":{"__experimentalDuotone":"> .wp-block-tzm-section__image-background, > .wp-block-tzm-section__video-background","text":false,"background":false}},"editorScript":"tzm-section-block-editor","script":"tzm-section-block","editorStyle":"tzm-section-block-editor","style":"tzm-section-block"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tzm-section": 0,
/******/ 			"./style-tzm-section": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktzm_section_block"] = self["webpackChunktzm_section_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-tzm-section"], function() { return __webpack_require__("./src/tzm-section.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=tzm-section.js.map