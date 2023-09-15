import Grid from "@mui/material/Grid";
import FilledInfoCard from "../@dmt-components/cards/info-cards/filled-info-card";
import { useSelector } from "../../store";
import CurrencyFormat from "react-currency-format";
import OutlinedCards from "../@dmt-components/cards/outlined-cards";
import OutlinedCard from "../@dmt-components/cards/outlined-cards";

const summaries = [
  {
    id: 1,
    color: "primary",
    icon: "how_to_reg",
    title: "Registered Customers",
    type: "applicationCount",
    description:'10',
    variant: "filled",
  },
  {
    id: 2,
    color: "success",
    icon: "people",
    title: "Active Customers",
    type: "applicationCompleted",
    description:'9',

  },
  {
    id: 3,
    color: "error",
    icon: "block",
    title: "Inactive Customers",
    type: "applicationInComplete",
    description:'1'
  },
  {
    id: 4,
    color: "secondary",
    icon: "feedback",
    title: "Failed Registrations",
    type: "customersCount",
    description:'0'
  },
];
const getCount = (customers, applications, type) => {
  if (type === "customersCount") {
    return customers.length;
  } else {
    const applicationCount = applications.filter((application) => {
      if (type === "applicationCount") {
        return true;
      }
      if (type === "applicationCompleted") {
        return application.complete;
      }
      if (type === "applicationInComplete") {
        return !application.complete;
      }
      return true;
    });
    return applicationCount.length;
  }
};
const DashboardCards = () => {
  const { data } = useSelector(({ dashboard }) => dashboard);
  return (
    <>
      <Grid container spacing={2}>
        {summaries.map((summary, index) => (
            <Grid item xs={12} md={3} key={index}>
              {summary?.variant === 'filled' ? (
                  <FilledInfoCard
                      variant="gradient"
                      color={summary.color}
                      icon={summary.icon}
                      title={summary.title}
                      description={
                        <CurrencyFormat
                            displayType={"text"}
                            value={summary.description}
                            thousandSeparator={true}
                            prefix={""}
                        />
                      }
                  />
              ): (
                  <OutlinedCard
                      variant="gradient"
                      color={summary.color}
                      icon={summary.icon}
                      title={summary.title}
                      description={
                        <CurrencyFormat
                            displayType={"text"}
                            value={summary.description}
                            thousandSeparator={true}
                            prefix={""}
                        />
                      }
                  />
              )}

            </Grid>
        ))}

      </Grid>
    </>
  );
};

export default DashboardCards;
