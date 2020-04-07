import React from 'react'
import styles from './Logo.module.css'
import burgerLogo from '../../assets/images/original.png'

const logo = (props) => (
  <div 
    className={styles.Logo} 
    style={{height: props.height, marginBottom: props.marginBottom}}
  >
    <img src={burgerLogo} alt='MyBurger'/>
  </div>
)

export default logo
