import Cross from '../../components/elements/cross'
import RoadmapSegment from '../../components/roadmap-segment'

const Crosses = () => {
  return (
    <>
      <Cross pos='tl'/>
      <Cross pos='tr'/>
    </>
  )
}

export default function Test(){
  return (
    <div className="p-4">
      <section>
        <Crosses />
        <div className="section-content">
          <div className="flex flex-col text-center gap-4">
            <img className="h-16 mx-auto mb-4 logo-hover  cromatic-aberration-effect-sm" src="/elements/imf_logo.svg"/>
            <img className="h-14 mx-auto cromatic-aberration-effect-sm" src="/elements/imf_logo_font.svg"/>
            <span className="green-glow">Become immortal on <br/>the blockchain</span>
            <a href="#about" className="no-underline w-48 rounded-tl-xl rounded-br-xl mt-8 mx-auto py-1 px-1 bg-white text-dark cromatic-aberration-effect-sm"> GET STARTED </a>
          </div>
        </div>
      </section>

      <section id="about">
        <Crosses />
        <div className="section-content">
          <div className="flex gap-8 flex-col md:flex-row items-center">
            <div className="md:w-5/12 w-full">
              <img className="h-24 -ml-2 -mb-6 cromatic-aberration-effect-sm" src="./elements/symbol_02.png"/>
              <h2 className="mb-4">What is <br/> Immortal Faces NFT?</h2>
              <p>With Immortal Faces NFT you can become immortal as an NFT. Not only that, as a member of the Immortal Society you become part of something bigger, part of a complex work of art. And in addition, you can earn some money, since all proceeds go back into the community.</p>
            </div>
            <div className="md:w-7/12 w-full">
              <img src="./img/header_video_test.jpg"/>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content text-center">
          <RoadmapSegment />
        </div>
      </section>
    </div>
  )
}
