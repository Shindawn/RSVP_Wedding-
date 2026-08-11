import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight, Building2, Camera, Check, ChevronDown, Church, Clock3, Flower2, GlassWater, MapPin, Menu, Music2, UsersRound, ChevronLeft, ChevronRight, X } from 'lucide-react';


const heroImage = 'https://images.pexels.com/photos/15984448/pexels-photo-15984448.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';
const heroBgImage = '/images/aicc.png';
const detailImage = 'https://images.pexels.com/photos/18950615/pexels-photo-18950615.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';
const dressCodeImage = '/images/dresscode.png';
const galleryImages = [heroImage, 'https://images.pexels.com/photos/16040526/pexels-photo-16040526.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200', 'https://images.pexels.com/photos/8291807/pexels-photo-8291807.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200', detailImage];
const previewSlides = [
  heroImage,
  'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1500',
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1500',
  'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1500',
  'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1500',
  'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1500',

];
const allGalleryImages = [
  ...previewSlides,
  ...galleryImages.slice(1),
];

const entourageGroups = [
  { title: 'Parents of the groom', names: ['Names to be confirmed'] },
  { title: 'Parents of the bride', names: ['Names to be confirmed'] },
  { title: 'Principal sponsors', names: ['Ninongs & Ninangs', 'Names to be confirmed'] },
  { title: 'Candle sponsors', names: ['Names to be confirmed'] },
  { title: 'Veil sponsors', names: ['Names to be confirmed'] },
  { title: 'Cord sponsors', names: ['Names to be confirmed'] },
  { title: 'Groomsmen', names: ['Names to be confirmed'] },
  { title: 'Bridesmaids', names: ['Names to be confirmed'] },
  { title: 'Bible bearer', names: ['Name to be confirmed'] },
  { title: 'Ring bearer', names: ['Name to be confirmed'] },
  { title: 'Coin bearer', names: ['Name to be confirmed'] },
  { title: 'Flower girls', names: ['Names to be confirmed'] },
];

