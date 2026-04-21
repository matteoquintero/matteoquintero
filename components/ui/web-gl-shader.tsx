"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"

type WebGLShaderProps = {
  className?: string
  xScale?: number
  yScale?: number
  distortion?: number
  timeScale?: number
}

export function WebGLShader({
  className,
  xScale = 1.0,
  yScale = 0.5,
  distortion = 0.05,
  timeScale = 0.01,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paramsRef = useRef({ xScale, yScale, distortion, timeScale })
  paramsRef.current = { xScale, yScale, distortion, timeScale }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const vertexShader = /* glsl */ `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = /* glsl */ `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(new THREE.Color(0x000000))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const uniforms = {
      resolution: { value: new THREE.Vector2(1, 1) },
      time: { value: 0.0 },
      xScale: { value: paramsRef.current.xScale },
      yScale: { value: paramsRef.current.yScale },
      distortion: { value: paramsRef.current.distortion },
    }

    const positions = new Float32Array([
      -1, -1, 0, 1, -1, 0, -1, 1, 0,
      1, -1, 0, -1, 1, 0, 1, 1, 0,
    ])

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      uniforms.resolution.value.set(w, h)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener("resize", resize)

    let raf = 0
    const animate = () => {
      uniforms.time.value += paramsRef.current.timeScale
      uniforms.xScale.value = paramsRef.current.xScale
      uniforms.yScale.value = paramsRef.current.yScale
      uniforms.distortion.value = paramsRef.current.distortion
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("resize", resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full", className)}
    />
  )
}
