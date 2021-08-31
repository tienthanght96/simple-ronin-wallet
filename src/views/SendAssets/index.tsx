import React from 'react'
import classnames from 'classnames'
import { FormSendAssets } from '@/components/SendAssets/FormSendAssets'
import { FooterButtons } from '@/components/SendAssets/FooterButtons'
import { SharedPageHeader } from '@/components/Shared/PageHeader'
import { Layout } from '@/components/Layout'
import { PopupListAsset } from '@/components/SendAssets/PopupListAsset'
import { PopupSendMessage } from '@/components/SendAssets/PopupSendMessage'
import { useSendAssetsViewHook } from './hook'

import styles from './SendAssets.module.scss'

interface Props {}

export const SendAssetsView: React.FC<Props> = ({}) => {
  const {
    isOpenPopupListAsset,
    isOpenPopupSuccess,
    form,
    errors,
    requestStatus,
    // methods
    onOpenPopupListAsset,
    onClosePopupSuccess,
    onClosePopupListAsset,
    onSelectBalance,
    onChangeInputFields,
    onSend,
  } = useSendAssetsViewHook()

  return (
    <Layout title="Send Assets" className={styles.layout}>
      <SharedPageHeader title="Send Assets" />
      <div className={classnames(styles.container)}>
        <FormSendAssets
          errors={errors}
          form={form}
          onChange={onChangeInputFields}
          openListAsset={onOpenPopupListAsset}
        />
        <FooterButtons loading={requestStatus === 'loading'} onSend={onSend} />
      </div>
      <PopupListAsset
        isOpen={isOpenPopupListAsset}
        selectBalance={form.balance}
        onSelect={onSelectBalance}
        onClose={onClosePopupListAsset}
      />
      <PopupSendMessage
        status={requestStatus}
        currency={form.balance?.currency}
        isOpen={
          isOpenPopupSuccess &&
          (requestStatus === 'done' || requestStatus === 'failed')
        }
        onClick={onClosePopupSuccess}
      />
    </Layout>
  )
}
