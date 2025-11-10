import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// You can fetch these values from your backend
const PRICE_PER_CORE_CPU = 12.5; // Example: $12.50 / core / month
const PRICE_PER_GB_RAM = 6.25; // Example: $6.25 / GB / month
const AUTOSCALE_FEE = 5.0; // Example: $5.00 / month

const PricingCalculator = () => {
  const [cpu, setCpu] = useState(1); // vCPU cores
  const [ram, setRam] = useState(2); // GB of RAM
  const [replicas, setReplicas] = useState(1); // Number of instances
  const [autoscale, setAutoscale] = useState(false);

  // Use useMemo to avoid recalculating on every render
  const totalCost = useMemo(() => {
    const cpuCost = cpu * PRICE_PER_CORE_CPU;
    const ramCost = ram * PRICE_PER_GB_RAM;
    const instanceCost = (cpuCost + ramCost) * replicas;
    const autoscaleCost = autoscale ? AUTOSCALE_FEE * replicas : 0;

    return instanceCost + autoscaleCost;
  }, [cpu, ram, replicas, autoscale]);

  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='max-w-5xl mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-white mb-4'>Estimate Your Cost</h2>
        <p className='text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto'>Pay only for what you use. Scale your resources up or down at any time.</p>

        <Card className='bg-white/5 border-white/10 backdrop-blur-md overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            {/* Sliders Section */}
            <CardContent className='md:col-span-2 p-6 md:p-8 space-y-8'>
              {/* CPU Slider */}
              <div>
                <Label
                  htmlFor='cpu'
                  className='text-lg font-medium text-white'>
                  CPU: <span className='text-blue-400'>{cpu} vCore(s)</span>
                </Label>
                <Slider
                  id='cpu'
                  value={[cpu]}
                  onValueChange={(val) => setCpu(val[0])}
                  min={1}
                  max={16}
                  step={1}
                  className='mt-4'
                />
              </div>

              {/* RAM Slider */}
              <div>
                <Label
                  htmlFor='ram'
                  className='text-lg font-medium text-white'>
                  RAM: <span className='text-blue-400'>{ram} GB</span>
                </Label>
                <Slider
                  id='ram'
                  value={[ram]}
                  onValueChange={(val) => setRam(val[0])}
                  min={1}
                  max={32}
                  step={1}
                  className='mt-4'
                />
              </div>

              {/* Replicas Slider */}
              <div>
                <Label
                  htmlFor='replicas'
                  className='text-lg font-medium text-white'>
                  Replicas: <span className='text-blue-400'>{replicas}</span>
                </Label>
                <Slider
                  id='replicas'
                  value={[replicas]}
                  onValueChange={(val) => setReplicas(val[0])}
                  min={1}
                  max={10}
                  step={1}
                  className='mt-4'
                />
              </div>

              {/* Autoscale Toggle */}
              <div>
                <Label className='text-lg font-medium text-white'>Autoscaling</Label>
                <Button
                  variant='outline'
                  onClick={() => setAutoscale(!autoscale)}
                  className={`mt-2 w-full ${autoscale ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
                  {autoscale ? <Check className='w-4 h-4 mr-2' /> : <X className='w-4 h-4 mr-2' />}
                  {autoscale ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </CardContent>

            {/* Total Cost Section */}
            <CardFooter className='md:col-span-1 bg-white/5 p-6 md:p-8 flex flex-col justify-center items-center md:items-start'>
              <h3 className='text-sm font-medium text-gray-300'>Monthly Estimate</h3>
              <p className='text-5xl font-bold text-white mt-2'>${totalCost.toFixed(2)}</p>
              <p className='text-gray-400'>/mo</p>
              <Button
                className='mt-6 w-full'
                asChild>
                <Link to='/auth'>Get Started</Link>
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PricingCalculator;
