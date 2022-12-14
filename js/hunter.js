const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phone, dataLimit) => {
  console.log(phone);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const noFound = document.getElementById("phone-not-found");

  if (phone.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  }

  const showAll = document.getElementById("show-all");
  if (dataLimit && phone.length > 5) {
    phone = phone.slice(0, 5);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  phone.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card h-100">
                <img src="${phone.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#phoneDetailsModal">Detainls</button>

                    
                </div>
              </div>
    `;
    phoneContainer.appendChild(phoneDiv);
    // end loder
  });
  toggoleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggoleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadPhones(searchValue, dataLimit);
};

document.getElementById("search-btn").addEventListener("click", function () {
  processSearch(5);
  searchField.value = "";
});

//seach after press enter key : add evet hendler to input field

document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
      processSearch(5);
    }
  });

const toggoleSpinner = (isLoding) => {
  const spinner = document.getElementById("loder");
  if (isLoding === true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
document.getElementById("show-all-btn").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (phoneSlug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneInf(data.data);
};

const displayPhoneInf = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = `${phone.name}`;
  const phoneDetails = document.getElementById("modal-info");
  phoneDetails.innerHTML = `
  <img src="${phone.image}">
  <p>Brand:${phone.brand}</p>
  <p>Reles date:${phone.releaseDate}</p>
  <p>Storage: ${phone.mainFeatures.memory}</p>
  <p>Chipset: ${phone.mainFeatures.chipSet}</p>
  <p>Chipset: ${phone.mainFeatures.sensors}</p>
  `;
};

loadPhones("apple");
