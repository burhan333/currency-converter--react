import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
    
    const [curr, setCurr] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [rate, setRate] = useState(0)
    const [initialRate, setInitialRate] = useState(0)
    const [amount, setAmount] = useState(1)
    const [err, setErr] = useState('')
    const [isTrue, setIsTrue] = useState(false)
    const API_KEY = '083043c0-7c89-11ec-892c-c1218c818212'
    const BASE_URL = 'https://freecurrencyapi.net/api/v2/latest?apikey='

    useEffect(() => {
        fetch(`${BASE_URL}${API_KEY}`)
        .then(res => res.json())
        .then(res => {
            const temp = Object.keys(res.data)
            temp.unshift('USD')
            setCurr(temp)
        })
        setFrom('USD')
        setTo('PKR')
    },[])

    const convertFrom = () => {
        if (amount === '')
        {
            setErr('Kindly Enter An Amount')
        }
        else if (amount <= 0)
        {
            setErr('Kinly Enter An Amount Greater Than 0')
        }
        else
        {
            fetch(`${BASE_URL}${API_KEY}&base_currency=${from}`)
            .then(res => res.json())
            .then(res => {
                if(to)
                {
                    const keys = Object.keys(res.data)
                    const values = Object.values(res.data)
                    const index = keys.indexOf(to)
                    const rate = values[index]
                    if (index === -1)
                    {
                        setRate(1*amount)
                        setInitialRate(1)
                        setIsTrue(true)
                        setErr('')
                    }
                    else
                    {
                        setRate(rate*amount)
                        setInitialRate(rate)
                        setIsTrue(true)
                        setErr('')
                    }
                }
            })
        }
    }

    return (
        <div className="App">
            <div className='top'>
                <p className='title'>World's Best Currency Exchange Website</p>
                <p className='desc'>Get Best and Latest Currency Exchange Rates of all Currencies</p>
            </div>
            <div className='body'>
                <div className='head'>
                    <div className='box'>
                        <p>Amount:</p>
                        <input type='number' value={amount} onChange={(e) => {setAmount(e.target.value); setIsTrue(false)}} />
                        <p className='err'>{err}</p>
                    </div>
                    <div className='box'>
                        <p>From</p>
                        <select onChange={(e) => {setFrom(e.target.value); setIsTrue(false)}}>
                            {/* <option disabled selected>Select Currency</option> */}
                            {curr.map((item, index) => <option key={index} selected={item === 'USD' ? true : false}>{item}</option>)}
                        </select>
                    </div>
                    <div className='box'>
                        <p>To</p>
                        <select onChange={(e) => {setTo(e.target.value); setIsTrue(false)}}>
                            {/* <option disabled selected>Select Currency</option> */}
                            {curr.map((item, index) => <option key={index} selected={item === 'PKR' ? true : false}>{item}</option>)}
                        </select>
                    </div>
                </div>
                <div className='body_bot'>
                    <div>
                        {isTrue && <div><span className='span1'>{amount} {from} =</span> <span className='span2'>{rate.toFixed(2)} {to}</span></div>}
                    </div>
                    <button onClick={convertFrom}>CONVERT</button>
                </div>
            </div>
            {isTrue && <div className='tables'>
                <table>
                    <thead>
                        <tr>
                            <th>{from}</th>
                            <th>{to}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 {from}</td>
                            <td>{initialRate.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>5 {from}</td>
                            <td>{(initialRate*5).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>10 {from}</td>
                            <td>{(initialRate*10).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>50 {from}</td>
                            <td>{(initialRate*50).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>100 {from}</td>
                            <td>{(initialRate*100).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>1000 {from}</td>
                            <td>{(initialRate*1000).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>5000 {from}</td>
                            <td>{(initialRate*5000).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>50000 {from}</td>
                            <td>{(initialRate*50000).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default App;
