document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;

    // Store the data in local storage
    const orderData = {
        name: name,
        address: address,
        contact: contact,
        product: product,
        quantity: quantity
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));

    // Display a message or redirect the user
    alert('Order placed successfully!');

    // Optionally, redirect to another page
    // window.location.href = "confirmation.html";
});

document.getElementById('submit-button').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect back to the product search page
  });
