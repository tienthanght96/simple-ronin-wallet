import React from 'react'
import { EnumCurrency } from '@/constants/currency'
import USDIcon from '@/assets/icons/ic-usd.svg'
import EurIcon from '@/assets/icons/ic-eur.svg'
import YenIcon from '@/assets/icons/ic-yen.svg'

interface Props extends React.SVGProps<SVGSVGElement> {
  currency: string
}

export const CurrencyIcon: React.FC<Props> = ({
  currency,
  className,
  ...props
}) => {
  const IconComponent = (() => {
    let icon: React.ReactNode = null

    switch (currency) {
      case EnumCurrency.EUR:
        icon = <EurIcon {...props} />
        break
      case EnumCurrency.JPY:
        icon = <YenIcon {...props} />
        break
      case EnumCurrency.USD:
        icon = <USDIcon {...props} />
        break

      default:
        break
    }

    return icon
  })()

  return <React.Fragment>{IconComponent}</React.Fragment>
}
