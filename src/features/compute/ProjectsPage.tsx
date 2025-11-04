import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Plus, FolderKanban, Server, Calendar, MoreVertical } from 'lucide-react';

const ProjectsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with useGetProjectsQuery()
  const projects = [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Main production environment for the e-commerce application',
      deployments: 5,
      createdAt: '2024-10-15',
    },
    {
      id: '2',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics and reporting system',
      deployments: 3,
      createdAt: '2024-10-20',
    },
    {
      id: '3',
      name: 'Mobile API',
      description: 'Backend API for mobile applications',
      deployments: 4,
      createdAt: '2024-11-01',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>Projects</h1>
          <p className='text-gray-400'>Organize your deployments into projects</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
          <Plus className='w-5 h-5' />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className='bg-gray-900 border border-gray-800 rounded-lg p-12 text-center'>
          <FolderKanban className='w-16 h-16 text-gray-600 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-white mb-2'>No projects yet</h3>
          <p className='text-gray-400 mb-6'>Create your first project to start deploying applications</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
            Create Project
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className='bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all group'>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center'>
                  <FolderKanban className='w-6 h-6 text-blue-400' />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle menu
                  }}
                  className='text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreVertical className='w-5 h-5' />
                </button>
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>{project.name}</h3>
              <p className='text-gray-400 text-sm mb-4 line-clamp-2'>{project.description}</p>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2 text-gray-400'>
                  <Server className='w-4 h-4' />
                  <span>{project.deployments} deployments</span>
                </div>
                <div className='flex items-center gap-2 text-gray-400'>
                  <Calendar className='w-4 h-4' />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-2xl font-bold text-white mb-4'>Create New Project</h2>
            <form className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Project Name</label>
                <input
                  type='text'
                  placeholder='e.g., My Awesome App'
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Description (optional)</label>
                <textarea
                  rows={3}
                  placeholder='Describe your project...'
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 resize-none'
                />
              </div>
              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowCreateModal(false)}
                  className='flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
