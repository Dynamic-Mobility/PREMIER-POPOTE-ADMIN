import Grid from "@mui/material/Grid";
import FilledInfoCard from "../@dmt-components/cards/info-cards/filled-info-card";
import CurrencyFormat from "react-currency-format";
import OutlinedCard from "../@dmt-components/cards/outlined-cards";

const summaries = [
  {
    id: 1,
    color: "primary",
    icon: "how_to_reg",
    title: "Registered Customers",
    type: "applicationCount",
    description:'0',
    variant: "filled",
  },
  {
    id: 2,
    color: "success",
    icon: "people",
    title: "Active Customers",
    type: "applicationCompleted",
    description:'0',

  },
  {
    id: 3,
    color: "error",
    icon: "block",
    title: "Inactive Customers",
    type: "applicationInComplete",
    description:'0'
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
const DashboardCards = () => {
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
