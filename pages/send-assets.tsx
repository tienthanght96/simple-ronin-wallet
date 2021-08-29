import { withAuth } from '@/hocs/withAuth'
import { SendAssetsView } from '@/views/SendAssets'

function SendAssets() {
  return <SendAssetsView />
}

export default withAuth(SendAssets)
