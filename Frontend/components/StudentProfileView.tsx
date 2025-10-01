// Student Profile Component
export default function StudentProfileView() {
  // Mock student data for demonstration 
  const student = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    grade: "12th",
    country: "USA",
    applicationStatus: "Exploring",
    lastActive: "2025-09-30",
    createdAt: "2025-09-01"
  };

  return (

<div className="bg-white shadow overflow-hidden sm:rounded-lg">
<div className="px-4 py-5 sm:px-6">
<h3 className="text-lg leading-6 font-medium text-gray-900">Student Profile</h3>
<p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed information about the student</p>
</div>
<div className="border-t border-gray-200">
<dl>
<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Full name</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.name}</dd>
</div>
<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Email address</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.email}</dd>
</div>
<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Phone number</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.phone}</dd>
</div>
<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Grade</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.grade}</dd>
</div>
<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Country</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.country}</dd>
</div>
<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Application Status</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
student.applicationStatus === "Exploring" ? "bg-blue-100 text-blue-800" :
student.applicationStatus === "Shortlisting" ? "bg-yellow-100 text-yellow-800" :
student.applicationStatus === "Applying" ? "bg-green-100 text-green-800" :
"bg-gray-100 text-gray-800"
}`}>
{student.applicationStatus}
</span>
</dd>
</div>
<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Last Active</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.lastActive}</dd>
</div>
<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
<dt className="text-sm font-medium text-gray-500">Created</dt>
<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{student.createdAt}</dd>
</div>
</dl>
</div>
</div>
)
  
}
