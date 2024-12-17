import {MonthListProps, YearListProps, SortDateListProps} from "./typeListProps"

type DataProps = {
  list: {
    date: string,
    amount: number
  }[]
}

type MonthList = {
  month: string,
  amount: number
}

type YearList = {
  year: number,
  amount: number
}

type SortDateList = {
  date: string,
  amount: number
}

const withDataAggregation = (
  Component: React.ComponentType<MonthListProps | YearListProps | SortDateListProps>,
  action: string
) => {
  const Wrapper = (props: DataProps): JSX.Element => {
    let transformList: (MonthList | YearList | SortDateList)[] = [];

    if (action === 'month') {
      const monthList: MonthList[] = [];

      props.list.map(item => {
        monthList.push({
          month: String(new Date(item.date).toLocaleString('en-EN', { month: 'short' })),
          amount: item.amount
        })
        transformList = monthList;
      })
    }

    if (action === 'year') {
      const yearList:YearList[] = [];

      props.list.map(item => {
        yearList.push({
          year: +new Date(item.date).getFullYear(),
          amount: item.amount
        })
        transformList = yearList;
      })
    }
    if (action === 'sort') {
      const sortDateList: SortDateList[] = props.list.sort((a, b) => {
        return +new Date(a.date) - +new Date(b.date);
      })

      transformList = sortDateList;
    }

    return <Component list={transformList} />
  }

  return Wrapper;
}

export default withDataAggregation;