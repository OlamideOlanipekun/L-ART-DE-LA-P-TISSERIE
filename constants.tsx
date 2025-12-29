
import { Pastry, Category } from './types';

export const PASTRIES: Pastry[] = [
  {
    id: '1',
    name: 'Classic Pain au Chocolat',
    category: Category.VIENNOISERIE,
    description: 'Double-fermented butter dough with premium 70% dark Valrhona chocolate batons.',
    chefsNote: 'The secret lies in the 48-hour cold fermentation, which develops a complex, almost nutty aroma in the levain before we laminate it with AOC butter.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Normandy Butter', 'Valrhona Chocolate', 'Organic Flour']
  },
  {
    id: '2',
    name: 'Yuzu & Basil Tarte',
    category: Category.TARTES,
    description: 'Crisp shortcrust filled with tangy yuzu curd and finished with a fresh basil-infused meringue.',
    chefsNote: 'I wanted to capture the sharp clarity of a Japanese citrus grove. We steep the basil in cream for exactly six minutes to capture its essence without the bitterness.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Yuzu juice', 'Fresh Basil', 'Almond Flour']
  },
  {
    id: '3',
    name: 'Signature Mont Blanc',
    category: Category.ENTREMETS,
    description: 'Chestnut cream vermicelli, light chantilly, and a crisp meringue base with a hint of dark rum.',
    chefsNote: 'A tribute to the traditional Parisian salon. We use wild chestnuts from the Ardèche region, hand-passed through a fine sieve to ensure that perfect velvet texture.',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Chestnut Purée', 'Dark Rum', 'Heavy Cream']
  },
  {
    id: '4',
    name: 'Lavender Pistachio Macaron',
    category: Category.MACARONS,
    description: 'Delicate almond shells filled with roasted Iranian pistachio ganache and subtle lavender notes.',
    chefsNote: 'The lavender is harvested at dawn from our own garden in Provence. It provides a floral high-note that balances the deep, earthy richness of the pistachios.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Pistachio', 'Lavender Oil', 'Almond Shell']
  },
  {
    id: '5',
    name: 'Ispahan Rose Croissant',
    category: Category.VIENNOISERIE,
    description: 'Rose-infused syrup, fresh lychee pieces, and raspberry glaze inside our signature flaky dough.',
    chefsNote: 'This is an exercise in floral balance. The lychee adds a subtle water-fruit sweetness that prevents the rose from becoming overwhelming.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Rose Essence', 'Lychee', 'Raspberry']
  },
  {
    id: '6',
    name: 'Matcha Opera Cake',
    category: Category.ENTREMETS,
    description: 'Layers of matcha-soaked biscuit joconde, dark chocolate ganache, and matcha buttercream.',
    chefsNote: 'We use ceremonial grade matcha from Uji. The bitterness of the tea acts as a perfect foil to the 70% dark chocolate ganache.',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Ceremonial Matcha', 'Dark Chocolate', 'Buttercream']
  }
];

export const CATEGORIES = Object.values(Category);
