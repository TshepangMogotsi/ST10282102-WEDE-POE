document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("read-more-btn");
    const extraStory = document.getElementById("extra-story");

    if (!button || !extraStory) {
        return;
    }

    button.addEventListener("click", function () {

        const showStory = extraStory.hidden;

        extraStory.hidden = !showStory;

        button.textContent = showStory
            ? "Read Less"
            : "Read More";

        button.setAttribute(
            "aria-expanded",
            String(showStory)
        );

    });

});