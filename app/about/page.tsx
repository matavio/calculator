'use client'
import { Card, CardHeader, CardBody } from '@heroui/react';
import React, { useState } from 'react';  

interface CalculationStep {
  letter: string;
  number: number;
  runningTotal: number;
}

const NameCalculator = () => {
  const [name, setName] = useState('');
  const [calculations, setCalculations] = useState<CalculationStep[]>([]);
  const [total, setTotal] = useState(0);

  // Create letter-to-number mapping based on the image
  const letterToNumber :any = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  const calculateName = (inputName:string) => {
    const steps:any = [];
    let runningTotal = 0;
    
    const cleanName = inputName.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let char of cleanName) {
      if (letterToNumber[char]) {
        const number = letterToNumber[char];
        runningTotal += number;
        steps.push({
          letter: char,
          number: number,
          runningTotal: runningTotal
        });
      }
    }
    
    setCalculations(steps);
    setTotal(runningTotal);
  };

  const handleNameChange = (e:any) => {
    const newName = e.target.value;
    setName(newName);
    calculateName(newName);
  };

  return (
    <Card  className="w-full max-w-xl mx-auto">
      <CardHeader>
        <p className="text-xl font-bold">Name Numerical Calculator</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a name..."
            />
          </div>

          {calculations.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Calculation Steps:</h3>
              <div className="space-y-2">
                {calculations.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="font-mono">{step.letter  ||  ""}</span>
                    <span className="text-gray-500">=</span>
                    <span className="font-mono">{step.number  ||  ""}</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-mono">Total: {step.runningTotal  ||  ""}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <span className="font-bold">Final Total: {total}</span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default NameCalculator;