import { PersonStanding, Brain, Gamepad2, type LucideIcon } from 'lucide-react'
import evolabScreenshot from '../assets/screenshots/evolab.png'

export type ProjectHighlight = {
  title: string
  description: string
}

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  secondaryNote?: string
  badge: 'Runs in-browser' | 'Desktop app'
  embeddable: boolean
  icon: LucideIcon
  accentVar: string
  accentBgVar: string
  techStack: string[]
  highlights: ProjectHighlight[]
  screenshotCaption: string
  screenshotSrc?: string
  sourceUrl: string
  downloadUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'evolab',
    name: 'EvoLab',
    tagline: 'Evolve bipedal robot gaits live with a genetic algorithm, in real physics.',
    description:
      'A browser-based teaching tool for evolutionary robotics — design a bipedal robot, then watch a genetic algorithm evolve its walking gait in real physics, generation by generation.',
    badge: 'Runs in-browser',
    embeddable: true,
    icon: PersonStanding,
    accentVar: 'var(--accent-evolab)',
    accentBgVar: 'var(--accent-evolab-bg)',
    techStack: ['TypeScript', 'Three.js', 'Rapier physics', 'Vite'],
    highlights: [
      {
        title: 'Live algorithm stepper',
        description: 'Pause mid-run and watch selection, crossover and mutation act gene by gene.',
      },
      {
        title: 'MAP-Elites behaviour archive',
        description: 'A grid of every gait discovered, mapped by how it moves, not just how well.',
      },
      {
        title: 'Robustness scorecard',
        description: 'Champion gaits graded bronze, silver and gold across six unseen terrains.',
      },
      {
        title: '3D orbitable replay',
        description: 'A gait-analysis strip alongside a full 3D replay of the champion robot.',
      },
    ],
    screenshotCaption: 'Guided flow — watching a population of gaits evolve',
    screenshotSrc: evolabScreenshot,
    sourceUrl: 'https://github.com/rob-cawsey/evolab',
  },
  {
    slug: 'neurallab',
    name: 'NeuralLab',
    tagline: 'Watch a neural network learn, step by step, with every weight visible.',
    description:
      'A browser-based teaching workbench for a multilayer perceptron and a Kohonen self-organizing map — every algorithm is hand-written from scratch, so the numbers on screen are the same numbers actually driving training.',
    badge: 'Runs in-browser',
    embeddable: true,
    icon: Brain,
    accentVar: 'var(--accent-neurallab)',
    accentBgVar: 'var(--accent-neurallab-bg)',
    techStack: ['TypeScript', 'Canvas 2D', 'Three.js', 'Web Workers'],
    highlights: [
      {
        title: 'Live network graph',
        description: 'Signed-weight edges and activation-filled nodes update as training runs.',
      },
      {
        title: 'Full-screen training stepper',
        description: 'Pause and walk through one real step: sample, forward, loss, backward, update.',
      },
      {
        title: 'Break-it challenge cards',
        description: 'Twelve one-click scenarios that trigger real failure modes, like dead ReLUs.',
      },
      {
        title: '3D loss surface',
        description: 'An orbitable MLP loss landscape and a 3D-folded self-organizing map lattice.',
      },
    ],
    screenshotCaption: 'Full-screen training stepper with live gradient flow',
    sourceUrl: 'https://github.com/rob-cawsey/neurallab',
  },
  {
    slug: 'emulator',
    name: 'Emulator',
    tagline: 'Cycle-accurate NES and Genesis emulation, built from scratch in C#.',
    description:
      'A from-scratch C# recreation of classic console hardware, led by GenesisSharp — a cycle-accurate Sega Genesis / Mega Drive emulator with dual 68000 and Z80 CPU cores and full YM2612/PSG sound.',
    secondaryNote: 'Also included: NesSharp, a 6502 NES emulator, and a Sega 32X core (SH-2).',
    badge: 'Desktop app',
    embeddable: false,
    icon: Gamepad2,
    accentVar: 'var(--accent-emulator)',
    accentBgVar: 'var(--accent-emulator-bg)',
    techStack: ['C#', '.NET 9', 'WinForms', 'NAudio'],
    highlights: [
      {
        title: 'Dual-CPU Genesis core',
        description: '68000 and Z80 cores, cycle-accurate and synced with the VDP every scanline.',
      },
      {
        title: 'YM2612 and PSG sound',
        description: 'Hand-written FM synth and PSG chip emulation for authentic Genesis audio.',
      },
      {
        title: 'Built-in debugger',
        description: 'Live disassembly and register/memory inspection for 68000, Z80 and SH-2.',
      },
      {
        title: 'Save states',
        description: 'Full hardware state round-trip via .gss files, with ROM-mismatch detection.',
      },
    ],
    screenshotCaption: 'GenesisSharp debugger — live 68000/Z80 disassembly and registers',
    sourceUrl: 'https://github.com/rob-cawsey/emulators',
    downloadUrl: '#',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
