import styles from "./button.module.css"

const Button = ({ children, handleClick, style = "primary", shadow = false, type = "button"}) => {

    return(
        <div>
            <button 
            type={type}
            onClick={handleClick}
            className={`${styles.button} ${styles[style]} ${shadow && styles.shadow}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button;