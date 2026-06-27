import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    to: '/products',
    image: '/assets/banners/new-products.png',
    label: 'Yeni daxil olmuş məhsullar',
    large: true,
  },
  {
    to: '/watches',
    image: '/assets/banners/watches.png',
    label: 'Saatlar',
    large: false,
  },
  {
    to: '/bags',
    image: '/assets/banners/jewelry.png',
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
          <div className="col-6 categoryCol">
            <Link to={CATEGORIES[1].to}>
              <div className="category">
                <img className="bgImg" src={CATEGORIES[1].image} alt="" />
                <div className="text">
                  <span>{CATEGORIES[1].label}</span>
                  <img className="line" src="/img/line.svg" alt="" />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6 categoryCol">
            <Link to={CATEGORIES[2].to}>
              <div className="category">
                <img className="bgImg" src={CATEGORIES[2].image} alt="" />
                <div className="text">
                  <span>{CATEGORIES[2].label}</span>
                  <img className="line" src="/img/line.svg" alt="" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
