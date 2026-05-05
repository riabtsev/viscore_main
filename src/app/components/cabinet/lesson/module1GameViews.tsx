'use client';

import React from 'react';
import type { FocusSceneKey, PathSceneKey } from './module1GameScenes';

const ACCENT = '#FF4F1F';
const BOX = 'absolute bg-[#E8E3DC] border border-black/[0.06] rounded-md';
const BOX_DARK = 'absolute bg-[#D8D2C8] border border-black/[0.08] rounded-md';

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full aspect-[16/10] rounded-xl bg-[#FDFCFA] border border-black/[0.08] overflow-hidden">{children}</div>;
}

function Dot({ style, className = '' }: { style: React.CSSProperties; className?: string }) {
  return <div className={`absolute rounded-full ${className}`} style={style} />;
}

/* ─── Focus scenes ─── */

function FDualEqual() {
  return (
    <Frame>
      <div className={`${BOX} left-[10%] top-[38%] h-[28%] w-[22%]`} />
      <div className={`${BOX} right-[10%] top-[38%] h-[28%] w-[22%]`} />
      <Dot style={{ left: '22%', top: '48%', width: '14%', height: '18%', minWidth: 10, background: ACCENT, boxShadow: `0 0 0 4px ${ACCENT}33` }} />
      <Dot style={{ right: '22%', top: '48%', width: '14%', height: '18%', minWidth: 10, background: ACCENT, boxShadow: `0 0 0 4px ${ACCENT}33` }} />
    </Frame>
  );
}

function FSingleHero() {
  return (
    <Frame>
      <div className={`${BOX} left-[12%] top-[40%] h-[24%] w-[18%]`} />
      <div className={`${BOX} left-[38%] top-[36%] h-[20%] w-[16%]`} />
      <div className={`${BOX} right-[12%] top-[42%] h-[22%] w-[20%]`} />
      <Dot
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '12%',
          height: '15%',
          maxWidth: 22,
          maxHeight: 28,
          background: ACCENT,
          boxShadow: `0 0 0 8px ${ACCENT}22`,
        }}
      />
    </Frame>
  );
}

function FTriMuted() {
  return (
    <Frame>
      <div className={`${BOX} left-[8%] top-[35%] h-[30%] w-[26%]`} />
      <div className={`${BOX} right-[8%] top-[35%] h-[30%] w-[26%]`} />
      <Dot style={{ left: '18%', top: '52%', width: '6%', height: '8%', background: '#BFB5A8' }} />
      <Dot style={{ left: '47%', top: '48%', width: '6%', height: '8%', background: '#B8AEA3' }} />
      <Dot style={{ right: '20%', top: '50%', width: '6%', height: '8%', background: '#BFB5A8' }} />
    </Frame>
  );
}

function FLowContrast() {
  return (
    <Frame>
      <div className={`${BOX} left-[15%] top-[30%] h-[40%] w-[70%]`} style={{ background: '#E5DFE8' }} />
      <Dot style={{ left: '44%', top: '44%', width: '10%', height: '12%', background: '#C9C2B8' }} />
    </Frame>
  );
}

function FHighContrast() {
  return (
    <Frame>
      <div className={`${BOX} left-[20%] top-[25%] h-[18%] w-[22%]`} />
      <div className={`${BOX} right-[18%] top-[55%] h-[20%] w-[24%]`} />
      <Dot
        style={{
          left: '46%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
          width: '11%',
          height: '14%',
          background: ACCENT,
          boxShadow: `0 0 0 10px ${ACCENT}18`,
        }}
      />
    </Frame>
  );
}

function FObscured() {
  return (
    <Frame>
      <Dot style={{ left: '40%', top: '40%', width: '14%', height: '18%', background: ACCENT, zIndex: 0 }} />
      <div className={`${BOX_DARK} left-[32%] top-[32%] h-[36%] w-[40%] z-[1]`} style={{ opacity: 0.92 }} />
    </Frame>
  );
}

function FBigMassTinyGray() {
  return (
    <Frame>
      <div className={`${BOX_DARK} left-[4%] top-[12%] h-[76%] w-[42%]`} />
      <div className={`${BOX_DARK} right-[4%] top-[12%] h-[76%] w-[42%]`} />
      <Dot style={{ left: '48%', top: '48%', width: '4%', height: '5%', background: '#9A9088' }} />
    </Frame>
  );
}

