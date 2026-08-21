export type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  projectSlug: 'evolab' | 'neurallab' | 'emulator'
  excerpt: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'why-i-hand-wrote-backprop',
    title: 'Why I hand-wrote backprop instead of using a library',
    date: '2026-08-12',
    readTime: '6 min read',
    projectSlug: 'neurallab',
    excerpt:
      'On the teaching value of watching every gradient update happen live, with no black box in the way.',
    body: [
      'Most people learn backpropagation from a diagram, then immediately start calling model.fit() and never see the algorithm again. NeuralLab exists to close that gap: every forward pass, every loss calculation, every gradient and every weight update is a few lines of plain TypeScript, and the on-screen numbers are the exact numbers doing the work.',
      'That constraint shaped the whole project. There is no autodiff library and no tensor framework anywhere in the core packages — just arrays, loops, and the chain rule written out by hand. It is slower than calling a library, and that is fine, because the point is not throughput. The point is that when a student drags the probe across the decision boundary, they are watching the actual computation, not an animation of one.',
      'The tradeoff shows up most in the stepper UI, which pauses a training run mid-step and walks through sample, forward, loss, backward and update as five distinct, inspectable stages. Building that meant structuring the training loop so it could be paused and resumed cleanly at each stage boundary, which took longer than a normal training loop would have. Worth it, though — that view is the one people spend the most time on.',
    ],
  },
  {
    slug: 'genesissharp-two-cpus-one-video-chip',
    title: 'Inside GenesisSharp: syncing two CPUs to one video chip',
    date: '2026-07-30',
    readTime: '4 min read',
    projectSlug: 'emulator',
    excerpt: 'Keeping the 68000, Z80 and VDP in lockstep, scanline by scanline.',
    body: [
      'The Sega Genesis runs two CPUs — a Motorola 68000 as the main processor and a Zilog Z80 mostly reserved for sound — plus a video display processor that neither of them fully controls the timing of. Getting believable emulation out of that means none of the three can run ahead of the others by more than a few cycles, or games that rely on precise raster timing break in ways that look like random glitches.',
      'GenesisSharp solves this with a unified per-scanline execution model: each scanline, the 68000 runs its budgeted cycles, then the Z80 runs its budgeted cycles, then the VDP advances by exactly one line and fires whatever interrupts are due. Nothing is emulated for a full frame in one pass — that is what causes 90% of the "close but wrong" bugs in a naive emulator.',
      'The payoff is that games which do mid-frame raster tricks — palette swaps partway down the screen, split-scroll effects — render correctly, because the emulator is exposed to the same scanline-by-scanline reality the real hardware was built around.',
    ],
  },
  {
    slug: 'twelve-ways-to-break-a-neural-network',
    title: 'Twelve ways to break a neural network, on purpose',
    date: '2026-07-14',
    readTime: '5 min read',
    projectSlug: 'neurallab',
    excerpt:
      'Challenge cards that induce dead ReLUs, exploding gradients and worse, to teach failure modes.',
    body: [
      'It is easy to show someone a neural network that works. It is much more useful to show them one that fails, and let them watch why. NeuralLab\'s challenge cards are one-click scenarios that deliberately misconfigure a network — XOR with no hidden layer, a learning rate an order of magnitude too high, every weight initialized to zero — so the failure is visible in the same live diagnostics used for a healthy run.',
      'Zero initialization is the clearest one to teach with: every neuron in a layer receives the same gradient, so they all update identically forever, and the weight histogram visibly collapses to a single spike instead of spreading out. Students who have read about the symmetry problem in a textbook usually do not really believe it until they watch it happen to a network they configured themselves.',
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
