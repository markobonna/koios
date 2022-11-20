import React, { ReactElement, useEffect, useState } from 'react'
import Button from '@shared/atoms/Button'
import Bookmarks from './Bookmarks'
import { generateBaseQuery } from '@utils/aquarius'
import { useUserPreferences } from '@context/UserPreferences'
import { SortTermOptions } from '../../@types/aquarius/SearchQuery'
import TopSales from './TopSales'
import TopTags from './TopTags'
import SectionQueryResult from './SectionQueryResult'
import styles from './index.module.css'
import Allocations from './Allocations'
import MostViews from './MostViews'

export default function HomePage(): ReactElement {
  const { chainIds } = useUserPreferences()

  const [queryLatest, setQueryLatest] = useState<SearchQuery>()
  const [queryMostSales, setQueryMostSales] = useState<SearchQuery>()

  const [queryMostAllocation, setQueryMostAllocation] = useState<SearchQuery>()

  useEffect(() => {
    const baseParams = {
      chainIds,
      esPaginationOptions: {
        size: 6
      },
      sortOptions: {
        sortBy: SortTermOptions.Created
      } as SortOptions
    } as BaseQueryParams
    setQueryLatest(generateBaseQuery(baseParams))

    const baseParamsSales = {
      chainIds,
      esPaginationOptions: {
        size: 6
      },
      sortOptions: {
        sortBy: SortTermOptions.Orders
      } as SortOptions
    } as BaseQueryParams
    setQueryMostSales(generateBaseQuery(baseParamsSales))
    const baseParamsAllocation = {
      chainIds,
      esPaginationOptions: {
        size: 6
      },
      sortOptions: {
        sortBy: SortTermOptions.Allocated
      } as SortOptions
    } as BaseQueryParams
    setQueryMostAllocation(generateBaseQuery(baseParamsAllocation))
  }, [chainIds])

  return (
    <>
      <section className={styles.section}>
        <h2>Your Saved Public Datasets</h2>
        <Bookmarks />
      </section>

      <Allocations />

      <section className={styles.section}>
        <h2>Public Datasets By Commited Funding</h2>
        <SectionQueryResult query={queryMostAllocation} />
      </section>

      <section className={styles.section}>
        <h2>Public Datasets By Sales</h2>
        <SectionQueryResult query={queryMostSales} />
      </section>
      <MostViews />

      <section className={styles.section}>
        <h2>Publishers By Sales</h2>
        <TopSales />
      </section>

      <section className={styles.section}>
        <h2>Top Public Dataset Tags By Sales</h2>
        <TopTags />
      </section>

      <section className={styles.section}>
        <h2>Recently Published Public Datasets</h2>
      </section>
      <SectionQueryResult
        query={queryLatest}
        action={
          <Button style="text" to="/search?sort=nft.created&sortOrder=desc">
            All Public datasets and algorithms on Koios →
          </Button>
        }
      />
    </>
  )
}
