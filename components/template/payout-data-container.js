export default function PayoutDataContainer({classNames, title, data}){
  return (
    <div className={`${classNames} container-border`}>
      <p className="font-bold">{title}</p>
      <p className="text-2xl">{data}</p>
    </div>
  )
}
