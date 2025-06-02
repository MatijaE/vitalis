/* 
* VITALIS - JavaScript funkcionalnosti (skrajšana verzija)
* Avtor: [Vaše ime]
* Verzija: 1.1
*/

// Osnovne funkcionalnosti - se naložijo takoj
$(document).ready(function() {
    // Navigacija se zmanjša ob drsenju
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Gladko drsenje za povezave
    $('a[href*="#"]').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
            return false;
        }
    });

    // Gumb nazaj na vrh
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    $('#back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
    });

    // Animacija števcev
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});

// Funkcionalnosti za stran voda.html
document.addEventListener('DOMContentLoaded', function() {
    
    // Sledenje pitju vode
    const glassCount = document.getElementById('glass-count');
    const waterProgress = document.getElementById('water-progress');
    const addGlassBtn = document.getElementById('add-glass');
    const resetWaterBtn = document.getElementById('reset-water');

    let glasses = 0;
    const goal = 8; // 8 kozarcev na dan

    // Ustvari kapljice v ozadju
    function createDroplets() {
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;overflow:hidden';
        
        for (let i = 0; i < 30; i++) {
            const drop = document.createElement('div');
            drop.className = 'water-droplet';
            drop.style.cssText = `
                left:${Math.random() * 100}%;
                width:${Math.random() * 8 + 4}px;
                height:${Math.random() * 15 + 8}px;
                animation-duration:${Math.random() * 8 + 4}s;
                animation-delay:${Math.random() * 3}s;
                opacity:${Math.random() * 0.6 + 0.4}
            `;
            container.appendChild(drop);
        }
        document.body.appendChild(container);
    }

    if (document.getElementById('add-glass')) {
        createDroplets();
        
        // Dodaj kozarec
        addGlassBtn.addEventListener('click', function() {
            if (glasses < goal) {
                glasses++;
                glassCount.textContent = glasses;
                waterProgress.style.width = `${(glasses / goal) * 100}%`;
            }
        });

        // Ponastavi števec
        resetWaterBtn.addEventListener('click', function() {
            glasses = 0;
            glassCount.textContent = glasses;
            waterProgress.style.width = '0%';
        });
    }

    // Dihalni vodič
    const canvas = document.getElementById('breathingCircle');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startBreathing');
        const stopBtn = document.getElementById('stopBreathing');
        const phaseText = document.getElementById('breathingPhase');
        
        let radius = 50;
        let growing = true;
        let phase = 'vdih';
        let cycles = 0;
        let isActive = false;

        // Nariši krog
        function drawCircle() {
            ctx.clearRect(0, 0, 400, 400);
            
            // Gradient
            const grad = ctx.createRadialGradient(200, 200, 0, 200, 200, radius);
            grad.addColorStop(0, 'rgba(27, 94, 32, 0.8)');
            grad.addColorStop(1, 'rgba(139, 195, 74, 0.3)');
            
            ctx.beginPath();
            ctx.arc(200, 200, radius, 0, 2 * Math.PI);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = '#1b5e20';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Besedilo
            ctx.fillStyle = '#1b5e20';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(phase.toUpperCase(), 200, 205);
        }

        // Animacija
        function animate() {
            if (growing) {
                radius += 0.3;
                if (radius >= 120) {
                    growing = false;
                    phase = 'izdih';
                    phaseText.textContent = 'Izdih - sproščeno';
                }
            } else {
                radius -= 0.2;
                if (radius <= 50) {
                    growing = true;
                    phase = 'vdih';
                    phaseText.textContent = 'Vdih - globoko';
                    cycles++;
                }
            }

            drawCircle();
            
            if (isActive) {
                requestAnimationFrame(animate);
            }
        }
        
        startBtn.addEventListener('click', function() {
            isActive = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            cycles = 0;
            animate();
        });
        
        stopBtn.addEventListener('click', function() {
            isActive = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            phaseText.textContent = `Končano - Ciklov: ${cycles}`;
            radius = 50;
            phase = 'vdih';
            drawCircle();
        });
        
        drawCircle();
    }

    // Nasvet dneva
    if (document.getElementById('daily-tip-container')) {
        loadTip();
        document.getElementById('refresh-tip').addEventListener('click', loadTip);
    }
});

