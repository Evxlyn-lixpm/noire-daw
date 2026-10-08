const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const priceSelect = document.getElementById("price");
const productContainer = document.getElementById("catalog-products");
const status = document.getElementById("catalog-status");

async function loadCategories() {
  try {
    const categories = await apiFetch("/categories");
    categorySelect.innerHTML += categories
      .map(category => `<option value="${category.id}">${category.name}</option>`)
      .join("");
  } catch {
    categorySelect.innerHTML = `<option value="">No se pudieron cargar categorías</option>`;
  }
}

async function loadProducts() {
  status.textContent = "Cargando colección...";
  productContainer.innerHTML = "";

  const params = new URLSearchParams();

  if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
  if (categorySelect.value) params.set("category", categorySelect.value);
  if (priceSelect.value) params.set("maxPrice", priceSelect.value);

  try {
    const products = await apiFetch(`/products?${params.toString()}`);

    if (!products.length) {
      status.textContent = "No encontramos prendas con esos filtros.";
      return;
    }

    status.textContent = `${products.length} prendas encontradas`;
    productContainer.innerHTML = products.map(productCard).join("");
  } catch {
    status.textContent = "No se pudo conectar con la API.";
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

searchInput.addEventListener("input", loadProducts);
categorySelect.addEventListener("change", loadProducts);
priceSelect.addEventListener("change", loadProducts);

loadCategories();
loadProducts();