/* WrmLink — script.js */

/* ── THEME (dark/light) ── */
function initTheme() {
  const saved = localStorage.getItem("wrmThemeMode") || "dark";
  if (saved === "light") document.body.classList.add("light");
  updateThemeIcon();
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const mode = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("wrmThemeMode", mode);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const isLight = document.body.classList.contains("light");
  btn.textContent = isLight ? "🌙" : "☀️";
  btn.title = isLight ? "Modo escuro" : "Modo claro";
}

/* ── TOAST ── */
function showToast(msg, type = "") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  setTimeout(() => toast.classList.add("show"), 10);
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.classList.remove("show"); }, 2800);
}

/* ── VIEWS ── */
function initViews() {
  const views = document.getElementById("views");
  if (!views) return;
  let n = parseInt(localStorage.getItem("viewsWrmLink")) || 248;
  n++;
  views.textContent = n;
  localStorage.setItem("viewsWrmLink", n);
}

/* ── SEGUIDORES ── */
function initSeguidores() {
  const el = document.getElementById("totalSeguidores");
  if (!el) return;
  const n = parseInt(localStorage.getItem("wrmSeguidores")) || 34;
  el.textContent = n;
}

/* ── TEMA DO PERFIL ── */
function trocarTema(tema) {
  aplicarTema(tema);
  document.querySelectorAll(".tema-btn").forEach(b => b.classList.remove("active"));
  const ativo = document.querySelector(`.tema-btn[data-tema="${tema}"]`);
  if (ativo) ativo.classList.add("active");
}

/* ── TEMA DO PERFIL ── */
function trocarTema(tema) {
  aplicarTema(tema);
  document.querySelectorAll(".tema-btn").forEach(b => b.classList.remove("active"));
  const ativo = document.querySelector(`.tema-btn[data-tema="${tema}"]`);
  if (ativo) ativo.classList.add("active");
}

function aplicarTema(tema) {
  const banner = document.querySelector(".perfil-banner");
  const root = document.documentElement;

  const temas = {
    padrao: {
      banner: "linear-gradient(135deg,#020617,#0f172a,#1e3a8a,#2563eb)",
      accent: "#3b82f6",
      accentHover: "#2563eb",
      accentSoft: "rgba(59,130,246,0.15)",
    },
    rosa: {
      banner: "linear-gradient(135deg,#9d174d,#ec4899,#f472b6)",
      accent: "#ec4899",
      accentHover: "#db2777",
      accentSoft: "rgba(236,72,153,0.15)",
    },
    verde: {
      banner: "linear-gradient(135deg,#052e16,#10b981,#22c55e)",
      accent: "#10b981",
      accentHover: "#059669",
      accentSoft: "rgba(16,185,129,0.15)",
    },
    roxo: {
      banner: "linear-gradient(135deg,#1e1b4b,#7c3aed,#a78bfa)",
      accent: "#7c3aed",
      accentHover: "#6d28d9",
      accentSoft: "rgba(124,58,237,0.15)",
    },
    amarelo: {
      banner: "linear-gradient(135deg,#78350f,#f59e0b,#fbbf24)",
      accent: "#f59e0b",
      accentHover: "#d97706",
      accentSoft: "rgba(245,158,11,0.15)",
    },
  };

  const t = temas[tema] || temas.padrao;

  if (banner) banner.style.background = t.banner;

  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-hover", t.accentHover);
  root.style.setProperty("--accent-soft", t.accentSoft);

  localStorage.setItem("temaPerfil", tema);
}

function salvarTema() {
  const tema = localStorage.getItem("temaPerfil") || "padrao";
  showToast("✔ Tema salvo com sucesso!", "success");
}

/* ── FOTO DO PERFIL ── */
function initFotoPerfil() {
  const inputFoto = document.getElementById("inputFoto");
  const fotoPerfil = document.getElementById("fotoPerfil");
  const wrapper = document.querySelector(".foto-perfil-wrapper");

  if (!inputFoto || !fotoPerfil) return;

  const fotoSalva = localStorage.getItem("fotoPerfil");
  if (fotoSalva) fotoPerfil.src = fotoSalva;

  if (wrapper) wrapper.addEventListener("click", () => inputFoto.click());

  inputFoto.addEventListener("change", function (e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = function (ev) {
      fotoPerfil.src = ev.target.result;
      localStorage.setItem("fotoPerfil", ev.target.result);
      showToast("Foto atualizada!", "success");
    };
    leitor.readAsDataURL(arquivo);
  });
}

/* ── EDITAR BIO ── */
function editarBio() {
  const bio = document.getElementById("bioTexto");
  const area = document.getElementById("bioTextarea");
  const btnEditar = document.getElementById("btnEditarBio");
  const btnSalvar = document.getElementById("btnSalvarBio");
  const btnCancelar = document.getElementById("btnCancelarBio");

  if (!bio || !area) return;

  bio.style.display = "none";
  area.style.display = "block";
  area.value = bio.textContent.trim();
  btnEditar.style.display = "none";
  if (btnSalvar) btnSalvar.style.display = "inline-flex";
  if (btnCancelar) btnCancelar.style.display = "inline-flex";
  area.focus();
}

