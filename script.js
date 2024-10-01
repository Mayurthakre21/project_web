//header for every page
fetch('header.html')
  .then(responce => responce.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })

//footer for every page
fetch('footer.html')
  .then(responce => responce.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })

// Fetch the product data from the JSON file
fetch('myntra_fashion_products_free_dataset.json')
  .then(response => response.json())
  .then(products => {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results');
    const productContainer = document.getElementById('product-listt');
    const TrendingproductContainer = document.getElementById('product-list');

    // Function to display products on homepage
    function displayProducts(productsToShow) {
      resultsContainer.innerHTML = '';
      productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
          <img src="${product.images}" alt="${product.name}">
          <div class="brand">${product.brand}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price}</div>
        `;
        //click to direct to the product details page
        productElement.addEventListener('click', () => {
          window.location.href = `
          product-details.html?name=${encodeURIComponent(product.name)}
          &price=${product.price}
          &description=${encodeURIComponent(product.description)}
          &image=${encodeURIComponent(product.images)}
          &brand=${encodeURIComponent(product.brand)}
          &instock=${encodeURIComponent(product.in_stock)}
          `;
        });
        resultsContainer.appendChild(productElement);
      });
    }
        // Function to filter products by category
        function filterProductsByCategory(category) {
          const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(category.toLowerCase()) || 
            product.description.toLowerCase().includes(category.toLowerCase())
          );
          displayProducts(filteredProducts);
        }
    
        // Add event listeners to category elements
        const categoryElements = document.querySelectorAll('.men');
        categoryElements.forEach(categoryElement => {
          categoryElement.addEventListener('click', () => {
            const category = categoryElement.getAttribute('data-category');
            filterProductsByCategory(category);
            lowerheader.style.display = 'none';
            banner.style.display = 'none';
            productDisplay.style.display = 'none';
          });
        });
    

    // Function to search and filter products
    function searchProducts() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
      lowerheader.style.display = 'none';
      banner.style.display='none';
      productDisplay.style.display='none';
    }

    // Event listener for pressing the "Enter" key
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        searchProducts();
      }
    });

    // Event listener for clicking the search button
    searchButton.addEventListener('click', searchProducts);
    
document.getElementById('sign-in-button').addEventListener('click', () => {
  window.location.href = 'login.html'; // Redirect back to the product search page
});

    // display trending offers
    function displaytrending(productList) {
      //const filteredProducts = productList.filter(product => product.price > 1000);
      const limitedProducts = productList.slice(0, 15);  // Limit to 10 products
      limitedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-carddd';
        productItem.innerHTML = `
          <img src="${product.images}" alt="${product.name}">
          <div class="brand">${product.brand}</div>
          <div class="product-nameee">${product.name}</div>
          <div class="product-priceee">${product.price}</div>
          <div class="product-descriptionnn">${product.description}</div>
          
        `;
        productItem.addEventListener('click', () => {
          window.location.href = `
          product-details.html?name=${encodeURIComponent(product.name)}
          &price=${product.price}
          &description=${encodeURIComponent(product.description)}
          &image=${encodeURIComponent(product.images)}
          &brand=${encodeURIComponent(product.brand)}
          &instock=${encodeURIComponent(product.in_stock)}
          `;
        });
        TrendingproductContainer.appendChild(productItem);
      });
    }
    displaytrending(products);

    //display special offers
    function displaySoffer(productList) {
      const filteredProducts = productList.filter(product => product.price < 1000);
      const limitedProducts = filteredProducts.slice(0, 15); 
        limitedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-carddd';
        productItem.innerHTML = `
          <img src="${product.images}" alt="${product.name}">
          <div class="product-nameee">${product.name}</div>
          <div class="product-priceee">${product.price}</div>
          <div class="brand">${product.brand}</div>
          <div class="instock">${product.in_stock}</div>
          <div class="product-descriptionnn">${product.description}</div>
        `;
        productItem.addEventListener('click', () => {
          window.location.href = `
          product-details.html?name=${encodeURIComponent(product.name)}
          &price=${product.price}
          &description=${encodeURIComponent(product.description)}
          &image=${encodeURIComponent(product.images)}
          &brand=${encodeURIComponent(product.brand)}
          &instock=${encodeURIComponent(product.in_stock)}
          `;
        });
        productContainer.appendChild(productItem);
      });
    }
    displaySoffer(products);
  })
  .catch(error => console.error('Error loading the products:', error));

//display the product in details 
  function populateProductDetails() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productDescription = urlParams.get('description');
    const productBrand = urlParams.get('brand');
    const productStock = urlParams.get('instock');
    const productImage = urlParams.get('image');


    // Populate the product details on the page
    document.getElementById('product-name').textContent = productName;
    document.getElementById('details-price').textContent = `$${productPrice}`;
    document.getElementById('details-description').textContent = productDescription;
    document.getElementById('details-image').src = productImage;
    document.getElementById('brand').textContent = productBrand;
    document.getElementById('instock').textContent = productStock;

    // Back button functionality
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect back to the index search page
    });
  }

// Call the function to populate product details
populateProductDetails();


document.getElementById('buyNowBtn').addEventListener('click', () => {
  window.location.href = 'placeorder.html'; // Redirect back to the product search page
});