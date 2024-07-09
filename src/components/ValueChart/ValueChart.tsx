import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './ValueChart.css';

/**
 * Custom Dot component to control the visibility of the dot.
 */
const CustomDot = ({ cx, cy, value }: any) => {
  if (value === 0) {
    return null; // Hide the dot at the start point
  }
  return (
    <circle
      r={10}
      stroke="#ffd700"
      fill="#ffd700"
      cx={cx}
      cy={cy}
    />
  );
};

/**
 * ValueChart component for displaying the generated value and graph.
 */
const ValueChart: React.FC = () => {
  const generatedValue = useSelector((state: RootState) => state.game.generatedValue);
  const chartData = [{ value: 0 }, { value: generatedValue }];
  const speedValue = useSelector((state: RootState) => state.game.speed);
  const [isCountingFinished, setIsCountingFinished] = useState(false);

  /**
   * Calculate the speed for the graph animation.
   * @returns {number} - Speed in milliseconds.
   */
  const calcSpeed = (): number => {
    return 3000 / (speedValue || 1);
  };

  // Reset the CountUp finished state and color when generatedValue changes
  useEffect(() => {
    console.log('Generated value changed:', generatedValue);
    setIsCountingFinished(false);
  }, [generatedValue]);

  const handleCountUpEnd = () => {
    console.log('CountUp finished');
    setIsCountingFinished(true);
  };

  return (
    <div className="col-12 mt-3" data-testid="value-chart-container">
      <div className="card-box chart-container">
        <div className={`chart-result ${isCountingFinished ? 'animation-ended' : ''}`}>
          <CountUp
            start={0}
            end={generatedValue}
            redraw={false}
            duration={calcSpeed() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            suffix="x"
            onEnd={handleCountUpEnd}
          />
        </div>

        <LineChart
          width={500}
          height={300}
          data={chartData}
          key={Math.random()}
        >
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#fb544e"
            dot={<CustomDot />} // Use CustomDot to control dot visibility
            animationDuration={calcSpeed()}
            hide={generatedValue === 0}
          />
          <YAxis domain={[0, 10]} hide={true} />
          <XAxis
            type="number"
            domain={[0, 10]}
            tickCount={11}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tick={{ fill: '#808080' }}
            dataKey="value"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default ValueChart;
