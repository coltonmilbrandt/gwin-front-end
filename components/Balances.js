import Image from 'next/image'
import Price from '../components/Price'

// TO DO:

// 1. Show token prices - DONE
// 2. Add staked balance - DONE
// 3. Add Unstake function - 
// 4. Add is mining disable - 
// 5. Add price feed refresh -


export default function Balances(props) {
    const name = props.name
    const wallet = props.wallet
    const staked = props.staked
    const price = props.price
    const tokenPic = props.tokenPic
    const contract = props.contract
    return (
        <div className="grid grid-cols-3 bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-600">
            <div className="flex flex-col items-center justify-center pr-4">
                <Image src={tokenPic} class="bg-white rounded-full" width='50px' height='50px' alt={name} />
            </div>
            <div className="col-span-2">
                <div><b>Wallet:</b> {wallet.toLocaleString("en-US")} {name}</div>
                <div><b>Staked:</b> {staked.toLocaleString("en-US")} {name}</div>
                <div><b>Price:</b> <Price contract={contract}/></div>
            </div>
        </div>
    )
}