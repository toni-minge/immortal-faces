import { useEffect, useRef, useState } from 'react'
import { useNffContext } from '../../services/context/nff-context'
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { createSvg } from '../../services/actions/nff-svg-creator'
var getOrientation = require('o9n').getOrientation;

var mobile = require('is-mobile');

let constraints = {
  video: {
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  },
  facingMode: { exact: "user" }
};

const useCleanup = (val) => {
   const valRef = useRef(val);
   useEffect(() => {
      valRef.current = val;
   }, [val]);

   useEffect(() => {
     return () => {
        var video = valRef.current;

        if (video !== null) {
          var stream = video.srcObject;
          stream.getTracks().forEach((track) => {
            track.stop()
          });
        }
     }
  }, [])
}

const Camera = ({isMobile}) => {
  const init_orientation = getOrientation();
  const nff = useNffContext()

  const { image, image_settings, base64, is_light_mode, is_prelaunch, is_whitelisted } = nff.state

  const [streamSettings, setStreamSettings ] = useState(null)
  const [videoError, setVideoError] = useState(null)
  const [paintInterval, setPaintInterval] = useState(null)
  const [_video, setVideo] = useState(null)
  const [orientation, setOrientation] = useState(null)

  const orientationRef = useRef(orientation)
  const setOrientationRef = data => {
    orientationRef.current = data;
    setOrientation(data)
  }

  const intervalStateRef = useRef(paintInterval);
  const setMyIntervalState = data => {
    intervalStateRef.current = data;
    setPaintInterval(data);
  };

  const streamSettingsRef = useRef(streamSettings)
  const setMyStreamSettingsState = data => {
    streamSettingsRef.current = data
    setStreamSettings(data)
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null)
  const svgRef = useRef(null)

  function listenForOrientationChanges(){
    if (window !== undefined) {
      window.addEventListener('resize', () => {
        const orientation = getOrientation();
        setOrientationRef(orientation.type)

        const _interval = intervalStateRef.current

        if (_interval !== null){
          restartPaintInterval()
        }
      })
    }
  }

  function killPaintInterval(){
    const _interval = intervalStateRef.current
    if (_interval !== null){
      clearInterval(_interval)
    }
  }

  function restartPaintInterval(){
    killPaintInterval()
    paintToCanvas(streamSettingsRef.current, orientationRef.current)
  }

  useEffect(() => {
    return () => {
      killPaintInterval()
    }
  }, [])


  useEffect(() => {
    // getVideo();
    const orientation = getOrientation();
    setOrientationRef(orientation.type)

    nff.dispatch({type: 'SET_VIDEO_REF', payload: videoRef})
    nff.dispatch({type: 'SET_CANVAS_REF', payload: canvasRef})
    nff.dispatch({type: 'SET_SVG_REF', payload: svgRef})
    listenForOrientationChanges()
  }, [videoRef]);

  useCleanup(_video)


  const getVideo = async () => {

    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);
      let stream_settings = stream.getVideoTracks()[0].getSettings();

      setMyStreamSettingsState(stream_settings)
      // setStreamSettings(stream_settings)

      let video = videoRef.current;
      video.srcObject = stream;
      video.play();

      setVideo(video)
    } catch (err){
      setVideoError(err)
    }
  };

  const paintToCanvas = (streamSettings, _orientation) => {
    let video = videoRef.current;
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let aspectRatio = streamSettings.width / streamSettings.height

    const is_landscape = _orientation.includes('landscape')

    var blocks = image_settings.blocks,
    w = is_landscape ? blocks * aspectRatio : blocks,
    h = is_landscape ? blocks : blocks * aspectRatio;

    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    const resize_w = is_landscape ? canvas.width * aspectRatio : canvas.width
    const resize_h = is_landscape ? canvas.height : canvas.height * aspectRatio

    const overlapping_blocks = is_landscape ? Math.round(w - h) : Math.round(h - w)

    const translate_x = is_landscape ? resize_w / w * Math.round(overlapping_blocks / 2) * -1 : 0
    const translate_y = !is_landscape ? resize_h / h * Math.round(overlapping_blocks / 2) * -1 : 0

    const paint_interval = setInterval(() => {
      ctx.drawImage(video, 0, 0, w, h); //resize
      ctx.drawImage(canvas, 0, 0, w, h, translate_x, translate_y, resize_w, resize_h); // crop
    }, 10);

    setMyIntervalState(paint_interval)
    return paint_interval
  };

  function handleSnapshot(){
    if (image === null) {
      takeSnapshot()
      return;
    }
    destroySnapshot();
  }

  function destroySnapshot(){
    nff.dispatch({type: 'SET_IMAGE', payload: null})
  }

  function takeSnapshot(){
    const img_url = canvasRef.current.toDataURL();
    nff.dispatch({type: 'SET_IMAGE', payload: img_url})

    const props = {
      height: image_settings.height,
      width: image_settings.width,
      blocks: image_settings.blocks,
      block_size: image_settings.block_size
    }

    const {svg, base64} = createSvg(canvasRef, svgRef, props)
    // nff.dispatch({type: 'SET_SVG', payload: svg.outerHTML.replace(/\s/g, "")})
    nff.dispatch({type: 'SET_SVG', payload: `"${svg.outerHTML.replace(/\"/g, "'")}"`})
    nff.dispatch({type: 'SET_BASE64', payload: base64})

  }

  return (
    <div className="w-full mb-6">
      <div style={{paddingBottom: '100%', backgroundColor: '#252526'}} className={`relative w-full overflow-hidden ${is_light_mode ? 'nff-light-tint' : 'nff-dark-tint'}`}>
        <video
          playsInline
          autoPlay={true}
          onCanPlay={() => paintToCanvas(streamSettings, init_orientation.type)}
          className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full"
          ref={videoRef}/>
        {true ?
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <button
              onClick={() => getVideo()}
              className="border border-white py-2 px-4 text-white cursor-pointer">
              start camera
            </button>
            {!isMobile ?
              null :
              <p className="text-xs text-center mt-2 text-white">Please use a desktop PC for this functionality.</p>
            }

          </div>
        : null}
        {/* remove is_whitelisted after prelaunch */}
        {streamSettings ?
          <canvas
            width={1000}
            height={1000}
            ref={canvasRef}
            className="absolute z-20 top-0 left-0 bg-white w-full h-full" />
        : null }
        { image !== null ?
          <img className="absolute z-30 top-0 left-0 bg-white w-full h-full" src={image}/>
        : null}
      </div>

      <button
        disabled={_video === null}
        onClick={() => handleSnapshot()}
        className="cursor-pointer mt-4 text-white py-3 px-4 border border-white w-full flex justify-center">
          {image === null ?
            <span className="flex items-center gap-2"><FiCamera /> Take a snaphot</span> :
            <span className="flex items-center gap-2"><FiCameraOff /> retake</span>
            }
      </button>

      <svg className="hidden" ref={svgRef} />
    </div>
  )
}
export default Camera;
