import { useUserPreferences } from '@context/UserPreferences'
import { useGdprMetadata } from '@hooks/useGdprMetadata'
import Button from '@shared/atoms/Button'
import Link from 'next/link'
import React, { Fragment } from 'react'
import content from '../../../content/footer.json'
import External from '@images/external.svg'
import styles from './Links.module.css'
import { useMarketMetadata } from '@context/MarketMetadata'

export default function Links() {
  const { appConfig } = useMarketMetadata()
  const { setShowPPC, privacyPolicySlug } = useUserPreferences()
  const cookies = useGdprMetadata()

  return (
    <div className={styles.links}>
      {content.links.map(({ name, url }) => (
        <Fragment key={name}>
          <Button style="text" size="small" href={url} target="_blank">
            {name} <External />
          </Button>
          {' — '}
        </Fragment>
      ))}
    </div>
  )
}
