// Confetti Function
function playAudio() {
    const audio = document.getElementById('audioPlayer');
    audio.play();
}

function pauseAudio() {
    const audio = document.getElementById('audioPlayer');
    audio.pause();
}

function stopAudio() {
    const audio = document.getElementById('audioPlayer');
    audio.pause();
    audio.currentTime = 0;
}
function playSong(src) {
    const audio = document.getElementById('audioPlayer');
    audio.src = src;
    audio.play();
}

let confettiAnimation; // Variable to hold animation reference
let particles = [];
const confettiCount = 200; // Increase particles for better effect

function startConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 8 + 4, // Larger particles
            speedX: Math.random() * 2 - 1, // Gentle horizontal speed
            speedY: Math.random() * 3 + 1, // Gentle vertical speed
            color: 'hsla(' + Math.random() * 360 + ', 70%, 60%, 0.9)' // Slightly subdued color
        };
    }

    // Initialize particles
    particles = [];
    for (let i = 0; i < confettiCount; i++) {
        particles.push(createParticle());
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size *= 0.99; // Slow shrinking
            if (particle.size < 0.5) {
                particle.size = 0; // Prevent negative size
            }
        });
    }

    function animateConfetti() {
        drawConfetti();
        confettiAnimation = requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}

// Countdown Timer
function startCountdown() {
    let targetYear = 2024;
    let targetMonth = 7; // 0 = January, 7 = August
    let targetDay = 20;
    let targetHour = 0;// 0 = 12:00 AM
    let targetMinute =0;
    let targetSecond = 0;

    const targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond).getTime();

    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = 
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the countdown is over, show the pop-up, hide the countdown, and trigger confetti
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.popup').style.display = 'flex';
            document.querySelector('#countdown').style.display = 'none';
            startConfetti(); // Trigger confetti when the pop-up appears
        } else {
            document.querySelector('#countdown').style.display = 'block';
        }
    }, 1000);
}

// Stop the confetti and hide the pop-up
document.getElementById('closePopup').addEventListener('click', function () {
    document.querySelector('.popup').style.display = 'none';
    
    document.querySelector('body').style.background='url("images/Collage.jpg") no-repeat center center fixed';
    document.querySelector('body').style.backgroundSize='contain';
    document.querySelector('nav').style.display='block';
    document.querySelector('.birth').style.display='inline-block';
    // Stop the confetti animation
    document.querySelector('.cake').style.display='block';
    document.querySelector('.best').style.display='inline-block';
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
        confettiAnimation = null;
    }
    var canvas = document.getElementById('confetti-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles = []; // Clear particles array
});
startCountdown();

