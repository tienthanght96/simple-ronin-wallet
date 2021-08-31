import { NextPage } from 'next'
import { withAuth } from '@/hocs/withAuth'
import { BalanceModel } from '@/models/BalanceMode'
import { BalanceView } from '@/views/Balance'
import { useRouter } from 'next/router'
import { ApiService } from '@/services/Api'
import { useEffect, useState } from 'react'

interface PageProps {
  token?: string
  balance: BalanceModel | null
}

const Balance: NextPage<PageProps> = () => {
  const router = useRouter()
  const balanceId = router.query?.id as string
  const [balance, setBalance] = useState<BalanceModel | null>(null)

  useEffect(() => {
    getBalance()
  }, [balanceId])

  const getBalance = async () => {
    try {
      const { data } = await ApiService.getBalance(balanceId)
      setBalance(data)
    } catch (error) {
      setBalance(null)
    }
  }

  return <BalanceView balance={balance} />
}

export default withAuth(Balance as NextPage)
