import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "../constants/TokenFarm_abi.json"

const TOKEN_FARM_CONTRACT_ADDRESS = "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6"



export default function Stake() {
    const { isWeb3Enabled } = useMoralis()
    const [userTotalValue, setUserTotalValue] = useState("0")
    // Stake to contract
    const { runContractFunction: stakeTokens } = useWeb3Contract({
        abi: abi,
        contractAddress: TOKEN_FARM_CONTRACT_ADDRESS,
        functionName: "stakeTokens",
        msgValue: "10000",
        params: {},
    })

    // View Functions
    const { runContractFunction: getUserTotalValue} = useWeb3Contract({
        abi: abi,
        contractAddress: TOKEN_FARM_CONTRACT_ADDRESS,
        functionName: "getUserTotalValue",
        params: {},
    })

    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                const userTotalValueFromCall = await getUserTotalValue()
                setUserTotalValue(userTotalValueFromCall)
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    return (
        <div>
            
            <div>
                <h4>
                    You have <b>{userTotalValue ? userTotalValue : '0'}</b> tokens staked
                </h4>
            </div>
            <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    await stakeTokens()
                }}
            >Stake Tokens</button>
        </div>
    )
}