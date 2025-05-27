window.addEventListener("load", function() {
    const maxCellDim = 20;
    let cellSize;
    let mapSize;
    
    /**
     * Handles grid size calculation based on screen size for ensuring proper formatting
     * during resizes of the web page.
     *
     * @returns {void} This function does not return a value.
     */
    function calculateGridSize() {
        const screenSize = Math.min(window.innerWidth, window.innerHeight) * 0.6;
        cellSize = Math.floor(screenSize / maxCellDim);
        mapSize = Math.floor(screenSize / cellSize);
    }
    
    calculateGridSize();
    window.addEventListener("resize", () => {
        calculateGridSize();
        location.reload();
    });
     
    const gridMap = document.getElementById("map-environment");
    let snake = [{ x: Math.floor(mapSize / 2), y: Math.floor(mapSize / 2) }];
    let food = { x: 5, y: 5 };
    let direction = { x: 0, y: 0 };

    let snakeScore = 1;
    let roundNum = 1;
    let snakeSpeed = 150;
    let gameInterval;
    let isGameOver = false;

    let username = sessionStorage.getItem("username");
    let userage = sessionStorage.getItem("userage");
    let snakeColor = sessionStorage.getItem("snakeColor");
    let foodColor = sessionStorage.getItem("foodColor");

    let gameTitle = document.getElementById("title");
    gameTitle.style.color = snakeColor;

    document.querySelectorAll(".game-map").forEach(element => {
        element.style.borderColor = snakeColor;
    });

    let displayName = document.getElementById("displayname");
    let displayAge = document.getElementById("displayage");
    let displayScore = document.getElementById("displayscore");

    displayName.innerHTML = "Name: " + username;
    displayAge.innerHTML = "Age: " + userage;
    displayScore.innerHTML = "Snake Length: " + snakeScore;

    displayName.style.color = foodColor;
    displayAge.style.color = foodColor;
    displayScore.style.color = foodColor;

    let nameResult = document.getElementById("finalplayername");
    let ageResult = document.getElementById("finalplayerage");
    let roundResult = document.getElementById("finalgameround");
    let scoreResult = document.getElementById("finalgamescore");
    let gameOverScreen = document.getElementById("gameover-screen");
    let winScreen = document.getElementById("win-screen");
    let roundScreen = document.getElementById("round-screen");
    let roundMessage = document.getElementById("round-message");

    // Handles color change for interaction with the mobile control buttons.
    let mobileButtons = document.querySelectorAll(".control-button");
    mobileButtons.forEach(element => {
        element.style.backgroundColor = snakeColor;
        const changeColor = () => element.style.backgroundColor = foodColor;
        const resetColor = () => element.style.backgroundColor = snakeColor;

        element.addEventListener("mousedown", changeColor);
        element.addEventListener("mouseup", resetColor);
        element.addEventListener("mouseleave", resetColor);

        element.addEventListener("touchstart", changeColor);
        element.addEventListener("touchend", resetColor);
        element.addEventListener("touchcancel", resetColor);
    });

    gridMap.style.gridTemplateColumns = `repeat(${mapSize}, ${cellSize}px)`;
    gridMap.style.gridTemplateRows = `repeat(${mapSize}, ${cellSize}px)`;

    /**
     * Handles the generation of the CSS grid map for the game by add cells of equal 
     * size to an n x n grid until the specified dimensions are filled with squares.
     *
     * @returns {void} This function does not return a value.
     */
    function createMap() {
        gridMap.innerHTML = "";
        for (let i = 0; i < mapSize * mapSize; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            gridMap.appendChild(cell);
        }
    }

    /**
     * Handles the core game logic during every update cycle by continuously moving
     * the snake, rendering the environment, and checking for win condition. Also,
     * checks for game over condition.
     * 
     * @returns {void} This function does not return a value.
     */
    function updateGame() {
        if (isGameOver) return;
        moveSnake();
        if (checkCollision()) {
            showGameOver();
        }
        render();
        checkWin();
    }

    /**
     * Handles snake movement and food consumption by checking if the snake head 
     * collides with food to grow the snake and shifting the segments into the 
     * current direction if not.
     *
     * @returns {void} This function does not return a value.
     */
    function moveSnake() {
        let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            spawnFood();
            increaseSpeed();

            snakeScore++;
            displayScore.innerHTML = "Snake Length: " + snakeScore;
        } else {
            snake.pop();
            snake.unshift(head);
        }
    }

    /**
     * Handles collision detection between snake and its environment borders by 
     * checking if the head of the snake is moving outside of the map borders OR
     * colliding with a member of its own body segment.
     *
     * @returns {Boolean} This function returns true or false.
     */
    function checkCollision() {
        let head = snake[0];
        return (
            head.x < 0 || head.x >= mapSize || 
            head.y < 0 || head.y >= mapSize || 
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    /**
     * Handles collision detection between snake and its environment borders by 
     * checking if the head of the snake is moving outside of the map borders OR
     * colliding with a member of its own body segment.
     *
     * @returns {Boolean} This function returns true or false.
     */
    function render() {
        createMap();
        const cells = document.querySelectorAll(".cell");
        snake.forEach(segment => {
            let index = segment.y * mapSize + segment.x;
            if (index >= 0 && index < cells.length) {
                cells[index].classList.add("snake");
                cells[index].style.backgroundColor = snakeColor; 
            }
        });
        let foodIndex = food.y * mapSize + food.x;
        cells[foodIndex].classList.add("food");
        cells[foodIndex].style.backgroundColor = foodColor; // Apply user color
    }

    /**
     * Handles the change in the speed and round number in game logic by checking
     * if the snake has enough length to fill a dimension of the map, increasing speed,
     * and showing the round message.
     *
     * @returns {void} This function does not return a value.
     */
    function increaseSpeed() {
        if (gameInterval) {
            clearInterval(gameInterval);
        };

        if (snake.length % maxCellDim === 0) {
            roundNum++;
            snakeSpeed = Math.max(snakeSpeed - 5, 80);
            showRoundMessage();
        }

        gameInterval = setInterval(updateGame, snakeSpeed);
    }

    /**
     * Handles the announcement of game round changes to the user by updating the
     * round number and displaying the round number message for 3 seconds.
     * 
     * @returns {void} This function does not return a value.
     */
    function showRoundMessage() {
        clearInterval(gameInterval);
        roundScreen.style.display = "block";
        roundMessage.innerHTML = ("ROUND " + roundNum);

        setTimeout(() => {
            roundScreen.style.display = "none";
        }, 3000);
    }

    /**
     * Handles the game over logic by displaying the game over screen with the
     * user's results and exiting the execution.
     * 
     * @returns {void} This function does not return a value.
     */
    function showGameOver() {
        gameOverScreen.style.display = "block";
        nameResult.innerHTML = ("Name: " + username);
        ageResult.innerHTML = ("Age: " + userage); 
        roundResult.innerHTML = ("Round: " + roundNum)
        scoreResult.innerHTML = ("Snake Length: " + snakeScore);

        isGameOver = true;
        return;
    }

    /**
     * Handles the random generation of food throughout the grid map by randomizing
     * its x and y position on the map.
     *
     * @returns {void} This function does not return a value.
     */
    function spawnFood() {
        food = {
            x: Math.floor(Math.random() * mapSize),
            y: Math.floor(Math.random() * mapSize),
        };
    }

    /**
     * Handles the win condition logic by checking if the snake's length fills
     * up the entire map and displaying a win screen with the user's results.
     * 
     * @returns {void} This function does not return a value.
     */
    function checkWin() {
        if (snake.length === mapSize * mapSize) {
            clearInterval(gameInterval);
            winScreen.style.display = "block";
            nameResult.innerHTML = ("Name: " + username);
            ageResult.innerHTML = ("Age: " + userage); 
            roundResult.innerHTML = ("Round: " + roundNum)
            scoreResult.innerHTML = ("Snake Length: " + snakeScore);
            
            isGameOver = true;
        }
    }

    // Handles PC keyboard controls for movement
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
        if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
        if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
        if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
    });

    // Handles mobile button controls for movement
    document.getElementById("up").addEventListener("click", () => {
        if (direction.y === 0) direction = { x: 0, y: -1 };
    });
    document.getElementById("down").addEventListener("click", () => {
        if (direction.y === 0) direction = { x: 0, y: 1 };
    });
    document.getElementById("left").addEventListener("click", () => {
        if (direction.x === 0) direction = { x: -1, y: 0 };
    });
    document.getElementById("right").addEventListener("click", () => {
        if (direction.x === 0) direction = { x: 1, y: 0 };
    });

    // Handles the display of the user help screen based on button clicks.
    let gameHelp = document.getElementById("instructions");
    document.getElementById("open-helpbutton").addEventListener("click", function() {
        if (gameHelp.style.display === "none" && !isGameOver) {
            gameHelp.style.display = "block";
        } else {
            gameHelp.style.display = "none";
        }
    });

    document.getElementById("close-helpbutton").addEventListener("click", function() {
        let gameHelp = document.getElementById("instructions");
        if (gameHelp.style.display === "block") {
            gameHelp.style.display = "none";
        }
    });

    // Handles main menu redirection for "Main Menu" and "Try Again".
    document.getElementById("menubutton").addEventListener("click", function() {
        window.location.href = "../index.html";
    });

    document.querySelectorAll(".retrybutton").forEach(element => {
        element.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    });

    /**
     * Handles the initiation of the game by starting round 1, creating the map,
     * spawing food, and rendering the environment.
     *
     * @returns {void} This function does not return a value.
     */
    function startGame() {
        round = 1;
        showRoundMessage();
        createMap();
        spawnFood();
        render();
        gameInterval = setInterval(updateGame, snakeSpeed);
    }

    startGame();
})