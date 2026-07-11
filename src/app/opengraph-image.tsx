import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = '.hack26 | IEEE SB MACE Flagship Hackathon 2026';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #010005, #020617, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(14,165,233,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />

        {/* Decorative Glow */}
        <div
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            background: 'rgba(14, 165, 233, 0.2)',
            filter: 'blur(150px)',
            borderRadius: '50%',
            top: '-200px',
            left: '-200px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '40px',
              fontWeight: 600,
              color: '#38BDF8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            IEEE SB MACE
          </div>
          
          <div
            style={{
              fontSize: '120px',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              background: 'linear-gradient(to right, #ffffff, #e0f2fe, #38bdf8)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '40px',
            }}
          >
            &gt;.hack26
          </div>

          <div
            style={{
              fontSize: '36px',
              fontWeight: 500,
              color: '#cbd5e1',
              letterSpacing: '0.05em',
            }}
          >
            Flagship Hackathon 2026
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '30px 60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(14, 165, 233, 0.3)',
            background: 'rgba(2, 6, 23, 0.8)',
          }}
        >
          <div style={{ fontSize: '24px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#38bdf8', marginRight: '10px' }}>//</span> Build. Innovate. Change the future.
          </div>
          <div style={{ fontSize: '24px', color: '#38bdf8', fontWeight: 600 }}>
            hack26.ieeemace.org
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
