import React, { useState, useEffect } from 'react';
import Linechart from './LineChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';

export default function Dashboard() {
  return (
    <div className='w-full pt-22 mt-2 bg-slate-100 '>
      <Linechart />
      <div className='lg:flex gap-3   transition-all duration-300'>
        {/* Bar Chart takes up more width on larger screens */}
        <div className='flex-grow-[2] basis-0 min-h-0 flex-shrink rounded-md shadow-sm p-2'>
          <BarChart />
        </div>
        {/* Donut Chart takes up less width on larger screens */}
        <div className='flex-grow-[1] flex-shrink basis-0 p-2 rounded-md shadow-sm '>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}