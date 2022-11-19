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
        <h3>Your Saved Public Datasets</h3>
        <Bookmarks />
      </section>

      <Allocations />

      <SectionQueryResult
        title="Public Datasets By Commited Funding "
        query={queryMostAllocation}
      />

      <SectionQueryResult
        title="Public Datasets By Sales"
        query={queryMostSales}
      />
      <MostViews />
      <TopSales title="Publishers By Sales" />
      <TopTags title="Top Public Dataset Tags By Sales" />

      <SectionQueryResult
        title="Recently Published Public Datasets"
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
