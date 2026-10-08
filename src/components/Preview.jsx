/** Small animated illustrations shown on each project card. */
export default function Preview({ kind }) {
  switch (kind) {
    case 'tenant':
      return (
        <div className="pv pv-tenant">
          {[['GET', '/pages', '200', 'ok'], ['POST', '/pages', '201', 'ok'], ['DELETE', '/pages/42', '403', 'bad'], ['GET', '/pages/913', '404', 'warn']].map(([m, path, code, cls], i) => (
            <div className="pv-req" key={path + m} style={{ animationDelay: `${i * 0.45}s` }}>
              <b className={`m-${m.toLowerCase()}`}>{m}</b><span>/api/v1{path}</span><em className={`status-${cls}`}>{code}</em>
            </div>
          ))}
        </div>
      )
    case 'stock':
      return (
        <div className="pv pv-stock">
          <div className="pv-layers">
            {['React', 'Express', 'Mongoose', 'MongoDB'].map((l) => <span key={l}>{l}</span>)}
            <i className="pv-packet" />
          </div>
          <div className="pv-doc mono">{'{ sku: "NB-204", qty: 41 }'}</div>
        </div>
      )
    case 'press':
      return (
        <div className="pv pv-press">
          <div className="pv-cal">
            {Array.from({ length: 15 }, (_, i) => <span key={i} className={[2, 6, 11].includes(i) ? 'taken' : i === 8 ? 'pick' : ''} />)}
          </div>
          <div className="pv-sql mono">INSERT INTO wp_pb_bookings …</div>
        </div>
      )
    case 'pipeline':
      return (
        <div className="pv pv-pipe">
          {['install', 'lint', 'test', 'build', 'deploy'].map((j, i) => (
            <div className="pv-job" key={j}>
              <span className="mono">{j}</span>
              <i><b style={{ animationDelay: `${i * 0.55}s` }} /></i>
            </div>
          ))}
        </div>
      )
    case 'ship':
      return (
        <div className="pv pv-ship">
          <div className="pv-label">
            <div className="pv-label-head"><b>FedEx</b><span>2-DAY</span></div>
            <div className="pv-lines"><i /><i /><i style={{ width: '50%' }} /></div>
            <div className="pv-barcode">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ width: (i * 7) % 3 + 1 }} />)}</div>
          </div>
          <div className="pv-track">{[0, 1, 2, 3].map((i) => <span key={i} style={{ animationDelay: `${i * 0.5}s` }} />)}</div>
        </div>
      )
    case 'inbox':
      return (
        <div className="pv pv-inbox">
          {['Order status', 'Return', 'Address'].map((t, i) => (
            <div className="pv-mail" key={t} style={{ animationDelay: `${i * 0.35}s` }}>
              <span className="pv-avatar" /><span className="pv-mail-lines"><i /><i /></span><em>{t}</em>
            </div>
          ))}
          <div className="pv-reply"><span>AI draft</span><i /><i /></div>
        </div>
      )
    case 'sort':
      return (
        <div className="pv pv-sort">
          <div className="pv-belt" />
          {['var(--rose)', 'var(--sky)', 'var(--mint)', 'var(--amber)'].map((c, i) => (
            <span key={i} className="pv-box" style={{ background: c, animationDelay: `${i * 0.9}s` }} />
          ))}
          <div className="pv-bins">{[0, 1, 2, 3].map((i) => <span key={i} />)}</div>
        </div>
      )
    case 'pulse':
      return (
        <div className="pv pv-pulse">
          <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
            <path className="pv-spark" d="M0 60 L20 52 L40 56 L60 38 L80 44 L100 26 L120 34 L140 18 L160 28 L180 12 L200 20" />
          </svg>
          <div className="pv-kpis"><span>1.2k</span><span>98ms</span><span>0.2%</span></div>
        </div>
      )
    case 'atlas':
      return (
        <div className="pv pv-atlas">
          <span className="pv-btn" /><span className="pv-btn ghost" />
          <span className="pv-switch"><i /></span>
          <div className="pv-swatches">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}</div>
        </div>
      )
    case 'contrast':
      return (
        <div className="pv pv-contrast">
          <span className="pv-aa">Aa</span>
          <span className="pv-ratio">7.4:1</span>
          <span className="pv-pass">AAA</span>
        </div>
      )
    default:
      return (
        <div className="pv pv-headless">
          <div className="pv-pane"><i /><i /><i /></div>
          <div className="pv-flow"><span /></div>
          <div className="pv-pane site"><b /><i /><i /></div>
        </div>
      )
  }
}
