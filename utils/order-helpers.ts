export const generateOrderRef = (storeId, cartItems) => {
  const refType = '4';
  const randInt = Math.floor(Math.random() * 9000) + 1000; // ensures it's 4-digit
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const cartCount = cartItems.length.toString().padStart(2, '0');
  const paddedStoreId = storeId.toString().padStart(4, '0');

  return `${refType}${paddedStoreId}${month}${day}${cartCount}${year}${randInt}`;
};

export const variantNames = (product) => {
  const names = product.variants.split(',').filter(Boolean);
  return names.length ? names : ['', '', ''];
};
