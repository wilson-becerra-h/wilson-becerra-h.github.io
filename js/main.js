/* ==========================================================================
   LÓGICA DE LA WEB (normalmente no hace falta tocarla)
   - Pinta los textos, proyectos y recursos a partir de datos.js y codigo.js
   - Navegación entre páginas, menú móvil y visor de código
   ========================================================================== */
(function(){
  var D = DATA, C = CODIGO;
  var $ = function(s, r){ return (r || document).querySelector(s); };
  function el(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text != null) e.textContent = text;
    return e;
  }
  function ext(url, text, cls){
    var a = el('a', cls, text);
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }
  var ICON_GH = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

  /* ---------- Textos generales ---------- */
  $('#h-nombre').textContent = D.nombre;
  $('#h-rol').textContent = D.rol;
  $('#h-intro').textContent = D.intro;
  $('#pie').textContent = '© ' + new Date().getFullYear() + ' ' + D.nombre;
  if(D.enlaces.github) $('#p-gh').href = D.enlaces.github;

  /* Pie: enlaces externos */
  var pn = $('#pie-nav');
  if(D.enlaces.github)   pn.appendChild(ext(D.enlaces.github, 'GitHub'));
  if(D.enlaces.linkedin) pn.appendChild(ext(D.enlaces.linkedin, 'LinkedIn'));
  if(D.enlaces.email){ var pm = el('a', null, 'Correo'); pm.href = 'mailto:' + D.enlaces.email; pn.appendChild(pm); }

  /* ---------- Ilustración: dos distribuciones y un criterio ---------- */
  (function(){
    var W0 = 20, WW = 440, base = 236, amp = 170, x0 = -3.5, x1 = 6.5, mu1 = 2.4, xc = 1.2;
    var px = function(x){ return W0 + (x - x0) / (x1 - x0) * WW; };
    var g  = function(x, mu){ return Math.exp(-Math.pow(x - mu, 2) / 2); };
    function line(mu){
      var d = '';
      for(var x = x0; x <= x1 + 1e-9; x += 0.1){ d += (d ? 'L' : 'M') + px(x).toFixed(1) + ' ' + (base - g(x, mu) * amp).toFixed(1); }
      return d;
    }
    function area(mu){
      var d = 'M' + px(x0).toFixed(1) + ' ' + base;
      for(var x = x0; x <= x1 + 1e-9; x += 0.1){ d += 'L' + px(x).toFixed(1) + ' ' + (base - g(x, mu) * amp).toFixed(1); }
      return d + 'L' + px(x1).toFixed(1) + ' ' + base + 'Z';
    }
    $('#art').innerHTML =
      '<path class="nf" d="' + area(0) + '"/><path class="sf" d="' + area(mu1) + '"/>' +
      '<line class="ax" x1="' + W0 + '" y1="' + base + '" x2="' + (W0 + WW) + '" y2="' + base + '"/>' +
      '<path class="n" d="' + line(0) + '"/><path class="s" d="' + line(mu1) + '"/>' +
      '<line class="cr" x1="' + px(xc) + '" y1="34" x2="' + px(xc) + '" y2="' + base + '"/>' +
      '<text x="' + px(0) + '" y="52" text-anchor="middle">ruido</text>' +
      '<text x="' + px(mu1) + '" y="52" text-anchor="middle">señal</text>' +
      '<text class="m" x="' + px(xc) + '" y="266" text-anchor="middle">criterio</text>';
  })();

  /* ---------- Áreas (portada) ---------- */
  if(D.areas && D.areas.length){
    var ha = $('#h-areas');
    D.areas.forEach(function(a){
      var d = el('div', 'area');
      d.appendChild(el('h3', null, a.titulo));
      d.appendChild(el('p', null, a.texto));
      ha.appendChild(d);
    });
    $('#h-areas-box').hidden = false;
  }

  /* ---------- Tarjetas ---------- */
  function card(it, esRecurso){
    var art = el('article', 'card');
    var meta = el('div', 'meta');
    if(esRecurso && it.tipo){ var t = el('span', 'type', it.tipo); t.setAttribute('data-t', it.tipo); meta.appendChild(t); }
    else meta.appendChild(el('span'));
    if(it.fecha) meta.appendChild(el('span', null, it.fecha));
    art.appendChild(meta);
    art.appendChild(el('h3', null, it.titulo));
    if(it.desc) art.appendChild(el('p', null, it.desc));
    if(it.tags && it.tags.length){
      var ul = el('ul', 'tags');
      it.tags.forEach(function(x){ ul.appendChild(el('li', null, x)); });
      art.appendChild(ul);
    }
    var acts = el('div', 'acts');
    if(it.codigo && C[it.codigo]){
      var b = el('button', 'lnk', 'Ver código'); b.type = 'button';
      b.addEventListener('click', function(){ abrirVisor(it); });
      acts.appendChild(b);
    }
    if(it.repo) acts.appendChild(ext(it.repo, 'Repositorio', 'lnk'));
    if(it.demo) acts.appendChild(ext(it.demo, 'Demo', 'lnk'));
    if(it.url)  acts.appendChild(ext(it.url, 'Abrir enlace', 'lnk'));
    if(acts.children.length) art.appendChild(acts);
    return art;
  }
  function pintar(cont, lista, esRecurso, limite){
    (limite ? lista.slice(0, limite) : lista).forEach(function(it){ cont.appendChild(card(it, esRecurso)); });
  }
  function filtros(cont, lista, itemsDom){
    var tags = [];
    lista.forEach(function(i){ (i.tags || []).forEach(function(t){ if(tags.indexOf(t) < 0) tags.push(t); }); });
    if(tags.length < 2 || lista.length < 4) return;
    cont.hidden = false;
    var bs = [];
    ['Todos'].concat(tags).forEach(function(nombre, idx){
      var b = el('button', null, nombre); b.type = 'button';
      b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
      b.addEventListener('click', function(){
        bs.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        lista.forEach(function(it, k){ itemsDom[k].hidden = idx !== 0 && (it.tags || []).indexOf(nombre) < 0; });
      });
      bs.push(b); cont.appendChild(b);
    });
  }

  /* Proyectos */
  if(D.proyectos.length){
    pintar($('#p-lista'), D.proyectos, false);
    filtros($('#p-filtros'), D.proyectos, $('#p-lista').children);
    pintar($('#h-proyectos'), D.proyectos, false, 3);
    $('#h-proyectos-box').hidden = false;
  } else {
    $('#p-vacio').hidden = false;
  }
  /* Recursos */
  if(D.recursos.length){
    pintar($('#r-lista'), D.recursos, true);
    filtros($('#r-filtros'), D.recursos, $('#r-lista').children);
    pintar($('#h-recursos'), D.recursos, true, 3);
    $('#h-recursos-box').hidden = false;
  } else {
    $('#r-vacio').hidden = false;
  }

  /* ---------- Contacto ---------- */
  var filas = $('#c-filas');
  function fila(etiqueta, valor, href, accion, externo){
    var li = el('li');
    var a = el('a', 'row'); a.href = href;
    if(externo){ a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    var d = el('div'); d.appendChild(el('small', null, etiqueta)); d.appendChild(el('strong', null, valor));
    a.appendChild(d); a.appendChild(el('span', 'go', accion));
    li.appendChild(a);
    return li;
  }
  if(D.enlaces.email){
    var li = fila('Correo', D.enlaces.email, 'mailto:' + D.enlaces.email, 'Escribir', false);
    var cp = el('button', 'copy', 'Copiar'); cp.type = 'button';
    cp.setAttribute('aria-label', 'Copiar correo');
    cp.addEventListener('click', function(){
      function ok(){ cp.textContent = 'Copiado'; setTimeout(function(){ cp.textContent = 'Copiar'; }, 1600); }
      if(navigator.clipboard){ navigator.clipboard.writeText(D.enlaces.email).then(ok, function(){}); }
    });
    li.style.display = 'flex'; li.style.alignItems = 'center';
    li.firstChild.style.flex = '1';
    li.appendChild(cp);
    filas.appendChild(li);
  }
  if(D.enlaces.github)   filas.appendChild(fila('GitHub', D.enlaces.github.replace(/^https?:\/\/(www\.)?/, ''), D.enlaces.github, 'Abrir', true));
  if(D.enlaces.linkedin) filas.appendChild(fila('LinkedIn', D.enlaces.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), D.enlaces.linkedin, 'Abrir', true));
  if(D.enlaces.ubicacion) $('#c-lugar').textContent = 'Ubicación: ' + D.enlaces.ubicacion;

  /* ---------- Visor de código ---------- */
  var dlg = $('#visor'), actual = null;
  function abrirVisor(it){
    var c = C[it.codigo]; actual = c;
    $('#v-titulo').textContent = it.titulo;
    $('#v-lang').textContent = c.lang;
    $('#v-codigo').textContent = c.code;
    $('#v-copiar').textContent = 'Copiar código';
    dlg.showModal();
    dlg.querySelector('.d-body').scrollTop = 0;
  }
  $('#v-cerrar').addEventListener('click', function(){ dlg.close(); });
  dlg.addEventListener('click', function(e){ if(e.target === dlg) dlg.close(); });
  $('#v-copiar').addEventListener('click', function(){
    var btn = this;
    function ok(){ btn.textContent = 'Copiado'; setTimeout(function(){ btn.textContent = 'Copiar código'; }, 1600); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(actual.code).then(ok, function(){});
    } else {
      var ta = document.createElement('textarea'); ta.value = actual.code; document.body.appendChild(ta);
      ta.select(); try{ document.execCommand('copy'); ok(); }catch(e){} document.body.removeChild(ta);
    }
  });
  $('#v-bajar').addEventListener('click', function(){
    var blob = new Blob([actual.code], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = actual.archivo || 'codigo.txt';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 500);
  });

  /* ---------- Menú móvil ---------- */
  var nav = $('#nav'), mb = $('#menu-btn');
  function cerrarMenu(){ nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.setAttribute('aria-label', 'Abrir menú'); }
  mb.addEventListener('click', function(){
    var abierto = nav.classList.toggle('open');
    mb.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    mb.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') cerrarMenu(); });
  window.addEventListener('resize', function(){ if(window.innerWidth > 760) cerrarMenu(); });

  /* ---------- Navegación entre páginas (por hash) ---------- */
  var RUTAS = { '': 'home', '/': 'home', '/proyectos': 'proyectos', '/recursos': 'recursos', '/contacto': 'contacto' };
  var TITULOS = { home: 'Wilson Becerra | Psicometría y ciencia de datos', proyectos: 'Proyectos | Wilson Becerra', recursos: 'Recursos | Wilson Becerra', contacto: 'Contacto | Wilson Becerra' };
  var primera = true;
  function ir(){
    var h = location.hash.replace(/^#/, '').replace(/\/$/, '') || '/';
    var pagina = RUTAS[h] || 'home';
    document.querySelectorAll('.page').forEach(function(s){ s.hidden = s.getAttribute('data-page') !== pagina; });
    document.querySelectorAll('nav a[data-route]').forEach(function(a){
      if(a.getAttribute('data-route') === pagina) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = TITULOS[pagina];
    cerrarMenu();
    if(!primera){
      window.scrollTo(0, 0);
      var t = document.querySelector('.page[data-page="' + pagina + '"] h1');
      if(t) t.focus({ preventScroll: true });
    }
    primera = false;
  }
  window.addEventListener('hashchange', ir);
  $('#skip').addEventListener('click', function(e){ e.preventDefault(); $('#main').focus(); });
  ir();
})();
