async function loadFeatured() {
  const container = document.getElementById("featured-products");
  const status = document.getElementById("home-status");

  try {
    const products = await apiFetch("/products");
    container.innerHTML = products.slice(0, 4).map(productCard).join("");
    status.textContent = "";
  } catch (error) {
    status.textContent = "No pudimos cargar la colección. Inténtalo nuevamente.";
  }
}

function productCard(product) {
  return `
    <article class="product-card">
      <a href="detalle.html?id=${product.id}">
        <div class="product-image-wrap">
          <img class="product-image" src="${product.image}" alt="${product.name}">
          <button class="quick-add" onclick="event.preventDefault(); addToCart(${escapeProduct(product)})">Add to bag</button>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${money(product.price)}</div>
        </div>
      </a>
    </article>
  `;
}

function escapeProduct(product) {
  return JSON.stringify(product).replace(/"/g, "&quot;");
}

loadFeatured();