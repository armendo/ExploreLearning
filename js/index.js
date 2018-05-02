/**
 * Task:
 *  > Responsive layout:
 *      - more than 1000px: show 6 columns
 *      - 500px-999px: show 4 columns
 *      - below 500px: show 2 columns
 *  > Long/hold press icon for drag to reorder.
 *  > Use png's for icons, 80px x 80px.
 *      - Icons should be retina ready
 *  > Extra Credit: Add a CSS only wallpaper design.
 */

var sourceId; //Variable that stores the sourceId
function handleDragStart(event) {
    sourceId = extractIdFromEvent(event);
}

function handleDragover(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();

    let targetId = extractIdFromEvent(event);
    swapElements(sourceId, targetId, 'img');
    swapElements(sourceId, targetId, 'caption');
    swapElements(sourceId, targetId, 'figure');
}

document.addEventListener('DOMContentLoaded', function() {
    if (isRetinaDisplay()) {
        changeImagesToRetina(); // Updating the images to retina images if the device supports it.
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                 HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Helper function that swaps images, captions and figures.
 * @param {Number} sourceId
 * @param {Number} targetId
 * @param {String} element name of the element to be swapped
 */
function swapElements(sourceId, targetId, element) {
    if (targetId !== sourceId) {
        if (element === 'img') {
            let sourceImageId = `img${sourceId}`;
            let targetImageId = `img${targetId}`;

            swapAttribute(sourceImageId, targetImageId, 'src');
            swapId(sourceImageId, targetImageId);
        } else if (element === 'caption') {
            let sourceCaptionId = `caption${sourceId}`;
            let targetCaptionId = `caption${targetId}`;

            swapAttribute(sourceCaptionId, targetCaptionId, 'innerHTML');
            swapId(sourceCaptionId, targetCaptionId);
        } else if (element === 'figure') {
            let sourceFigureId = `figure${sourceId}`;
            let targetFigureId = `figure${targetId}`;

            swapId(sourceFigureId, targetFigureId);
        }
    }
}

/**
 * Swaps ids of an html element
 * @param {String} sourceId
 * @param {String} targetId
 */
function swapId(sourceId, targetId) {
    document.getElementById(sourceId).id = 'tmp';
    document.getElementById(targetId).id = sourceId;
    document.getElementById('tmp').id = targetId;
}

/**
 * Swaps attributes of an html element
 * @param {String} sourceId
 * @param {String} targetId
 * @param {String} attributeToBeSwaped
 */
function swapAttribute(sourceId, targetId, attributeToBeSwaped) {
    let sourceProperty = document.getElementById(sourceId)[attributeToBeSwaped];
    let targetProperty = document.getElementById(targetId)[attributeToBeSwaped];

    document.getElementById(sourceId)[attributeToBeSwaped] = targetProperty;
    document.getElementById(targetId)[attributeToBeSwaped] = sourceProperty;
}

/**
 * Extracts the id from the event.
 * @param {Event}
 */
function extractIdFromEvent(str) {
    return event.target.id.match(/\d+/)[0];
}

/**
 * Finds if the the user is using a retina device.
 * Source:
 * https://stackoverflow.com/questions/19689715/what-is-the-best-way-to-detect-retina-support-on-a-device-using-javascript
 */
function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia(
            `only screen and (min--moz-device-pixel-ratio: 1.3), 
            only screen and (-o-min-device-pixel-ratio: 2.6/2), 
            only screen and (-webkit-min-device-pixel-ratio: 1.3), 
            only screen  and (min-device-pixel-ratio: 1.3), 
            only screen and (min-resolution: 1.3dppx)`
        );
        return (mq && mq.matches) || window.devicePixelRatio > 1;
    }
}

/**
 * Appends a modifier to all img tags. The modifier is used to differentiate
 * retina images from non retina images.
 */
function changeImagesToRetina() {
    const RETINA_MODIFIER = '@2x.png';

    if (isRetinaDisplay()) {
        let elements = document.getElementsByTagName('img');
        for (let element of elements) {
            if (element.src.endsWith('.png')) {
                element.src = element.src.slice(0, -4) + RETINA_MODIFIER;
            }
        }
    }
}
