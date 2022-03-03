import { useEffect, useState } from 'react'
import styles from '../styles/Cronometer.module.css'
import styles2 from '../styles/Timer.module.css'

export default function Cronometer(props) {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(false)
    const [addSeconds, setAddSeconds] = useState(null)
    const [addMinutes, setAddMinutes] = useState(null)
    const [addHours, setAddHours] = useState(null)
    let sec = seconds
    let min = minutes
    let hr = hours

    const runApp = () => {
        if (sec <= 0 && min <= 0 && hr <= 0) return alert("Defina tempo para começar")
        setRunning(!running)
    }

    const reset = () => {
        setRunning(false)
        setTimeout(() => {
            setSeconds(0)
            setMinutes(0)
            setHours(0)
        }, 1)
        return
    }

    const addTime = (type) => {
        switch (type) {
            case 'seconds': {
                if (addSeconds <= 0) return alert("Insira um valor válido.")
                if (seconds + addSeconds > 59) return setSeconds(59)
                setSeconds(seconds + addSeconds)
            }
                break
            case 'minutes': {
                if (addMinutes <= 0) return alert("Insira um valor válido.")
                if (minutes + addMinutes > 59) return setMinutes(59)
                setMinutes(minutes + addMinutes)
            }
                break
            case 'hours': {
                if (addHours <= 0) return alert("Insira um valor válido.")
                if (hours + addHours > 99) return setHours(99)
                setHours(hours + addHours)
            }
                break
        }
    }

    useEffect(() => {
        function check() {
            if (sec <= 0 && min <= 0 && hr <= 0) {
                clearInterval(timer)
                setRunning(false)
                return true
            } else return false
        }
        if (running) {
            var timer = setInterval(() => {
                sec--
                setSeconds(sec)
                if (check()) return
                if (sec < 0) {
                    min--
                    setMinutes(min)
                    if (min < 0) {
                        hr--
                        setHours(hr)
                        min = 59
                        setMinutes(min)
                        if (check()) return
                    }
                    sec = 59
                    setSeconds(sec)

                }
            }, 1000)
            return () => clearInterval(timer)

        }
    }, [running])

    return (
        <section className={props.animate ? styles.appear : styles.disappear} id={styles.Cronometer}>
            <h1 className={styles.time}>
                {hours < 10 ? '0' + hours : hours}<span className={styles.point}>:</span>{minutes < 10 ? '0' + minutes : minutes}<span className={styles.point}>:</span>{seconds < 10 ? '0' + seconds : seconds}
            </h1>
            
            <div className={styles.buttons}>
                <button className={`btn ${running ? 'danger' : 'primary'}`} onClick={() => runApp()}>
                    {running ? 'Parar' : 'Iniciar'}
                </button>

                <button className='btn warning' onClick={() => reset()}>Reiniciar</button>
            </div>

            <h2>Adicionar</h2>

            <div className={styles2.timeAdd}>
                <span className={styles2.addContainer}>
                    <input
                        type="number"
                        placeholder='Horas'
                        value={addHours}
                        onInput={e => setAddHours(parseInt(e.target.value))}
                        className={styles2.inp}
                    />

                    <button
                        disabled={running}
                        onClick={() => addTime('hours')}
                        className={`btn plus ${running && 'disabled'}`}
                    >
                        +
                    </button>
                </span>

                <span className={styles2.addContainer}>
                    <input
                        type="number"
                        placeholder='Minutos'
                        value={addMinutes}
                        onInput={e => setAddMinutes(parseInt(e.target.value))}
                        className={styles2.inp}
                    />

                    <button
                        disabled={running}
                        onClick={() => addTime('minutes')}
                        className={`btn plus`}
                    >
                        +
                    </button>
                </span>

                <span className={styles2.addContainer}>
                    <input
                        type="number"
                        placeholder='Segundos'
                        value={addSeconds}
                        onInput={e => setAddSeconds(parseInt(e.target.value))}
                        className={styles2.inp}
                    />

                    <button
                        disabled={running}
                        onClick={() => addTime('seconds')}
                        className={`btn plus`}
                    >
                        +
                    </button>
                </span>
            </div>
        </section>
    )
}