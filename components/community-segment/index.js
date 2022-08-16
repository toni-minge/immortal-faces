const faces = [
  {
    'img': './pixel-faces/001.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/002.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/003.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/004.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/005.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/006.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/007.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/008.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/009.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/007.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/008.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },
  {
    'img': './pixel-faces/009.jpg',
    'name': 'Toni',
    'age': 24,
    'mood': 'happy',
    'description': 'I tend to tike digital ofer analog'
  },


]

export default function CommunitySegment() {
  return (
    <div className="w-full grid grid-cols-6 gap-8">
      {faces.map((d,i) =>
        <div>
          <div style={{paddingBottom: '100%'}} className="relative w-full mb-3">
            <img className="mb-2 absolute w-full" src={d.img}/>
          </div>
          <span className="text-xl mb-2 block">{d.name}, {d.age}</span>
          <p className="mb-1">{d.description}</p>
          <span className="community-badge">{d.mood}</span>
        </div>
      )}
    </div>
  )
}
