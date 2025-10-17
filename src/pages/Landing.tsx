import React, { useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Clock, Zap, Eye, CheckCircle, LogIn } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { UserMenu } from '../components/common/UserMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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
            <nav className="flex items-center gap-4 md:gap-8">
              <a href="#products" className="hidden md:inline text-[#64748B] hover:text-[#0A1628] text-sm font-medium transition-colors">Products</a>
              <a href="#about" className="hidden md:inline text-[#64748B] hover:text-[#0A1628] text-sm font-medium transition-colors">About</a>

              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" icon={<LogIn />} onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                    Apply Now
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/shutterstock_2651752607.jpg"
            alt="Property Finance"
            className="w-full h-full object-cover object-center"
          />
          {/* Darker overlay to support white text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/60 to-[#0A1628]/30" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            {/* Content */}
            <div>
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-lg">
                Property Finance, <span className="text-[#FFB800]">Simplified</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed font-medium max-w-3xl drop-shadow-md">
                Get a bridging loan decision in principle in minutes. Funds in as little as 5-7 days. No hidden fees, no surprises.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button variant="primary" size="lg" onClick={() => navigate(isAuthenticated ? '/apply/step1' : '/login')}>
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <button
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center bg-white/80 backdrop-blur-xl border-2 border-white/50 text-[#0A1628] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 hover:border-[#FFB800] transition-all duration-200 shadow-lg"
                >
                  Calculate Your Loan
                </button>
              </div>

              {/* Stats - Enhanced with glassmorphism cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:bg-white/85 transition-all duration-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FFB800]/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#FFB800]" />
                    </div>
                    <span className="text-4xl font-bold text-[#0A1628]">£7bn+</span>
                  </div>
                  <p className="text-sm font-semibold text-[#64748B]">Total Lent</p>
                </div>
                <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:bg-white/85 transition-all duration-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FFB800]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#FFB800]" />
                    </div>
                    <span className="text-4xl font-bold text-[#0A1628]">5-7 Days</span>
                  </div>
                  <p className="text-sm font-semibold text-[#64748B]">To Funding</p>
                </div>
                <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:bg-white/85 transition-all duration-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FFB800]/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#FFB800]" />
                    </div>
                    <span className="text-4xl font-bold text-[#0A1628]">17 Years</span>
                  </div>
                  <p className="text-sm font-semibold text-[#64748B]">Track Record</p>
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
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Fast Decision Making</h3>
              <p className="text-[#64748B]">
                Decision in principle in 24 hours. Funds released in 5-7 days. We understand timing is critical in property transactions.
              </p>
            </Card>

            {/* Card 2 */}
            <Card hover className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFB800]/10 rounded-lg mb-4">
                <Eye className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Clear Pricing, No Surprises</h3>
              <p className="text-[#64748B]">
                Upfront rates and fees with no hidden charges. See exactly what you'll pay before you commit.
              </p>
            </Card>

            {/* Card 3 */}
            <Card hover className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFB800]/10 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">Trusted & Established</h3>
              <p className="text-[#64748B]">
                FCA regulated lender since 2008. Over £7bn lent to property investors across the UK.
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