function salvarBio() {
  const bio = document.getElementById("bioTexto");
  const area = document.getElementById("bioTextarea");
  const btnEditar = document.getElementById("btnEditarBio");
  const btnSalvar = document.getElementById("btnSalvarBio");
  const btnCancelar = document.getElementById("btnCancelarBio");

  if (!bio || !area) return;

  bio.textContent = area.value.trim() || bio.textContent;
  localStorage.setItem("wrmBio", bio.textContent);
  bio.style.display = "block";
  area.style.display = "none";
  btnEditar.style.display = "inline-flex";
  if (btnSalvar) btnSalvar.style.display = "none";
  if (btnCancelar) btnCancelar.style.display = "none";
  showToast("✔ Bio atualizada!", "success");
}

function cancelarBio() {
  const bio = document.getElementById("bioTexto");
  const area = document.getElementById("bioTextarea");
  const btnEditar = document.getElementById("btnEditarBio");
  const btnSalvar = document.getElementById("btnSalvarBio");
  const btnCancelar = document.getElementById("btnCancelarBio");

  if (!bio || !area) return;

  bio.style.display = "block";
  area.style.display = "none";
  btnEditar.style.display = "inline-flex";
  if (btnSalvar) btnSalvar.style.display = "none";
  if (btnCancelar) btnCancelar.style.display = "none";
}

/* ── COPIAR / COMPARTILHAR LINK ── */
function copiarLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast("Link copiado!", "success");
  }).catch(() => {
    showToast("Link: " + url);
  });
}

function compartilharPerfil() {
  const dados = { title: "WrmLink — Andriellyn", text: "Confira meu perfil no WrmLink!", url: window.location.href };
  if (navigator.share) {
    navigator.share(dados).catch(() => copiarLink());
  } else {
    copiarLink();
  }
}

/* ── FILTRAR ALUNOS ── */
function filtrarAlunos() {
  const pesquisaInput = document.getElementById("pesquisa");
  const filtroTurmaInput = document.getElementById("filtroTurma");
  const filtroAnoInput = document.getElementById("filtroAno");
  const alunos = document.querySelectorAll(".aluno-card");

  if (!pesquisaInput || !filtroTurmaInput || !filtroAnoInput) return;

  const pesquisa = pesquisaInput.value.toLowerCase();
  const turma = filtroTurmaInput.value;
  const ano = filtroAnoInput.value;
  let visiveis = 0;

  alunos.forEach(aluno => {
    const nome = aluno.dataset.nome.toLowerCase();
    const ok = nome.includes(pesquisa)
      && (turma === "" || aluno.dataset.turma === turma)
      && (ano === "" || aluno.dataset.ano === ano);
    aluno.style.display = ok ? "block" : "none";
    if (ok) visiveis++;
  });

  const msg = document.getElementById("semResultados");
  if (msg) msg.style.display = visiveis === 0 ? "block" : "none";
}

/* ── SEGUIR ALUNO ── */
function seguirAluno(btn) {
  const seguindo = btn.classList.toggle("seguindo");
  btn.textContent = seguindo ? "✓ Seguindo" : "+ Seguir";
  const nome = btn.closest(".aluno-card").querySelector("h3").textContent;
  showToast(seguindo ? `Você está seguindo ${nome}!` : `Você deixou de seguir ${nome}.`, seguindo ? "success" : "");

  let n = parseInt(localStorage.getItem("wrmSeguidores")) || 34;
  n = seguindo ? n + 1 : Math.max(0, n - 1);
  localStorage.setItem("wrmSeguidores", n);
  const el = document.getElementById("totalSeguidores");
  if (el) el.textContent = n;
}

/* ── FEED: CURTIR ── */
function curtirPost(botao) {
  const curtido = botao.dataset.curtido === "1";
  let numero = parseInt(botao.dataset.count || 0);
  if (curtido) {
    numero--;
    botao.dataset.curtido = "0";
    botao.style.color = "";
  } else {
    numero++;
    botao.dataset.curtido = "1";
    botao.style.color = "#f87171";
  }
  botao.dataset.count = numero;
  botao.textContent = `❤ ${numero}`;
}

/* ── FEED: COMENTÁRIOS ── */
function mostrarComentarios(botao) {
  const comentarios = botao.parentElement.nextElementSibling;
  const aberto = comentarios.style.display !== "none";
  comentarios.style.display = aberto ? "none" : "block";
}

function comentarPost(botao) {
  const container = botao.closest(".comentarios");
  const input = container.querySelector(".input-comentario");
  const lista = container.querySelector(".lista-comentarios");
  const texto = input.value.trim();
  if (!texto) return;

  const p = document.createElement("p");
  p.innerHTML = `<strong style="color:var(--accent)">Andriellyn</strong> ${texto}`;
  lista.appendChild(p);
  input.value = "";
  input.focus();
}

