export interface Selections {
  variant1: any;
  variant2: any;
  variant3: any;
  quantity: number;
}

export interface StoreInfo {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  image1: string;
  image2: string;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  products: Product[];
  categories: { category: string }[];
  benefit_page_title: string;
  benefit_page_subtitle: string;
  pages: { id: number; title: string; content: string; created: string; updated: string }[];
  reviews: any[];
  best_sellers: Product[];
  store: number;
  store_name: string;
  store_slug: string;
  store_logo: string;
  industry: string;
  address: string;
  email: string;
  phone_number: string;
  use_custom_url: boolean;
  custom_url: string;
  country: string;
  currency: string;
  always_open: boolean;
  opening_time: string | null;
  closing_time: string | null;
  shipping_prices: { area: string; amount: string }[];
}

export interface Product {
  id: number;
  product_name: string;
  product_type: string;
  description: string;
  price: number;
  total_stock: number;
  has_variant: boolean;
  display: boolean;
  discount: string;
  discount_type: string;
  has_discount: boolean;
  slug: string;
  store: string;
  temp_id: string;
  category: string | null;
  rating: string;
  review_count: number;
  rate_tracking: string;
  strict_stock_count: boolean;
  created: string;
  last_sale: string | null;
  owner: string | null;
  options1: string;
  options2: string;
  options3: string;
  variants: string;
  combinations: string | null;
  images: {
    id: number;
    type: string;
    image: string;
    name: string | null;
    store: string;
    product: number;
  }[];
  sku: Sku[];
}

export interface Sku {
  id: number;
  sku: string;
  option1: string;
  option2: string;
  option3: string;
  has_discount: boolean;
  sku_discount: string;
  sku_discount_type: string;
  price: number;
  qty: number;
}

export interface CartItem extends Product {
  selected_variant1: string;
  selected_variant2: string;
  selected_variant3: string;
  selected_quantity: number;
  variant_price: number;
  variant_total_stock: number;
  itemTotal: number;
  selected_sku: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingMethod: string;
  location: string;
  address: string;
}
