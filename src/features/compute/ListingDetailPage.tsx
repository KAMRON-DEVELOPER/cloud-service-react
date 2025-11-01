import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetListingByIdQuery } from '@/services/listing';
import { QueryErrorMessage } from '@/components/QueryErrorMessage';
import { Card } from '@/components/ui/card';
import { BedDouble, Bath, Expand, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { S3_URL } from '@/consts';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetListingByIdQuery(id || '', { skip: !id });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  const pics = data && typeof data === 'object' && !('error' in data) ? data.apartment.pictures : [];
  const hasMultiple = pics.length > 1;

  useEffect(() => {
    const s = scrollerRef.current;
    if (!s || !pics.length) return;
    const onScroll = () => {
      const idx = Math.round(s.scrollLeft / s.clientWidth);
      setActive(Math.max(0, Math.min(idx, pics.length - 1)));
    };
    s.addEventListener('scroll', onScroll, { passive: true });
    return () => s.removeEventListener('scroll', onScroll as any);
  }, [pics.length]);

  const goTo = (i: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTo({ left: i * scrollerRef.current.clientWidth, behavior: 'smooth' });
  };

  if (!id) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='px-2 md:px-6 py-4'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    );
  }

  if (isError) return <QueryErrorMessage error={error} />;

  if (!data || 'error' in data) {
    return (
      <div className='px-2 md:px-6 py-4'>
        <p className='text-destructive'>Failed to load the listing.</p>
      </div>
    );
  }

  const listing = data;

  return (
    <div className='px-2 md:px-6 py-4 space-y-6'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Link
          to='/'
          className='hover:underline'>
          Home
        </Link>
        <span>/</span>
        <span>{listing.apartment.title}</span>
      </div>

      <div className='grid md:grid-cols-2 gap-6 items-start'>
        <Card className='overflow-hidden py-0 sticky top-20 self-start'>
          <div className='relative aspect-[4/3] bg-muted overflow-hidden'>
            {hasMultiple ? (
              <div
                ref={scrollerRef}
                className='h-full w-full overflow-x-auto overflow-y-hidden scroll-smooth'>
                <div className='flex h-full w-full snap-x snap-mandatory'>
                  {pics.map((p, i) => (
                    <div
                      key={p.id || i}
                      className='h-full w-full flex-shrink-0 snap-center'>
                      <img
                        className='block h-full w-full object-cover'
                        src={p.url ? `${S3_URL}/${p.url}` : '/placeholder.svg'}
                        alt={listing.apartment.title}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <img
                className='block h-full w-full object-cover'
                src={pics[0]?.url ? `${S3_URL}/${pics[0].url}` : '/placeholder.svg'}
                alt={listing.apartment.title}
              />
            )}
            {hasMultiple && (
              <div className='absolute inset-x-0 bottom-2 flex items-center justify-center gap-1'>
                {pics.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 w-2 rounded-full ${i === active ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className='space-y-4'>
          <div className='flex items-start justify-between gap-4'>
            <h1 className='text-2xl font-semibold'>{listing.apartment.title}</h1>
            <div className='text-xl font-bold'>
              {listing.apartment.saleType === 'rent' ? `$${Number(listing.price).toLocaleString()}/mo` : `$${Number(listing.price).toLocaleString()}`}
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-4 text-muted-foreground'>
            <span className='flex items-center gap-1 text-sm'>
              <MapPin className='h-4 w-4' />
              {listing.apartment.address.country}, {listing.apartment.address.city}
            </span>
            <span className='flex items-center gap-1 text-sm'>
              <BedDouble className='h-4 w-4' />
              {listing.apartment.beds} bd
            </span>
            <span className='flex items-center gap-1 text-sm'>
              <Bath className='h-4 w-4' />
              {listing.apartment.baths} ba
            </span>
            <span className='flex items-center gap-1 text-sm'>
              <Expand className='h-4 w-4' />
              {typeof (listing.apartment as any).area === 'object' ? (listing.apartment as any).area.parsedValue : (listing.apartment as any).area} m²
            </span>
          </div>
          {listing.apartment.description && <p className='text-foreground'>{listing.apartment.description}</p>}
        </div>
      </div>
    </div>
  );
}
