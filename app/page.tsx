import { site } from '@/lib/site';

export default function AboutPage() {
  return (
    <div className="space-y-8 font-geist-mono">
      <header className="space-y-3">
        <h1 className="text-5xl tracking-tight font-normal">{site.name}</h1>
      </header>

      <section className="space-y-6 text-[1.1rem] leading-[1.95] text-foreground font-normal max-w-[72ch]">
        <p>
          Hi, I am Divyansh, and I’m a Machine Learning Engineer at Sprinklr, building scalable ML
          systems from the ground up. Currently, I’m working on Agentic and RAG systems.
        </p>
        <p>
          I graduated from IIIT Allahabad, where I enjoyed my time experimenting with multimodal
          architectures on problems like Image Captioning and Visual Question Answering. Academic
          curiosity never left; I’m still a &ldquo;systems&rdquo; geek at heart, constantly dissecting
          interesting new ideas.
        </p>
        <p>
          My interests include reading books and trying out weird pawn breaks (I’m not a pro). If
          you’re up for a game, catch me on chess.com (divyanshrai655) or Lichess (infinity_divyansh).
        </p>
      </section>
    </div>
  );
}

