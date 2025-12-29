export enum Category {
  VIENNOISERIE = 'Viennoiserie',
  TARTES = 'Tartes',
  ENTREMETS = 'Entremets',
  MACARONS = 'Macarons',
  COFFEE = 'Coffee'
}

export enum View {
  HOME = 'home',
  MENU = 'menu',
  STORY = 'story',
  BOUTIQUES = 'boutiques',
  CONTACT = 'contact',
  WISHLIST = 'wishlist',
  PASTRY_DETAIL = 'pastry_detail'
}

export interface Pastry {
  id: string;
  name: string;
  category: Category;
  description: string;
  chefsNote: string;
  price: number;
  image: string;
  ingredients: string[];
}

export interface CartItem extends Pastry {
  quantity: number;
}

export interface AIRecommendation {
  pastryName: string;
  reason: string;
  pairing: string;
}