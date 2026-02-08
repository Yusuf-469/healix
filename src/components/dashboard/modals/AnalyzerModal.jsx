import React, { useState, useCallback } from 'react';
import { useYourAI } from '../../../hooks/useYourAI';
import { useUIStore } from '../../../stores/uiStore';

export const AnalyzerModal = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const { analyzeReport } = useYourAI();
  const { closeAnalyzer } = useUIStore();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileSelect = (e) => { if (e.target.files && e.target.files[0]) setFile(e.target.files[0]); };

  const handleAnalyze = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const data = await analyzeReport(file);
      setResult(data);
    } catch (error) { console.error('Analysis failed:', error); }
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden border border-navy-700">
        <div className="p-6 border-b border-navy-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div><h2 className="text-xl font-bold text-white">Report Analyzer</h2><p className="text-sm text-gray-400">Upload medical reports</p></div>
          </div>
          <button onClick={() => { setFile(null); setResult(null); closeAnalyzer(); }} className="p-2 hover:bg-navy-700 rounded-lg"><span className="text-xl">✕</span></button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {result ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <span className="text-2xl">✅</span>
                <div><p className="text-green-400 font-medium">Analysis Complete</p><p className="text-sm text-gray-400">Urgency: {result.urgency || 'Normal'}</p></div>
              </div>
              <div className="bg-navy-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
                <p className="text-gray-300 leading-relaxed">{result.summary || 'Analysis complete.'}</p>
              </div>
              {result.findings && (
                <div className="bg-navy-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Findings</h3>
                  <ul className="space-y-3">{result.findings.map((f, i) => <li key={i} className="flex items-start gap-3 text-gray-300"><span className="text-healix-accent mt-1">•</span>{f}</li>)}</ul>
                </div>
              )}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg">📥 Download PDF</button>
                <button className="flex-1 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg">📤 Share</button>
              </div>
            </div>
          ) : (
            <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive ? 'border-healix-accent bg-healix-accent/10' : 'border-navy-600 hover:border-navy-500'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
              <input type="file" id="file-upload" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.dicom,.csv,.doc" onChange={handleFileSelect} />
              {file ? (
                <div className="space-y-4">
                  <span className="text-5xl">📄</span>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button onClick={handleAnalyze} disabled={uploading} className="px-8 py-3 bg-healix-accent hover:bg-yellow-500 disabled:opacity-50 text-healix-primary font-semibold rounded-lg">{uploading ? 'Analyzing...' : '🔍 Analyze'}</button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-5xl mb-4 block">📤</span>
                  <p className="text-white font-medium mb-2">Drag & drop your report here</p>
                  <p className="text-gray-400 text-sm">or click to browse</p>
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
