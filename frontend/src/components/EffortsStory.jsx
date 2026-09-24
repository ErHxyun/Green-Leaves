import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import './EffortsStory.css';
import cover2026 from '../pictures/2026-newstart/picture-1.jpg';

const photoFor = event => event?.detailBlocks?.find(block => block.type === 'image' && block.src);
export default function EffortsStory({years, heading, subheading, status, onSelectEvent, closingTitle, closingText}) {
  const {i18n, t} = useTranslation();
  const cn = /^(cn|zh)/.test(i18n.language);
  const [current, setCurrent] = useState(null);
  const chapters = useRef(null);
  const navigation = useRef(null);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setCurrent(visible[0].target.dataset.year);
    }, {rootMargin: '-15% 0px -65% 0px'});
    chapters.current?.querySelectorAll('[data-year]').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [years]);
  useEffect(() => {
    const link = navigation.current?.querySelector('[aria-current="location"]');
    if (link) navigation.current.scrollLeft = link.offsetLeft - navigation.current.clientWidth / 2 + link.clientWidth / 2;
  }, [current]);
  const cover = years.flatMap(year => year.events || []).map(photoFor).find(Boolean);
  const first = years[0]?.year;
  const last = years[years.length - 1]?.year;
  return <div className="efforts-story">
    <header className="efforts-cover">
      {cover && <img className="efforts-cover-photo" src={cover.src} alt="" fetchpriority="high" />}
      <div className="efforts-cover-shade" />
      <div className="efforts-cover-copy">
        <p className="efforts-eyebrow">{cn ? '小绿叶 · 成长纪事' : 'LITTLE GREEN LEAVES · OUR JOURNEY'}</p>
        <h1>{heading}</h1>
        <p className="efforts-cover-intro">{subheading}</p>
        {years.length > 0 && <a className="efforts-begin" href={'#year-' + first}>{cn ? '从这里，走进我们的故事' : 'Explore our story'} <span aria-hidden="true">↓</span></a>}
      </div>
      {years.length > 0 && <span className="efforts-cover-years" aria-hidden="true">{first} — {last}</span>}
    </header>
    {status && <p className="efforts-status" role="status">{t({loading:'ui.loading',error:'ui.unavailable',empty:'ui.empty'}[status])}</p>}
    {years.length > 0 && <nav className="efforts-yearbar" aria-label={cn ? '按年份浏览' : 'Browse by year'}>
      <span className="efforts-yearbar-label">{cn ? '成长足迹' : 'THE YEARS'}</span>
      <div className="efforts-yearlinks" ref={navigation}>{years.map(year => <a key={year.year}
        href={'#year-' + year.year} aria-current={String(year.year) === (current || String(first)) ? 'location' : undefined}
        onClick={() => setCurrent(String(year.year))}>{year.year}</a>)}</div>
    </nav>}
    <div ref={chapters}>{years.map((year, index) => {
      const photo = year.year === 2026 ? {src: cover2026, alt: ''} : (year.events || []).map(photoFor).find(Boolean);
      return <section className="efforts-chapter" id={'year-' + year.year} data-year={year.year} key={year.id || year.year} aria-labelledby={'title-' + year.year}>
        <div className="efforts-chapter-visual">
          {photo && <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" />}
          <div className="efforts-chapter-shade" />
          <div className="efforts-chapter-label"><span className="efforts-eyebrow">{cn ? '成长纪事' : 'OUR JOURNEY'} / {String(index + 1).padStart(2, '0')}</span><span className="efforts-year">{year.year}</span></div>
          {photo?.caption && <p className="efforts-photo-caption">{photo.caption}</p>}
        </div>
        <div className="efforts-chapter-copy">
          <p className="efforts-eyebrow">{year.year} / {cn ? '这一年的故事' : 'A YEAR OF STORIES'}</p>
          <h2 id={'title-' + year.year}>{year.title}</h2>
          <p className="efforts-summary">{year.summary}</p>
          <div className="efforts-events">{(year.events || []).map((event, eventIndex) => {
            const thumbnail = photoFor(event);
            return <button className="efforts-event" key={event.id || event.slug} onClick={() => onSelectEvent(year, event)} aria-label={event.title}>
              <span className="efforts-event-number" aria-hidden="true">{String(eventIndex + 1).padStart(2, '0')}</span>
              <span className="efforts-event-copy"><span className="efforts-event-title">{event.title}</span><span className="efforts-read">{cn ? '阅读故事' : 'Read story'} <span aria-hidden="true">↗</span></span></span>
              {thumbnail && <img src={thumbnail.src} alt="" loading="lazy" decoding="async" />}
            </button>;
          })}</div>
        </div>
      </section>;
    })}</div>
    <footer className="efforts-ending"><span aria-hidden="true" className="efforts-ending-mark">↗</span><h2>{closingTitle}</h2><p>{closingText}</p><a href="/contact">{t('nav.contact')} <span aria-hidden="true">→</span></a></footer>
  </div>;
}
