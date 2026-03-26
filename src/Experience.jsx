import { Float, Environment, PresentationControls, ContactShadows, Html, Text } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function ComputerModel()
{
    const [ computerScene, setComputerScene ] = useState(null)

    useEffect(() =>
    {
        const loader = new GLTFLoader()
        loader.load(
            'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf',
            (gltf) =>
            {
                setComputerScene(gltf.scene)
            },
            undefined,
            (error) =>
            {
                console.error('Failed to load computer model:', error)
                setComputerScene(null)
            }
        )
    }, [])

    if(!computerScene)
    {
        return (
            <mesh position-y={ -1.2 }>
                <boxGeometry args={ [ 2, 0.25, 1.4 ] } />
                <meshStandardMaterial color="#222" />
            </mesh>
        )
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
                <iframe src="https://windy-portfolio.vercel.app/" />
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
                    font="./bangers-v20-latin-regular.woff"
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