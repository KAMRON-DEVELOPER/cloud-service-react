import { Link } from 'react-router-dom';
import { Zap, Shield, BarChart3, Rocket, Server, DollarSign, ArrowRight, Check } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Lightning Fast',
      description: 'Deploy your containers in seconds with our optimized infrastructure.',
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with automated SSL certificates and DDoS protection.',
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: 'Auto-Scaling',
      description: 'Scale up or down automatically based on your traffic demands.',
    },
    {
      icon: <Server className='w-6 h-6' />,
      title: 'Container Native',
      description: 'Run any Docker container with full Kubernetes orchestration.',
    },
    {
      icon: <DollarSign className='w-6 h-6' />,
      title: 'Pay-as-you-go',
      description: 'Only pay for the resources you actually use, billed by the second.',
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: 'Real-time Monitoring',
      description: 'Monitor your applications with detailed metrics and logs.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for side projects and testing',
      features: ['Free $10 credit', '1 project', '2 GB RAM', '1 vCPU', 'Community support'],
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For growing applications',
      features: ['Unlimited projects', '8 GB RAM', '4 vCPU', 'Auto-scaling', 'Priority support', 'Custom domains'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale deployments',
      features: ['Unlimited everything', 'Dedicated resources', 'SLA guarantee', '24/7 phone support', 'Custom integrations', 'Compliance certifications'],
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950'>
      {/* Navigation */}
      <nav className='border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm fixed w-full z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-xl'>P</span>
            </div>
            <span className='text-xl font-bold text-white'>Poddle</span>
          </Link>
          <div className='flex items-center gap-4'>
            <Link
              to='/auth'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-6'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-sm mb-6'>
            <Rocket className='w-4 h-4' />
            <span>Deploy in seconds, scale in minutes</span>
          </div>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Deploy your apps
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>without the hassle</span>
          </h1>
          <p className='text-xl text-gray-400 mb-8 max-w-2xl mx-auto'>
            Poddle is a modern Platform-as-a-Service that makes deploying and scaling your containers effortless. Focus on code, not infrastructure.
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Link
              to='/auth'
              className='px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg font-medium'>
              Start Free Trial
              <ArrowRight className='w-5 h-5' />
            </Link>
            <button className='px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium'>View Demo</button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto'>
            <div>
              <div className='text-4xl font-bold text-white mb-2'>99.99%</div>
              <div className='text-gray-400'>Uptime SLA</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-white mb-2'>&lt;30s</div>
              <div className='text-gray-400'>Deploy Time</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-white mb-2'>10k+</div>
              <div className='text-gray-400'>Deployments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-6 bg-gray-900/50'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Everything you need to ship faster</h2>
            <p className='text-xl text-gray-400'>Powerful features that let you focus on building great products</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-600/50 transition-all'>
                <div className='w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400 mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
                <p className='text-gray-400'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className='py-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Simple, transparent pricing</h2>
            <p className='text-xl text-gray-400'>Start free, scale as you grow</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border ${
                  plan.popular ? 'bg-gradient-to-b from-blue-600/10 to-purple-600/10 border-blue-600' : 'bg-gray-800/50 border-gray-700'
                }`}>
                {plan.popular && <div className='inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4'>Most Popular</div>}
                <h3 className='text-2xl font-bold text-white mb-2'>{plan.name}</h3>
                <div className='mb-4'>
                  <span className='text-4xl font-bold text-white'>{plan.price}</span>
                  {plan.price !== 'Custom' && <span className='text-gray-400'>/month</span>}
                </div>
                <p className='text-gray-400 mb-6'>{plan.description}</p>
                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className='flex items-center gap-3 text-gray-300'>
                      <Check className='w-5 h-5 text-blue-400 flex-shrink-0' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to='/auth'
                  className={`block text-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12'>
          <h2 className='text-4xl font-bold text-white mb-4'>Ready to deploy your first app?</h2>
          <p className='text-xl text-blue-100 mb-8'>Join thousands of developers shipping faster with Poddle</p>
          <Link
            to='/auth'
            className='inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium'>
            Start Free Trial
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800 py-12 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-xl'>P</span>
                </div>
                <span className='text-xl font-bold text-white'>Poddle</span>
              </div>
              <p className='text-gray-400 text-sm'>Deploy and scale your applications with ease.</p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-4'>Product</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-4'>Company</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-4'>Legal</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors'>
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm'>© 2025 Poddle. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
