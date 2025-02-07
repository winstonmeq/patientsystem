

'use client'
import { useEffect, useState } from 'react';

interface Patient {
  _id: string
  firstName: string
  lastName: string
  middleName: string
  dateOfBirth: string
  barangay: string
  municipality: string
  province: string
}


export default function Home(): JSX.Element {

  const [data, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");
   
    eventSource.onmessage = (event) => {
      try {
        const newPatient = JSON.parse(event.data);
    
        setPatients((prev) => [newPatient, ...prev]);

        console.log(newPatient)
      } catch (error) {
        console.error("Error parsing stream data:", error);
      }
    };


    return () => eventSource.close();
  }, []);

 
  console.log(data);
  return (
    <div>
            <h1>Real-Time Dashboard</h1>
<div>
{data.map((item) => (
          <div key={item._id}>
            {item.firstName}: {item.lastName}
          </div>
        ))}
</div>
        
      
    </div>
  );
}