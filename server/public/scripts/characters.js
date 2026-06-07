const renderCharacters = async () => {
  const response = await fetch("/characters");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");

  mainContent.innerHTML = "";

  const pageTitle = document.createElement("section");
  pageTitle.className = "page-title";

  const title = document.createElement("h2");
  title.textContent = "Favorite Genshin Impact Characters";

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Browse my favorite Genshin Impact characters and click each card to learn more.";

  pageTitle.appendChild(title);
  pageTitle.appendChild(subtitle);
  mainContent.appendChild(pageTitle);

  const cardContainer = document.createElement("section");
  cardContainer.className = "card-container";

  if (data && data.length > 0) {
    data.map((character) => {
      const card = document.createElement("div");
      card.className = "card";

      const topContainer = document.createElement("div");
      topContainer.className = "top-container";
      topContainer.style.backgroundImage = `url(${character.image})`;

      const bottomContainer = document.createElement("div");
      bottomContainer.className = "bottom-container";

      const name = document.createElement("h3");
      name.textContent = character.name;

      const element = document.createElement("p");
      element.textContent = `Element: ${character.element}`;

      const region = document.createElement("p");
      region.textContent = `Region: ${character.region}`;

      const role = document.createElement("p");
      role.textContent = `Role: ${character.role}`;

      const readMore = document.createElement("a");
      readMore.textContent = "Read More >";
      readMore.href = `/characters/${character.id}`;
      readMore.role = "button";

      bottomContainer.appendChild(name);
      bottomContainer.appendChild(element);
      bottomContainer.appendChild(region);
      bottomContainer.appendChild(role);
      bottomContainer.appendChild(readMore);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);

      cardContainer.appendChild(card);
    });
  } else {
    const noCharacters = document.createElement("h2");
    noCharacters.textContent = "No Characters Available 😞";
    cardContainer.appendChild(noCharacters);
  }

  mainContent.appendChild(cardContainer);
};

renderCharacters();
