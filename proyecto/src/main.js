 // ==============================
    // ELEMENTOS DEL DOM
    // ==============================

    const video = document.getElementById("video");

    const startButton =
        document.getElementById("startButton");

    const scanButton =
        document.getElementById("scanButton");

    const retryButton =
        document.getElementById("retryButton");

    const statusText =
        document.getElementById("status");

    const cameraContainer =
        document.getElementById("cameraContainer");

    const placeholder =
        document.getElementById("placeholder");

    const result =
        document.getElementById("result");

    let cameraStream = null;


    // ==============================
    // ACTIVAR CÁMARA
    // ==============================

    async function startCamera() {

        try {

            statusText.textContent =
                "Solicitando acceso a la cámara...";

            startButton.disabled = true;

            cameraStream =
                await navigator.mediaDevices.getUserMedia({

                    video: {
                        facingMode: "user",
                        width: {
                            ideal: 720
                        },
                        height: {
                            ideal: 1280
                        }
                    },

                    audio: false

                });

            video.srcObject = cameraStream;

            video.style.display = "block";

            placeholder.style.display = "none";

            await video.play();

            startButton.style.display = "none";

            scanButton.style.display = "block";

            statusText.textContent =
                "Cámara activada. ¡Prepárate!";

        } catch (error) {

            console.error(error);

            statusText.textContent =
                "No se pudo activar la cámara. Revisa los permisos.";

            startButton.disabled = false;

        }

    }


    // ==============================
    // ANALIZAR AURA
    // ==============================

    async function analyzeAura() {

        if (!cameraStream) {
            return;
        }

        scanButton.disabled = true;

        cameraContainer.classList.add("scanning");

        result.style.display = "none";

        statusText.textContent =
            "Analizando energía espiritual...";

        // Simulación de análisis

        await new Promise(resolve =>
            setTimeout(resolve, 2500)
        );

        const auraScore =
            Math.floor(Math.random() * 1001);

        showResult(auraScore);

        cameraContainer.classList.remove("scanning");

        scanButton.disabled = false;

        statusText.textContent =
            "¡Análisis completado!";

    }


    // ==============================
    // MOSTRAR RESULTADO
    // ==============================

    function showResult(score) {

        document.getElementById("score")
            .textContent = score;

        let rank;
        let description;

        if (score < 150) {

            rank = "💀 NPC DETECTADO";

            description =
                "Tu aura está en modo ahorro de energía. " +
                "Ni el protagonista te reconoce.";

        } else if (score < 350) {

            rank = "🥱 AURA DE PRINCIPIANTE";

            description =
                "Tienes potencial, pero necesitas " +
                "subir de nivel en la vida.";

        } else if (score < 600) {

            rank = "😎 AURA RESPETABLE";

            description =
                "Tienes presencia. Cuando entras " +
                "a un lugar, alguien te nota.";

        } else if (score < 850) {

            rank = "🔥 AURA SIGMA";

            description =
                "Tu energía está por encima del promedio. " +
                "El respeto es automático.";

        } else {

            rank = "👑 LEYENDA ABSOLUTA";

            description =
                "Tu aura es tan poderosa que " +
                "el universo necesita reiniciarse.";

        }

        document.getElementById("rank")
            .textContent = rank;

        document.getElementById("resultDescription")
            .textContent = description;

        result.style.display = "block";

    }


    // ==============================
    // REINICIAR ESCANEO
    // ==============================

    function retryScan() {

        result.style.display = "none";

        statusText.textContent =
            "¡Vamos por una mejor aura!";

        scanButton.style.display = "block";

    }


    // ==============================
    // EVENTOS
    // ==============================

    startButton.addEventListener(
        "click",
        startCamera
    );

    scanButton.addEventListener(
        "click",
        analyzeAura
    );

    retryButton.addEventListener(
        "click",
        retryScan
    );


    // ==============================
    // LIBERAR CÁMARA
    // ==============================

    function stopCamera() {

        if (cameraStream) {

            cameraStream.getTracks().forEach(track => {
                track.stop();
            });

            cameraStream = null;

        }

    }

    window.addEventListener(
        "pagehide",
        stopCamera
    );
