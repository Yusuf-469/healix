import React, { useState } from 'react';

const faqs = [
  {
    question: 'Is Healix a replacement for my doctor?',
    answer: 'No. Healix provides preliminary guidance only. Always consult licensed physicians for serious concerns or conditions.'
  },
  {
    question: 'How accurate is the AI diagnosis?',
    answer: 'Our AI achieves 94% accuracy for common symptoms. It is designed to guide and inform, not to definitively diagnose medical conditions.'
  },
  {
    question: 'Is my medical data secure?',
    answer: 'Absolutely. We use 256-bit encryption, are HIPAA-compliant, and employ zero-knowledge architecture. Your data remains yours.'
  },
  {
    question: 'What file formats can I upload?',
    answer: 'We support PDF, JPG, PNG, DICOM, CSV, and DOC formats. Maximum file size is 50MB per upload.'
  },
  {
    question: 'Can I use Healix for my family?',
    answer: 'Yes! You can manage up to 5 profiles under one account, making it easy to track health for your entire family.'
  },
  {
    question: 'How much does it cost?',
    answer: 'Basic symptom checking is completely free. Premium features like detailed report analysis and family profiles require a subscription.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="section-faq" className="h-screen w-full bg-navy-900 relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Frequently Asked <span className="text-healix-accent">Questions</span>
        </h2>

        <div id="faq-cards" className="max-w-3xl mx-auto grid gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-navy-800/80 backdrop-blur-lg rounded-xl border border-navy-700 overflow-hidden transition-all hover:border-healix-accent/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-healix-accent transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@healix.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};
