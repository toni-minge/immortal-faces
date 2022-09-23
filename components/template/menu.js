import Link from 'next/link'

const MenuOverlay = ({active, setActive}) => {
  return (
    <div className={`fixed top-0 left-0 bg-dark z-50 h-screen w-screen ${!active && 'opacity-0 w-0 h-0'}`}>
      <div className="p-4">
        <section>
          <div className="col-start-3">
            <BurgerMenu active={active} setActive={() => setActive(!active)}/>
          </div>
          <div className="section-content">
            <ul className="flex flex-col gap-2 text-center">
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#about">About</a>
              </li>
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#howDoesItWork">How does it work?</a>
              </li>
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#mintingArea">Minting Area</a>
              </li>
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#memberArea">Our Latest Members</a>
              </li>
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#roadmap">Roadmap</a>
              </li>
              <li>
                <a className="text-2xl no-underline" onClick={() => setActive(!active)} href="#faq">FAQ</a>
              </li>
              <li>
                <Link href="/payout"><a className="text-2xl no-underline">Get your Payouts</a></Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

const BurgerMenu = ({active, setActive}) => {

  return (
    <div onClick={() => setActive(!active)}>
      <button className={`border-0 relative md:h-8 md:w-10 h-6 w-6 md:pr-0 pr-2 block mx-auto burger-container ${active && 'active'}`}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
    </div>
  )

}

export {
  MenuOverlay,
  BurgerMenu
}
