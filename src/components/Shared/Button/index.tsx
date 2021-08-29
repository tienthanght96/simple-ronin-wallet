import React from 'react'
import classnames from 'classnames'
import Link, { LinkProps } from 'next/link'

import styles from './Button.module.scss'

type ButtonLinkProps = Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  'onClick'
>

type BaseButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
>

type ExtendsProps = {
  onClick?: (
    event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void
  variant: 'blue' | 'normal' | 'transaprent'
  loading?: boolean
  block?: boolean
  iconSize?: 'xs' | 'md'
}

type Props = BaseButtonProps & Partial<LinkProps> & ExtendsProps

export const SharedButton: React.FC<Props> = ({
  className,
  href,
  variant,
  loading,
  prefetch,
  as,
  iconSize,
  block,
  children,
  onClick,
  ...props
}) => {
  const classNames = classnames(styles.button, className, {
    [styles.normal]: variant === 'normal',
    [styles.blue]: variant === 'blue',
    [styles.transaprent]: variant === 'transaprent',
    [styles.block]: block,
    [styles.loading]: loading,
    [styles.btnIcon]: !!iconSize,
    [styles.xsIcon]: iconSize === 'xs',
    [styles.mdIcon]: iconSize === 'md',
  })

  const onClickButton = (
    event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    onClick && onClick(event)
  }

  if (href) {
    return (
      <Link href={href} as={as} prefetch={prefetch}>
        <a
          className={classNames}
          {...(props as ButtonLinkProps)}
          onClick={onClickButton}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button className={classNames} {...props} onClick={onClickButton}>
      {children}
    </button>
  )
}
