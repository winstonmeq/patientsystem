import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"


export default function PatientEntry({ onClose, onSaveSuccess }: { onClose: () => void, onSaveSuccess: () => void }) {

  const [date, setDate] = useState<Date | undefined>(undefined)

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '', 
    dateOfBirth: '',   
    barangay: '',
    municipality: '',
    province: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }))
  }

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
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                
                <Input
                      type="date"
                      id="dateOfBirth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                    />
              

              </div>
              <div className="space-y-2">
                <Label htmlFor="barangay">Barangay</Label>
                <Input id="barangay" placeholder="Enter barangay" value={formData.barangay} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality</Label>
                <Input id="municipality" placeholder="Enter municipality" value={formData.municipality} onChange={handleChange} required />
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
