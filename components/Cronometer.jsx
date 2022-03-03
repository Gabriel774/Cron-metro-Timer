import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Cronometer.module.css'

export default function Cronometer(props) {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [miliseconds, setMiliseconds] = useState(0)
    const [running, setRunning] = useState(false)
    const [laps, setLaps] = useState([])
    const scrollRef = useRef(null)
    let mili = miliseconds
    let sec = seconds
    let min = minutes
    let hr = hours

    const runApp = () => setRunning(!running)

    const reset = () => {
        setRunning(false)
        setTimeout(() => {
            setMiliseconds(0)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
            setLaps([])
        }, 1)
        return
    }

    const lap = () => {
        if (hours === 0 && minutes === 0 && seconds === 0 && miliseconds === 0) return alert("Inicie o cronômetro para contar voltas.")
        setLaps(laps.concat(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds},${miliseconds < 10 ? '0' + miliseconds : miliseconds}`))
    }

    useEffect(() => {
        if (running) {
            const timer = setInterval(() => {
                mili++
                if (mili > 99) {
                    mili = 0
                    sec++
                    if (sec > 59) {
                        sec = 0
                        min++
                        if (min > 59) {
                            hr++
                            min = 0
                        }
                    }
                }
                setHours(hr)
                setMinutes(min)
                setSeconds(sec)
                setMiliseconds(mili)
            }, 10)

            return () => clearInterval(timer)

        }
    }, [running])

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [laps])

    return (
        <section className={props.animate ? styles.appear : styles.disappear} id={styles.Cronometer}>
            <h1 className={styles.time}>
                {hours < 10 ? '0' + hours : hours}<span className={styles.point}>:</span>{minutes < 10 ? '0' + minutes : minutes}<span className={styles.point}>:</span>{seconds < 10 ? '0' + seconds : seconds},{miliseconds < 10 ? '0' + miliseconds : miliseconds}
            </h1>
            <div className={styles.buttons}>
                <button
                    className={`btn ${running ? 'danger' : 'primary'}`}
                    onClick={() => runApp()}
                >
                    {running ? 'Parar' : 'Iniciar'}
                </button>

                <button className='btn success' onClick={() => lap()}>Volta</button>

                <button className='btn warning' onClick={() => reset()}>Reiniciar</button>
            </div>
            <div ref={scrollRef} id={styles.laps}>
                {laps.map((value, i) =>
                    <p className={styles.lap} key={i}>
                        <b>{i < 9 ? '0' + (i + 1) : i + 1})</b> {value}
                    </p>
                )}
            </div>
        </section>
    )
}