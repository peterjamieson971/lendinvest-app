import React, { useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Clock, Zap, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [propertyValue, setPropertyValue] = useState('300000');
  const [loanAmount, setLoanAmount] = useState('200000');

  const calculateLTV = () => {
    const ltv = (parseInt(loanAmount || '0') / parseInt(propertyValue || '1')) * 100;
    return ltv.toFixed(0);
  };

  const calculateRate = () => {
    return '0.75';
  };

  return (
    <div className="min-h-screen">
      {/* 1. HEADER (sticky) */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img
              src="https://cdn.mortgagestrategy.co.uk/content/uploads/2016/05/LendInvest-logo--768x270.gif"
              alt="LendInvest"
              className="h-10"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  const fallback = document.createElement('div');
                  fallback.className = 'text-2xl font-bold text-[#FFB800]';
                  fallback.textContent = 'LendInvest';
                  target.parentElement.appendChild(fallback);
                }
              }}
            />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-[#64748B] hover:text-[#0A1628] text-sm font-medium transition-colors">Products</a>
              <a href="#about" className="text-[#64748B] hover:text-[#0A1628] text-sm font-medium transition-colors">About</a>
              <Button variant="primary" size="sm" onClick={() => navigate('/apply/step1')}>Apply Now</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (dark gradient - THE MONEY SHOT) */}
      <section className="relative bg-gradient-to-br from-[#0A1628] via-[#1A2738] to-[#0A1628] text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/shutterstock_2651752607.jpg"
            alt="Property Finance"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#0A1628]/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Content */}
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FFB800]/20 border border-[#FFB800]/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-[#FFB800]" />
                <span className="text-sm font-semibold text-[#FFB800]">FCA Regulated • £8bn+ Lent</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Property Finance,{' '}
                <span className="text-[#FFB800]">Simplified</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Get a bridging loan decision in principle in minutes. Funds in as little as 5-7 days. No hidden fees, no surprises.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button variant="primary" size="lg" onClick={() => navigate('/apply/step1')}>
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <button
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200"
                >
                  Calculate Your Loan
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
                <div>
                  <div className="flex items-center gap-2 text-[#FFB800] mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-3xl font-bold">£8bn+</span>
                  </div>
                  <p className="text-sm text-slate-400">Total Lent</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#FFB800] mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-3xl font-bold">5-7 Days</span>
                  </div>
                  <p className="text-sm text-slate-400">To Funding</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#FFB800] mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-3xl font-bold">17 Years</span>
                  </div>
                  <p className="text-sm text-slate-400">Track Record</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION (light background) */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
              Why Choose LendInvest
            </h2>
            <p className="text-xl text-[#64748B]">
              Modern property finance, designed for today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card hover className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFB800]/10 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Lightning Fast</h3>
              <p className="text-[#64748B]">
                Get approved in 5-7 days, not weeks. Our AI-powered platform processes applications instantly.
              </p>
            </Card>

            {/* Card 2 */}
            <Card hover className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFB800]/10 rounded-lg mb-4">
                <Eye className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Fully Transparent</h3>
              <p className="text-[#64748B]">
                See exactly how we make decisions. No black boxes, no hidden fees, just clarity.
              </p>
            </Card>

            {/* Card 3 */}
            <Card hover className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFB800]/10 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Secure & Regulated</h3>
              <p className="text-[#64748B]">
                FCA regulated and LSE listed. Your investment is protected by industry-leading security.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. CALCULATOR SECTION (white background) */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
              Calculate Your Bridging Loan
            </h2>
            <p className="text-xl text-[#64748B]">
              Get an instant estimate in seconds
            </p>
          </div>

          <Card className="border-2 p-8">
            <div className="space-y-6">
              <Input
                label="Property Value"
                prefix="£"
                type="text"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="300,000"
                helpText="Enter the current or expected property value"
              />

              <Input
                label="Loan Amount Required"
                prefix="£"
                type="text"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="200,000"
                helpText={`Maximum: £${(parseInt(propertyValue || '0') * 0.75).toLocaleString()} (75% LTV)`}
              />

              <Button variant="primary" size="lg" className="w-full" onClick={() => navigate('/apply/step1')}>
                Get Your Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Results */}
              <div className="bg-[#FFFBF0] border-2 border-[#FFB800] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FFB800] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-[#64748B] mb-1">Estimated loan details</div>
                    <div className="text-2xl font-bold text-[#0A1628] mb-2">£{parseInt(loanAmount || '0').toLocaleString()}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#64748B]">Loan-to-Value:</span>
                        <span className="ml-2 font-semibold text-[#0A1628]">{calculateLTV()}%</span>
                      </div>
                      <div>
                        <span className="text-[#64748B]">Rate from:</span>
                        <span className="ml-2 font-semibold text-[#0A1628]">{calculateRate()}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. FINAL CTA (dark background) */}
      <section className="py-20 bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Bridge to Your Next Property?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers who've achieved their property goals
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/apply/step1')}>
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* 6. FOOTER (dark background) */}
      <footer className="bg-[#0A1628] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-[#FFB800] mb-4">lendinvest</div>
              <p className="text-sm">Making property finance simple since 2008</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Bridging Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Development Finance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            <p>© 2025 LendInvest. FCA Regulated. LSE Listed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
