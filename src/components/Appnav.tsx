import { NavLink } from 'react-router-dom'
import styles from './Appnav.module.css'

export default function Appnav() {
  return (
    <nav className={styles.nav} >
      <ul>
        <li>
          <NavLink to='cities'>Cities</NavLink>
        </li>
        <li>
          <NavLink to='countries' >Countries</NavLink>
        </li>
      </ul>
    </nav>
  )
}
