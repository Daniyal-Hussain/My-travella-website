import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ChevronDown, Mail, MapPin, Phone, Quote } from 'lucide-react';
import { toast } from 'sonner';
import {
  api,
  type BlogPostDTO,
  type FaqItemDTO,
  type GalleryItemDTO,
  type TestimonialDTO,
  type TourGuideDTO,
} from '../lib/api';
import { ASSETS } from '../lib/images';
import { PageHeroBanner } from '../components/PageHeroBanner';
import {
  BrandsTrustStrip,
  GalleryBentoGrid,
  InteractiveLocationMap,
  LatestNewsSection,
  SectionHeading,
  TestimonialSliderSection,
} from '../components/SharedSections';
import { BlogDestSidebar } from '../components/Sidebars';

export function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItemDTO[]>([]);
  const [openIdx, setOpenIdx] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.getFaqs().then((r) => setFaqs(r.faqs)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.submitContact({ name, email, subject: subject || 'FAQ Question', message, sourcePage: 'faq' });
      toast.success('Question received! Our team will respond shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to send question');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeroBanner title="FREQUENTLY ASKED QUESTIONS" breadcrumb="Frequently Asked Questions" />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Intro & Traveler Portrait */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#094B53]">
              Find <span className="text-[#F5A623]">Answers</span> for Questions You Have.
            </h2>
            <p className="mt-2 text-xs text-[#5d7a7f] max-w-sm mx-auto lg:mx-0">
              Travlla is a multi-award-winning travel coordination agency dedicated to smooth planning before every departure.
            </p>

            <div className="mt-6 relative max-w-[280px] mx-auto lg:mx-0">
              <div className="h-64 rounded-3xl overflow-hidden shadow-md">
                <img src={ASSETS.guide1} alt="Travel advisor" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#FAF2E2] border border-[#f0dfc1] rounded-2xl px-4 py-3 -mt-5 mx-2 relative shadow-md flex items-center gap-2.5">
                <Quote className="w-6 h-6 text-[#094B53] shrink-0" />
                <span className="font-display font-bold text-xs text-[#094B53]">Give us a chance to help you!</span>
              </div>
            </div>
          </div>

          {/* Right Bordered FAQ Accordion Card */}
          <div className="lg:col-span-7 bg-[#F8FCFC] rounded-3xl border border-[#d7ebee] p-3 md:p-5">
            {faqs.map((f, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={f.number} className="border-b last:border-none border-[#e3f0f2]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full py-3.5 px-3 flex items-center justify-between text-left text-xs md:text-sm font-bold text-[#094B53] cursor-pointer"
                  >
                    <span>
                      {f.number} - {f.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#F5A623] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && <div className="px-3 pb-4 text-xs leading-relaxed text-[#5d7a7f]">{f.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Illuminated Night Bungalows Contact Overlay Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <img
          src={ASSETS.promoNightBungalows}
          alt="Starry night overwater bungalows"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05292e]/55" />

        <div className="relative max-w-[1140px] mx-auto">
          <div className="max-w-md bg-[#094B53]/70 backdrop-blur-md border border-white/25 rounded-3xl p-7 text-white shadow-2xl">
            <h3 className="font-display font-extrabold text-2xl">
              <span className="text-[#F5A623]">Reach</span> & Get in Touch With Us!
            </h3>
            <p className="text-xs text-[#cce1e3] mt-1">We love to hear from you. Our friendly team is always here to chat.</p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full bg-white text-[#183135] rounded-full px-5 py-2.5 text-xs focus:outline-none"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full bg-white text-[#183135] rounded-full px-5 py-2.5 text-xs focus:outline-none"
              />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Select Your Subject"
                className="w-full bg-white text-[#183135] rounded-full px-5 py-2.5 text-xs focus:outline-none"
              />
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full bg-white text-[#183135] rounded-2xl px-5 py-3 text-xs focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-2.5 rounded-full cursor-pointer"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItemDTO[]>([]);

  useEffect(() => {
    api.getGallery().then((r) => setItems(r.items)).catch(() => {});
  }, []);

  const rowPhotos = items.filter((i) => i.bentoGroup === 'carousel');

  return (
    <div>
      <PageHeroBanner title="GALLERY" breadcrumb="Gallery" />
      <GalleryBentoGrid items={items} />

      {/* Staggered Multi-Row Photo Strips */}
      <section className="pb-16 px-4 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {rowPhotos.slice(0, 5).map((item, idx) => (
              <div key={idx} className="h-40 rounded-2xl overflow-hidden shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:pl-10">
            {[...rowPhotos.slice(3, 8)].map((item, idx) => (
              <div key={idx} className="h-40 rounded-2xl overflow-hidden shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogGridPage() {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<BlogPostDTO[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get('q') || undefined;
    const tag = searchParams.get('tag') || undefined;
    api.getBlogs({ q, tag }).then((r) => setBlogs(r.blogs)).catch(() => {});
  }, [searchParams]);

  const perPage = 9;
  const paged = blogs.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.max(1, Math.ceil(blogs.length / perPage));

  return (
    <div>
      <PageHeroBanner title="BLOG GRID" breadcrumb="Blog Grid" />

      <section className="py-16 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-md block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-3.5 right-3.5 bg-white text-[#094B53] rounded-xl px-2.5 py-1.5 text-center leading-tight shadow">
                  <div className="font-display font-extrabold text-sm">{post.dateDay}</div>
                  <div className="text-[9px] font-bold uppercase text-[#5d7a7f]">{post.dateMonth}</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold text-[#F5A623]">By {post.author}</div>
                  <h3 className="font-display font-bold text-sm leading-snug mt-1 group-hover:text-[#F5A623] transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg bg-[#094B53] text-white flex items-center justify-center cursor-pointer"
            >
              ‹
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPage(idx + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer ${
                  page === idx + 1 ? 'bg-[#F5A623] text-white' : 'bg-white text-[#094B53] border border-[#d7ebee]'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="w-8 h-8 rounded-lg bg-white text-[#094B53] border border-[#d7ebee] flex items-center justify-center cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <LatestNewsSection blogs={blogs} />
    </div>
  );
}

export function BlogDetailPage() {
  const { slug = 'thailand-global-tourism-routes' } = useParams();
  const [post, setPost] = useState<BlogPostDTO | null>(null);
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cSubject, setCSubject] = useState('');
  const [cText, setCText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getBlog(slug).then((r) => setPost(r.post)).catch(() => {});
  }, [slug]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setSubmitting(true);
    try {
      const res = await api.postBlogComment(post.slug, { name: cName, comment: cText });
      setPost({ ...post, comments: res.comments });
      setCName('');
      setCEmail('');
      setCSubject('');
      setCText('');
      toast.success('Comment published!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (!post) {
    return (
      <div>
        <PageHeroBanner title="BLOG DETAIL" breadcrumb="Detail" />
        <div className="py-20 text-center text-sm text-[#5d7a7f]">Loading article...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeroBanner title="BLOG DETAIL" breadcrumb="Detail" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 space-y-6">
            <div className="h-[320px] md:h-[380px] rounded-3xl overflow-hidden shadow-md">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-[11px] font-semibold text-[#5d7a7f]">
              By <span className="text-[#F5A623]">{post.author}</span> / {post.fullDate} / {post.category}
            </div>

            <h2 className="font-display font-extrabold text-2xl text-[#094B53]">{post.title}</h2>

            <div className="space-y-3 text-xs md:text-[13.5px] leading-relaxed text-[#4a656a]">
              {post.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <blockquote className="pl-4 border-l-4 border-[#F5A623] py-1">
              <Quote className="w-6 h-6 text-[#F5A623] mb-1" />
              <p className="italic text-xs md:text-sm font-semibold text-[#094B53] leading-relaxed">{post.quote}</p>
              <footer className="mt-1.5 text-xs font-bold text-[#094B53]">— {post.quoteAuthor}</footer>
            </blockquote>

            {post.secondaryImages?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.secondaryImages.slice(0, 2).map((src, i) => (
                  <div key={i} className="h-48 rounded-2xl overflow-hidden">
                    <img src={src} alt="Scene" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53]">{post.subHeading}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4a656a]">{post.subParagraph}</p>
            </div>

            <div>
              <h4 className="font-display font-bold text-base text-[#094B53] mb-3">{post.precautionsTitle}</h4>
              <ul className="space-y-2">
                {post.precautions.map((pr) => (
                  <li key={pr} className="flex items-center gap-2.5 text-xs text-[#436065]">
                    <CheckCircle2 className="w-4 h-4 text-[#84C400] shrink-0" />
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags & Social Row */}
            <div className="pt-4 border-t border-[#d7ebee] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#094B53]">Tags</span>
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    to={`/blog?tag=${encodeURIComponent(t)}`}
                    className="bg-[#E6F4F6] text-[#094B53] text-[11px] font-semibold px-3 py-1 rounded-lg"
                  >
                    {t}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {['𝕏', 'f', '◎', 'P'].map((s, idx) => (
                  <span
                    key={idx}
                    className="w-7 h-7 rounded-full bg-[#094B53] text-[#84C400] text-xs font-bold flex items-center justify-center"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div>
              <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded mb-3">
                Customer Review
              </div>
              <div className="space-y-3">
                {post.comments.map((c, idx) => (
                  <div key={idx} className="bg-[#FAF2E2] rounded-2xl p-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#094B53]">
                          {c.author} <span className="font-normal text-[#7c9498] ml-1.5">{c.date}</span>
                        </div>
                        <p className="text-xs text-[#4a656a] mt-1">{c.comment}</p>
                      </div>
                    </div>
                    <span className="bg-[#84C400] text-white text-[10px] font-bold px-3 py-1 rounded-full shrink-0">
                      Reply
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Form */}
            <div className="bg-[#FAF2E2] rounded-3xl p-6 md:p-8 border border-[#efe2c6]">
              <h3 className="font-display font-bold text-2xl text-[#094B53]">
                <span className="text-[#F5A623]">Comment</span> Section
              </h3>
              <p className="text-xs text-[#5d7a7f] mt-1">We love to hear from you. Our friendly team is always here to chat.</p>
              <form onSubmit={handleComment} className="mt-5 space-y-3">
                <input
                  required
                  type="text"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <input
                  type="email"
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <input
                  type="text"
                  value={cSubject}
                  onChange={(e) => setCSubject(e.target.value)}
                  placeholder="Select Your Subject"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  value={cText}
                  onChange={(e) => setCText(e.target.value)}
                  placeholder="Message"
                  className="w-full bg-white rounded-2xl px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-2.5 rounded-full cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </article>

          <div className="lg:col-span-4">
            <BlogDestSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}

export function TourGuideDetailPage() {
  const { slug = 'ricardo-murphy' } = useParams();
  const [guide, setGuide] = useState<TourGuideDTO | null>(null);
  const [allGuides, setAllGuides] = useState<TourGuideDTO[]>([]);

  useEffect(() => {
    api
      .getGuide(slug)
      .then((r) => {
        setGuide(r.guide);
        setAllGuides(r.allGuides);
      })
      .catch(() => {});
  }, [slug]);

  if (!guide) {
    return (
      <div>
        <PageHeroBanner title="TOUR GUIDE DETAIL" breadcrumb="Tour Guide Detail" />
        <div className="py-20 text-center text-sm text-[#5d7a7f]">Loading guide profile...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeroBanner title="TOUR GUIDE DETAIL" breadcrumb="Tour Guide Detail" />

      <section className="py-12 px-4 bg-[#D8EFF1]">
        <div className="max-w-[1040px] mx-auto bg-white rounded-[32px] p-6 md:p-10 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Portrait Card */}
          <div className="md:col-span-4 bg-white rounded-2xl p-3 border border-[#e3f1f3] shadow-lg text-center">
            <div className="h-64 rounded-xl overflow-hidden">
              <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#094B53] -mt-5 mx-5 relative rounded-full py-1.5 px-3 flex items-center justify-center gap-2 shadow">
              {['𝕏', 'f', '◎', 'P'].map((s, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full bg-[#F5A623] text-[#094B53] text-[10px] font-bold flex items-center justify-center"
                >
                  {s}
                </span>
              ))}
            </div>
            <h3 className="font-display font-bold text-base text-[#094B53] mt-3">{guide.name}</h3>
            <p className="text-[11px] font-semibold text-[#F5A623] pb-1">{guide.role}</p>
          </div>

          {/* Bio, Specs & Certifications */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#094B53]">About</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#4a656a]">{guide.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs">
              <div><strong className="text-[#094B53]">Age:</strong> <span className="text-[#5d7a7f] ml-2">{guide.age}</span></div>
              <div><strong className="text-[#094B53]">Education:</strong> <span className="text-[#5d7a7f] ml-2">{guide.education}</span></div>
              <div><strong className="text-[#094B53]">Job Title:</strong> <span className="text-[#5d7a7f] ml-2">{guide.jobTitle}</span></div>
              <div><strong className="text-[#094B53]">Location:</strong> <span className="text-[#5d7a7f] ml-2">{guide.location}</span></div>
              <div><strong className="text-[#094B53]">Experiences:</strong> <span className="text-[#5d7a7f] ml-2">{guide.experiences}</span></div>
              <div><strong className="text-[#094B53]">Contact:</strong> <span className="text-[#5d7a7f] ml-2">{guide.contact}</span></div>
              <div className="sm:col-span-2"><strong className="text-[#094B53]">Email:</strong> <span className="text-[#5d7a7f] ml-2">{guide.email}</span></div>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#094B53] mb-2">Essential Skills</h3>
              <ul className="space-y-1.5 text-xs text-[#4a656a]">
                {guide.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center text-[10px]">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#094B53] mb-2">Certifications & Training</h3>
              <ul className="space-y-1.5 text-xs text-[#4a656a]">
                {guide.certifications.map((c) => (
                  <li key={c.region} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center text-[10px] shrink-0 mt-0.5">→</span>
                    <span><strong className="text-[#094B53]">{c.region}</strong> {c.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1060px] mx-auto">
          <SectionHeading prefix="Meet With" highlight="Tour Guide" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allGuides.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="bg-white rounded-2xl border border-[#d7ebee] p-3 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="h-48 rounded-xl overflow-hidden">
                  <img src={g.avatar} alt={g.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#094B53] -mt-4 mx-5 relative rounded-full py-1 px-2 flex items-center justify-center gap-1.5">
                  {['𝕏', 'f', '◎', 'P'].map((s, idx) => (
                    <span key={idx} className="w-4 h-4 rounded-full bg-[#F5A623] text-[#094B53] text-[9px] font-bold flex items-center justify-center">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-2.5 font-display font-bold text-xs text-[#094B53]">{g.name}</div>
                <div className="text-[10px] font-semibold text-[#F5A623]">{g.role}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialDTO[]>([]);

  useEffect(() => {
    api.getTestimonials().then((r) => setTestimonials(r.testimonials)).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeroBanner title="TESTIMONIALS" breadcrumb="Testimonials" />
      <TestimonialSliderSection testimonials={testimonials} />
      <BrandsTrustStrip />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-[960px] mx-auto">
          <SectionHeading prefix="Our Client" highlight="Says!" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-[#d7ebee] p-6 pt-4 shadow-sm relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="inline-block bg-[#094B53] text-[#F5A623] text-[10px] px-2.5 py-0.5 rounded-full">
                        ★★★★★
                      </span>
                      <h3 className="font-script text-2xl font-bold text-[#094B53] mt-1">{t.name}</h3>
                      <div className="text-[11px] font-semibold text-[#F5A623]">{t.role}</div>
                    </div>
                  </div>
                  <Quote className="w-9 h-9 text-[#d0e5e8]" />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#4a656a]">{t.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.submitContact({ name, email, subject: subject || 'Contact Inquiry', message, sourcePage: 'contact' });
      toast.success('Thank you! Your message has been saved and our team will contact you shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to submit form');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeroBanner title="CONTACT US" breadcrumb="Contact us" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1060px] mx-auto bg-white rounded-[36px] p-6 md:p-10 shadow-xl border border-[#e3f1f3] space-y-10">
          <InteractiveLocationMap heightClass="h-[300px] md:h-[360px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Warm Cream Form */}
            <div className="lg:col-span-6 bg-[#FAF2E2] rounded-3xl p-7 border border-[#efe2c6]">
              <h2 className="font-display font-extrabold text-2xl text-[#094B53]">
                <span className="text-[#F5A623]">Reach</span> & Get in Touch With Us!
              </h2>
              <p className="text-xs text-[#5d7a7f] mt-1">We love to hear from you. Our friendly team is always here to chat.</p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Select Your Subject"
                  className="w-full bg-white rounded-full px-5 py-2.5 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full bg-white rounded-2xl px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-2.5 rounded-full cursor-pointer"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Right Contact Detail & Cutout Traveler */}
            <div className="lg:col-span-6 space-y-6 relative">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[#094B53]">
                  Contact <span className="text-[#F5A623]">Detail</span>
                </h2>
                <p className="text-xs text-[#5d7a7f] mt-1 max-w-sm">
                  Travlla is a multi-award-winning strategy and content creation agency that specializes in travel coordination.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-full bg-[#3E93A6] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[11px] text-[#5d7a7f]">Phone</div>
                      <div className="font-display font-bold text-sm text-[#094B53]">123 654 0214</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-full bg-[#D98892] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[11px] text-[#5d7a7f]">Email</div>
                      <div className="font-display font-bold text-sm text-[#094B53]">travllainfo@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-full bg-[#094B53] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[11px] text-[#5d7a7f]">Address</div>
                      <div className="font-display font-bold text-sm text-[#094B53]">55/11 ronin tower, New York</div>
                    </div>
                  </div>
                </div>

                <div className="w-40 h-52 rounded-2xl overflow-hidden bg-white shrink-0">
                  <img
                    src={ASSETS.umbrellaTraveler}
                    alt="Traveler holding luggage"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="font-script text-3xl font-bold text-[#094B53]">
                Let’s <span className="text-[#F5A623]">Talk</span> About You !
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div>
      <PageHeroBanner title="ERROR 404" breadcrumb="Error 404" />

      <section className="relative pt-16 pb-24 px-4 bg-[#F6FCFC] overflow-hidden">
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left 4 [Hot Air Balloon] 4 */}
          <div className="md:col-span-5 text-center">
            <div className="font-display font-bold text-lg text-[#094B53] mb-1">Oops!</div>
            <div className="flex items-center justify-center gap-2 font-display font-extrabold text-[84px] md:text-[112px] leading-none text-[#094B53] select-none">
              <span>4</span>
              <svg viewBox="0 0 80 120" className="w-20 h-28 md:w-24 md:h-32 -mt-2">
                <ellipse cx="40" cy="42" rx="30" ry="37" fill="#6BBED6" />
                <path d="M40 5 C28 24 28 58 34 79" stroke="#4D9BB4" strokeWidth="2.5" fill="none" />
                <path d="M40 5 C52 24 52 58 46 79" stroke="#4D9BB4" strokeWidth="2.5" fill="none" />
                <line x1="34" y1="80" x2="35" y2="92" stroke="#8B5A2B" strokeWidth="1.5" />
                <line x1="46" y1="80" x2="45" y2="92" stroke="#8B5A2B" strokeWidth="1.5" />
                <rect x="33" y="92" width="14" height="12" rx="2" fill="#A67449" />
              </svg>
              <span>4</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-[#094B53] mt-3">Page Not Found</h2>
            <p className="mt-2 text-xs text-[#5d7a7f] max-w-xs mx-auto leading-relaxed">
              The page you’re looking for isn’t available. Try to search again or use the button below.
            </p>
            <Link
              to="/"
              className="inline-block mt-5 bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-3 rounded-full shadow-md transition-colors"
            >
              Go Back To Home
            </Link>
          </div>

          {/* Right Daydreaming Traveler Illustration */}
          <div className="md:col-span-7 flex justify-center">
            <img
              src={ASSETS.error404}
              alt="Lost traveler daydreaming of tropical beach"
              className="w-full max-w-[400px] rounded-3xl mix-blend-multiply"
            />
          </div>
        </div>

        {/* Soft Puffy Clouds Bottom Silhouette */}
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-16 text-[#DFEFF3] fill-current pointer-events-none"
        >
          <path d="M0,70 Q40,30 80,65 Q120,25 170,60 Q220,20 270,55 Q330,15 390,60 Q450,25 510,60 Q570,20 630,55 Q700,15 760,60 Q820,25 890,60 Q950,20 1020,55 Q1080,20 1150,60 Q1220,25 1290,60 Q1360,20 1440,55 L1440,100 L0,100 Z" />
        </svg>
      </section>
    </div>
  );
}
