/**
 * Gets the values of the user's input from the introduction form and saves it in 
 * session storage before redirecting the user to the game page.
 *
 * @returns {void} This function does not return a value.
 */
window.addEventListener("load", function () {
    document.getElementById("user-info-sheet").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents page refresh

        let username = document.getElementById("nameInput").value;
        let userage = document.getElementById("ageInput").value;
        let snakeColor = document.getElementById("favColor1").value;
        let foodColor = document.getElementById("favColor2").value;

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userage", userage);
        sessionStorage.setItem("snakeColor", snakeColor);
        sessionStorage.setItem("foodColor", foodColor);

        window.location.href = "game/snakegame.html";
    })
})