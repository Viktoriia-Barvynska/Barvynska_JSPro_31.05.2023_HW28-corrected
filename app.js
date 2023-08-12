const contentDiv = document.getElementById("content");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");
const charactersBtn = document.getElementById("charactersBtn");
const planetsBtn = document.getElementById("planetsBtn");
const vehiclesBtn = document.getElementById("vehiclesBtn");

const baseUrl = "https://swapi.dev/api/";

function fetchData(url) {
  return fetch(url).then(response => response.json());
}

function displayData(data, itemNameProperty) {
    contentDiv.innerHTML = "";
    data.results.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      const detailsBtn = document.createElement("button");
      detailsBtn.textContent = "Details";
      detailsBtn.addEventListener("click", () => openModal(item, itemNameProperty));
      itemDiv.textContent = item[itemNameProperty];
      itemDiv.appendChild(detailsBtn);
      contentDiv.appendChild(itemDiv);
    });
  }

  function openModal(item, itemNameProperty) {
    modal.style.display = "block";
    let detailsHtml = `<h2>${item[itemNameProperty]}</h2>`;
    
    if (itemNameProperty === "name") {
      detailsHtml += `
        <p>Height: ${item.height}</p>
        <p>Mass: ${item.mass}</p>
        <p>Hair Color: ${item.hair_color}</p>
      `;
    } else if (itemNameProperty === "model") { // якщо обраний розділ "Транспорт"
      detailsHtml += `
        <p>Model: ${item.model}</p>
        <p>Manufacturer: ${item.manufacturer}</p>
      `;
    } else if (itemNameProperty === "climate") { // якщо обраний розділ "Планети"
      detailsHtml += `
        <p>Climate: ${item.climate}</p>
        <p>Population: ${item.population}</p>
      `;
    }
  
    modalContent.innerHTML = detailsHtml;
  }

function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
}

closeModalBtn.addEventListener("click", closeModal);

charactersBtn.addEventListener("click", () => {
    fetchData(baseUrl + "people/")
      .then(data => displayData(data, "name"));
  });
  
  planetsBtn.addEventListener("click", () => {
    fetchData(baseUrl + "planets/")
      .then(data => displayData(data, "climate"));
  });
  
  vehiclesBtn.addEventListener("click", () => {
    fetchData(baseUrl + "vehicles/")
      .then(data => displayData(data, "model"));
  });
