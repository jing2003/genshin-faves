const characterDetail = document.querySelector("#character-detail");

const pathParts = window.location.pathname.split("/");
const characterId = pathParts[pathParts.length - 1];

const getCharacter = async () => {
  try {
    const response = await fetch("/characters");
    const characters = await response.json();

    const character = characters.find((item) => item.id === characterId);

    if (!character) {
      characterDetail.innerHTML = `
        <h1>Character Not Found</h1>
        <p>Sorry, this character does not exist in the list.</p>
        <a href="/" role="button">Back to Home</a>
      `;
      return;
    }

    characterDetail.innerHTML = `
      <article class="detail-card">
        <div class="detail-image-container">
          <img 
            src="${character.image}" 
            alt="${character.name}" 
            class="detail-image"
          />
        </div>

        <div class="detail-info">
          <h1>${character.name}</h1>

          <p class="detail-description">${character.description}</p>

          <div class="detail-grid">
            <p><strong>Element:</strong> ${character.element}</p>
            <p><strong>Weapon:</strong> ${character.weapon}</p>
            <p><strong>Region:</strong> ${character.region}</p>
            <p><strong>Rarity:</strong> ${character.rarity}</p>
            <p><strong>Role:</strong> ${character.role}</p>
          </div>

          <a href="/" role="button">Back to Home</a>
        </div>
      </article>
    `;
  } catch (error) {
    console.error(error);

    characterDetail.innerHTML = `
      <h1>Error</h1>
      <p>Something went wrong while loading this character.</p>
      <a href="/" role="button">Back to Home</a>
    `;
  }
};

getCharacter();
