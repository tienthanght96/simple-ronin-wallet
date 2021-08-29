import React from 'react'
import { SharedPopupMessage } from '@/components/Shared/PopupMessage'

interface Props {
  status: 'none' | 'loading' | 'done' | 'failed'
  isOpen: boolean
  currency?: string
  onClick: () => void
}

export const PopupSendMessage: React.FC<Props> = ({
  isOpen,
  status,
  currency,
  onClick,
}) => {
  return (
    <SharedPopupMessage
      title={status === 'done' ? 'Successfully sent' : 'Unsuccessfully sent'}
      desc={
        status === 'done' ? (
          <React.Fragment>
            Your <strong>{currency}</strong> has been sent! <br />
            Thank you for using our service
          </React.Fragment>
        ) : (
          <React.Fragment>Could not sent. Please try again.</React.Fragment>
        )
      }
      isOpen={isOpen}
      onClick={onClick}
    />
  )
}
