import './App.scss'
import {TableView} from "./components/table/table";
import {Header} from "./components/header/header";
import {useExchangeRates} from "./hooks/useExchangeRates";
import {useEffect} from "react";

function App() {

    const [ratesList, fetchRatesList] = useExchangeRates();

    useEffect(()=>fetchRatesList(),[])

    return (
        <div className="App">
            <Header/>
            <TableView items={ratesList}/>
            <button onClick={fetchRatesList}>Aktualisieren</button>
        </div>
    )
}

export default App
