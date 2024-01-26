import Logo from './Logo'
import Appnav from './Appnav'
import styles from './Sidebar.module.css'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className={styles.sidebar} >
       <Logo/>
       <Appnav/>
       <Outlet/>
       <p>List of cities</p>
       <footer className={styles.footer} >
          <p className={styles.copyright} >
            &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
          </p>
       </footer>
    </div>
  )
}
