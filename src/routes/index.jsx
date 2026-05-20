import { Link, NavLink } from "react-router-dom";
import { Search, MapPin, BedDouble, Bath, Maximize, ArrowUpRight, Phone, Mail } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import listing4 from "@/assets/listing-4.jpg";

const listings = [
  { id: 1, img: listing1, title: "Casa Ipe Modernista", location: "Jardins, Sao Paulo", price: "R$ 4.250.000", beds: 4, baths: 3, area: "320 m2", tag: "Venda" },
  { id: 2, img: listing2, title: "Penthouse Aurora", location: "Vila Olimpia, Sao Paulo", price: "R$ 12.900/mes", beds: 3, baths: 2, area: "210 m2", tag: "Aluguel" },
  { id: 3, img: listing3, title: "Casa de Campo Oliveira", location: "Serra da Mantiqueira", price: "R$ 2.890.000", beds: 5, baths: 4, area: "480 m2", tag: "Venda" },
  { id: 4, img: listing4, title: "Villa Costa Azul", location: "Buzios, Rio de Janeiro", price: "R$ 18.500.000", beds: 6, baths: 6, area: "920 m2", tag: "Exclusivo" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SearchBar />
      <Featured />
      <Categories />
      <AgentsCTA />
      <Footer />
    </div>
  );
}

function Header() {
  const linkClass = ({ isActive }) =>
    "hover:text-[var(--gold)] transition" + (isActive ? " text-[var(--gold)]" : "");
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full border border-[var(--gold)] flex items-center justify-center">
            <span className="font-display text-[var(--gold)] text-lg">L</span>
          </span>
          <span className="font-display text-xl text-cream tracking-wide">LoBi</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-cream/90">
          <NavLink to="/imoveis" className={linkClass}>Imoveis</NavLink>
          <NavLink to="/corretores" className={linkClass}>Corretores</NavLink>
          <NavLink to="/imobiliarias" className={linkClass}>Imobiliarias</NavLink>
          <NavLink to="/propostas" className={linkClass}>Propostas</NavLink>
        </nav>
        <Link to="/imoveis" className="text-sm px-5 py-2.5 rounded-full bg-[var(--gold)] text-[var(--olive-deep)] font-medium hover:bg-[var(--gold-deep)] hover:text-cream transition">
          Anunciar imovel
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <img src={heroVilla} alt="Villa moderna ao por do sol" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.03_60/0.55)] via-[oklch(0.22_0.03_60/0.25)] to-[oklch(0.22_0.03_60/0.75)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-24">
        <span className="text-[var(--gold)] tracking-[0.3em] text-xs uppercase mb-6">Curadoria · Desde 2014</span>
        <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          O endereco do seu<br /><em className="text-[var(--gold)]">proximo capitulo.</em>
        </h1>
        <p className="text-cream/85 mt-8 max-w-xl text-lg">
          Imoveis selecionados com curadoria editorial. Compre, alugue ou contrate um agente especializado.
        </p>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <div className="relative z-30 -mt-14 mx-auto max-w-6xl px-6">
      <div className="bg-card border border-border rounded-sm shadow-[var(--shadow-elegant)] p-2 flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
          <MapPin className="h-5 w-5 text-[var(--olive)]" />
          <input className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground" placeholder="Cidade, bairro ou endereco" />
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
          <select className="bg-transparent outline-none flex-1 text-sm text-foreground">
            <option>Comprar</option><option>Alugar</option><option>Investir</option>
          </select>
        </div>
        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-border">
          <select className="bg-transparent outline-none flex-1 text-sm text-foreground">
            <option>Faixa de preco</option><option>Ate R$ 1M</option><option>R$ 1M - 5M</option><option>Acima R$ 5M</option>
          </select>
        </div>
        <button className="bg-[var(--olive)] text-primary-foreground px-8 py-4 rounded-sm hover:bg-[var(--olive-deep)] transition flex items-center justify-center gap-2 font-medium">
          <Search className="h-4 w-4" /> Buscar
        </button>
      </div>
    </div>
  );
}