function FBigMassAccentPop() {
  return (
    <Frame>
      <div className={`${BOX_DARK} left-[5%] top-[18%] h-[64%] w-[38%]`} />
      <div className={`${BOX_DARK} right-[5%] top-[18%] h-[64%] w-[38%]`} />
      <Dot
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '9%',
          height: '11%',
          background: ACCENT,
          boxShadow: `0 0 0 8px ${ACCENT}25`,
        }}
      />
    </Frame>
  );
}

function FFlatNoHierarchy() {
  return (
    <Frame>
      <div className={`${BOX} left-[15%] top-[38%] h-[26%] w-[20%]`} />
      <div className={`${BOX} left-[40%] top-[38%] h-[26%] w-[20%]`} />
      <div className={`${BOX} right-[15%] top-[38%] h-[26%] w-[20%]`} />
    </Frame>
  );
}

function FCramped() {
  return (
    <Frame>
      <div className={`${BOX_DARK} left-[8%] top-[10%] h-[80%] w-[38%]`} />
      <div className={`${BOX_DARK} right-[8%] top-[10%] h-[80%] w-[38%]`} />
      <Dot style={{ left: '46%', top: '46%', width: '8%', height: '10%', background: ACCENT }} />
    </Frame>
  );
}

function FOpenField() {
  return (
    <Frame>
      <div className={`${BOX} left-[8%] top-[12%] h-[14%] w-[16%]`} />
      <div className={`${BOX} right-[10%] bottom-[14%] h-[16%] w-[18%]`} />
      <Dot
        style={{
          left: '48%',
          top: '44%',
          transform: 'translate(-50%, -50%)',
          width: '10%',
          height: '13%',
          background: ACCENT,
          boxShadow: `0 0 0 12px ${ACCENT}14`,
        }}
      />
    </Frame>
  );
}

function FCornerNoise() {
  return (
    <Frame>
      <div className={`${BOX} left-[4%] top-[4%] h-[10%] w-[12%]`} />
      <div className={`${BOX} left-[4%] top-[18%] h-[8%] w-[10%]`} />
      <div className={`${BOX} left-[18%] top-[6%] h-[9%] w-[11%]`} />
      <Dot style={{ left: '8%', top: '34%', width: '6%', height: '8%', background: ACCENT }} />
      <div className={`${BOX} right-[12%] top-[40%] h-[40%] w-[35%]`} />
    </Frame>
  );
}

/* ─── Path scenes ─── */

function PStairToDot() {
  return (
    <Frame>
      <div className={`${BOX} left-[12%] top-[18%] h-[12%] w-[16%]`} />
      <div className={`${BOX} left-[28%] top-[32%] h-[14%] w-[18%]`} />
      <div className={`${BOX} left-[48%] top-[46%] h-[16%] w-[20%]`} />
      <Dot
        style={{
          right: '12%',
          bottom: '16%',
          width: '11%',
          height: '14%',
          background: ACCENT,
          boxShadow: `0 0 0 6px ${ACCENT}28`,
        }}
      />
    </Frame>
  );
}

function PChaos() {
  return (
    <Frame>
      <div className={`${BOX} left-[10%] top-[50%] h-[20%] w-[22%]`} />
      <div className={`${BOX} right-[15%] top-[12%] h-[18%] w-[25%]`} />
      <div className={`${BOX} left-[40%] top-[22%] h-[15%] w-[18%]`} />
      <Dot style={{ left: '65%', top: '55%', width: '8%', height: '10%', background: ACCENT }} />
      <div className={`${BOX} left-[22%] top-[12%] h-[12%] w-[14%]`} />
    </Frame>
  );
}

function PAwayFromDot() {
  return (
    <Frame>
      <Dot style={{ left: '8%', top: '72%', width: '7%', height: '9%', background: ACCENT }} />
      <div className={`${BOX_DARK} right-[6%] top-[14%] h-[55%] w-[52%]`} />
      <div className={`${BOX} right-[20%] top-[28%] h-[30%] w-[28%]`} />
    </Frame>
  );
}

