import { useEffect, useState } from 'react'
import { BRAND, WORLD_CITIES } from '@/lib/constants'
import { InstagramIcon } from '@/components/icons/InstagramIcon'

function formatTime(timezone: string) {
  return new Intl.DateTimeFormat('az-AZ', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(new Date())
}

export function HeroCarousel() {
  const [times, setTimes] = useState(() =>
    WORLD_CITIES.map((c) => formatTime(c.timezone)),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTimes(WORLD_CITIES.map((c) => formatTime(c.timezone)))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="carousel">
      <div className="carousel-inner">
        <div className="carousel-item carousel-item-first active">
          <div className="carousel-scene">
            <img
              className="hero-logo-back"
              src={BRAND.logo}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-photo"
              src="/assets/banners/hero.png"
              alt={BRAND.name}
            />
          </div>

          <div className="stars">
            <div className="star-field" />
            <div className="star-field star-field-2" />
          </div>

          <div className="saatt">
            <div className="saatalti">
              {WORLD_CITIES.map((city, i) => (
                <div key={city.city} className="saat1">
                  {city.city}
                  <span className="time">{times[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="caption">
            <div className="container">
              <div className="cap-row">
                <div className="text">
                  <p>
                    <a href={`tel:${BRAND.phoneTel}`} className="d-block text-white">
                      Mob: {BRAND.phone}
                    </a>
                    <a href={`tel:${BRAND.phoneLandlineTel}`} className="d-block text-white">
                      Tel: {BRAND.phoneLandline}
                    </a>
                    <span className="d-block">Ünvan: {BRAND.address}</span>
                  </p>
                </div>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ins-btn"
                >
                  <InstagramIcon />
                  INSTAGRAMDA BİZİ İZLƏYİN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
