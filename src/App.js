import { useState, useEffect } from 'react';
import './App.css';

function App() {
    
    const [curr, setCurr] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [rate, setRate] = useState(0)
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
    },[])

    const convertFrom = () => {
        fetch(`${BASE_URL}${API_KEY}&base_currency=${from}`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res)
            const keys = Object.keys(res.data)
            const values = Object.values(res.data)
            const index = keys.indexOf(to)
            const rate = values[index]
            setRate(rate)
            // const temp = res.data.filter(item => item === to)
            console.log('index', index);
            console.log('values', values);
            console.log('keys', keys);
            console.log('to', to);
            console.log('rate', rate);
        })
    }

    const convertTo = () => {
        fetch(`${BASE_URL}${API_KEY}&base_currency=PKR`)
        .then(res => res.json())
        .then(res => console.log('to', res))
    }

    // console.log('from', curr);

    return (
        <div className="App">
            <h5>from</h5>
            <select onChange={(e) => setFrom(e.target.value)}>
                <option disabled selected>Select Currency</option>
                {curr.map((item, index) => <option key={index}>{item}</option>)}
            </select>
            <h5>to</h5>
            <select onChange={(e) => setTo(e.target.value)}>
                <option disabled selected>Select Currency</option>
                {curr.map((item, index) => <option key={index}>{item}</option>)}
            </select>
            <h1>Amount: {rate ? rate : 1}</h1>
            <button onClick={convertFrom}>CONVERT:</button>
        </div>
    );
}

export default App;
