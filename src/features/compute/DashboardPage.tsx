import { Link } from 'react-router-dom';
import { FolderKanban, Server, Activity, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalProjects: 5,
    totalDeployments: 12,
    activeDeployments: 8,
    balance: 47.82,
    monthlySpend: 23.45,
  };

  const recentDeployments = [
    {
      id: '1',
      name: 'api-service',
      project: 'E-commerce Platform',
      status: 'running',
      replicas: 3,
      updatedAt: '2 hours ago',
    },
    {
      id: '2',
      name: 'frontend-app',
      project: 'E-commerce Platform',
      status: 'running',
      replicas: 2,
      updatedAt: '5 hours ago',
    },
    {
      id: '3',
      name: 'worker-queue',
      project: 'Analytics Dashboard',
      status: 'pending',
      replicas: 1,
      updatedAt: '10 minutes ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'failed':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-white mb-2'>Dashboard</h1>
        <p className='text-gray-400'>Welcome back! Here's what's happening with your deployments.</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center'>
              <FolderKanban className='w-6 h-6 text-blue-400' />
            </div>
            <span className='text-green-400 text-sm flex items-center gap-1'>
              <TrendingUp className='w-4 h-4' />
              +2
            </span>
          </div>
          <div className='text-3xl font-bold text-white mb-1'>{stats.totalProjects}</div>
          <div className='text-gray-400 text-sm'>Total Projects</div>
        </div>

        <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center'>
              <Server className='w-6 h-6 text-purple-400' />
            </div>
            <span className='text-green-400 text-sm flex items-center gap-1'>
              <TrendingUp className='w-4 h-4' />
              +5
            </span>
          </div>
          <div className='text-3xl font-bold text-white mb-1'>{stats.totalDeployments}</div>
          <div className='text-gray-400 text-sm'>Total Deployments</div>
        </div>

        <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center'>
              <Activity className='w-6 h-6 text-green-400' />
            </div>
          </div>
          <div className='text-3xl font-bold text-white mb-1'>{stats.activeDeployments}</div>
          <div className='text-gray-400 text-sm'>Active Deployments</div>
        </div>

        <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center'>
              <DollarSign className='w-6 h-6 text-yellow-400' />
            </div>
            <Link
              to='/billing'
              className='text-blue-400 text-sm hover:text-blue-300'>
              View
            </Link>
          </div>
          <div className='text-3xl font-bold text-white mb-1'>${stats.balance.toFixed(2)}</div>
          <div className='text-gray-400 text-sm'>Current Balance</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
        <h2 className='text-xl font-semibold text-white mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Link
            to='/projects?new=true'
            className='p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-600 transition-all'>
            <FolderKanban className='w-8 h-8 text-blue-400 mb-2' />
            <div className='font-semibold text-white mb-1'>New Project</div>
            <div className='text-sm text-gray-400'>Create a new project to organize your deployments</div>
          </Link>
          <Link
            to='/deployments?new=true'
            className='p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-600 transition-all'>
            <Server className='w-8 h-8 text-purple-400 mb-2' />
            <div className='font-semibold text-white mb-1'>Deploy App</div>
            <div className='text-sm text-gray-400'>Deploy a container image to your infrastructure</div>
          </Link>
          <Link
            to='/billing'
            className='p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-600 transition-all'>
            <DollarSign className='w-8 h-8 text-yellow-400 mb-2' />
            <div className='font-semibold text-white mb-1'>Add Funds</div>
            <div className='text-sm text-gray-400'>Top up your account balance</div>
          </Link>
        </div>
      </div>

      {/* Recent Deployments */}
      <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-white'>Recent Deployments</h2>
          <Link
            to='/deployments'
            className='text-blue-400 hover:text-blue-300 text-sm'>
            View all
          </Link>
        </div>
        <div className='space-y-3'>
          {recentDeployments.map((deployment) => (
            <Link
              key={deployment.id}
              to={`/deployment/${deployment.id}`}
              className='block p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-blue-600 transition-all'>
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <span className='font-semibold text-white'>{deployment.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(deployment.status)}`}>{deployment.status}</span>
                  </div>
                  <div className='flex items-center gap-4 text-sm text-gray-400'>
                    <span>{deployment.project}</span>
                    <span>•</span>
                    <span>{deployment.replicas} replicas</span>
                    <span>•</span>
                    <span>{deployment.updatedAt}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
        <h2 className='text-xl font-semibold text-white mb-4'>System Status</h2>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
              <span className='text-gray-300'>All systems operational</span>
            </div>
            <span className='text-sm text-gray-400'>Updated 1 min ago</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <AlertCircle className='w-4 h-4 text-yellow-400' />
              <span className='text-gray-300'>Scheduled maintenance on Dec 15, 2:00 AM UTC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
