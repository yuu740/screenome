document.addEventListener("DOMContentLoaded", function () {
  const basePath = window.location.hostname.includes("github.io")
    ? "/screenome"
    : "";
  fetch("./js/json/member.json")
    .then((response) => response.json())
    .then((teamData) => {
      const container = document.getElementById("teamContainer");
      teamData.forEach((member, index) => {
        const card = document.createElement("div");
        card.className = "member-card";
        // card.style.animationDelay = `${index * 0.2}s`;
        card.style.setProperty("--index", index);
        const imagePath = `${basePath}${member.image}`;
        card.innerHTML = `
          <img src="${imagePath}" alt="${member.name}">
          <div class="member-info">
            <strong>${member.name}</strong>
            <div>> NIM : ${member.nim}</div>
            <div>> Role : ${member.roles}</div>
            <div>> Peran : ${member.note}</div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading team data:", error));
});
