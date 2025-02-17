import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar } from '../../components/sidebar';

const RecallListPage = () => {
  // Sample Patient Data
  const patients = [
    {
      name: 'Bauer, Martina',
      birthDate: '09.09.1981 (38)',
      phone: '036693 26 87',
      recallReason: 'Checkup 35 (07165), Früherkennung des kolorektalen Karzinoms (02134) ...',
      value: '15€',
      lastTreatment: '09.09.2019',
      contactStatus: 'Erledigt',
      nextAppointment: 'kein Termin',
    },
    {
      name: 'Berger, Sven',
      birthDate: '18.07.1947 (72)',
      phone: '04841 11 20 49',
      recallReason: 'Hautkrebsvorsorge für Männer (05683)',
      value: '99€',
      lastTreatment: '26.09.2019',
      contactStatus: '2. Erinnerung',
      nextAppointment: 'kein Termin',
    },
    {
      name: 'Friedrich, Oliver',
      birthDate: '16.01.1984 (35)',
      phone: '06523 72 43 19',
      recallReason: 'Früherkennung des kolorektalen Karzinoms (02134)',
      value: '50€',
      lastTreatment: '16.08.2019',
      contactStatus: '1. Erinnerung',
      nextAppointment: 'kein Termin',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar -  Imported from component for better organization*/}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Navigation -  Simplified for brevity*/}
        <header className="flex items-center justify-end px-6 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Shishir Singhee</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            {/* Icons can be added here if needed */}
          </div>
        </header>

        {/* Recall-Liste Content - Using Shadcn UI Cards and Tables*/}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recall-Liste</CardTitle>
            <CardDescription>Übersicht und Verwaltung der Patienten-Recalls.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters - Using Shadcn UI Select*/}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Recall-Grund" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkup">Checkup</SelectItem>
                  <SelectItem value="cancerScreening">Krebsvorsorge</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Letzte Behandlung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastWeek">Letzte Woche</SelectItem>
                  <SelectItem value="lastMonth">Letzter Monat</SelectItem>
                  <SelectItem value="lastYear">Letztes Jahr</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kontaktstatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contacted">Kontaktiert</SelectItem>
                  <SelectItem value="notContacted">Nicht kontaktiert</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Terminvereinbarung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointmentScheduled">Termin vereinbart</SelectItem>
                  <SelectItem value="noAppointment">Kein Termin</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>

            {/* Registered Patients - Using Shadcn UI Typography*/}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Registrierte Patienten</h2>
              <p className="text-gray-500 dark:text-gray-400">56 Patienten verfügbar für Recall via App</p>
            </div>

            {/* Notify Button - Using Shadcn UI Button*/}
            <Button className="mb-4">
              Ausgewählte Patienten benachrichtigen
            </Button>

            {/* Patient Table - Using Shadcn UI Table and ScrollArea for responsiveness */}
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Geburtsdatum</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Recall-Grund</TableHead>
                    <TableHead>Wert</TableHead>
                    <TableHead>Letzte Behandlung</TableHead>
                    <TableHead>Kontaktstatus</TableHead>
                    <TableHead>Nächster Termin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Checkbox />
                      </TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.birthDate}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.recallReason}</TableCell>
                      <TableCell>{patient.value}</TableCell>
                      <TableCell>{patient.lastTreatment}</TableCell>
                      <TableCell>{patient.contactStatus}</TableCell>
                      <TableCell>{patient.nextAppointment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default RecallListPage;