import { useGLTF, Float, Environment, PresentationControls, ContactShadows, Html, Text } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'

function ComputerModel()
{
    const [error, setError] = useState(false)
    
    // We wrap this in a component that might fail
    return (
        <Suspense fallback={<mesh position-y={ -1.2 }><boxGeometry args={[2, 0.25, 1.4]} /><meshStandardMaterial color="#222" /></mesh>}>
            <ActualModel onError={() => setError(true)} />
        </Suspense>
    )
}

function ActualModel({ onError }) {
    // Attempting a slightly different CDN URL that is often more stable
    const modelUrl = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
    
    let computerScene;
    try {
        const gltf = useGLTF(modelUrl)
        computerScene = gltf.scene
    } catch (e) {
        console.error("Model failed to load:", e)
        return <mesh position-y={ -1.2 }><boxGeometry args={[2, 0.25, 1.4]} /><meshStandardMaterial color="red" /></mesh>
    }

    return (
        <primitive
            object={ computerScene }
            position-y={ -1.2 }
        >
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={ 1.17 }
                position={ [ 0, 1.56, -1.4 ] }
                rotation-x={ - 0.256 }
            >
                <iframe src="/screen.html" title="screen" />
            </Html>
        </primitive>
    )
}

export default function Experience()
{
    return <>
        <Environment preset="city" />
        <color args={ ['#06F1F2']} attach ="background" />
        
        <PresentationControls
            global 
            rotation={ [0.13, 0.1, 0] }
            polar= { [ -0.4, 0.2 ] }
            azimuth={ [-1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap= { { mass: 4, tension: 400 } }
        >
            <Float rotationIntensity={ 0.4 }>
                <rectAreaLight 
                    width={ 2.5 }
                    height = { 1.65 }
                    intensity={ 65 }
                    color={ '#ff6900' }
                    rotation={[ 0.1, Math.PI, 0 ]}
                    position={ [ 0, 0.55, 1.15 ] }
                />

                <ComputerModel />

                <Text
                    font="/bangers-v20-latin-regular.woff"
                    fontSize={ 1.5 }
                    position={ [ 2, 0.75, 0.75 ] }
                    rotation-y={ - 1.25 }
                    maxWidth={ 2 }
                    textAlign="center"
                >WINDY</Text>
            </Float>
        </PresentationControls>

        <ContactShadows 
            position-y={ - 1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />
    </>
}