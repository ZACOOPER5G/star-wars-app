import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars Flix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
