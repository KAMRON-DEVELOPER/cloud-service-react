import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Server, Database, GitBranch } from 'lucide-react';

const stats = [
  {
    title: 'Active Deployments',
    value: '1,200+',
    icon: <Server className='w-8 h-8 text-blue-400' />,
    description: 'Containers running live right now.',
  },
  {
    title: 'Happy Developers',
    value: '500+',
    icon: <Users className='w-8 h-8 text-purple-400' />,
    description: 'Building and scaling their projects.',
  },
  {
    title: 'Managed Databases',
    value: '850',
    icon: <Database className='w-8 h-8 text-green-400' />,
    description: 'PostgreSQL, Redis, and more.',
  },
  {
    title: 'Git Pushes',
    value: '22k',
    icon: <GitBranch className='w-8 h-8 text-orange-400' />,
    description: 'Deployments triggered this month.',
  },
];

const Stats = () => {
  return (
    <section className='py-16 md:py-24 bg-background -mt-24 md:-mt-36 relative z-10'>
      {' '}
      {/* Negative margin to pull it up over the fade */}
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className='bg-white/5 border-white/10 backdrop-blur-md'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-gray-300'>{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold text-white'>{stat.value}</div>
                <p className='text-xs text-gray-400 mt-1'>{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
