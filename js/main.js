/* Southbound site — nav + lightbox */
(function(){
  // mobile nav
  var toggle=document.querySelector('.nav-toggle');
  var links=document.querySelector('.nav-links');
  if(toggle){toggle.addEventListener('click',function(){links.classList.toggle('open');});}

  // lightbox for galleries
  var cells=[].slice.call(document.querySelectorAll('[data-lb]'));
  if(!cells.length) return;
  var items=cells.map(function(c){
    return {src:c.getAttribute('data-lb'), cap:c.getAttribute('data-cap')||''};
  });
  var i=0;
  var lb=document.createElement('div');
  lb.className='lb';
  lb.innerHTML=''+
    '<button class="lb-close" aria-label="Close">&times;</button>'+
    '<button class="lb-prev" aria-label="Previous">&#8249;</button>'+
    '<button class="lb-next" aria-label="Next">&#8250;</button>'+
    '<img alt="">'+
    '<div class="lb-cap"></div>'+
    '<div class="lb-count"></div>';
  document.body.appendChild(lb);
  var lbImg=lb.querySelector('img'),
      lbCap=lb.querySelector('.lb-cap'),
      lbCount=lb.querySelector('.lb-count');
  function show(n){
    i=(n+items.length)%items.length;
    lbImg.src=items[i].src;
    lbCap.textContent=items[i].cap;
    lbCount.textContent=(i+1)+' / '+items.length;
  }
  function open(n){show(n);lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  cells.forEach(function(c,n){c.addEventListener('click',function(){open(n);});});
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',function(e){e.stopPropagation();show(i-1);});
  lb.querySelector('.lb-next').addEventListener('click',function(e){e.stopPropagation();show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(i-1);
    if(e.key==='ArrowRight')show(i+1);
  });
})();
