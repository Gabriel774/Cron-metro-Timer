import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cronometer from '../components/Cronometer'
import Timer from '../components/Timer'
import { useState } from 'react'

export default function Home() {
  const [show, setShow] = useState(true)
  const [animate, setAnimate] = useState(true)
  const [running, setRunning] = useState(false)

  async function change(comp) {
    if (animate === comp || running) return
    setRunning(true)
    setAnimate(comp)
    setTimeout(() => {
      setShow(!show)
      setRunning(false)
    }, 490)
  }

  return (
    <>
      <Head>
        <title>Cronômetro & Timer</title>
        <meta name="description" content="Cronômetro & Timer APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={styles.app}>
        <nav>
          <button
            className={`btn primary rounded-left ${animate && 'active'}`}
            onClick={() => change(true)}
          >
            Cronômetro
          </button>

          <button
            className={`btn primary rounded-right ${!animate && 'active'}`}
            onClick={() => change(false)}
          >
            Timer
          </button>
        </nav>
        
        {show ? <Cronometer animate={animate} /> : <Timer animate={!animate} />}
      </main>
    </>
  )
}