/* ── FEED: CRIAR POSTAGEM ── */
function criarPostagem() {
  const textoEl = document.getElementById("textoPostagem");
  const imagemInput = document.getElementById("imagemPostagem");
  const lista = document.getElementById("listaPostagens");
  const texto = textoEl.value.trim();

  if (texto === "" && imagemInput.files.length === 0) {
    showToast("Escreva algo ou escolha uma imagem.", "error");
    return;
  }

  let imagemHTML = "";
  if (imagemInput.files.length > 0) {
    const url = URL.createObjectURL(imagemInput.files[0]);
    imagemHTML = `<img src="${url}" alt="Imagem" class="post-imagem">`;
  }

  const novoPost = document.createElement("div");
  novoPost.className = "post-card";
  novoPost.innerHTML = `
    <div class="post-topo-card">
      <div class="post-topo-info">
        <img src="img/minhafoto.jpg" alt="Foto" onerror="this.src='https://i.pravatar.cc/100?img=1'">
        <div>
          <h3>Andriellyn</h3>
          <span>2º Ano • DS</span>
        </div>
      </div>
      <button class="btn-excluir-post" onclick="excluirPost(this)" title="Excluir postagem">✕</button>
    </div>
    <p class="post-texto">${texto}</p>
    ${imagemHTML}
    <div class="post-acoes">
      <button onclick="curtirPost(this)" data-count="0" data-curtido="0">❤ 0</button>
      <button onclick="mostrarComentarios(this)">💬 Comentários</button>
    </div>
    <div class="comentarios" style="display:none;">
      <div class="lista-comentarios"></div>
      <div class="comentario-row">
        <input type="text" placeholder="Escreva um comentário..." class="input-comentario">
        <button class="btn-enviar-comentario" onclick="comentarPost(this)">Enviar</button>
      </div>
    </div>
  `;

  lista.prepend(novoPost);
  textoEl.value = "";
  imagemInput.value = "";
  showToast("✓ Postagem publicada!", "success");
}

/* ── FEED: LIMPAR CAMPO ── */
function limparPostagem() {
  const textoEl = document.getElementById("textoPostagem");
  const imagemInput = document.getElementById("imagemPostagem");
  if (textoEl) textoEl.value = "";
  if (imagemInput) imagemInput.value = "";
}

/* ── FEED: EXCLUIR POST ── */
function excluirPost(btn) {
  const card = btn.closest(".post-card");
  if (!card) return;
  card.style.opacity = "0";
  card.style.transform = "scale(0.95)";
  card.style.transition = "all 0.25s ease";
  setTimeout(() => card.remove(), 250);
  showToast("Postagem excluída.", "");
}

/* ── LOGIN ── */
function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  if (email === "" || senha === "") {
    showToast("Preencha todos os campos!", "error");
    return;
  }
  showToast("Login realizado!", "success");
  setTimeout(() => window.location.href = "inicio.html", 800);
}

/* ── CADASTRO ── */
function fazerCadastro() {
  const nome = document.getElementById("nomeCadastro").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  if (!nome || !email || !senha) {
    showToast("Preencha todos os campos!", "error");
    return;
  }
  showToast("✓ Cadastro realizado!", "success");
  setTimeout(() => window.location.href = "inicio.html", 800);
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initViews();
  initSeguidores();
  initFotoPerfil();
  initNavPill();

  const temaSalvo = localStorage.getItem("temaPerfil");
  if (temaSalvo) {
    aplicarTema(temaSalvo);
    const btn = document.querySelector(`.tema-btn[data-tema="${temaSalvo}"]`);
    if (btn) btn.classList.add("active");
  }

  const bioSalva = localStorage.getItem("wrmBio");
  const bioEl = document.getElementById("bioTexto");
  if (bioSalva && bioEl) bioEl.textContent = bioSalva;

  // Enter to comment
  document.querySelectorAll(".input-comentario").forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const btn = input.nextElementSibling;
        if (btn) btn.click();
      }
    });
  });
});

/* ── GLASS NAV PILL ── */
function initNavPill() {
  const menu = document.querySelector('.menu');
  if (!menu) return;

  const pill = document.createElement('div');
  pill.style.cssText = `
    position: absolute;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(8px);
    border-radius: 999px;
    transition: all 0.3s cubic-bezier(.4,0,.2,1);
    pointer-events: none;
    z-index: 0;
  `;
  menu.appendChild(pill);

  function moverPill(el) {
    pill.style.width = el.offsetWidth + 'px';
    pill.style.height = el.offsetHeight + 'px';
    pill.style.left = el.offsetLeft + 'px';
    pill.style.top = el.offsetTop + 'px';
  }

  const ativo = menu.querySelector('a.active');
  if (ativo) moverPill(ativo);

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => moverPill(link));
    link.addEventListener('mouseleave', () => {
      const atual = menu.querySelector('a.active');
      if (atual) moverPill(atual);
      else pill.style.width = '0';
    });
  });
}
