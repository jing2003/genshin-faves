const mainContent = document.getElementById("main-content");

const createPageTitle = () => {
  const pageTitle = document.createElement("section");
  pageTitle.className = "page-title";

  const title = document.createElement("h2");
  title.textContent = "Favorite Genshin Impact Characters";

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Browse my favorite Genshin Impact characters and click each card to learn more.";

  pageTitle.appendChild(title);
  pageTitle.appendChild(subtitle);

  return pageTitle;
};

const createSearchForm = () => {
  const searchSection = document.createElement("section");
  searchSection.className = "search-section";

  const searchForm = document.createElement("form");
  searchForm.id = "search-form";
  searchForm.className = "search-form";

  const searchTitle = document.createElement("h4");
  searchTitle.textContent = "Filter Characters";
  searchTitle.className = "search-title";

  const searchControls = document.createElement("div");
  searchControls.className = "search-controls";

  const attributeSelect = document.createElement("select");
  attributeSelect.id = "search-attribute";
  attributeSelect.className = "search-select";

  const attributes = ["name", "element", "region", "role"];

  attributes.forEach((attribute) => {
    const option = document.createElement("option");
    option.value = attribute;
    option.textContent = attribute.charAt(0).toUpperCase() + attribute.slice(1);
    attributeSelect.appendChild(option);
  });

  const searchInput = document.createElement("input");
  searchInput.id = "search-value";
  searchInput.className = "search-input";
  searchInput.type = "text";
  searchInput.placeholder = "Try Geo, Liyue, DPS...";

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "search-buttons";

  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.className = "search-button";
  searchButton.textContent = "Search";

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "reset-button";
  resetButton.textContent = "Show All";

  buttonGroup.appendChild(searchButton);
  buttonGroup.appendChild(resetButton);

  searchControls.appendChild(attributeSelect);
  searchControls.appendChild(searchInput);
  searchControls.appendChild(buttonGroup);

  searchForm.appendChild(searchTitle);
  searchForm.appendChild(searchControls);

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const attribute = attributeSelect.value;
    const value = searchInput.value.trim();

    if (!value) {
      await fetchCharacters();
      return;
    }

    await fetchCharacters(attribute, value);
  });

  resetButton.addEventListener("click", async () => {
    searchInput.value = "";
    await fetchCharacters();
  });

  searchSection.appendChild(searchForm);

  return searchSection;
};

const renderCharacterCards = (characters) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  if (characters && characters.length > 0) {
    characters.forEach((character) => {
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
    noCharacters.textContent = "No Characters Found 😞";
    cardContainer.appendChild(noCharacters);
  }
};

const fetchCharacters = async (attribute = "", value = "") => {
  let url = "/api/characters";

  if (attribute && value) {
    const params = new URLSearchParams({
      attribute,
      value,
    });

    url = `/api/characters?${params.toString()}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  renderCharacterCards(data);
};

const renderPage = async () => {
  mainContent.innerHTML = "";

  mainContent.appendChild(createPageTitle());
  mainContent.appendChild(createSearchForm());

  const cardContainer = document.createElement("section");
  cardContainer.id = "card-container";
  cardContainer.className = "card-container";

  mainContent.appendChild(cardContainer);

  await fetchCharacters();
};

renderPage();
