// JavaScript Functionality - Mangali Madhukar Portfolio
document.addEventListener('DOMContentLoaded', () => {
    initCircuitBackground();
    initTypewriter();
    initMobileMenu();
    initActiveNavOnScroll();
    initContactForm();
    initProjectModals();
});
/* ==========================================
   1. Interactive Circuit Canvas Background
   ========================================== */
function initCircuitBackground() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    const nodes = [];
    const maxNodes = Math.min(60, Math.floor((width * height) / 25000));
    
    // Create random electronic nodes
    for (let i = 0; i < maxNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            pulseState: Math.random() * Math.PI
        });
    }
    function drawCircuit() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        // Draw connections (circuit traces)
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 150) {
                    const alpha = (1 - dist / 150) * 0.12;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    
                    // Draw orthogonal L-shaped routing (like circuit board traces)
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    if (Math.abs(nodes[i].x - nodes[j].x) > Math.abs(nodes[i].y - nodes[j].y)) {
                        ctx.lineTo(nodes[j].x, nodes[i].y);
                    } else {
                        ctx.lineTo(nodes[i].x, nodes[j].y);
                    }
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        // Draw nodes (components)
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            // Bounce off boundaries
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
            node.pulseState += 0.02;
            const pulseRadius = node.radius + Math.sin(node.pulseState) * 1.5;
            // Outer glow ring
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.08)';
            ctx.fill();
            // Inner core node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.radius > 2 ? '#fbbf24' : '#00f2fe'; // Amber or Teal nodes
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow
        });
        requestAnimationFrame(drawCircuit);
    }
    drawCircuit();
}
/* ==========================================
   2. Typewriter Effect (Hero Section)
   ========================================== */
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;
    const phrases = [
        'Electrical & Electronics Engineer',
        'Power Electronics Enthusiast',
        'MATLAB / Simulink Developer',
        'Substation Operations Intern',
        'Quick Learner & Innovator'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        // State control
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next word
        }
        setTimeout(type, typingSpeed);
    }
    type();
}
/* ==========================================
   3. Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });
    // Close menu when clicking link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });
}
/* ==========================================
   4. Intersection Observer for Active Nav Section
   ========================================== */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    const options = {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);
    sections.forEach(section => observer.observe(section));
}
/* ==========================================
   5. Interactive Contact Form Submission
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    
    if (!form || !feedback) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        // Simulate form sending
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            feedback.textContent = '⚡ Message successfully sent! Thank you for contacting me, I will get back to you shortly.';
            feedback.className = 'form-feedback success';
            form.reset();
            // Clear notice after 5 seconds
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 6000);
        }, 1800);
    });
}
/* ==========================================
   6. Projects Detailed Modal and Simulations
   ========================================== */
