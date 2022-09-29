import Link from "next/link";

import styles from "../styles/404.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>This record could not be found.</h2>
      <p className={styles.message}>
        Go back to the{" "}
        <Link href="/" passHref>
          <a className={styles.link}>Homepage</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
