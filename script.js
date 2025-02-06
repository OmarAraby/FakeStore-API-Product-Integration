/// api ; https://fakestoreapi.com/products

// fetching products

let url = fetch("https://fakestoreapi.com/products"); // will return promise
console.log(url);
let products = [];
let filteredProducts = [];

url
  .then(function (response) {
    if (!response.ok) {
      throw "something wrong with url";
    }
    console.log(response);
    // console.log(response.json());

    return response.json();
  })
  .then(function (data) {
    console.log(data);
    products = data;
    filteredProducts = products;
    const myContainer = document.getElementById("myContainer");
    const catDiv = document.getElementById("categories");
    if (products.length > 0) {
      const cat = [...new Set(products.map((product) => product.category))];
      cat.forEach((category) => {
        const catOpt = `<option value="${category}">${category}</option> `;
        catDiv.innerHTML += catOpt;
      });
      displayProducts(filteredProducts);

      document
        .getElementById("categories")
        .addEventListener("change", selectedCat);
      document
        .getElementById("sorting")
        .addEventListener("change", sortByPrice);

      document.getElementById("search").addEventListener("input", search);
    }
  })
  .catch(function (e) {
    console.log(e);
  });

function displayProducts(products) {
  const container = document.getElementById("myContainer");
  container.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productCard = `
        <div class="col">
            <div class="card h-100">
                <img src="${
                  product.image
                }" class="card-img-top product-image" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text description">${product.description.substring(
                      0,
                      70
                    )}...</p>
                    <p class="card-text price"><strong>Price: $${
                      product.price
                    }</strong></p>
                    <p class="card-text category"><small class="text-muted">Category: ${
                      product.category
                    }</small></p>
                    <button class="btn btn-dark w-100">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += productCard;
  });
}

function selectedCat(e) {
  const selectedCategory = e.target.value;
  //   let filterRes;
  if (selectedCategory == "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }
  displayProducts(filteredProducts);
}

function sortByPrice(e) {
  const sortOrder = e.target.value;
  let sortedProducts;

  if (sortOrder === "low-to-high") {
    sortedProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    sortedProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
  } else {
    sortedProducts = filteredProducts;
  }

  displayProducts(sortedProducts);
}

function search(e) {
  const query = e.target.value.toLowerCase();

  const searchRes = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(query);
  });
  displayProducts(searchRes);
}
