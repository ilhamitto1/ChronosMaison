import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    to: '/products',
    image: '/assets/banners/new-products.jpg',
    label: 'Yeni daxil olmuş məhsullar',
    featured: true,
    position: 'center',
  },
  {
    to: '/watches',
    image: '/assets/banners/watches.png',
    label: 'Saatlar',
    featured: false,
    position: 'center',
  },
  {
    to: '/jewelry',
    image: '/assets/jewelry/harry-winston-lily-cluster-bracelet.jpg',
    label: 'Zinət əşyaları',
    featured: false,
    position: 'center',
  },
  {
    to: '/bags',
    image: '/assets/banners/bags.jpg',
    label: 'Çantalar',
    featured: false,
    position: 'center 42%',
  },
]

export function Categories() {
  return (
    <section className="categories" aria-label="Kateqoriyalar">
      <div className="container">
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className={`categories-grid__item${cat.featured ? ' categories-grid__item--featured' : ''}`}
            >
              <img
                className="categories-grid__img"
                src={cat.image}
                alt=""
                style={{ objectPosition: cat.position }}
              />
              <div className="categories-grid__overlay">
                <span className="categories-grid__label">{cat.label}</span>
                <span className="categories-grid__rule" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
