import MonthCard from "../../components/MonthCard/MonthCard"

const FinanceTrackerHome = ({setTitle,currentYear,title}) => {

  return (
    <div>
      <MonthCard setTitle={setTitle} title={title} currentYear={currentYear}/>
    </div>
  )
}

export default FinanceTrackerHome