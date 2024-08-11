import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';
import useDeposit, { Deposit } from '../../hooks/Deposit';

interface ChartProps {
  deposits: Deposit[];
  loading: boolean;
}

export default function Chart({ deposits, loading }: ChartProps) {
  const theme = useTheme();

    const data = deposits.map((deposit) => {
        const timeString = new Date(deposit.createdAt).toLocaleTimeString();
        
        // const formattedTime = timeString.replace(/(\d{2}):(\d{2})/, '$2-$1');
        
        return {
        time: timeString,
        amount: deposit.amount,
        };
    });

  return (
    <React.Fragment>
      <Title>Today's Deposits</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={loading ? [] : data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Amount ($)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: Math.max(...data.map((d) => d.amount), 2500),
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
