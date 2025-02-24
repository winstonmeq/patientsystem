import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import DateInput from "./date"; // Adjust path if needed


export default function PatientEntry({ onClose, onSaveSuccess, userId }: { onClose: () => void, onSaveSuccess: () => void, userId: string }) {

  const [date, setDate] = useState<Date | undefined>(undefined)

  const barangays = ["Del Carmen", "Poblacion", "Labuo", "Kamarahan", "Greenhill", "Camasi", "Idaoman", "Mabuhay", "Tuael", "Ilustre", "Cabangbangan","F. Cajelo",
                    "Sagcungan", "Alegria", "Lomonay", "La Esperanza", "New Cebu","Kimahuring", 'Kisupaan',"Salat", "Datu Sundungan", "Datu Inda","Lama-lama", "Bata-bato","Sarayan"
  ];
  const municipalities = ["President Roxas", "Matalam", "Magpet", "Antipas"];

  const [selectedDate, setSelectedDate] = useState("");

 

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '', 
    dateOfBirth: '',   
    barangay: '',
    municipality: 'President Roxas',
    province: 'Cotabato',
    userId:userId
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // Or perform other actions with the date
    setFormData((prev) => ({ ...prev, ['dateOfBirth']: date }));

  };




  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const patientData = {
      ...formData,
      // dateOfBirth: date ? format(date, "yyyy-MM-dd") : null
    }

    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      })

      console.log(patientData)

      if (response.ok) {
        console.log('Patient data saved successfully')
        onSaveSuccess() // Notify the parent component (PatientTable) to reload data
        onClose() // Close the form or reset as needed
      } else {
        console.error('Failed to save patient data')
      }
    } catch (error) {
      console.error('Error saving patient data:', error)
    }
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Personal Information Form</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" placeholder="Enter middle name" value={formData.middleName} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <DateInput onChange={handleDateChange} value={selectedDate} />
              

              </div>



              <div className="space-y-2">
                  <Label htmlFor="barangay">Barangay</Label>
                  <select
                    id="barangay"
                    name="barangay" // Important: Match this to your formData key
                    value={formData.barangay}

                    onChange={(event) => handleDropdownChange("barangay", event.target.value)}

                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200" // Add styling as needed
                    required
                  >
                    <option value="" disabled>Select Barangay</option> {/* Placeholder option */}
                    {barangays.map((barangay) => (
                      <option key={barangay} value={barangay}>
                        {barangay}
                      </option>
                    ))}
                  </select>
                  </div>




            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">

              
              <div className="space-y-2">
                  <Label htmlFor="barangay">Municipality</Label>
                  <select
                    id="municipality"
                    name="municipality" // Important: Match this to your formData key
                    value={formData.municipality}

                    onChange={(event) => handleDropdownChange("municipality", event.target.value)}

                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200" // Add styling as needed
                    required
                  >
                    <option value="" disabled>Select Municipality</option> {/* Placeholder option */}
                    {municipalities.map((items) => (
                      <option key={items} value={items}>
                        {items}
                      </option>
                    ))}
                  </select>
                  </div>


              </div>



              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input id="province" placeholder="Enter province" value={formData.province} onChange={handleChange} required />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