// Static details data for projects
const projectDetails = {
    'solar-inverter': {
        title: 'Solar Inverter Topology Simulation',
        category: 'Hardware & Numerical Simulation',
        tech: ['DC-AC Inverter', 'Pulse Width Modulation', 'Solar PV Model', 'Simulink'],
        desc: `
            <p>This project involved modeling and verifying a complete solar inverter topology. Solar panels produce Direct Current (DC), but residential grids operate on Alternating Current (AC). An inverter bridges this gap.</p>
            <p><strong>Key details:</strong></p>
            <ul>
                <li>Simulated switching characteristics of IGBT/MOSFET switches to synthesize standard 50Hz sine waves.</li>
                <li>Implemented Sinusoidal Pulse Width Modulation (SPWM) switching schemes to filter harmonics.</li>
                <li>Evaluated dynamic performance in MATLAB/Simulink under fluctuating DC input values.</li>
            </ul>
        `,
        simType: 'solar-inverter'
    },
    'tank-water': {
        title: 'Water Tank Level PID & Fuzzy Control',
        category: 'Advanced Control Systems',
        tech: ['MATLAB', 'Simulink', 'Fuzzy Logic Controller', 'PID Controller', 'Feedback Loops'],
        desc: `
            <p>A benchmark project comparing conventional PID controllers against Artificial Intelligence-driven Fuzzy Logic systems to control non-linear liquid processes.</p>
            <p><strong>Key details:</strong></p>
            <ul>
                <li>Designed the dynamic mathematical model of a liquid tank system with inlet valves and drain configurations.</li>
                <li>Tuned proportional, integral, and derivative (PID) parameters for set-point tracking.</li>
                <li>Created a Fuzzy inference rule engine (Mamdan type) mapping water levels and valve openings.</li>
                <li>Discovered Fuzzy logic significantly reduces overshoot and handles turbulent load changes more smoothly.</li>
            </ul>
        `,
        simType: 'tank-water'
    },
    'boost-converter': {
        title: 'High-Efficiency DC-DC Boost Converter',
        category: 'Power Electronics',
        tech: ['DC-DC Converter', 'MOSFET Switching', 'Inductor Design', 'Simulink Simscape'],
        desc: `
            <p>Designed a power electronic step-up converter that boosts low voltage (e.g. 12V battery power) to a higher constant output voltage (e.g. 24V or 48V) for power systems.</p>
            <p><strong>Key details:</strong></p>
            <ul>
                <li>Calculated optimal inductance and capacitance values to satisfy continuous conduction mode (CCM).</li>
                <li>Simulated pulse generators operating at high switching frequencies (20kHz+) to minimize ripple currents.</li>
                <li>Implemented closed-loop voltage feedback loops to preserve steady output regulation under varying loads.</li>
            </ul>
        `,
        simType: 'boost-converter'
    },
    'mppt-charge': {
        title: 'Solar MPPT Charge Controller for Lead Acid Battery',
        category: 'Renewable Systems & Storage',
        tech: ['MPPT Algorithms', 'Battery Charging Profiles', 'DC-DC Buck', 'State of Charge (SoC)'],
        desc: `
            <p>Designed an electronic charger device implementing MPPT to maximize solar generation while implementing standard bulk/float charging algorithms for lead-acid energy cells.</p>
            <p><strong>Key details:</strong></p>
            <ul>
                <li>Utilized standard solar array models in Simulink with variable temperature and solar irradiance inputs.</li>
                <li>Simulated three-stage charge processes (Bulk, Absorption, and Float states) based on battery state-of-charge (SoC).</li>
                <li>Guarded batteries from overvoltage, thermal runaway, and reverse grid currents.</li>
            </ul>
        `,
        simType: 'mppt-charge'
    },
    'pv-grid': {
        title: 'Photovoltaic Grid Connected System Using P&O MPPT',
        category: 'Grid Integration & Clean Energy',
        tech: ['Perturb & Observe', 'Grid Synchronization', 'Phase Locked Loop (PLL)', 'LCL Filter'],
        desc: `
            <p>This simulation integrates a solar PV plant model directly with a single-phase utility electrical grid. Synchronizing high-frequency inverter outputs with steady grid signals requires high precision.</p>
            <p><strong>Key details:</strong></p>
            <ul>
                <li>Programmed the Perturb & Observe (P&O) MPPT algorithm in Simulink, continuously adjusting current-voltage ratios to operate PV cells at maximum capacity.</li>
                <li>Employed Phase Locked Loop (PLL) techniques to match grid utility frequency (50Hz) and phase angle.</li>
                <li>Integrated LCL ripple filters to suppress inverter switching harmonics, maintaining clean power injections.</li>
            </ul>
        `,
        simType: 'pv-grid'
    }
};
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const overlay = modal ? modal.querySelector('.modal-overlay') : null;
    
    if (!modal || !closeBtn || !overlay) return;
    // Simulation variables
    let simInterval = null;
    let simCanvas = document.getElementById('simCanvas');
    let simCtx = simCanvas.getContext('2d');
    let simTriggerBtn = document.getElementById('btnSimTrigger');
    let simDataBox = document.getElementById('simData');
    let simPlaceholder = modal.querySelector('.sim-placeholder');
    let currentSimType = '';
    let isSimRunning = false;
    let simTime = 0;
    // Open Modal Action
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectDetails[projectId];
            if (!data) return;
            // Populate text content
            document.getElementById('modalTitle').textContent = data.title;
            modal.querySelector('.modal-category').textContent = data.category;
            document.getElementById('modalDesc').innerHTML = data.desc;
            // Tech Tags
            const techBox = document.getElementById('modalTech');
            techBox.innerHTML = '';
            data.tech.forEach(t => {
                const tag = document.createElement('span');
                tag.textContent = t;
                techBox.appendChild(tag);
            });
            // Set up Simulation context
            currentSimType = data.simType;
            resetSimulation();
            // Open Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    // Close Modal Action
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetSimulation();
    }
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    // Escape Key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    // Trigger Simulation
    simTriggerBtn.addEventListener('click', () => {
        if (isSimRunning) {
            stopSimulation();
        } else {
            startSimulation();
        }
    });
    function resetSimulation() {
        stopSimulation();
        isSimRunning = false;
        simTime = 0;
        simPlaceholder.style.display = 'block';
        simCanvas.style.display = 'none';
        simTriggerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Simulation';
        simTriggerBtn.classList.remove('running');
        simDataBox.textContent = 'System status: Idle. Awaiting MATLAB Simulink execution trigger.';
        
        // Clear canvas
        simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
    }
    function startSimulation() {
        isSimRunning = true;
        simPlaceholder.style.display = 'none';
        simCanvas.style.display = 'block';
        simTriggerBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Simulation';
        simTriggerBtn.classList.add('running');
        
        simCanvas.width = simCanvas.offsetWidth;
        simCanvas.height = simCanvas.offsetHeight;
        simInterval = setInterval(runSimulationFrame, 30);
    }
    function stopSimulation() {
        if (simInterval) {
            clearInterval(simInterval);
            simInterval = null;
        }
        isSimRunning = false;
        simTriggerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Simulation';
        simTriggerBtn.classList.remove('running');
    }
    /* Simulation calculations and plotting */
    function runSimulationFrame() {
        simTime += 0.05;
        const w = simCanvas.width;
        const h = simCanvas.height;
        simCtx.fillStyle = '#060a12';
        simCtx.fillRect(0, 0, w, h);
        // Draw basic coordinate grid
        simCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        simCtx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
            simCtx.beginPath();
            simCtx.moveTo(x, 0);
            simCtx.lineTo(x, h);
            simCtx.stroke();
        }
        for (let y = 0; y < h; y += 40) {
            simCtx.beginPath();
            simCtx.moveTo(0, y);
            simCtx.lineTo(w, y);
            simCtx.stroke();
        }
        // Draw simulation based on type
        if (currentSimType === 'solar-inverter') {
            // Draw Inverter SPWM simulation
            // Draw DC input line (top) and AC output sine wave (center)
            simCtx.strokeStyle = '#fbbf24'; // DC Orange/Yellow
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            simCtx.moveTo(0, h * 0.25);
            simCtx.lineTo(w, h * 0.25);
            simCtx.stroke();
            // AC Output (Sine Wave)
            simCtx.strokeStyle = '#00f2fe'; // Teal AC
            simCtx.lineWidth = 3;
            simCtx.beginPath();
            for (let x = 0; x < w; x++) {
                const sineVal = Math.sin((x / 40) - simTime * 2);
                const y = h * 0.65 + sineVal * (h * 0.25);
                if (x === 0) simCtx.moveTo(x, y);
                else simCtx.lineTo(x, y);
            }
            simCtx.stroke();
            // SPWM Switching pulses at bottom
            simCtx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            simCtx.lineWidth = 1;
            simCtx.beginPath();
            for (let x = 0; x < w; x += 4) {
                // Approximate SPWM pulses based on sine magnitude
                const sineFactor = Math.abs(Math.sin((x / 40) - simTime * 2));
                const pulseHeight = sineFactor * (h * 0.08);
                simCtx.moveTo(x, h * 0.95);
                simCtx.lineTo(x, h * 0.95 - pulseHeight);
            }
            simCtx.stroke();
            // Output data status
            const currentV = (230 + Math.sin(simTime * 5) * 2).toFixed(1);
            const currentFreq = (50.0 + Math.sin(simTime * 3) * 0.05).toFixed(2);
            simDataBox.textContent = `SIM DATA: V_out = ${currentV}V RMS | Freq = ${currentFreq}Hz | Harmonic Distortion (THD) = 1.84% (Filtered)`;
        } else if (currentSimType === 'tank-water') {
            // Animating Tank Filling & PID graph
            const setpoint = 120; // setpoint height
            // Calculate height using simulated PID transfer function (damped oscillation)
            // PID response: step input with slight overshoot and stabilization
            let currentLevel = setpoint;
            if (simTime < 10) {
                currentLevel = setpoint * (1 - Math.exp(-simTime * 0.5) * Math.cos(simTime * 1.5));
            }
            // Draw tank structure
            const tankW = 100;
            const tankH = 140;
            const tankX = 40;
            const tankY = h / 2 - tankH / 2;
            // Draw water inside tank
            const fillHeight = (currentLevel / 150) * tankH;
            simCtx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            simCtx.fillRect(tankX, tankY + tankH - fillHeight, tankW, fillHeight);
            // Draw Tank borders
            simCtx.strokeStyle = '#fff';
            simCtx.lineWidth = 3;
            simCtx.beginPath();
            simCtx.moveTo(tankX, tankY);
            simCtx.lineTo(tankX, tankY + tankH);
            simCtx.lineTo(tankX + tankW, tankY + tankH);
            simCtx.lineTo(tankX + tankW, tankY);
            simCtx.stroke();
            // Draw Setpoint dotted line
            simCtx.strokeStyle = '#fbbf24';
            simCtx.lineWidth = 1;
            simCtx.setLineDash([5, 5]);
            simCtx.beginPath();
            simCtx.moveTo(tankX - 10, tankY + tankH - (setpoint / 150) * tankH);
            simCtx.lineTo(tankX + tankW + 10, tankY + tankH - (setpoint / 150) * tankH);
            simCtx.stroke();
            simCtx.setLineDash([]); // reset
            // Label Setpoint
            simCtx.fillStyle = '#fbbf24';
            simCtx.font = '9px monospace';
            simCtx.fillText('SP', tankX - 25, tankY + tankH - (setpoint / 150) * tankH + 3);
            // Draw Real-time PID graph on the right side
            const graphX = 180;
            const graphW = w - graphX - 20;
            simCtx.strokeStyle = '#94a3b8';
            simCtx.lineWidth = 1;
            simCtx.beginPath();
            simCtx.moveTo(graphX, tankY);
            simCtx.lineTo(graphX, tankY + tankH);
            simCtx.lineTo(graphX + graphW, tankY + tankH);
            simCtx.stroke();
            // Graph Setpoint line
            simCtx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
            simCtx.beginPath();
            simCtx.moveTo(graphX, tankY + tankH - (setpoint / 150) * tankH);
            simCtx.lineTo(graphX + graphW, tankY + tankH - (setpoint / 150) * tankH);
            simCtx.stroke();
            // Graph PID Trace
            simCtx.strokeStyle = '#00f2fe';
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            for (let i = 0; i < graphW; i++) {
                const tVal = (simTime - (graphW - i) * 0.05);
                if (tVal < 0) continue;
                const level = setpoint * (1 - Math.exp(-tVal * 0.5) * Math.cos(tVal * 1.5));
                const y = tankY + tankH - (level / 150) * tankH;
                if (i === 0 || tVal === 0) simCtx.moveTo(graphX + i, y);
                else simCtx.lineTo(graphX + i, y);
            }
            simCtx.stroke();
            // Status data
            const err = (setpoint - currentLevel).toFixed(2);
            simDataBox.textContent = `SIM DATA: Level = ${currentLevel.toFixed(1)} cm | Setpoint = ${setpoint} cm | Valve Error = ${err} cm (PID Active)`;
        } else if (currentSimType === 'boost-converter') {
            // Boost Converter voltage boost graph
            const vIn = 12.0;
            const vOutTarget = 24.0;
            // Simulated charging boost curve
            let vOut = vIn;
            if (simTime < 8) {
                vOut = vIn + (vOutTarget - vIn) * (1 - Math.exp(-simTime * 0.8));
            } else {
                // Steady-state ripples
                vOut = vOutTarget + Math.sin(simTime * 25) * 0.08;
            }
            // Draw components
            simCtx.fillStyle = '#fff';
            simCtx.font = '10px monospace';
            simCtx.fillText(`V_in: ${vIn.toFixed(1)}V`, 20, h * 0.25);
            simCtx.fillText(`V_out: ${vOut.toFixed(2)}V`, w - 100, h * 0.25);
            // Draw a circuit representation in the middle
            simCtx.strokeStyle = '#38bdf8';
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            // In -> Inductor -> Diode -> Out
            simCtx.moveTo(20, h * 0.4);
            simCtx.lineTo(60, h * 0.4);
            // Inductor coil representation
            for (let cx = 60; cx < 100; cx += 5) {
                simCtx.arc(cx + 2.5, h * 0.4, 4, Math.PI, 0, false);
            }
            simCtx.moveTo(105, h * 0.4);
            // Diode arrow
            simCtx.lineTo(140, h * 0.4);
            simCtx.lineTo(140, h * 0.35);
            simCtx.lineTo(150, h * 0.4);
            simCtx.lineTo(140, h * 0.45);
            simCtx.lineTo(140, h * 0.4);
            simCtx.moveTo(150, h * 0.4);
            simCtx.lineTo(200, h * 0.4);
            simCtx.stroke();
            // Capacitor & Switch lines
            simCtx.strokeStyle = '#94a3b8';
            simCtx.beginPath();
            // Switch (MOSFET) line going down
            simCtx.moveTo(115, h * 0.4);
            simCtx.lineTo(115, h * 0.55);
            // Toggle switch animation
            const duty = 0.5; // 50%
            const isSwitchClosed = Math.sin(simTime * 50) > 0;
            if (isSwitchClosed) {
                simCtx.lineTo(115, h * 0.65);
                simCtx.fillStyle = '#00f2fe';
                simCtx.fillRect(112, h * 0.54, 6, 6);
            } else {
                simCtx.lineTo(125, h * 0.62);
            }
            simCtx.moveTo(115, h * 0.65);
            simCtx.lineTo(115, h * 0.7);
            simCtx.lineTo(20, h * 0.7);
            simCtx.moveTo(115, h * 0.7);
            simCtx.lineTo(200, h * 0.7);
            // Ground terminal
            simCtx.moveTo(115, h * 0.7);
            simCtx.lineTo(115, h * 0.75);
            simCtx.moveTo(105, h * 0.75);
            simCtx.lineTo(125, h * 0.75);
            simCtx.stroke();
            // Plot V_out vs time curve on right
            const startX = 220;
            const plotW = w - startX - 20;
            simCtx.strokeStyle = '#94a3b8';
            simCtx.lineWidth = 1;
            simCtx.beginPath();
            simCtx.moveTo(startX, h * 0.25);
            simCtx.lineTo(startX, h * 0.85);
            simCtx.lineTo(startX + plotW, h * 0.85);
            simCtx.stroke();
            simCtx.strokeStyle = '#fbbf24';
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            for (let i = 0; i < plotW; i++) {
                const tVal = (simTime - (plotW - i) * 0.05);
                if (tVal < 0) continue;
                let v = vIn;
                if (tVal < 8) {
                    v = vIn + (vOutTarget - vIn) * (1 - Math.exp(-tVal * 0.8));
                } else {
                    v = vOutTarget + Math.sin(tVal * 25) * 0.08;
                }
                const py = h * 0.85 - (v / 30) * (h * 0.55);
                if (i === 0 || tVal === 0) simCtx.moveTo(startX + i, py);
                else simCtx.lineTo(startX + i, py);
            }
            simCtx.stroke();
            // Status display
            simDataBox.textContent = `SIM DATA: Duty Cycle (D) = 50.0% | V_in = 12.0V | V_out = ${vOut.toFixed(2)}V | Ripple = 0.33%`;
        } else if (currentSimType === 'mppt-charge') {
            // PV curve and tracking dot
            // P-V Curve formula: P = V * I, where I = I_sc - I_o * (exp(q*V/k*T) - 1)
            // Simplified PV Curve shape: parabola bending downwards on the right.
            const graphX = 60;
            const graphY = h * 0.15;
            const graphW = w - 120;
            const graphH = h * 0.65;
            // Draw axis
            simCtx.strokeStyle = '#94a3b8';
            simCtx.lineWidth = 1;
            simCtx.beginPath();
            simCtx.moveTo(graphX, graphY);
            simCtx.lineTo(graphX, graphY + graphH);
            simCtx.lineTo(graphX + graphW, graphY + graphH);
            simCtx.stroke();
            // Axis labels
            simCtx.fillStyle = '#fff';
            simCtx.font = '10px monospace';
            simCtx.fillText('Power (W)', graphX - 10, graphY - 10);
            simCtx.fillText('Voltage (V)', graphX + graphW - 20, graphY + graphH + 15);
            // Draw P-V Curve
            simCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            const peakX = graphX + graphW * 0.68;
            const peakY = graphY + graphH * 0.2; // Maximum power peak point
            for (let cx = graphX; cx <= graphX + graphW; cx++) {
                const normX = (cx - graphX) / graphW;
                // Power approximation curve
                const normY = 1.8 * normX - 1.5 * Math.pow(normX, 3);
                const py = graphY + graphH - (normY * graphH * 0.8);
                if (cx === graphX) simCtx.moveTo(cx, py);
                else simCtx.lineTo(cx, py);
            }
            simCtx.stroke();
            // Track animation towards peak
            // The tracker dot starts low and climbs, then oscillates around MPP
            let trackX = graphX;
            let trackingDone = false;
            
            if (simTime < 6) {
                // Tracking climb phase
                trackX = graphX + (peakX - graphX) * (simTime / 6);
            } else {
                // Oscillating around MPP (P&O algorithm behavior)
                const cycle = Math.sin(simTime * 8);
                trackX = peakX + cycle * 12;
                trackingDone = true;
            }
            const trackNormX = (trackX - graphX) / graphW;
            const trackNormY = 1.8 * trackNormX - 1.5 * Math.pow(trackNormX, 3);
            const trackY = graphY + graphH - (trackNormY * graphH * 0.8);
            // Draw MPP Peak Point Target
            simCtx.strokeStyle = '#fbbf24';
            simCtx.setLineDash([3, 3]);
            simCtx.beginPath();
            simCtx.moveTo(peakX, graphY);
            simCtx.lineTo(peakX, graphY + graphH);
            simCtx.stroke();
            simCtx.setLineDash([]);
            simCtx.fillStyle = '#fbbf24';
            simCtx.fillText('MPP Peak', peakX - 25, graphY - 5);
            // Draw Tracker Dot (P&O algorithm dot)
            simCtx.fillStyle = '#00f2fe';
            simCtx.beginPath();
            simCtx.arc(trackX, trackY, 7, 0, Math.PI * 2);
            simCtx.shadowColor = '#00f2fe';
            simCtx.shadowBlur = 10;
            simCtx.fill();
            simCtx.shadowBlur = 0; // reset
            // Status message
            const watts = (trackNormY * 250).toFixed(1);
            const volts = (trackNormX * 36).toFixed(1);
            const status = trackingDone ? 'MPP Locked (Oscillating)' : 'Searching Peak...';
            simDataBox.textContent = `P&O MPPT: State = ${status} | PV Voltage = ${volts}V | Output Power = ${watts}W / 250W Max`;
        } else if (currentSimType === 'pv-grid') {
            // PV Grid Synchronization Phase Matching
            // Two sine waves: Grid voltage (fixed reference) & Inverter voltage (approaching synchronization)
            const refSineColor = 'rgba(251, 191, 36, 0.4)'; // Grid (Yellow-dim)
            const syncSineColor = '#00f2fe'; // Inverter (Teal-bright)
            // Calculate current phase diff
            // Phase diff starts off at Math.PI, then decreases to 0 (locked)
            let phaseDiff = Math.PI;
            if (simTime < 8) {
                phaseDiff = Math.PI * Math.exp(-simTime * 0.4);
            } else {
                phaseDiff = 0.0;
            }
            // Draw Grid Voltage (Reference)
            simCtx.strokeStyle = refSineColor;
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            for (let x = 0; x < w; x++) {
                const y = h * 0.5 + Math.sin((x / 30) - simTime * 2.5) * (h * 0.3);
                if (x === 0) simCtx.moveTo(x, y);
                else simCtx.lineTo(x, y);
            }
            simCtx.stroke();
            // Draw Inverter Voltage
            simCtx.strokeStyle = syncSineColor;
            simCtx.lineWidth = phaseDiff === 0 ? 3 : 2;
            simCtx.beginPath();
            for (let x = 0; x < w; x++) {
                // Wave shifts phase based on phaseDiff calculations
                const y = h * 0.5 + Math.sin((x / 30) - simTime * 2.5 + phaseDiff) * (h * 0.3);
                if (x === 0) simCtx.moveTo(x, y);
                else simCtx.lineTo(x, y);
            }
            simCtx.stroke();
            // Sync indicators
            if (phaseDiff === 0) {
                simCtx.fillStyle = 'rgba(0, 242, 254, 0.15)';
                simCtx.fillRect(0, 0, w, h);
                simCtx.fillStyle = '#00f2fe';
                simCtx.font = 'bold 12px var(--font-heading)';
                simCtx.fillText('PHASE LOCK SYNCHRONIZED', w / 2 - 80, h * 0.15);
            }
            const phaseDeg = ((phaseDiff * 180) / Math.PI).toFixed(1);
            const status = phaseDiff === 0 ? 'GRID LOCKED' : 'SYNC IN PROGRESS';
            simDataBox.textContent = `PLL SYNC: Status = ${status} | Phase Difference = ${phaseDeg}° | Freq = 50.00 Hz | Power Evacuation Enabled = ${phaseDiff === 0 ? 'YES' : 'NO'}`;
        }
    }
}

