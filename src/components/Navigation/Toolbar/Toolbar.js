import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
  return(
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <Logo/>
      <nav className={styles.DesktopOnly}>
        <NavItems/>
      </nav>
    </header>
  )
}

export default toolbar
