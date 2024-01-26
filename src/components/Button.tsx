import React, { ReactNode } from 'react'
import { ButtonType } from '../../types/types';
import styles from './Button.module.css'

// types for props
interface ButtonProps {
    children: ReactNode;
    type: ButtonType;
    onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export default function Button({children , type , onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`} >
      {children}
    </button>
  )
}
