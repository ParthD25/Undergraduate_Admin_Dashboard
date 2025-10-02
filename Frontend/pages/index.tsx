// Main dashboard page - Student Directory View
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import StudentTable from '../components/StudentTable'
import CommunicationLog from '../components/CommunicationLog'
import Tasks from '../components/Tasks'
import { getInsights } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

type TabType = 'students' | 'communications' | 'notes' | 'tasks' | 'progress' | 'analytics'

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('students')
  const [insights, setInsights] = useState({
    totalStudents: 0,
    activeCommunications: 0,
    pendingTasks: 0
  })

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    if (currentUser === null) {
      router.push('/login')
      return
    }
  }, [currentUser, router])

  // Show loading or redirect if not authenticated
  if (currentUser === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Student Directory</h2>
            <StudentTable />
          </div>
        )
      case 'communications':
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Communication Log</h2>
            <CommunicationLog />
          </div>
        )
      case 'notes':
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Internal Notes</h2>
            <div className='space-y-4'>
              <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                        Academic Concern
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>John Smith - Math 101</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 28, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Student struggling with calculus concepts. Recommended additional tutoring sessions.
                  Follow-up meeting scheduled for next week.
                </p>
              </div>

              <div className='bg-blue-50 border-l-4 border-blue-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        Achievement
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Sarah Johnson - Research Project</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 25, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Outstanding performance on biology research paper. Scored 98%.
                  Nominated for departmental excellence award.
                </p>
              </div>

              <div className='bg-red-50 border-l-4 border-red-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                        Personal Issue
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Mike Chen - Attendance</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 20, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Student reported family emergency. Missed 3 classes this week.
                  Extended deadline for assignments. Counseling services notified.
                </p>
              </div>

              <div className='bg-green-50 border-l-4 border-green-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Positive Update
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Emily Davis - Career Development</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 18, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Successfully completed internship interview with Tech Corp.
                  Strong communication skills noted by interviewer. Resume updated.
                </p>
              </div>
            </div>
          </div>
        )
      case 'tasks':
        return <Tasks />
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Internal Notes</h2>
            <div className='space-y-4'>
              <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                        Academic Concern
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>John Smith - Math 101</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 28, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Student struggling with calculus concepts. Recommended additional tutoring sessions.
                  Follow-up meeting scheduled for next week.
                </p>
              </div>

              <div className='bg-blue-50 border-l-4 border-blue-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        Achievement
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Sarah Johnson - Research Project</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 25, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Outstanding performance on biology research paper. Scored 98%.
                  Nominated for departmental excellence award.
                </p>
              </div>

              <div className='bg-red-50 border-l-4 border-red-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                        Personal Issue
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Mike Chen - Attendance</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 20, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Student reported family emergency. Missed 3 classes this week.
                  Extended deadline for assignments. Counseling services notified.
                </p>
              </div>

              <div className='bg-green-50 border-l-4 border-green-400 p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Positive Update
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>Emily Davis - Career Development</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500'>Sep 18, 2025</p>
                </div>
                <p className='mt-2 text-sm text-gray-700'>
                  Successfully completed internship interview with Tech Corp.
                  Strong communication skills noted by interviewer. Resume updated.
                </p>
              </div>
            </div>
          </div>
        )
      case 'progress':
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Progress Monitoring</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>JD</span>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3 className='text-lg font-medium text-gray-900'>John Doe</h3>
                      <p className='text-sm text-gray-500'>Computer Science</p>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>GPA</span>
                      <span className='font-medium'>3.8</span>
                    </div>
                    <div className='mt-2 bg-gray-200 rounded-full h-2'>
                      <div className='bg-green-500 h-2 rounded-full' style={{width: '85%'}}></div>
                    </div>
                    <div className='mt-3 flex justify-between text-xs text-gray-500'>
                      <span>12/14 Credits Completed</span>
                      <span>On Track</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>SJ</span>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3 className='text-lg font-medium text-gray-900'>Sarah Johnson</h3>
                      <p className='text-sm text-gray-500'>Biology</p>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>GPA</span>
                      <span className='font-medium'>3.6</span>
                    </div>
                    <div className='mt-2 bg-gray-200 rounded-full h-2'>
                      <div className='bg-blue-500 h-2 rounded-full' style={{width: '75%'}}></div>
                    </div>
                    <div className='mt-3 flex justify-between text-xs text-gray-500'>
                      <span>9/12 Credits Completed</span>
                      <span>Minor Delay</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>MC</span>
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h3 className='text-lg font-medium text-gray-900'>Mike Chen</h3>
                      <p className='text-sm text-gray-500'>Engineering</p>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>GPA</span>
                      <span className='font-medium'>2.9</span>
                    </div>
                    <div className='mt-2 bg-gray-200 rounded-full h-2'>
                      <div className='bg-yellow-500 h-2 rounded-full' style={{width: '45%'}}></div>
                    </div>
                    <div className='mt-3 flex justify-between text-xs text-gray-500'>
                      <span>6/13 Credits Completed</span>
                      <span>Needs Attention</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8 bg-white shadow rounded-lg p-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>Recent Milestones</h3>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <div className='flex-shrink-0 w-2 h-2 bg-green-500 rounded-full'></div>
                  <p className='text-sm text-gray-700'>Emily Davis completed her senior thesis defense (A-)</p>
                  <span className='text-xs text-gray-500'>2 days ago</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full'></div>
                  <p className='text-sm text-gray-700'>Robert Wilson passed all prerequisite exams for graduate program</p>
                  <span className='text-xs text-gray-500'>1 week ago</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full'></div>
                  <p className='text-sm text-gray-700'>Lisa Park enrolled in advanced mathematics course</p>
                  <span className='text-xs text-gray-500'>2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Analytics Dashboard</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>👥</span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Total Students</dt>
                        <dd className='text-lg font-medium text-gray-900'>1,247</dd>
                      </dl>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <span className='text-sm text-green-600'>+12% from last month</span>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-green-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>📈</span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Avg GPA</dt>
                        <dd className='text-lg font-medium text-gray-900'>3.4</dd>
                      </dl>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <span className='text-sm text-green-600'>+0.2 from last semester</span>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>⏰</span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Response Time</dt>
                        <dd className='text-lg font-medium text-gray-900'>2.3 hrs</dd>
                      </dl>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <span className='text-sm text-red-600'>+0.5 hrs from last week</span>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-red-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-bold'>⚠️</span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>At-Risk Students</dt>
                        <dd className='text-lg font-medium text-gray-900'>23</dd>
                      </dl>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <span className='text-sm text-green-600'>-5 from last month</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white shadow rounded-lg p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>Enrollment by Major</h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>Computer Science</span>
                    <div className='flex items-center'>
                      <div className='w-32 bg-gray-200 rounded-full h-2 mr-3'>
                        <div className='bg-blue-500 h-2 rounded-full' style={{width: '35%'}}></div>
                      </div>
                      <span className='text-sm text-gray-500'>245</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>Business</span>
                    <div className='flex items-center'>
                      <div className='w-32 bg-gray-200 rounded-full h-2 mr-3'>
                        <div className='bg-green-500 h-2 rounded-full' style={{width: '28%'}}></div>
                      </div>
                      <span className='text-sm text-gray-500'>189</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>Biology</span>
                    <div className='flex items-center'>
                      <div className='w-32 bg-gray-200 rounded-full h-2 mr-3'>
                        <div className='bg-yellow-500 h-2 rounded-full' style={{width: '20%'}}></div>
                      </div>
                      <span className='text-sm text-gray-500'>134</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>Engineering</span>
                    <div className='flex items-center'>
                      <div className='w-32 bg-gray-200 rounded-full h-2 mr-3'>
                        <div className='bg-red-500 h-2 rounded-full' style={{width: '17%'}}></div>
                      </div>
                      <span className='text-sm text-gray-500'>112</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white shadow rounded-lg p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>Communication Trends</h3>
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-blue-500 rounded mr-3'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>Email Communications</p>
                      <p className='text-xs text-gray-500'>+15% this month</p>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>847</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-green-500 rounded mr-3'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>Meeting Requests</p>
                      <p className='text-xs text-gray-500'>+8% this month</p>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>156</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-yellow-500 rounded mr-3'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>Academic Alerts</p>
                      <p className='text-xs text-gray-500'>-12% this month</p>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>43</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-red-500 rounded mr-3'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>Urgent Issues</p>
                      <p className='text-xs text-gray-500'>+3% this month</p>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>28</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 bg-white shadow rounded-lg p-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>Recent Activity Summary</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>127</div>
                  <div className='text-sm text-gray-500'>New Enrollments</div>
                  <div className='text-xs text-green-600 mt-1'>This week</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>89%</div>
                  <div className='text-sm text-gray-500'>Retention Rate</div>
                  <div className='text-xs text-green-600 mt-1'>+2% vs last year</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-yellow-600'>4.2</div>
                  <div className='text-sm text-gray-500'>Avg Response Rating</div>
                  <div className='text-xs text-green-600 mt-1'>Out of 5 stars</div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-lg'>
        <div className='p-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Dashboard</h2>
        </div>
        <nav className='mt-6'>
          <button
            onClick={() => setActiveTab('students')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'students' ? 'bg-gray-200' : ''}`}
          >
            Student Directory
          </button>
          <button
            onClick={() => setActiveTab('communications')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'communications' ? 'bg-gray-200' : ''}`}
          >
            Communication Log
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'notes' ? 'bg-gray-200' : ''}`}
          >
            Internal Notes
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'tasks' ? 'bg-gray-200' : ''}`}
          >
            Tasks & Reminders
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'progress' ? 'bg-gray-200' : ''}`}
          >
            Progress Monitoring
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-100 ${activeTab === 'analytics' ? 'bg-gray-200' : ''}`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Undergraduate Admin Dashboard</h1>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-600'>Welcome, {currentUser?.email}</span>
              <button
                onClick={handleLogout}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium'
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            {renderContent()}

            {/* Quick Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-blue-500 rounded'></div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Total Students</dt>
                        <dd className='text-lg font-medium text-gray-900'>{insights.totalStudents}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-green-500 rounded'></div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Active Communications</dt>
                        <dd className='text-lg font-medium text-gray-900'>{insights.activeCommunications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-yellow-500 rounded'></div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>Pending Tasks</dt>
                        <dd className='text-lg font-medium text-gray-900'>{insights.pendingTasks}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
