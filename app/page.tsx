import { site } from '@/lib/site';

export default function AboutPage() {
  return (
    <div className="space-y-8 font-geist-mono">
      <section className="space-y-6 text-[1.1rem] leading-[1.95] text-foreground font-normal max-w-[72ch] mx-auto">
        <p>
          Hi, I am Divyansh!
        </p>
        <p>
          I'm a Machine Learning Engineer at Sprinklr, building scalable ML
          systems from the ground up. Currently, I'm working on Agentic and RAG systems.
        </p>
        <p>
          I graduated from IIIT Allahabad, where I enjoyed my time experimenting with multimodal
          architectures on problems like Image Captioning and Visual Question Answering. Academic
          curiosity never left; I'm still a &ldquo;systems&rdquo; geek at heart, constantly dissecting
          interesting new ideas.
        </p>
        <p>
          My interests include reading books, occassional long distance running and trying out weird pawn breaks (not a pro). If
          you're up for a game, catch me on chess.com (divyanshrai655).
        </p>
      </section>
    </div>
  );
}
