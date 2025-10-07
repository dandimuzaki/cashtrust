import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import { getTransactionsByCategory } from '../services/transactionService';

const RADIAN = Math.PI / 180;
const COLORS = ['#0374d9', '#fee254', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const CategoryPie = React.memo(({loading, categoryData}) => {
  console.log("Rendering CategoryPie")

  return (
    <>
  {(<ResponsiveContainer>
    <PieChart>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        dataKey="total"
        nameKey="category"
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
      layout="vertical"
      align="right"
      verticalAlign="middle"
      />
    </PieChart>
  </ResponsiveContainer>)}
  </>
  );
})

export default CategoryPie
