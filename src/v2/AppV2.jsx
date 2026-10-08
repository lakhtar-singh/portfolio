import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import './v2.css'
import { useSmoothScroll } from '../lib/useSmoothScroll'
import { arrival, useArrivalScroll } from '../lib/designSwitch'
import LoaderV2 from './LoaderV2'
import CursorV2 from './CursorV2'
import Dock from './Dock'
import HeroV2 from './HeroV2'
import StackLayers from './StackLayers'
import WorkGallery from './WorkGallery'
import CareerList from './CareerList'
import AboutMe from './AboutMe'
import ChatContact from './ChatContact'
import FooterV2 from './FooterV2'
import ScrollProgress from '../components/ScrollProgress'
import CommandPalette from '../components/CommandPalette'
import Toast from '../components/Toast'

export default function AppV2() {
  const [loading, setLoading] = useState(!arrival)
  useSmoothScroll()
  useArrivalScroll()

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Lakhtar Singh · Full-Stack Developer'
    document.body.classList.add('is-v2')
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', '#E9ECEF')
    return () => { document.title = prevTitle; document.body.classList.remove('is-v2'); meta?.setAttribute('content', '#08161A') }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="v2">
        <AnimatePresence>{loading && <LoaderV2 key="loader" onDone={() => setLoading(false)} />}</AnimatePresence>
        <CursorV2 />
        <ScrollProgress className="v2-progress" />
        <Dock ready={!loading} />
        <main>
          <HeroV2 ready={!loading} />
          <StackLayers />
          <WorkGallery />
          <CareerList />
          <AboutMe />
          <ChatContact />
        </main>
        <FooterV2 />
      </div>
      <CommandPalette />
      <Toast />
    </MotionConfig>
  )
}
