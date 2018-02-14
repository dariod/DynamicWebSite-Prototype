function fitContainerHeightToWindowHeight(element) {
    let bodyStyles=window.getComputedStyle(document.body)
    let height=window.innerHeight
                 - parseFloat(bodyStyles.marginBottom)
                 - parseFloat(bodyStyles.paddingBottom)
                 - element.offsetTop
    element.style.setProperty('height',`${height}px`)
}

document.onreadystatechange = function() {
    // alternative to DOMContentLoaded event
    if (document.readyState === "interactive") {
        console.log("Document reached interactive state");

        let contentElement = document.querySelector('.dynamicContent-container')
        fitContainerHeightToWindowHeight(contentElement)

        // Set up resize event so that the element gets re-fitted when the
        // window gets resized.
        window.addEventListener("resize", resizeThrottler, false);
        var resizeTimeout;
        function resizeThrottler() {
            // ignore resize events as long as an actualResizeHandler execution is in the queue
            if ( !resizeTimeout ) {
              resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();

               // The actualResizeHandler will execute at a rate of 15fps
               }, 66);
            }
        }
        var this_trail=this
        function actualResizeHandler() {
            fitContainerHeightToWindowHeight(contentElement)
        }
    }
};
