let visibleCount = 6;
let data = [];

async function loadAchievements() {
    try {
        const response = await fetch('achievements.json');
        data = await response.json();
        loadTimeline();
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function loadTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    data.slice(0, visibleCount).forEach((entry) => {
        const div = document.createElement("div");
        div.classList.add("entry");
        div.innerHTML = `<h3>${entry.date}</h3>
                        <h4>${entry.name}</h4>
                        <p>${entry.description} <a href="${entry.link}">More</a></p>`;
        timeline.appendChild(div);
    });
}

document.getElementById("loadMore").addEventListener("click", () => {
    visibleCount += 5;
    if (visibleCount >= data.length) {
        document.getElementById("loadMore").style.display = "none";
    }
    loadTimeline();
    document.getElementById("timeline-container").scrollTop = document.getElementById("timeline-container").scrollHeight;
});

document.addEventListener("DOMContentLoaded", loadAchievements);
