import React, { useState } from 'react'
import classnames from 'classnames'
import { FormSendAssets } from '@/components/SendAssets/FormSendAssets'
import { FooterButtons } from '@/components/SendAssets/FooterButtons'
import { SharedPageHeader } from '@/components/Shared/PageHeader'
import { Layout } from '@/components/Layout'
import { PopupListAsset } from '@/components/SendAssets/PopupListAsset'
import { PopupSendSuccess } from '@/components/SendAssets/PopupSendSuccess'

import styles from './SendAssets.module.scss'

interface Props {}

export const SendAssetsView: React.FC<Props> = ({}) => {
  const [isOpenPopupListAsset, setIsOpenPopupListAsset] = useState(false)
  const [isOpenPopupSuccess, setIsOpenPopupSuccess] = useState(false)

  const onOpenPopupListAsset = () => {
    setIsOpenPopupListAsset(true)
  }

  const onOpenPopupSuccess = () => {
    setIsOpenPopupSuccess(true)
  }

  const onClosePopupListAsset = () => {
    setIsOpenPopupListAsset(false)
  }

  const onClosePopupSuccess = () => {
    setIsOpenPopupSuccess(false)
  }

  return (
    <Layout title="Send Assets" className={styles.layout}>
      <SharedPageHeader title="Send Assets" />
      <div className={classnames(styles.container)}>
        <FormSendAssets openListAsset={onOpenPopupListAsset} />
        <FooterButtons onSend={onOpenPopupSuccess} />
      </div>
      <PopupListAsset
        isOpen={isOpenPopupListAsset}
        onClose={onClosePopupListAsset}
      />
      <PopupSendSuccess
        isOpen={isOpenPopupSuccess}
        onClick={onClosePopupSuccess}
      />
    </Layout>
  )
}
