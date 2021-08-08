export interface UserI {
  username?: string;
  name?: string;
  lastName?: string;
  email?: string;
  id?: string;
  createdAt?: string;
}

export interface AddressI {
  address?: string;
  state?: string;
  city?: string;
  title?: string;
  id?: string;
  phone?: string;
  postalCode?: string;
  user?: UserI;
}

export interface TokenI {
  id?: string;
  exp?: string;
}

export interface CategoryI {
  id?: string;
  title?: string;
  url?: string;
}

export interface BookI {
  author?: string;
  category?: CategoryI;
  id?: string;
  poster?: {
    url?: string;
  };
  price?: number;
  releaseDate?: string;
  summary?: string;
  title?: string;
  url?: string;
}

export interface FavoriteBookI {
  book?: BookI;
  createdAt?: string;
  id?: string;
  user?: UserI;
}

export interface OrderI {
  addressShipping?: AddressI;
  books?: Array<BookI>;
  createdAt?: string;
  id?: string;
  totalPayment?: number;
  user?: UserI;
}

export interface AboutI {
  id: string;
  text: string;
}

