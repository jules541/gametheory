import { GameProvider } from '@/context/GameContext'
import { MainLayout } from '@/components/layout/MainLayout'

function App() {
  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  )
}

export default App
