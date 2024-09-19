








//todo sistema de sorteio e animação dos numeros 

let interval;

function atualizarNumero() {
    const numero = Math.floor(Math.random() * 100000);
    document.getElementById('result').textContent = numero.toString().padStart(5, '0');
}

function sortearNumero() {
    clearInterval(interval);
    const numero = Math.floor(Math.random() * 100000);
    document.getElementById('result').textContent = numero.toString().padStart(5, '0');
    scheduleNextDraw(); // Schedule the next draw after this one
}

function getNextDrawDate() {
    const now = new Date();
    const nextDraw = new Date(now);

    nextDraw.setHours(19, 30, 0, 0); // Set to 19:30:00

    // Get the current day of the week (0-6)
    const dayOfWeek = now.getDay();

    // Calculate days to next Wednesday or Saturday
    if (dayOfWeek < 3) { // If today is Sunday (0) to Tuesday (2)
        nextDraw.setDate(now.getDate() + (3 - dayOfWeek)); // Next Wednesday
    } else if (dayOfWeek === 3 && now.getHours() < 19 || (now.getHours() === 19 && now.getMinutes() < 30)) {
        nextDraw.setDate(now.getDate()); // Today if it's Wednesday before 19:30
    } else if (dayOfWeek < 6) { // If today is Thursday (4) to Friday (5)
        nextDraw.setDate(now.getDate() + (6 - dayOfWeek)); // Next Saturday
    } else if (dayOfWeek === 6 && now.getHours() < 19 || (now.getHours() === 19 && now.getMinutes() < 30)) {
        nextDraw.setDate(now.getDate()); // Today if it's Saturday before 19:30
    } else { // If today is after 19:30 on Wednesday/Saturday or Sunday (0)
        nextDraw.setDate(now.getDate() + ((10 - dayOfWeek) % 7)); // Next Wednesday or Saturday
    }

    return nextDraw;
}

function scheduleNextDraw() {
    const nextDrawDate = getNextDrawDate();
    const now = new Date();

    const timeUntilNextDraw = nextDrawDate.getTime() - now.getTime();

    setTimeout(() => {
        sortearNumero();
    }, timeUntilNextDraw);
}

// Start updating the number continuously
interval = setInterval(atualizarNumero, 50); // Update every 50 milliseconds

// Schedule the first draw
scheduleNextDraw();