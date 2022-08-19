import {useEffect, useState} from 'react'

export default function MobileCollapseItem({content, lastClicked, index, question}){
  const [isOpen, setIsOpen] = useState(lastClicked === index)

  return (
    <div>
      <button key={'question' + index} onClick={() => setIsOpen(!isOpen)} className={`text-left w-full ${isOpen ? 'active-button md:mb-0' : 'inactive-button'}`}>
        {index+1}. {question}
      </button>
      <div className={`flex my-4 flex-col gap-4 ${!isOpen && 'hidden'}`}>
        {content}
      </div>
    </div>

  )
}
