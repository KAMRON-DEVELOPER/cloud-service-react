import { useState, useEffect } from 'react';
import { Activity, Cpu, Server, AlertCircle } from 'lucide-react';
import { type DeploymentMetrics } from '@/features/types';

interface DeploymentMetricsProps {
  projectId: string;
  deploymentId: string;
}

const DeploymentMetrics = ({ projectId, deploymentId }: DeploymentMetricsProps) => {
  const [metrics, setMetrics] = useState<DeploymentMetrics | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`/v1/projects/${projectId}/deployments/${deploymentId}/metrics`, { withCredentials: true });

    eventSource.onopen = () => {
      setConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data: DeploymentMetrics = JSON.parse(event.data);
        setMetrics(data);
      } catch (err) {
        console.error('Failed to parse metrics:', err);
      }
    };

    eventSource.onerror = () => {
      setConnected(false);
      setError('Connection lost. Retrying...');
    };

    return () => {
      -eventSource.close();
    };
  }, [projectId, deploymentId]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50';
      case 'unhealthy':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPodStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!metrics) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
        <span className='ml-3 text-gray-600'>Loading metrics...</span>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Connection Status */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>Real-Time Metrics</h2>
        <div className='flex items-center space-x-2'>
          <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className='text-sm text-gray-600'>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 flex items-center'>
          <AlertCircle className='h-5 w-5 text-red-600 mr-2' />
          <span className='text-red-800'>{error}</span>
        </div>
      )}

      {/* Overall Status */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900'>Deployment Status</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.status)}`}>{metrics.status.toUpperCase()}</span>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='flex items-center mb-2'>
              <Server className='h-5 w-5 text-blue-600 mr-2' />
              <span className='text-sm text-gray-600'>Total Replicas</span>
            </div>
            <p className='text-2xl font-bold text-gray-900'>{metrics.replicas}</p>
          </div>

          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='flex items-center mb-2'>
              <Activity className='h-5 w-5 text-green-600 mr-2' />
              <span className='text-sm text-gray-600'>Ready</span>
            </div>
            <p className='text-2xl font-bold text-green-600'>{metrics.readyReplicas}</p>
          </div>

          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='flex items-center mb-2'>
              <Cpu className='h-5 w-5 text-purple-600 mr-2' />
              <span className='text-sm text-gray-600'>Available</span>
            </div>
            <p className='text-2xl font-bold text-purple-600'>{metrics.availableReplicas}</p>
          </div>

          <div className='bg-gray-50 rounded-lg p-4'>
            <div className='flex items-center mb-2'>
              <AlertCircle className='h-5 w-5 text-red-600 mr-2' />
              <span className='text-sm text-gray-600'>Unavailable</span>
            </div>
            <p className='text-2xl font-bold text-red-600'>{metrics.unavailableReplicas}</p>
          </div>
        </div>
      </div>

      {/* Pod Details */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Pod Status</h3>

        {metrics.pods.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No pods found</p>
        ) : (
          <div className='space-y-3'>
            {metrics.pods.map((pod, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center space-x-3'>
                    <div className={`h-3 w-3 rounded-full ${pod.ready ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className='font-mono text-sm text-gray-900'>{pod.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPodStatusColor(pod.status)}`}>{pod.status}</span>
                </div>

                <div className='grid grid-cols-3 gap-4 text-sm'>
                  <div>
                    <span className='text-gray-500'>Restarts:</span>
                    <span className='ml-2 font-medium text-gray-900'>{pod.restarts}</span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Age:</span>
                    <span className='ml-2 font-medium text-gray-900'>{pod.ageSeconds ? `${Math.floor(pod.ageSeconds / 60)}m` : 'N/A'}</span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Ready:</span>
                    <span className='ml-2 font-medium text-gray-900'>{pod.ready ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div className='text-center text-sm text-gray-500'>Last updated: {new Date(metrics.timestamp * 1000).toLocaleTimeString()}</div>
    </div>
  );
};

export default DeploymentMetrics;
