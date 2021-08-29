import { MainView } from '@/views/Main'
import { withAuth } from '@/hocs/withAuth'

function Home() {
  return <MainView />
}

export default withAuth(Home)
