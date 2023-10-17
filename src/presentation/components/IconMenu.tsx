import { Menu } from "../icons/icons"

export const IconMenu = () => {

  const event = () => {
    const nav = document.querySelector('.container-nav');
    nav?.classList.toggle('handle-show')
  }

  return (
    <button className='btn-icon' onClick={event}>
      <Menu />
    </button>
  )
}
