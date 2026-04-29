import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Brain, CheckCircle2, ClipboardList, Code2, Database, Download, ExternalLink, FileText, ImagePlus, Rocket, ShieldCheck, TerminalSquare, Workflow } from 'lucide-react';
import './styles.css';

const defaultEvidence = [
  {
    id: 'system',
    step: '01',
    title: 'System Online',
    subtitle: 'OpenClaw Gateway / Web Control / Discord Entry',
    highlight: 'gateway ready · agent model online',
    note: '證明 Agent 執行環境已經能在本地啟動，並連接外部模型路由。',
    icon: TerminalSquare,
  },
  {
    id: 'memory',
    step: '02',
    title: 'Memory Connected',
    subtitle: 'core_method / memory_core / workflows_core / models_core',
    highlight: 'long-term-context.md · project-context.md · user-preferences.md',
    note: '證明 Agent 可以讀取外部結構化記憶，而不是每次從零開始。',
    icon: Database,
  },
  {
    id: 'research',
    step: '03',
    title: 'Business Research Execution',
    subtitle: 'Company Research / Source Verification / Claim Confidence',
    highlight: 'confirmed · source URL · confidence · caveat',
    note: '證明 Agent 已能完成 B2B 業務開發中的資料核驗與可信輸出。',
    icon: ClipboardList,
  },
  {
    id: 'outreach',
    step: '04',
    title: 'Outreach Generation',
    subtitle: 'Verified Profile / Outreach Angle / First-contact Email',
    highlight: '15-minute exploratory call · complementary partner',
    note: '證明 Agent 能把驗證資料轉換成保守、可寄送的商務外聯草稿。',
    icon: FileText,
  },
  {
    id: 'evolution',
    step: '05',
    title: 'Next Evolution',
    subtitle: 'Code Generation / Sandbox ERP / Skill Intake / Self Correction',
    highlight: 'Codex · Claude Code · ERP/CRM sandbox · skill digestion',
    note: '下一步將測試程式生成、模擬沙盒、ERP/CRM 流程與 Agent 自我修正。',
    icon: Workflow,
  },
];

const roadmap = [
  '低 token 業務開發流程模板',
  'DeepSeek / MiMo / Qwen 模型池路由',
  'Codex / Claude Code 程式生成介入',
  'ERP / CRM 模擬沙盒與流程測試',
  'Skill 文檔吸收與自我修正規則庫',
];

function App() {
  const [projectName, setProjectName] = useState('Lobster Agent OS｜AI 業務飛行記錄儀');
  const [tagline, setTagline] = useState('An OpenClaw-based business execution agent that connects memory, tools, research, code generation, and real-world outreach.');
  const [evidence, setEvidence] = useState(defaultEvidence.map(item => ({ ...item, image: null })));
  const [active, setActive] = useState('system');
  const printRef = useRef(null);

  const activeItem = useMemo(() => evidence.find(item => item.id === active) || evidence[0], [evidence, active]);

  const handleImage = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEvidence(prev => prev.map(item => item.id === id ? { ...item, image: reader.result } : item));
    };
    reader.readAsDataURL(file);
  };

  const exportHTML = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lobster-agent-os-proof.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  return (
    <main className="app">
      <section className="hero" ref={printRef}>
        <div className="hero-grid">
          <div>
            <div className="badge"><Rocket size={16} /> MiMo Token Application Proof MVP</div>
            <input className="title-input" value={projectName} onChange={e => setProjectName(e.target.value)} />
            <textarea className="tagline-input" value={tagline} onChange={e => setTagline(e.target.value)} />
            <div className="hero-actions no-print">
              <button onClick={handlePrint}><Download size={16} /> 匯出 PDF / 列印</button>
              <button className="secondary" onClick={exportHTML}><ExternalLink size={16} /> 匯出單頁 HTML</button>
            </div>
          </div>
          <div className="score-card">
            <div className="score-title"><Brain size={20} /> Project Signal</div>
            <div className="score-number">5-stage</div>
            <p>從 Agent 啟動、記憶接入、商務研究、外聯生成，到下一階段程式生成與 ERP/CRM 沙盒。</p>
          </div>
        </div>
      </section>

      <section className="proof-layout">
        <aside className="timeline">
          {evidence.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActive(item.id)} className={active === item.id ? 'timeline-item active' : 'timeline-item'}>
                <span className="step">{item.step}</span>
                <Icon size={18} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </aside>

        <section className="detail-card">
          <div className="detail-header">
            <span className="step-large">{activeItem.step}</span>
            <div>
              <h2>{activeItem.title}</h2>
              <p>{activeItem.subtitle}</p>
            </div>
          </div>
          <div className="highlight"><ShieldCheck size={18} /> {activeItem.highlight}</div>
          <p className="note">{activeItem.note}</p>

          <label className="upload-box no-print">
            <ImagePlus size={28} />
            <strong>上傳這一階段的截圖證明</strong>
            <span>支援 png / jpg / webp。圖片只保存在本機瀏覽器，不會上傳伺服器。</span>
            <input type="file" accept="image/*" onChange={e => handleImage(activeItem.id, e.target.files?.[0])} />
          </label>

          <div className="image-preview">
            {activeItem.image ? <img src={activeItem.image} alt={activeItem.title} /> : (
              <div className="placeholder">
                <ImagePlus size={44} />
                <p>放入 OpenClaw / 91APP / Gateway / Outreach 截圖，形成可提交的項目證明長圖。</p>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="summary-grid">
        <div className="panel">
          <h3><CheckCircle2 size={20} /> 已證明能力</h3>
          <ul>
            <li>本地 OpenClaw Gateway 可啟動並進行模型路由。</li>
            <li>Agent 可讀取外部 memory/workflow/model 目錄。</li>
            <li>可完成公司資料驗證、外聯角度與信件草稿。</li>
            <li>可作為未來 code generation 與 ERP/CRM 沙盒的執行核心。</li>
          </ul>
        </div>
        <div className="panel">
          <h3><Code2 size={20} /> MiMo Token 用途</h3>
          <ul>
            <li>測試長上下文、多步驟任務與中文商務理解。</li>
            <li>支援 Codex / Claude Code 生成腳本與小型工具。</li>
            <li>吸收 Skill / API 文件並轉成可執行工作流。</li>
            <li>降低業務搜尋、內容生成與流程自動化成本。</li>
          </ul>
        </div>
      </section>

      <section className="roadmap">
        <h3>Next Evolution Roadmap</h3>
        <div className="roadmap-list">
          {roadmap.map((item, index) => <div className="roadmap-item" key={item}><span>{index + 1}</span>{item}</div>)}
        </div>
      </section>

      <footer>
        Lobster Agent OS MVP · Built for Xiaomi MiMo Token Application · Local-first proof page
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
