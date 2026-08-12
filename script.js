const header=document.querySelector('.site-header');
const dropdown=document.querySelector('.dropdown');
const toggle=document.querySelector('.dropdown-toggle');
const menu=document.querySelector('.dropdown-menu');
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
const close=lightbox.querySelector('.lightbox-close');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));
toggle.addEventListener('click',e=>{e.stopPropagation();dropdown.classList.toggle('open');toggle.setAttribute('aria-expanded',dropdown.classList.contains('open'))});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>dropdown.classList.remove('open')));
document.addEventListener('click',()=>dropdown.classList.remove('open'));

document.querySelectorAll('.photo').forEach(photo=>{
  photo.addEventListener('click',()=>{
    lightboxImg.src=photo.dataset.full;
    lightboxImg.alt=photo.querySelector('img').alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src=''}
close.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const links=document.querySelectorAll('.nav > .nav-link');
const sections=[...document.querySelectorAll('main section[id]')];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=>observer.observe(s));
