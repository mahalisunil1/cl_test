import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export { gsap }

export function registerScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger)
}

export function createTimeline() {
  return gsap.timeline()
}

export function fadeIn(
  target: gsap.TweenTarget,
  duration = 0.35
) {
  return gsap.to(target, {
    opacity: 1,
    duration,
    ease: "power2.out"
  })
}

export function fadeOut(
  target: gsap.TweenTarget,
  duration = 0.25
) {
  return gsap.to(target, {
    opacity: 0,
    duration,
    ease: "power2.in"
  })
}
