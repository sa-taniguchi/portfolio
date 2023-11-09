{

const boxes = document.querySelectorAll(".skill_info_box");

const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0
};

const observer = new IntersectionObserver(doWhenIntersect, options);
boxes.forEach(box => {
    observer.observe(box);
});


function doWhenIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateIndex(entry.target);
        }
    });
}

    function activateIndex(element) {
    const currentActiveIndex = document.querySelector("#indexList .is-active");
    if (currentActiveIndex !== null) {
        currentActiveIndex.classList.remove("is-active");
    }
    const newActiveIndex = document.querySelector(`#indexList a[href*='#${element.id}']`);
    newActiveIndex.classList.add("is-active");
    }


    const topFvList = document.querySelectorAll('.top-fv_list li');

    topFvList.forEach(element =>{
        element.classList.add('is-load');
    });
}