function Featured() {
  return (
    <section id="listings" className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-14">
        <div>
          <span className="text-[var(--gold-deep)] tracking-[0.3em] text-xs uppercase">Selecionados</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Imoveis em destaque</h2>
        </div>
        <Link to="/imoveis" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--olive)] hover:text-[var(--gold-deep)] transition">
          Ver todos <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {listings.map((l) => (
          <article key={l.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-muted">
              <img src={l.img} alt={l.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-4 left-4 bg-cream/95 text-[var(--olive-deep)] text-xs uppercase tracking-widest px-3 py-1.5">{l.tag}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl">{l.title}</h3>
                <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {l.location}</p>
              </div>
              <p className="font-display text-xl text-[var(--gold-deep)] shrink-0">{l.price}</p>
            </div>
            <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground border-t border-border pt-4">
              <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {l.beds} quartos</span>
              <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" /> {l.baths} banheiros</span>
              <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {l.area}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { label: "Casas", count: "240 imoveis" },
    { label: "Apartamentos", count: "186 imoveis" },
    { label: "Coberturas", count: "42 imoveis" },
    { label: "Rural & Campo", count: "78 imoveis" },
    { label: "Litoral", count: "94 imoveis" },
    { label: "Comercial", count: "53 imoveis" },
  ];
  return (
    <section id="categories" className="bg-[var(--olive-deep)] text-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-3 gap-12 items-end mb-16">
          <div className="md:col-span-2">
            <span className="text-[var(--gold)] tracking-[0.3em] text-xs uppercase">Explore</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-cream">Encontre por <em className="text-[var(--gold)]">categoria</em></h2>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed">Do urbano ao rural, navegue pelas categorias e descubra propriedades que combinam com a sua historia.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-cream/10">
          {cats.map((c) => (
            <Link key={c.label} to="/imoveis" className="bg-[var(--olive-deep)] hover:bg-[var(--olive)] transition p-8 group">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl text-cream">{c.label}</h3>
                <ArrowUpRight className="h-5 w-5 text-[var(--gold)] group-hover:rotate-45 transition-transform" />
              </div>
              <p className="text-cream/60 text-sm mt-2">{c.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentsCTA() {
  return (
    <section id="agents" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] bg-[var(--peach)] relative overflow-hidden rounded-sm">
          <div className="absolute inset-8 border border-[var(--gold)]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-display text-7xl text-[var(--olive-deep)]">12</p>
              <p className="text-[var(--olive-deep)] tracking-widest text-xs uppercase mt-2">anos de curadoria</p>
            </div>
          </div>
        </div>
        <div>
          <span className="text-[var(--gold-deep)] tracking-[0.3em] text-xs uppercase">Nossos corretores</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Contrate quem entende<br /><em className="text-[var(--gold-deep)]">do seu lugar.</em>
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Conectamos voce a corretores locais especializados. Atendimento consultivo do primeiro contato a entrega das chaves.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/corretores" className="bg-[var(--olive)] text-primary-foreground px-7 py-3.5 rounded-sm hover:bg-[var(--olive-deep)] transition font-medium text-sm">
              Ver corretores
            </Link>
            <Link to="/propostas" className="border border-[var(--olive)] text-[var(--olive)] px-7 py-3.5 rounded-sm hover:bg-[var(--olive)] hover:text-primary-foreground transition font-medium text-sm">
              Fazer proposta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[var(--olive-deep)] text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full border border-[var(--gold)] flex items-center justify-center">
                <span className="font-display text-[var(--gold)]">L</span>
              </span>
              <span className="font-display text-xl text-cream">LoBi</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed">
              Plataforma de locacao imobiliaria. Encontre, alugue ou anuncie imoveis com facilidade.
            </p>
          </div>
          <div>
            <h4 className="text-cream font-display text-lg mb-4">Contato</h4>
            <p className="text-sm flex items-center gap-2 mb-2"><Phone className="h-4 w-4" /> +55 11 4002-8922</p>
            <p className="text-sm flex items-center gap-2"><Mail className="h-4 w-4" /> ola@lobi.com.br</p>
          </div>
          <div>
            <h4 className="text-cream font-display text-lg mb-4">Navegue</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/imoveis" className="hover:text-[var(--gold)]">Imoveis</Link></li>
              <li><Link to="/corretores" className="hover:text-[var(--gold)]">Corretores</Link></li>
              <li><Link to="/imobiliarias" className="hover:text-[var(--gold)]">Imobiliarias</Link></li>
              <li><Link to="/propostas" className="hover:text-[var(--gold)]">Propostas</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-16 pt-6 flex justify-between text-xs text-cream/50">
          <span>2026 LoBi - Locacao Imobiliaria. Todos os direitos reservados.</span>
          <span>Curadoria desde 2014</span>
        </div>
      </div>
    </footer>
  );
}
