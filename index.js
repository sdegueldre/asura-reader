const input = document.querySelector("input");
const container = document.querySelector(".img-container");
input.addEventListener("change", displayChapter);

async function findNext() {
    for(let i = 0; i < 10; i++) {
        input.value = +input.value + 1;
        const img = document.createElement("img");
        img.src = `https://gg.asuracomic.net/storage/media/${+input.value}/conversions/01-optimized.webp`;
        container.append(img);
        const loaded = await new Promise((resolve) => {
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", () => resolve(false));
            setTimeout(() => resolve(false), 1000);
        });
        img.remove();
        if (loaded) {
            return true;
        }
    }
}

async function displayChapter() {
    for (const img of document.querySelectorAll("img")) img.remove();
    if (!input.value) return;
    for(let i = 0; i < 30; i++) {
        const img = document.createElement("img");
        const imgNb = String(i + 1).padStart(2, "0");
        img.src = `https://gg.asuracomic.net/storage/media/${+input.value}/conversions/${imgNb}-optimized.webp`;
        container.append(img);
        const loaded = await new Promise((resolve) => {
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", () => resolve(false));
            setTimeout(() => resolve(false), 1000);
        });
        if (!loaded) {
            img.remove();
            if (i === 0 && await findNext()) {
                i--;
                continue;
            }
            break;
        }
        input.value = +input.value + 1;
    }
}