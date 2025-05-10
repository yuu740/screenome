fetch("./js/json/member.json")
  .then((response) => response.json())
  .then((teamData) => {
    const container = document.getElementById("teamContainer");
    teamData.forEach((member) => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="member-info">
              <strong>${member.name}</strong>
              <div>${member.npm}</div>
              <div>${member.roles}</div>
              <div>|| ${member.note}</div>
            </div>
          `;
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading team data:", error));
