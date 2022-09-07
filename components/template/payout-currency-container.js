export default function PayoutCurrencyContainer({classNames, title, amount, convertedAmount}){
  return (
    <div className={`${classNames} container-border`}>
      <p className="font-bold">{title}</p>
      <p className="text-5xl">Ξ{amount}</p>
      <small className="opacity-50">(${convertedAmount})</small>
    </div>
  )
}
