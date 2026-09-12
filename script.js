// =========================================================
// DATAPD - MAIN JAVASCRIPT
// =========================================================


// =========================================================
// 1. NAVBAR DROPDOWN
// =========================================================

const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');


// اگر Dropdown وجود داشت
if (dropdown && dropdownToggle) {

    // باز و بسته کردن منوی خدمات
    dropdownToggle.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        dropdown.classList.toggle('open');

    });


    // =====================================================
    // SUBMENU
    // =====================================================

    const submenuItems = document.querySelectorAll(
        '.dropdown-item.has-submenu'
    );


    submenuItems.forEach(function (item) {

        const link = item.querySelector(':scope > a');

        if (!link) return;


        link.addEventListener('click', function (event) {

            event.preventDefault();
            event.stopPropagation();


            // اگر همین زیرمنو باز است
            if (item.classList.contains('open')) {

                item.classList.remove('open');

            }

            // اگر بسته است
            else {

                // بستن سایر زیرمنوها
                submenuItems.forEach(function (otherItem) {

                    otherItem.classList.remove('open');

                });


                // باز کردن همین زیرمنو
                item.classList.add('open');

            }

        });

    });


    // =====================================================
    // CLICK OUTSIDE DROPDOWN
    // =====================================================

    document.addEventListener('click', function (event) {

        if (!dropdown.contains(event.target)) {

            dropdown.classList.remove('open');

            submenuItems.forEach(function (item) {

                item.classList.remove('open');

            });

        }

    });

}



// =========================================================
// 2. HERO MOUSE ELECTRIC SPARK
// =========================================================

const hero = document.querySelector('.hero');


if (hero) {

    let lastSparkTime = 0;


    hero.addEventListener('mousemove', function (event) {

        const now = Date.now();


        // کنترل تعداد جرقه‌ها
        if (now - lastSparkTime < 35) {

            return;

        }


        lastSparkTime = now;


        // =================================================
        // مختصات موس نسبت به Hero
        // =================================================

        const rect =
            hero.getBoundingClientRect();


        const spread = 35;


        const x =
            event.clientX -
            rect.left +
            (Math.random() - 0.5) * spread;


        const y =
            event.clientY -
            rect.top +
            (Math.random() - 0.5) * spread;


        // =================================================
        // ساخت جرقه
        // =================================================

        const spark =
            document.createElement('span');


        spark.classList.add('hero-spark');


        spark.style.left =
            `${x}px`;


        spark.style.top =
            `${y}px`;


        // زاویه تصادفی
        const angle =
            Math.floor(
                Math.random() * 360
            );


        spark.style.setProperty(
            '--angle',
            `${angle}deg`
        );


        hero.appendChild(spark);


        // =================================================
        // حذف جرقه
        // =================================================

        setTimeout(function () {

            spark.remove();

        }, 650);

    });

}



// =========================================================
// 3. HERO CANVAS - CREATE CANVAS
// =========================================================
//
// چون در HTML فعلی Canvas وجود ندارد،
// اینجا خودمان آن را ایجاد می‌کنیم.
//
// HTML فعلی تو:
// <header class="hero">
//     <div class="hero-background">...</div>
//     <nav>...</nav>
//     <div class="hero-content">...</div>
// </header>
//
// بنابراین Canvas داخل .hero قرار می‌گیرد.
// =========================================================


