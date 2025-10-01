// Communication Log Component
export default function CommunicationLog() {
  // Mock data for demonstration
  const communications = [
    { id: 1, student: "John Doe", type: "Email", subject: "Application Update", date: "2025-09-30" },
    { id: 2, student: "Jane Smith", type: "Call", subject: "Follow-up Discussion", date: "2025-09-29" },
  ]

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Communication Log</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent communications with students</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {communications.map((comm) => (
          <li key={comm.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{comm.student}</div>
                  <div className="text-sm text-gray-500">{comm.subject}</div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    comm.type === 'Email' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {comm.type}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{comm.date}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