function PScanHotZone() {
  return (
    <Frame>
      <Dot
        style={{
          left: '10%',
          top: '14%',
          width: '12%',
          height: '15%',
          background: ACCENT,
          boxShadow: `0 0 0 8px ${ACCENT}22`,
        }}
      />
      <div className={`${BOX} left-[38%] top-[22%] h-[22%] w-[26%]`} />
      <div className={`${BOX} right-[10%] bottom-[18%] h-[24%] w-[30%]`} />
    </Frame>
  );
}

function PScanCold() {
  return (
    <Frame>
      <div className={`${BOX} left-[14%] top-[20%] h-[28%] w-[32%]`} />
      <div className={`${BOX} right-[18%] top-[24%] h-[24%] w-[28%]`} />
      <Dot style={{ right: '14%', bottom: '12%', width: '7%', height: '9%', background: ACCENT }} />
    </Frame>
  );
}

function PScanMuted() {
  return (
    <Frame>
      <div className={`${BOX} left-[18%] top-[28%] h-[26%] w-[30%]`} />
      <Dot style={{ left: '52%', top: '38%', width: '10%', height: '12%', background: '#DDD6CC' }} />
      <div className={`${BOX} right-[12%] top-[30%] h-[28%] w-[26%]`} />
    </Frame>
  );
}

function PSecondNeighbor() {
  return (
    <Frame>
      <Dot
        style={{
          left: '14%',
          top: '40%',
          width: '11%',
          height: '14%',
          background: ACCENT,
          boxShadow: `0 0 0 6px ${ACCENT}20`,
        }}
      />
      <div className={`${BOX} left-[32%] top-[42%] h-[18%] w-[24%]`} style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
      <div className={`${BOX} right-[10%] top-[20%] h-[16%] w-[20%]`} />
    </Frame>
  );
}

function PSecondFar() {
  return (
    <Frame>
      <Dot style={{ left: '12%', top: '42%', width: '11%', height: '14%', background: ACCENT, boxShadow: `0 0 0 6px ${ACCENT}20` }} />
      <div className={`${BOX} right-[8%] top-[14%] h-[20%] w-[22%]`} />
      <div className={`${BOX} left-[35%] bottom-[12%] h-[18%] w-[26%]`} />
    </Frame>
  );
}

function PSecondCompete() {
  return (
    <Frame>
      <Dot style={{ left: '10%', top: '40%', width: '10%', height: '12%', background: ACCENT }} />
      <div className={`${BOX} left-[32%] top-[32%] h-[24%] w-[26%]`} />
      <div className={`${BOX} right-[10%] top-[32%] h-[24%] w-[26%]`} />
    </Frame>
  );
}

const FOCUS_VIEWS: Record<FocusSceneKey, React.FC> = {
  f_dual_equal: FDualEqual,
  f_single_hero: FSingleHero,
  f_tri_muted: FTriMuted,
  f_low_contrast: FLowContrast,
  f_high_contrast: FHighContrast,
  f_obscured: FObscured,
  f_big_mass_tiny_gray: FBigMassTinyGray,
  f_big_mass_accent_pop: FBigMassAccentPop,
  f_flat_no_hierarchy: FFlatNoHierarchy,
  f_cramped: FCramped,
  f_open_field: FOpenField,
  f_corner_noise: FCornerNoise,
};

const PATH_VIEWS: Record<PathSceneKey, React.FC> = {
  p_stair_to_dot: PStairToDot,
  p_chaos: PChaos,
  p_away_from_dot: PAwayFromDot,
  p_scan_hot_zone: PScanHotZone,
  p_scan_cold: PScanCold,
  p_scan_muted: PScanMuted,
  p_second_neighbor: PSecondNeighbor,
  p_second_far: PSecondFar,
  p_second_compete: PSecondCompete,
};

export function GameFocusScene({ scene }: { scene: FocusSceneKey }) {
  const Cmp = FOCUS_VIEWS[scene];
  return <Cmp />;
}

export function GamePathScene({ scene }: { scene: PathSceneKey }) {
  const Cmp = PATH_VIEWS[scene];
  return <Cmp />;
}
