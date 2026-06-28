import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    to: '/products',
    image: '/assets/banners/new-products.jpg',
    label: 'Yeni daxil olmuş məhsullar',
    large: true,
  },
  {
    to: '/jewelry',
    image: '/assets/banners/jewelry.jpg',
    label: 'Zinət əşyaları',
    large: false,
  },
  {
    to: '/watches',
    image: '/assets/banners/watches.png',
    label: 'Saatlar',
    large: false,
  },
  {
    to: '/bags',
    image: '/assets/banners/bags.jpg',
    label: 'Çantalar',
    large: false,
  },
]

export function Categories() {
  return (
    <div className="categories">
      <div className="container">
        <div className="row">
          <div className="col-12 categoryCol categoryL">
            <Link to={CATEGORIES[0].to}>
              <div className="category">
                <img className="bgImg" src={CATEGORIES[0].image} alt="" />
                <div className="text">
                  <span>{CATEGORIES[0].label}</span>
                  <img className="line" src="/img/line.svg" alt="" />
                </div>
              </div>
            </Link>
          </div>
          {CATEGORIES.slice(1).map((cat) => (
            <div key={cat.to} className="col-12 col-md-4 categoryCol">
              <Link to={cat.to}>
                <div className="category">
                  <img className="bgImg" src={cat.image} alt="" />
                  <div className="text">
                    <span>{cat.label}</span>
                    <img className="line" src="/img/line.svg" alt="" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