function AnimatedHeading({ lines, className = '' }: { lines: Array<{ text: string; italic?: boolean }>; className?: string }) {
  return <h2 className={`display-heading letter-heading ${className}`} aria-label={lines.map(line => line.text).join(' ')}>{lines.map((line, lineIndex) => <span className={line.italic ? 'letter-line letter-line--italic' : 'letter-line'} aria-hidden="true" key={line.text}>{Array.from(line.text).map((character, index) => <span className="letter-char" style={{ '--char-index': index + lineIndex * 18 } as CSSProperties} key={`${character}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>)}</span>)}</h2>;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'yes' | 'no' | ''>('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [countdownPulse, setCountdownPulse] = useState(false);
  const [showFullEntourage, setShowFullEntourage] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(0);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [storyLocationShown, setStoryLocationShown] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const logoVideoRef = useRef<HTMLVideoElement | null>(null);
  const logoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const storyLogoVideoRef = useRef<HTMLVideoElement | null>(null);
  const storyLogoCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const openLightbox = (index: number) => {
  setLightboxIndex(index);
};

const closeLightbox = () => {
  setLightboxIndex(null);
};

const nextLightboxImage = () => {
  setLightboxIndex(current =>
    current === null
      ? null
      : (current + 1) % allGalleryImages.length
  );
};

const previousLightboxImage = () => {
  setLightboxIndex(current =>
    current === null
      ? null
      : (current - 1 + allGalleryImages.length) %
        allGalleryImages.length
  );
};

  useEffect(() => {
  const video = logoVideoRef.current;
  const canvas = logoCanvasRef.current;

  if (!video || !canvas) return;

  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  });

  if (!ctx) return;

  let animationFrame: number;

  const renderFrame = () => {
    if (
      video.readyState >= 2 &&
      video.videoWidth > 0 &&
      video.videoHeight > 0
    ) {
      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green-screen detection
        const greenDominance = g - Math.max(r, b);

        if (g > 80 && greenDominance > 35) {
          // Soft edge instead of harsh removal
          const alpha = Math.max(
            0,
            Math.min(255, 255 - greenDominance * 4)
          );

          data[i + 3] = alpha;

          // Reduce leftover green around edges
          if (alpha > 0) {
            data[i + 1] = Math.min(
              g,
              (r + b) / 2
            );
          }
        }
      }

      ctx.putImageData(frame, 0, 0);
    }

    animationFrame = requestAnimationFrame(renderFrame);
  };

  const start = () => {
    video.play().catch(() => {});
    renderFrame();
  };

  video.addEventListener('loadeddata', start);

  if (video.readyState >= 2) {
    start();
  }

  return () => {
    cancelAnimationFrame(animationFrame);
    video.removeEventListener('loadeddata', start);
  };
}, []);

useEffect(() => {
  if (lightboxIndex === null) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowRight') {
      nextLightboxImage();
    }

    if (event.key === 'ArrowLeft') {
      previousLightboxImage();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  document.body.style.overflow = 'hidden';

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
  };
}, [lightboxIndex]);

useEffect(() => {
  const video = storyLogoVideoRef.current;
  const canvas = storyLogoCanvasRef.current;

  if (!video || !canvas) return;

  const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
  });

  if (!ctx) return;

  let animationFrame: number;

  const renderFrame = () => {
    if (
      video.readyState >= 2 &&
      video.videoWidth > 0 &&
      video.videoHeight > 0
    ) {
      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const greenDominance = g - Math.max(r, b);

        if (g > 80 && greenDominance > 35) {
          const alpha = Math.max(
            0,
            Math.min(255, 255 - greenDominance * 4)
          );

          data[i + 3] = alpha;

          if (alpha > 0) {
            data[i + 1] = Math.min(
              g,
              (r + b) / 2
            );
          }
        }
      }

      ctx.putImageData(frame, 0, 0);
    }

    animationFrame = requestAnimationFrame(renderFrame);
  };

  const start = () => {
    video.play().catch(() => {});
    renderFrame();
  };

  video.addEventListener('loadeddata', start);

  if (video.readyState >= 2) {
    start();
  }

  return () => {
    cancelAnimationFrame(animationFrame);
    video.removeEventListener('loadeddata', start);
  };
}, []);

  useEffect(() => {
    const weddingDate = new Date('2027-01-30T13:30:00+08:00').getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, weddingDate - now);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
      setCountdownPulse(true);
      window.setTimeout(() => setCountdownPulse(false), 650);
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('invitation-locked', !isOpen);
    return () => document.body.classList.remove('invitation-locked');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || previewPaused) return;
    const timer = window.setInterval(() => setPreviewSlide(current => (current + 1) % previewSlides.length), 4800);
    return () => window.clearInterval(timer);
  }, [isOpen, previewPaused]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openRsvp = () => {
    setRsvpOpen(true);
    setSubmitted(false);
    setRsvpName('');
    setRsvpAttendance('');
    setRsvpMessage('');
    setSubmitError('');
  };

  const closeRsvp = () => setRsvpOpen(false);

  const handleRsvpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formspreeId) {
      setSubmitError('RSVP is not configured yet. Please try again later.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: rsvpName,
          attendance: rsvpAttendance === 'yes' ? 'Joyfully accepts' : 'Regretfully declines',
          message: rsvpMessage.trim() || '(none)',
          _subject: `RSVP: ${rsvpName}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="site-shell">
      <div className={`invitation-cover ${isOpen ? 'invitation-cover--open' : ''}`} aria-hidden={isOpen}>
        <div className="cover-grain" />
        <div className="cover-copy"><span className="cover-logo">C <em>&</em> C</span><span className="cover-intro">A wedding invitation</span><h1>Charlon <i>&</i> Chilzia</h1><span className="cover-date">30 · 01 · 2027</span></div>
        <button className="invitation-card" onClick={() => { setIsOpen(true); if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.25; audioRef.current.play().catch(() => {}); } }} aria-label="Open Charlon and Chilzia's wedding invitation">
          <span className="invitation-card-glow" />
          <img 
  src="/images/invitation-envelope.webp" 
  alt="Blue floral wedding invitation envelope" 
  fetchPriority="high"
  loading="eager"
/>
        </button>
        <button className="open-invitation" onClick={() => { setIsOpen(true); if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.25; audioRef.current.play().catch(() => {}); } }}>Tap the envelope</button>
      </div>

      <audio ref={audioRef} src="/audio/bg-music.mp3" preload="auto" loop />

      <header className="topbar"><button className="brand-mark" onClick={() => scrollTo('home')} aria-label="Back to top"><img src="/images/cc-logo-white.png" alt="" /></button><nav className={menuOpen ? 'nav-links nav-links--visible' : 'nav-links'}><button onClick={() => scrollTo('story')}>Our story</button><button onClick={() => scrollTo('details')}>The details</button><button onClick={() => scrollTo('entourage')}>Entourage</button><button onClick={() => scrollTo('gallery')}>Gallery</button><button onClick={() => scrollTo('faqs')}>FAQs</button></nav><button className="rsvp-pill" onClick={openRsvp}>RSVP <ArrowRight size={15} /></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></header>
      

      <section className={`hero ${isOpen ? 'hero--introduced' : ''}`} id="home"><div className="hero-image" style={{ backgroundImage: `url(${heroBgImage})` }} /><div className="hero-overlay" /><div className="hero-content"><p className="eyebrow hero-eyebrow">💙We’re getting married!</p><h2 className="hero-names" aria-label="Charlon and Chilzia"><span className="typed-name typed-name--first" aria-hidden="true">Charlon</span><span className="typed-join" aria-hidden="true">and</span><i className="typed-name typed-name--second" aria-hidden="true">Chilzia</i></h2><div className="hero-meta"><span>January 30, 2027</span><span className="meta-rule" /><span>Naga City, Camarines Sur</span></div><button className="text-link light" onClick={() => scrollTo('story')}>See Details </button></div><div className="hero-vertical">CHARLON & CHILZIA <span>•</span> 2027</div></section>

      <section className="intro-section section-pad reveal-on-scroll" id="story"><video className="flower-bloom flower-bloom--story" src="/images/blooming-flowers.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" /><div className="section-label"><span>01</span><span className="label-line" /><span>OUR STORY</span></div><div className="story-grid"><div><p className="eyebrow blue">Bible Verse</p><h2 className="display-heading">The best things<br /><i>happen unexpectedly.</i></h2><p className="body-copy">Somehow, in the middle of ordinary days, we found something extraordinary. What started as a quiet hello became a life we never want to stop choosing.</p><p className="body-copy">We’re so grateful to be surrounded by the people who have shaped our story. Please join us as we begin our next chapter together.</p><div className="signature">
  <video
    ref={storyLogoVideoRef}
    src="/images/logo.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="signature-source"
    aria-hidden="true"
  />
  <canvas
    ref={storyLogoCanvasRef}
    className="signature-canvas"
    aria-label="Charlon and Chilzia monogram"
  />
</div></div><div className={`story-image-wrap ${storyLocationShown ? 'story-image-wrap--active' : ''}`} onClick={() => setStoryLocationShown(prev => !prev)}><img src={detailImage} alt="A newlywed couple by the water" /><span className="location-tag">Dayhagan Resort Beach</span></div></div></section>

      <section className="details-section section-pad reveal-on-scroll" id="details">
        <div className="section-label details-label"><span>02</span><span className="label-line" /><span>THE DETAILS</span></div>
        <div className="details-heading">
          <video className="flower-bloom flower-bloom--countdown-left" src="/images/blooming-flowers.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="details-heading-inner">
            <p className="eyebrow">Days until we say "I do"</p>
            <div className={`countdown ${countdownPulse ? 'countdown--pulse' : ''}`}>
              <div className="time-row">
                <div className="time-segment"><div className="time-value" aria-label={`${timeLeft.days} days`}>{String(timeLeft.days).padStart(2, '0')}</div><div className="time-label">Days</div></div>
                <div className="time-segment"><div className="time-value" aria-label={`${timeLeft.hours} hours`}>{String(timeLeft.hours).padStart(2, '0')}</div><div className="time-label">Hours</div></div>
                <div className="time-segment"><div className="time-value" aria-label={`${timeLeft.minutes} minutes`}>{String(timeLeft.minutes).padStart(2, '0')}</div><div className="time-label">Minutes</div></div>
                <div className="time-segment time-segment--seconds"><div className="time-value" aria-label={`${timeLeft.seconds} seconds`}>{String(timeLeft.seconds).padStart(2, '0')}</div><div className="time-label">Seconds</div></div>
              </div>
             
            </div>
          </div>
          <video className="flower-bloom flower-bloom--countdown-right" src="/images/blooming-flowers.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        </div>

        <div className="event-cards">
          <article className="event-card">
            <div className="event-icon"><Church size={22} /></div>
            <p className="eyebrow">The ceremony</p>
            <h3>Archbishop<br />Palace Chapel</h3>
            <p className="event-info"><Clock3 size={15} /> 1:30PM</p>
            <p className="event-info"><MapPin size={15} /> Naga City, Camarines Sur</p>
            <a className="text-link map-button" href="https://maps.app.goo.gl/CM897Wko3joafugn6" target="_blank" rel="noopener noreferrer" aria-label="Open ceremony location in Google Maps">Open in Maps<ArrowRight size={15} /></a>
          </article>
          <article className="event-card">
            <div className="event-icon"><Building2 size={22} /></div>
            <p className="eyebrow">The reception</p>
            <h3>UMA Hotel<br />+ Residences</h3>
            <p className="event-info"><Clock3 size={15} /> 5:00PM</p>
            <p className="event-info"><MapPin size={15} /> Magsaysay Avenue, Naga</p>
            <a className="text-link map-button" href="https://maps.app.goo.gl/BQUbJPR3jdWKx5Bq8" target="_blank" rel="noopener noreferrer" aria-label="Open UMA Hotel location in Google Maps">Open in Maps<ArrowRight size={15} /></a>
          </article>
        </div>

        <div className="timeline-heading"><Clock3 size={17} /><span>Our timeline of the day</span></div>
        <div className="timeline">
          <div><UsersRound /><span>12:30</span><small>Guest arrival</small></div>
          <i />
          <div><Church /><span>1:30</span><small>Ceremony</small></div>
          <i />
          <div><Camera /><span>2:30</span><small>Photos</small></div>
          <i />
          <div><GlassWater /><span>5:00</span><small>Reception</small></div>
          <i />
          <div><Music2 /><span>6:00</span><small>Dinner & dancing</small></div>
        </div>
      </section>

      <section className="dress-section section-pad reveal-on-scroll"><div className="dress-content"><p className="eyebrow">Dress code</p><AnimatedHeading lines={[{ text: 'Dusty blue' }, { text: 'and formal.', italic: true }]} /><p className="body-copy">We would love to see you in soft, romantic tones. Gentlemen in navy, charcoal, or dusty blue; ladies in ice blue, champagne, or silver.</p><div className="swatches"><span className="swatch ice" /><span className="swatch dusty" /><span className="swatch navy" /><span className="swatch silver" /><span className="swatch champagne" /></div><p className="tiny-note">Please avoid wearing white.</p></div><div className="dress-image" style={{ backgroundImage: `url(${dressCodeImage})` }} /></section>

      <section className="entourage-section section-pad reveal-on-scroll" id="entourage"><div className="section-label"><span>03</span><span className="label-line" /><span>ENTOURAGE</span></div><div className="center-heading"><p className="eyebrow blue">With our favorite people</p><AnimatedHeading lines={[{ text: 'The ones who make' }, { text: 'our story complete.', italic: true }]} /></div><div className="people-grid"><div><p className="eyebrow blue">Matron of honor</p><h3>Liza Mendoza</h3><p className="muted">The calm in every storm<br />and our forever friend.</p></div><div><p className="eyebrow blue">Maid of honor</p><h3>Angelica Santos</h3><p className="muted">A little bit of sunshine<br />in human form.</p></div><div><p className="eyebrow blue">Best man</p><h3>Joshua Garcia</h3><p className="muted">Brother by choice,<br />family by heart.</p></div></div><div className={`full-entourage ${showFullEntourage ? 'full-entourage--open' : ''}`} id="full-entourage">{entourageGroups.map(group => <article className="entourage-group" key={group.title}><p className="eyebrow blue">{group.title}</p>{group.names.map(name => <span key={name}>{name}</span>)}</article>)}</div><button className="entourage-toggle" onClick={() => setShowFullEntourage(!showFullEntourage)} aria-expanded={showFullEntourage} aria-controls="full-entourage">{showFullEntourage ? 'Show less' : 'View full entourage'} <ChevronDown className={showFullEntourage ? 'chevron-up' : ''} size={16} /></button></section>

      <section
  className="gallery-section section-pad reveal-on-scroll"
  id="gallery"
>
  <div className="section-label">
    <span>04</span>
    <span className="label-line" />
    <span>GALLERY</span>
  </div>

  <div className="gallery-heading">
    <AnimatedHeading
      lines={[
        { text: 'Moments we' },
        { text: 'keep close.', italic: true }
      ]}
    />

    <p className="body-copy">
      A few frames from the beginning of our forever.
    </p>
  </div>

  <div className="gallery-grid">

    {/* Main carousel image */}
    <div
      className="gallery-carousel gallery-img-1"
      onMouseEnter={() => setPreviewPaused(true)}
      onMouseLeave={() => setPreviewPaused(false)}
      onFocus={() => setPreviewPaused(true)}
      onBlur={() => setPreviewPaused(false)}
    >
      <button
        type="button"
        className="gallery-image-button gallery-carousel-button"
        onClick={() => openLightbox(previewSlide)}
        aria-label={`View wedding photo ${previewSlide + 1}`}
      >
        <img
          key={previewSlides[previewSlide]}
          className="gallery-img carousel-photo"
          src={previewSlides[previewSlide]}
          alt={`Wedding preview ${previewSlide + 1} of ${previewSlides.length}`}
        />
      </button>

      <div
        className="carousel-dots"
        aria-label="Choose a preview photo"
      >
        {previewSlides.map((image, index) => (
          <button
            className={
              previewSlide === index
                ? 'carousel-dot carousel-dot--active'
                : 'carousel-dot'
            }
            onClick={event => {
              event.stopPropagation();
              setPreviewSlide(index);
            }}
            aria-label={`Show preview photo ${index + 1}`}
            aria-current={
              previewSlide === index ? 'true' : undefined
            }
            key={image}
          />
        ))}
      </div>
    </div>

    {/* Remaining images */}
    {galleryImages.slice(1).map((image, index) => (
      <button
        type="button"
        className={`gallery-image-button gallery-img-${index + 2}`}
        onClick={() =>
          openLightbox(previewSlides.length + index)
        }
        key={image}
        aria-label={`View wedding photo ${
          previewSlides.length + index + 1
        }`}
      >
        <img
          className="gallery-img"
          src={image}
          alt={`Wedding moment ${
            previewSlides.length + index + 1
          }`}
        />
      </button>
    ))}
  </div>
</section>
      <section className="rsvp-section section-pad reveal-on-scroll" id="rsvp"><video className="flower-bloom flower-bloom--rsvp" src="/images/blooming-flowers.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" /><div className="rsvp-card"><div className="section-label light-label"><span>05</span><span className="label-line" /><span>RSVP</span></div><p className="eyebrow">We hope you can make it</p><h2 className="display-heading">Will you join us<br /><i>on our big day?</i></h2><p className="body-copy">Kindly reply by January 8, 2027. Your presence would mean the world to us.</p><button className="button-light" onClick={openRsvp}>Respond to invitation <ArrowRight size={16} /></button></div></section>

      <section className="faq-section section-pad reveal-on-scroll" id="faqs"><div className="faq-intro"><p className="eyebrow blue">Good to know</p><AnimatedHeading lines={[{ text: 'Questions,' }, { text: 'answered.', italic: true }]} /><p className="body-copy">We’ve gathered a few helpful details so you can simply enjoy the day.</p></div><div className="faq-list">{['Can I bring a plus one?', 'What time should I arrive?', 'Is there parking available?', 'Will the event be indoors or outdoors?'].map((question, index) => <div className="faq-item" key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span>{question}</span><ChevronDown className={activeFaq === index ? 'chevron-up' : ''} size={17} /></button>{activeFaq === index && <p>{index === 0 ? 'Please refer to your invitation for your guest details. We kindly ask that we celebrate with the guests named on each invitation.' : index === 1 ? 'Guest arrival begins at 12:30 in the afternoon. We recommend arriving a little early so you can settle in.' : index === 2 ? 'Yes, parking is available at both venues for wedding guests.' : 'The ceremony is indoors, followed by an indoor reception.'}</p>}</div>)}</div></section>

      <footer className="footer reveal-on-scroll" id="map">

  <div className="footer-logo-wrap">
    {/* Hidden original green-screen MP4 */}
    <video
      ref={logoVideoRef}
      src="/images/logo.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="footer-logo-source"
      aria-hidden="true"
    />

    {/* Visible output with green removed */}
    <canvas
      ref={logoCanvasRef}
      className="footer-logo"
      aria-label="Charlon and Chilzia monogram"
    />
  </div>

  <p className="eyebrow">See you on our big day</p>

  <AnimatedHeading
    className="footer-names"
    lines={[{ text: 'Charlon & Chilzia' }]}
  />

  <p>30 · 01 · 2027 · Naga City, Philippines</p>

  <div className="footer-bottom">
    <span>With love, always.</span>
    <span>© 2027 C | C</span>
  </div>

</footer>

{lightboxIndex !== null && (
  <div
    className="gallery-lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Wedding photo gallery"
    onClick={closeLightbox}
  >
    <button
      type="button"
      className="lightbox-close"
      onClick={closeLightbox}
      aria-label="Close gallery"
    >
      <X size={24} />
    </button>

    <button
      type="button"
      className="lightbox-arrow lightbox-arrow--left"
      onClick={event => {
        event.stopPropagation();
        previousLightboxImage();
      }}
      aria-label="Previous image"
    >
      <ChevronLeft size={30} />
    </button>

    <div
      className="lightbox-content"
      onClick={event => event.stopPropagation()}
    >
      <img
        key={allGalleryImages[lightboxIndex]}
        src={allGalleryImages[lightboxIndex]}
        alt={`Wedding photo ${lightboxIndex + 1}`}
        className="lightbox-image"
      />

      <div className="lightbox-info">
        <span>
          {String(lightboxIndex + 1).padStart(2, '0')}
        </span>

        <span className="lightbox-line" />

        <span>
          {String(allGalleryImages.length).padStart(2, '0')}
        </span>
      </div>
    </div>

    <button
      type="button"
      className="lightbox-arrow lightbox-arrow--right"
      onClick={event => {
        event.stopPropagation();
        nextLightboxImage();
      }}
      aria-label="Next image"
    >
      <ChevronRight size={30} />
    </button>
  </div>
)}

      {rsvpOpen && (
        <div className="modal-backdrop" onClick={closeRsvp}>
          <div className="rsvp-modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={closeRsvp} aria-label="Close RSVP"><X size={18} /></button>
            {submitted ? (
              <div className="success-state">
                <div className="success-icon"><Check /></div>
                <p className="eyebrow blue">Thank you</p>
                <h2 className="display-heading">We’ll see you<br /><i>on the big day.</i></h2>
                <p className="body-copy">Your response has been noted. We can’t wait to celebrate with you.</p>
                <button className="button-dark" onClick={closeRsvp}>Close</button>
              </div>
            ) : (
              <>
                <p className="eyebrow blue">Reply Here</p>
                <h2 className="modal-title">Are you <i>coming?</i></h2>
                <form onSubmit={handleRsvpSubmit}>
                  <label>
                    Your name
                    <input
                      name="name"
                      required
                      placeholder="Full name"
                      value={rsvpName}
                      onChange={event => setRsvpName(event.target.value)}
                    />
                  </label>
                  <fieldset>
                    <legend>Will you attend?</legend>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        required
                        checked={rsvpAttendance === 'yes'}
                        onChange={() => setRsvpAttendance('yes')}
                      />
                      Joyfully accepts
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={rsvpAttendance === 'no'}
                        onChange={() => setRsvpAttendance('no')}
                      />
                      Regretfully declines
                    </label>
                  </fieldset>
                  <label>
                    Send your wishes <span className="optional">(optional)</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Share a message for the happy couple"
                      value={rsvpMessage}
                      onChange={event => setRsvpMessage(event.target.value)}
                    />
                  </label>
                  {submitError && <p className="form-error" role="alert">{submitError}</p>}
                  <button className="button-dark" type="submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send RSVP'} <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}


export default App;