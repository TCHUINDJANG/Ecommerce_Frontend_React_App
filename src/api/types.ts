// Interfaces pour les produits
 export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price: string | null;
  current_price: string;
  stock: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  sale_count: number;
  seller: any | null; // Remplacez 'any' par le type approprié si possible
  image?: string;
  promotionInfo?: { // Optionnel
    name: string;
    discount: number;
    type: 'fixed' | 'percentage';
};

}

export interface Category {
    id:number;
    name:string;
    slug:string;
    description?:string;
    image:string;
}


// Interfaces pour le panier
export interface CartItem {
    id:number;
    product: {
      id:number;
      name:string;
      price:number;
      image?:string;
    };

    quantity:number;
    price_at_addition:string;
    added_at:string;
    price: number;
    total_price: number;
}


export interface Cart  {
    id:number;
    user?:number;
    items:CartItem[];
    total_price : number;
    created_at:string;
    updated_at:string;
}


// Interfaces pour les utilisateurs
export interface User {
  id:number;

  user : {
    email:string;
    first_name: string;
    last_name: string;
  };
  phone:number;

  address?: {
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  shipping_address: Address;
  billing_address: Address;
}

export interface PaymentMethod {
  method_type: 'credit_card' | 'paypal' | 'bank_transfer';
  details: {
    card_number?: string;
    exp_month?: string;
    exp_year?: string;
    cvc?: string;
  };
}


// Interfaces pour les commandes
export interface Order {
   id: number;
  order_number?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
    
  promotion?: {
    name: string;
    discount_value: string;
  };

  coupon?: {
    code: string;
    discount: number;
  };
  shipping_address: Address;
  billing_address: Address;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  payment_method: PaymentMethod;
  created_at: string;
  updated_at: string;
  user : {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}


export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
  }


  // Interfaces pour les avis
  export interface Review {
    id: number;
    product: number;
    user: number;
    rating: number;
    comment?: string;
    created_at: string;
    updated_at: string;
  }

  export interface Promotion {
    id:number,
    name:string,
    description:string,
    discount_type:'fixed' | 'percentage',
    discount_value:string,
    start_date: Date,
    end_date:Date,
    active: boolean,
    products:Product[],
    categories:Category[],
    min_order_amount:number,
    code: string,
    activate:boolean,
  }


  export interface DashbordStats {
    totalOrders : number ,
    pendingOrders : number,
    totalSpent: number;
    favoriteCategory?: string;
  }


export interface Address {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    is_default?: boolean;
  }



  export interface RawCartItem {
    id: number;
    product_id: number;  // Important: le backend envoie product_id, pas product
    quantity: number;
    price: number;
    added_at: string;
  }


  export interface CartResponse {
    id: number;
    user: number;
    items: CartItem[];
    created_at: string;
    total_price: number;
  }



export interface OrdersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Order[];
}
  


// Interfaces pour les réponses API
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
  }



export interface ContactFormData {
    name:string;
    email:string;
    subject:string;
    message:string;
  }


  export interface ContactResponse {
    message:string;
  }