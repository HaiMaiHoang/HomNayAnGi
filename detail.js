document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('cards-container');
  const paginationEl = document.getElementById('pagination');
  const metaEl = document.querySelector('.page-header .meta');
  
  let DATA = []; 
  let currentPage = 1;

 
  fetch('detail.json')
    .then(response => response.json())
    .then(data => {
      DATA = data; 
      initApp();  
    })
    .catch(error => console.error('Lỗi không đọc được file JSON:', error));

  function initApp() {
    if (!grid || !paginationEl) return;
    renderCards();
    if (metaEl) metaEl.textContent = `${DATA.length} quán ăn được tìm thấy`;
    updatePagination();
    
 
    window.addEventListener('resize', debounce(() => { updatePagination(); }, 120));
  }


  function renderCards() {
    grid.innerHTML = '';
  
    DATA.forEach(item => {
      const art = document.createElement('article');
      art.className = 'card';

      const media = document.createElement('div');
      media.className = 'card-media';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = item.alt || item.title;
      

      img.src = `img/${item.img_seed}.jpg`; 
      

      img.onerror = function() {
          this.onerror = null;
          this.src = 'https://via.placeholder.com/600x420?text=No+Image';
      };

      media.appendChild(img);

      const body = document.createElement('div');
      body.className = 'card-body';
      const h3 = document.createElement('h3');
      h3.className = 'card-title';
      h3.textContent = item.title;
      const sub = document.createElement('div');
      sub.className = 'card-sub';
      sub.textContent = item.sub;

      body.appendChild(h3);
      body.appendChild(sub);

      art.appendChild(media);
      art.appendChild(body);
      grid.appendChild(art);
    });
  }


  function getColumns() {
    const cs = window.getComputedStyle(grid);
    const varCols = cs.getPropertyValue('--grid-cols');
    if (varCols) {
      const n = parseInt(varCols.trim(), 10);
      if (!isNaN(n) && n > 0) return n;
    }
    return 1; 
  }

  function createBtn(text, opts) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    btn.textContent = text;
    if (opts && opts.disabled) btn.disabled = true;
    if (opts && typeof opts.onClick === 'function') btn.addEventListener('click', opts.onClick);
    return btn;
  }

  function updatePagination() {
    const cols = getColumns();
    const rowsPerPage = 4; 
    const perPage = cols * rowsPerPage;
    const totalPages = Math.max(1, Math.ceil(DATA.length / perPage));
    
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    
    const cards = Array.from(grid.querySelectorAll('.card'));
    cards.forEach((c, i) => {
      c.style.display = (i >= start && i < end) ? '' : 'none';
    });

    paginationEl.innerHTML = '';
    
 
    const prev = createBtn('Trước', { 
        disabled: currentPage === 1, 
        onClick: () => { if (currentPage > 1) { currentPage--; updatePagination(); } } 
    });
    paginationEl.appendChild(prev);


    for (let p = 1; p <= totalPages; p++) {
      const btn = createBtn(String(p), { onClick: () => { currentPage = p; updatePagination(); } });
      if (p === currentPage) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }
      paginationEl.appendChild(btn);
    }


    const next = createBtn('Sau', { 
        disabled: currentPage === totalPages, 
        onClick: () => { if (currentPage < totalPages) { currentPage++; updatePagination(); } } 
    });
    paginationEl.appendChild(next);
    
 
    if(cards.length > 0) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function debounce(fn, wait) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), wait); }; }
});