// Tasks component for managing reminders and scheduled tasks
import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask } from '../lib/api'

interface Task {
  id: string
  title: string
  description: string
  studentId: string
  studentName?: string
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title:'',
    description: '',
    studentId:'',
    studentName:'' ,
    dueDate: '' ,
    priority: 'medium' as const})

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const response = await getTasks()
      setTasks(response)
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask({
        ...formData,
        status: 'pending'
      })
      setFormData({
        title: '',
        description: '',
        studentId: '',
        studentName: '',
        dueDate: '',
        priority: 'medium'
      })
      setShowForm(false)
      loadTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async (taskId: string, status: string) => {
    try {
      await updateTask(taskId, { status })
      loadTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  if (loading) {
    return <div className='text-center py-8'>Loading tasks...</div>
  }

  return (
    <div className='space-y-6'>
      {/* Header with Add Task Button */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-gray-900'>Tasks & Reminders</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className='bg-white p-6 rounded-lg shadow border'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Create New Task</h3>
          <form onSubmit={handleCreateTask} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Title</label>
                <input
                  type='text'
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Student ID</label>
                <input
                  type='text'
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Due Date</label>
                <input
                  type='datetime-local'
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
            </div>
            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => setShowForm(false)}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className='space-y-4'>
        {tasks.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>
            No tasks found. Create your first task above.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className='bg-white p-6 rounded-lg shadow border'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center space-x-3 mb-2'>
                    <h3 className='text-lg font-medium text-gray-900'>{task.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className='text-gray-600 mb-2'>{task.description}</p>
                  <div className='text-sm text-gray-500'>
                    <span>Student: {task.studentName || task.studentId}</span>
                    <span className='mx-2'>•</span>
                    <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
                  </div>
                </div>
                <div className='flex space-x-2'>
                  {task.status !== 'completed' && (
                    <button
                      onClick={() => handleUpdateTask(task.id, 'completed')}
                      className='bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700'
                    >
                      Complete
                    </button>
                  )}
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateTask(task.id, 'overdue')}
                      className='bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700'
                    >
                      Mark Overdue
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}