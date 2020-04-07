import React, {Fragment} from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close]
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open]
  }

  return(
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedStyles.join(' ')}>
      <Logo height='11%' marginBottom='32px'/>
      <nav>
        <NavItems/>
      </nav>
    </div>
    </Fragment>
  )
}

export default sideDrawer