if (hero) {

    // ساخت Canvas
    const canvas =
        document.createElement('canvas');


    // ID
    canvas.id = 'heroCanvas';


    // قرار دادن Canvas داخل Hero
    hero.insertBefore(
        canvas,
        hero.firstChild
    );


    // Context
    const ctx =
        canvas.getContext('2d');


    if (ctx) {


        // =================================================
        // تنظیمات
        // =================================================

        const settings = {

            nodeCount: 75,

            nodeMinRadius: 0.7,

            nodeMaxRadius: 1.8,

            nodeSpeed: 0.25,

            connectionDistance: 120,

            mouseDistance: 160,

            mouseForce: 0.35

        };


        // =================================================
        // Mouse
        // =================================================

        const mouse = {

            x: -9999,

            y: -9999,

            active: false

        };


        // =================================================
        // Nodes
        // =================================================

        const nodes = [];


        // =================================================
        // Canvas Size
        // =================================================

        let canvasWidth = 0;

        let canvasHeight = 0;


        // =================================================
        // RESIZE
        // =================================================

        function resize() {

            const rect =
                hero.getBoundingClientRect();


            canvasWidth =
                rect.width;


            canvasHeight =
                rect.height;


            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            canvas.width =
                canvasWidth * dpr;


            canvas.height =
                canvasHeight * dpr;


            canvas.style.width =
                `${canvasWidth}px`;


            canvas.style.height =
                `${canvasHeight}px`;


            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );


            // ایجاد Nodeها
            createNodes();

        }



        // =================================================
        // CREATE NODES
        // =================================================

        function createNodes() {

            nodes.length = 0;


            for (
                let i = 0;
                i < settings.nodeCount;
                i++
            ) {

                const radius =
                    settings.nodeMinRadius +
                    Math.random() *
                    (
                        settings.nodeMaxRadius -
                        settings.nodeMinRadius
                    );


                nodes.push({

                    x:
                        Math.random() *
                        canvasWidth,

                    y:
                        Math.random() *
                        canvasHeight,

                    radius:
                        radius,

                    vx:
                        (
                            Math.random() -
                            0.5
                        ) *
                        settings.nodeSpeed,

                    vy:
                        (
                            Math.random() -
                            0.5
                        ) *
                        settings.nodeSpeed

                });

            }

        }



        // =================================================
        // MOUSE MOVE
        // =================================================

        function handleMouseMove(event) {

            const rect =
                canvas.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const inside =

                x >= 0 &&

                y >= 0 &&

                x <= rect.width &&

                y <= rect.height;


            if (inside) {

                mouse.x = x;

                mouse.y = y;

                mouse.active = true;

            }

            else {

                mouse.x = -9999;

                mouse.y = -9999;

                mouse.active = false;

            }

        }



        // =================================================
        // MOUSE LEAVE
        // =================================================

        function handleMouseLeave() {

            mouse.active = false;

            mouse.x = -9999;

            mouse.y = -9999;

        }



        // =================================================
        // UPDATE NODE
        // =================================================

        function updateNode(node) {


            // حرکت معمولی
            node.x += node.vx;

            node.y += node.vy;


            // =================================================
            // واکنش به موس
            // =================================================

            if (mouse.active) {

                const dx =
                    node.x - mouse.x;


                const dy =
                    node.y - mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    settings.mouseDistance
                ) {

                    const safeDistance =
                        Math.max(
                            distance,
                            0.01
                        );


                    const force =
                        (
                            settings.mouseDistance -
                            safeDistance
                        ) /
                        settings.mouseDistance;


                    node.x +=
                        (
                            dx /
                            safeDistance
                        ) *
                        force *
                        settings.mouseForce;


                    node.y +=
                        (
                            dy /
                            safeDistance
                        ) *
                        force *
                        settings.mouseForce;

                }

            }


            // =================================================
            // برخورد با لبه‌های Hero
            // =================================================

            if (
                node.x <= 0 ||
                node.x >= canvasWidth
            ) {

                node.vx *= -1;

            }


            if (
                node.y <= 0 ||
                node.y >= canvasHeight
            ) {

                node.vy *= -1;

            }


            // محدود کردن موقعیت
            node.x =
                Math.max(
                    0,
                    Math.min(
                        canvasWidth,
                        node.x
                    )
                );


            node.y =
                Math.max(
                    0,
                    Math.min(
                        canvasHeight,
                        node.y
                    )
                );

        }



        // =================================================
        // DRAW CONNECTIONS
        // =================================================

        function drawConnections() {

            for (
                let i = 0;
                i < nodes.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < nodes.length;
                    j++
                ) {

                    const nodeA =
                        nodes[i];


                    const nodeB =
                        nodes[j];


                    const dx =
                        nodeA.x -
                        nodeB.x;


                    const dy =
                        nodeA.y -
                        nodeB.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        settings.connectionDistance
                    ) {

                        const opacity =
                            (
                                1 -
                                distance /
                                settings.connectionDistance
                            ) *
                            0.22;


                        ctx.beginPath();


                        ctx.moveTo(
                            nodeA.x,
                            nodeA.y
                        );


                        ctx.lineTo(
                            nodeB.x,
                            nodeB.y
                        );


                        ctx.strokeStyle =
                            `rgba(34, 211, 238, ${opacity})`;


                        ctx.lineWidth =
                            0.7;


                        ctx.stroke();

                    }

                }

            }

        }



        // =================================================
        // DRAW NODES
        // =================================================

        function drawNodes() {

            nodes.forEach(function (node) {

                ctx.beginPath();


                ctx.arc(
                    node.x,
                    node.y,
                    node.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    'rgba(34, 211, 238, 0.6)';


                ctx.fill();

            });

        }



        // =================================================
        // DRAW MOUSE GLOW
        // =================================================

        function drawMouseGlow() {

            if (!mouse.active) {

                return;

            }


            const gradient =
                ctx.createRadialGradient(
                    mouse.x,
                    mouse.y,
                    0,
                    mouse.x,
                    mouse.y,
                    120
                );


            gradient.addColorStop(
                0,
                'rgba(34, 211, 238, 0.08)'
            );


            gradient.addColorStop(
                1,
                'rgba(34, 211, 238, 0)'
            );


            ctx.beginPath();


            ctx.arc(
                mouse.x,
                mouse.y,
                120,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                gradient;


            ctx.fill();

        }



        // =================================================
        // DRAW
        // =================================================

        function draw() {


            // پاک کردن Canvas
            ctx.clearRect(
                0,
                0,
                canvasWidth,
                canvasHeight
            );


            // حرکت Nodeها
            nodes.forEach(
                updateNode
            );


            // خطوط بین Nodeها
            drawConnections();


            // Glow موس
            drawMouseGlow();


            // خود Nodeها
            drawNodes();


            // اجرای فریم بعد
            requestAnimationFrame(
                draw
            );

        }



        // =================================================
        // INITIALIZE
        // =================================================

        resize();


        // اجرای انیمیشن
        requestAnimationFrame(
            draw
        );


        // =================================================
        // EVENTS
        // =================================================

        window.addEventListener(
            'resize',
            resize
        );


        const prefersFinePointer =
            window.matchMedia(
                '(pointer: fine)'
            ).matches;


        if (prefersFinePointer) {

            hero.addEventListener(
                'mousemove',
                handleMouseMove,
                {
                    passive: true
                }
            );


            hero.addEventListener(
                'mouseleave',
                handleMouseLeave
            );

        }

    }

}

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();


        const button =
            newsletterForm.querySelector("button");

        const originalButton =
            button.innerHTML;


        button.disabled = true;

        button.innerHTML = "⌛";


        try {

            const formData =
                new FormData(newsletterForm);


            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",

                        headers: {
                            "Accept":
                                "application/json"
                        },

                        body: formData
                    }
                );


            const result =
                await response.json();


            console.log(
                "Newsletter:",
                result
            );


            if (
                response.ok &&
                result.success
            ) {

                alert(
                    "ایمیل شما با موفقیت ثبت شد."
                );

                newsletterForm.reset();


            } else {

                throw new Error(
                    result.message ||
                    "ارسال ایمیل ناموفق بود."
                );

            }


        } catch(error) {

            console.error(
                "Newsletter Error:",
                error
            );


            alert(
                "ارسال ایمیل انجام نشد. لطفاً دوباره تلاش کنید."
            );


        } finally {

            button.disabled = false;

            button.innerHTML =
                originalButton;

        }

    }
);

