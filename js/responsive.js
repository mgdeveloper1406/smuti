let  icon = document.querySelector("i");
icon.addEventListener( 'click', () => {
    const x = document.querySelector(".navigation");
    if (x.className === "navigation") {
        x.className += " responsive";
    } else {
        x.className = "navigation";
    }
});
