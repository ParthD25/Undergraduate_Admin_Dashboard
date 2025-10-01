// Student Directory Table Component
import { useState } from 'react'

export default function StudentTable() {
  const [followUpStatus, setFollowUpStatus] = useState<{[key: number]: string}>({})

  // Mock data for demonstration
  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "exploring", country: "USA" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "shortlisting", country: "Canada" },
  ]

  const handleFollowUp = async (student: any) => {
    try {
      setFollowUpStatus(prev => ({ ...prev, [student.id]: 'sending' }))

      // Mock follow-up email - in real app this would call the API
      const response = await fetch(`http://localhost:3001/api/students/${student.id}/followup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored
        },
        body: JSON.stringify({
          to: student.email,
          subject: `Follow-up: ${student.name}`,
          body: `Dear ${student.name},\n\nThis is a follow-up regarding your application status.\n\nBest regards,\nAdmin Team`
        })
      })

      if (response.ok) {
        setFollowUpStatus(prev => {
          const newStatus = { ...prev }
          newStatus[student.id] = 'sent'
          return newStatus
        })
        setTimeout(() => {
          setFollowUpStatus(prev => {
            const newStatus = { ...prev }
            delete newStatus[student.id]
            return newStatus
          })
        }, 3000)
      } else {
        throw new Error('Failed to send follow-up')
      }
    } catch (error) {
      console.error('Error sending follow-up:', error)
      setFollowUpStatus(prev => {
        const newStatus = { ...prev }
        newStatus[student.id] = 'error'
        return newStatus
      })
      setTimeout(() => {
        setFollowUpStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[student.id]
          return newStatus
        })
      }, 3000)
    }
  }

  return (
  <div className="bg-white shadow overflow-hidden sm:rounded-md">
<div className="px-4 py-5 sm:px-6">
<h3 className="text-lg leading-6 font-medium text-gray-900">Students</h3>
<p className="mt-1 max-w-2xl text-sm text-gray-500">List of all undergraduate students</p>
</div>
<ul className="divide-y divide-gray-200">
{students.map((student) => (
<li key={student.id}>
<div className="px-4 py-4 sm:px-6">
<div className="flex items-center justify-between">
<div className="flex items-center">
<div className="flex-shrink-0 h-10 w-10">
<div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
<span className="text-sm font-medium text-gray-700">{student.name.charAt(0)}</span>
</div>
</div>
<div className="ml-4">
<div className="text-sm font-medium text-gray-900">{student.name}</div>
<div className="text-sm text-gray-500">{student.email}</div>
</div>
</div>
<div className="flex items-center">
<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === "exploring" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
{student.status}
</span>
<span className="ml-2 text-sm text-gray-500">{student.country}</span>
<button
  onClick={() => handleFollowUp(student)}
  disabled={followUpStatus[student.id] === 'sending'}
  className={`ml-4 px-3 py-1 text-xs font-medium rounded ${
    followUpStatus[student.id] === 'sent'
      ? 'bg-green-100 text-green-800'
      : followUpStatus[student.id] === 'error'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  }`}
>
  {followUpStatus[student.id] === 'sending' && 'Sending...'}
  {followUpStatus[student.id] === 'sent' && 'Sent!'}
  {followUpStatus[student.id] === 'error' && 'Failed'}
  {!followUpStatus[student.id] && 'Follow-up'}
</button>
</div>
</div>
</div>
</li>
))}
</ul>
</div>

  )
}


