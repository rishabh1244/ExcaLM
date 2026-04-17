import styles from "./navbar.module.css"

export default function Navbar(){
    return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
      <h1 className={styles.logo}>ExalLM</h1>
      </div>

      <div className={styles.right}>
      <button className={styles.btnOutline}>Login</button>
      <button className={styles.btnOutline}>Sign Up</button>
      </div>
    </nav>
 
    )
}
