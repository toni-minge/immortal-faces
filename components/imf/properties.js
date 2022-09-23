import { useState } from 'react'
import { useNffContext } from '../../services/context/nff-context'
import { createSvg } from '../../services/actions/nff-svg-creator'

const gender_options = ['female', 'male', 'diverse', 'other', 'none']
const mood_options = [
  'happy', 'lovely', 'amused', 'excited', 'peaceful', 'satisfied',
  'joyful', 'pleased', 'content', 'relaxed', 'calm', 'delighted',
  'adored', 'attracted', 'careless', 'cheeky',
  'lonley', 'heartbroken', 'hopeless', 'lost', 'unhappy', 'miserable',
  'worried', 'nervous', 'terrified', 'confused', 'stressed', 'annoyed',
  'frustraded', 'mad', 'angry', 'offended', 'none',
]



const Properties = () => {
  const nff = useNffContext()
  const { properties, video_ref, canvas_ref, image, image_settings, svg_ref, base64, account, is_light_mode, accepted_terms} = nff.state


  function handleInput(key, value){
    const _state = Object.assign({}, properties)
    _state[key] = value
    nff.dispatch({type: 'SET_PROPERTIES', payload: _state})
  }

  function handleNumber(key, event){
    let { value, min, max } = event.target;

    if (value !== ''){
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    }

    handleInput('age', value)
  };

  return (
    <div className="flex flex-col flex gap-12 md:gap-12">
      <div className="">
        <div className="flex w-full items-center">
          <h3 className="md:text-2xl text-xl text-white nff-font">2. Your name</h3>
        </div>
        <input
          maxLength={24}
          placeholder="name"
          onChange={(e) => handleInput('name', e.target.value)}
          value={properties.name}
          className={`${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'} text-dark w-full py-2 px-4 outline-none`}/>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h3 className="md:text-2xl text-xl text-white nff-font">3. Your gender</h3>
        </div>
        <div className="">
          {gender_options.map((d, i) =>
            <button
              key={'gender' + i}
              onClick={() => handleInput('gender', d)}
              className={`${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'} text-white cursor-pointer py-1 mb-2 px-4 ${d !== properties.gender ? 'opacity-50' : 'opacity-100' } mr-2`}>
              {d}
            </button>
          )}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h3 className="md:text-2xl text-xl text-white nff-font">4. Your age</h3>
        </div>
        <input
          type="number"
          max="100"
          step="1"
          min="0"
          placeholder="age"
          onChange={(e) => handleNumber('age', e)}
          value={properties.age}
          className={`${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'} text-dark w-full py-2 px-4 outline-none`}/>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h3 className="md:text-2xl text-xl text-white nff-font">5. Your mood</h3>
        </div>
        <div className="">
          {mood_options.map((d, i) =>
            <button
              key={'mood' + i}
              onClick={() => handleInput('mood', d)}
              className={`${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'} text-white cursor-pointer py-1 mb-2 px-4 ${d !== properties.mood ? 'opacity-50' : 'opacity-100' } mr-2 mb-2`}>
              {d}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full items-center mb-2">
          <h3 className="md:text-2xl text-xl text-white nff-font">6. Your description</h3>
        </div>
        <textarea
          maxLength={128}
          rows={3}
          placeholder="description"
          onChange={(e) => handleInput('description', e.target.value)}
          value={properties.description}
          className={`${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'} text-dark w-full py-2 px-4 outline-none resize-none mb-4`}/>
      </div>

      <div className="flex flex-col">
        <div className="flex w-full items-center mb-2">
          <h3 className="md:text-2xl text-xl text-white nff-font">7. Terms and Conditions</h3>
        </div>
        <div className="">
          <label className="flex gap-4 items-start" forhtml="terms">
            <input
              className="mt-1"
              onChange={(e) => handleInput('accepted_terms', !properties.accepted_terms)}
              checked={properties.accepted_terms}
              id="terms"
              type="checkbox"/>
            <p className="opacity-50">I agree that the photos created by Ethernal Faces may be used and distributed as NFTs by the respective owners of the NFTs including the Artist Toni Minge without any restrictions in terms of time, space, subject matter and content. I have been informed about the right to my own image according to <a target="blank" rel="noopener" href="https://www.gesetze-im-internet.de/kunsturhg/__22.html">§ 22 KunstUrhG.</a></p>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Properties;