// Naloži nasvet dneva
function loadTip() {
    const container = document.getElementById('daily-tip-container');
    const btn = document.getElementById('refresh-tip');
    
    container.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Nalagam...</div>';
    btn.style.display = 'none';
    
    setTimeout(() => {
        const tips = [
            {tip: "Popijte kozarec vode takoj, ko se zbudite.", author: "Dr. Ana Novak"},
            {tip: "Naredite 10-minutni sprehod po vsakem obroku.", author: "Prof. Marko Zdravnik"},
            {tip: "Vadite globoko dihanje 5 minut dnevno.", author: "Mag. Petra Misel"},
            {tip: "Jejte počasi in premišljeno.", author: "Dr. Janez Prehrana"},
            {tip: "Spite vsaj 7-8 ur kakovostnega spanca.", author: "Prof. Marija Spanec"},
            {tip: "Izogibajte se ekranom pred spanjem.", author: "Dr. Luka Svetloba"},
            {tip: "Jejte pisano sadje in zelenjavo.", author: "Mag. Nina Barve"}
        ];
        
        const tip = tips[Math.floor(Math.random() * tips.length)];
        
        container.innerHTML = `
            <h4><i class="fas fa-lightbulb text-warning"></i> Nasvet dneva</h4>
            <blockquote class="blockquote">
                <p>"${tip.tip}"</p>
                <footer><cite>${tip.author}</cite></footer>
            </blockquote>
        `;
        
        btn.style.display = 'block';
    }, 1000);
}

// Dropdown meni z zakasnitev
document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector(".dropdown-menu");
        let timer;

        const showMenu = () => {
            clearTimeout(timer);
            menu.classList.add("show");
        };

        const hideMenu = () => {
            timer = setTimeout(() => {
                menu.classList.remove("show");
            }, 1000); // 1.5 sekunde
        };

        dropdown.addEventListener("mouseenter", showMenu);
        dropdown.addEventListener("mouseleave", hideMenu);

        menu.addEventListener("mouseenter", showMenu);
        menu.addEventListener("mouseleave", hideMenu);
    });
});

// meditacija za meditacijski timer
let timerInterval;
        let totalSeconds = 300; // 5 minut
        let currentSeconds = totalSeconds;
        let isRunning = false;

        function setTimer(minutes) {
            totalSeconds = minutes * 60;
            currentSeconds = totalSeconds;
            updateDisplay();
            
            // Posodobi aktivni gumb
            document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        function updateDisplay() {
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            document.getElementById('timer-display').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                document.getElementById('start-timer').style.display = 'none';
                document.getElementById('pause-timer').style.display = 'inline-block';
                
                timerInterval = setInterval(() => {
                    currentSeconds--;
                    updateDisplay();
                    
                    if (currentSeconds <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        document.getElementById('start-timer').style.display = 'inline-block';
                        document.getElementById('pause-timer').style.display = 'none';
                        alert('Čas za meditacijo je potekel! 🧘‍♀️');
                        resetTimer();
                    }
                }, 1000);
            }
        }

        function pauseTimer() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                document.getElementById('start-timer').style.display = 'inline-block';
                document.getElementById('pause-timer').style.display = 'none';
            }
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            currentSeconds = totalSeconds;
            updateDisplay();
            document.getElementById('start-timer').style.display = 'inline-block';
            document.getElementById('pause-timer').style.display = 'none';
        }

        // Inicializacija
        updateDisplay();

// Dodatne JS funkcije za interaktivne vaje mozgani.html
        function toggleMemoryTest() {
            const test = document.getElementById('memoryTest');
            test.style.display = test.style.display === 'none' ? 'block' : 'none';
        }
        
        function checkMath() {
            const answers = [75, 67, 92, 12];
            const inputs = document.querySelectorAll('input[type="number"]');
            let correct = 0;
            
            inputs.forEach((input, index) => {
                if (parseInt(input.value) === answers[index]) {
                    input.style.backgroundColor = '#d4edda';
                    correct++;
                } else {
                    input.style.backgroundColor = '#f8d7da';
                }
            });
            
            alert(`Pravilnih odgovorov: ${correct}/4`);
        }