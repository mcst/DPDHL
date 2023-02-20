import {useMemo, useState} from "react";
export interface IRate {
    name: string,
    unit: string,
    value: number,
    type: "fiat" | "crypto"
}

export interface IRateListItem extends IRate {
    key: string
}

type State = "loading" | "loaded" | "failed" | "idle";
export const useExchangeRates = ():[IRateListItem[], ()=>void] => {

    const [rates, setRates] = useState<{ [key: string]: IRate }>({})
    const [state, setState] = useState<State>("idle");

    const fetchData = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates')
        const {rates} = await response.json();
        setRates(rates);
    }

    const doFetch = () => {
        if(state!=="loading") {
            setState("loading");
            fetchData()
                .then(() => setState("loaded"))
                .catch(() => setState("failed"));
        }
    }

    const ratesList: IRateListItem[] = useMemo(() => {
        const list = [];
        for (let key in rates) {
            if (rates.hasOwnProperty(key) && rates[key]) {
                list.push({key, ...rates[key]});
            }
        }
        return list;
    }, [rates]);

    return[ratesList, doFetch];
}
